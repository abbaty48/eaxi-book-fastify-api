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

export default function (app) {
  app
    .get("/customers", {
      schema: app.schemas.getSchema({ order_by: "join_date" }),
      handler: async (req) => {
        return (await app.source.getCustomers(req.query))?.rows ?? [];
      },
    })
    .get("/customers/:email", {
      scheme: app.schemas.idSchema,
      handler: async (req) =>
        (await app.source.getCustomer(req.params.email))?.rows[0] ?? null,
    })
    .post("/customers/auth/gmail", {
      handler: async function (_, reply) {
        return reply.redirect(app.googleOAuth2.getAuthorizedUri());
      },
    })
    .post("/customers/auth/gmail/callback", {
      handler: async function (req, reply) {
        try {
          const token =
            await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
          if (token) {
            const customer =
              (await app.source.getCustomer(token.email))?.rows[0] ?? null;
            // check if customer exist with the same email
            if (customer && token.email === customer?.email) {
              // update customer's profile
              await app.source.upsertCustomer("update", {
                ...token,
                account_type: "local&oauth",
                last_login: new Date(Date.now()),
              });
              return { token };
            } else {
              // if no - then add the customer details
              await app.source.upsertCustomer("insert", {
                ...token,
                account_type: "oauth",
                last_login: new Date(Date.now()),
              });
              return { token };
            }
          }
          return false;
        } catch (err) {
          return false;
        }
      },
    })
    .post("/customers/auth/local", {
      scheme: addSchema,
      handler: async (req) => {
        const { name, email, password } = req.body;
        const customer = (await app.source.getCustomer(email))?.rows[0] ?? null;
        if (customer) {
          if (
            await app.utils.checkPassword(password, customer?.password_hash)
          ) {
            const { customer_id, name, email, account_type, profile } =
              customer;
            return { customer_id, name, email, account_type, profile };
          }
          return null;
        } else {
          // add the customer
          return await app.source.upsertCustomer("insert", {
            name,
            email,
            account_type: "local",
            password_hash: await app.utils.hashPassword(password),
          });
        }
      },
    })
    .put("/customers/:email", {
      scheme: app.schemas.putSchema(updateSchema),
      handler: async (req) => {
        let target =
          (await app.source.getCustomer(req.params.email))?.rows[0] ?? null;
        return target
          ? await app.source.upsertCustomer(
              "update",
              Object.assign(target, {
                ...req.body,
                email: req.params.email,
                password_hash: req.body.password
                  ? await app.utils.hashPassword(req.body.password)
                  : target.password_hash || null,
              }),
            )
          : false;
      },
    })
    .delete("/customers/:email", {
      scheme: app.schemas.idSchema,
      handler: async (req) =>
        ((await app.source.getCustomer(req.params.email))?.rows[0] ?? null)
          ? await app.source.removeCustomer(req.params.email)
          : false,
    });
}
