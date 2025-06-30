const idSchema = {
  type: "object",
  params: {
    required: ["id"],
    properties: {
      id: { type: "string", maxLength: 36 },
    },
  },
};
const addSchema = {
  type: "object",
  required: ["name", "email", "password", "account_type"],
  properties: {
    name: { type: "string", maxLength: 30 },
    email: {
      type: "string",
      maxLength: 100,
      pattern: "^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$",
    },
    account_type: { type: "string", enum: ["local", "oauth", "local&oauth"] },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 16,
      pattern: "*([!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
    },
  },
};
const updateSchema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 40 },
    bio: { type: "string", maxLength: 255 },
    birth_date: { type: "date" },
    nationality: { type: "string" },
  },
};
const getSchema = {
  type: "object",
  query: {
    properties: {
      q: { type: "string" },
      page: { type: "number", default: 0 },
      limit: { type: "number", default: 10 },
      order_by: { type: "string", default: "name" },
      sort: { type: "string", enum: ["asc", "desc"], default: "asc" },
    },
  },
};

export default function (app) {
  app.post("/customers/auth/gmail", async function (_, reply) {
    return reply.redirect(app.googleOAuth2.getAuthorizedUri());
  });
  app.post("/customers/auth/gmail/callback", async function (req, reply) {
    try {
      const token =
        await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
      if (token) {
        const customer = (await app.source.getCustomer(token.email)).rows[0];
        // check if customer exist with the same email
        if (customer && token.email === customer?.email) {
          // update customer's profile
          await app.source.addOrUpdateOauthCustomer("update", {
            ...token,
            account_type: "local&oauth",
            last_login: new Date(Date.now()),
          });
          return { token };
        } else {
          // if no - then add the customer details
          await app.source.addOrUpdateOauthCustomer("insert", {
            ...token,
            account_type: "oauth",
            last_login: new Date(Date.now()),
          });
          return { token };
        }
      }
      return reply.status(500).send("Authentication failed.");
    } catch (err) {
      return reply.status(500).send("Authentication failed.");
    }
  });
  app.get("/customers", { scheme: getSchema }, async (req) => {
    return (await app.source.getCustomers(req.query)).rows;
  });
  app.get("/customers/:id", { scheme: idSchema }, async (req) => {
    const result = (await app.source.getCustomer(req.params.id)).rows[0];
    if (result) {
      return result;
    }
    return "Not Found";
  });
  app.post("/customers/auth/local", { scheme: addSchema }, async (req) => {
    const { name, email, password } = req.body;
    const customer = (await app.source.getCustomer(email)).rows[0];
    if (customer) {
      if (await app.utils.checkPassword(password, customer?.password_hash)) {
        const { customer_id, name, email, account_type, profile } = customer;
        return { customer_id, name, email, account_type, profile };
      }
      return null;
    } else {
      // add the customer
      const result = await app.source.addOrUpdateLocalCustomer("insert", {
        name,
        email,
        account_type: "local",
        password_hash: await app.utils.hashPassword(password),
      });
      if (result.rowCount) {
        return { name, email, account_type: "local" };
      }
      return null;
    }
  });
  app.put("/customers/:id", { scheme: updateSchema }, async (req) => {
    const id = req.params.id;
    let Customer = (await app.source.getCustomer(id)).rows[0];
    if (Customer) {
      const { name, bio, birth_date, nationality } = Object.assign(
        Customer,
        req.body,
      );
      const result = await app.source.updateCustomer({
        id,
        name,
        bio,
        birth_date,
        nationality,
      });
      if (result.rowCount) {
        return "Customer updated.";
      }
    }
    return "Customer not updated.";
  });
  app.delete("/customers/:id", { scheme: idSchema }, async (req) => {
    const result = await app.source.removeCustomer(req.params.id);
    if (result.rowCount) {
      return "Customer removed";
    }
    return "Customer remove failed.";
  });
}
