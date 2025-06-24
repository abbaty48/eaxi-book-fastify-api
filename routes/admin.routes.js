const addSchema = {
  type: "object",
  required: ["name", "email", "password", "role"],
  properties: {
    last_login: { type: "date" },
    is_active: { type: "boolean", default: true },
    name: { type: "string", minLength: 2, maxLength: 25 },
    email: { type: "string", maxLength: 50, format: "email" },
    password: { type: "string", minLength: 8, maxLength: 25 },
    role: { type: "string", enum: ["SuperAdmin", "Admin", "Editor", "Viewer"] },
  },
};

const putSchema = {
  type: "object",
  params: {
    type: "object",
    required: ["id"],
    properties: { id: { type: "string" } },
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string", maxLength: 20, minLength: 2 },
      password: { type: "string", minLength: 8, maxLength: 25 },
      is_active: { type: "boolean" },
      role: {
        type: "string",
        enum: ["SuperAdmin", "Admin", "Editor", "Viewer"],
      },
    },
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

export default async function (app) {
  app.register(async function () {
    // GET admins - return all admins
    app.get("/admins", {
      schema: getSchema,
      handler: async (req) => {
        return (await app.source.admins(req.query)).rows;
      },
    }),
      // GET admins - return admin by id
      app.get("/admins/:id", {
        handler: async (req, res) => {
          const row = (await app.source.admin(req.params.id)).rows[0];
          if (row) {
            const { admin_id, name, email, is_active } = row;
            return { admin_id, name, email, is_active };
          }
          res.statusCode = 404;
          return "Not Found";
        },
      });
    // POST admins - add a new admin
    app.post("/admins", {
      schema: addSchema,
      handler: async (req) => {
        const { name, email, password, role } = req.body;
        const password_hash = await app.utils.hashPassword(password);
        const result = await app.source.addAdmin({
          name,
          email,
          role,
          password_hash,
        });
        if (result.rowCount) {
          return "Admin added.";
        }
      },
    });
    // PUT admins - update a admin details
    app.put("/admins/:id", {
      schema: putSchema,
      handler: async (req, res) => {
        let targetAdmin = (await app.source.admin(req.params.id)).rows[0];
        if (targetAdmin) {
          const { name, is_active, role, password } = Object.assign(
            targetAdmin,
            req.body,
          );
          // if password should be changed
          let password_hash = targetAdmin.password_hash;
          password && (password_hash = await app.utils.hashPassword(password));

          await app.source.updateAdmin(req.params.id, {
            name,
            role,
            is_active,
            password_hash,
          });
          return "Target successfully updated.";
        } else {
          is_active;
          res.statusCode = 404;
          return "Target update not found.";
        }
      },
    });
    // DELETE admins - remove a admin
    app.delete("/admins/:id", {
      handler: async (req) => {
        const result = await app.source.removeAdmin(req.params.id);
        if (result.rowCount) {
          return "Target deleted.";
        }
        return "Target not deleted.";
      },
    });
  });
}
