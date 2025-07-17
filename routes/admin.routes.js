import fastifyPlugin from "fastify-plugin";

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
  body: {
    type: "object",
    properties: {
      name: { type: "string", maxLength: 20, minLength: 2 },
      password: { type: "string", minLength: 8, maxLength: 25 },
      is_active: { type: "boolean" },
      role: {
        type: "string",
        enum: ["Admin", "Editor", "Viewer"],
      },
    },
  },
};

export default fastifyPlugin((app) => {
  app
    // GET admins - return all admins
    .get("/admins", {
      schema: app.schemas.getSchema({ order_by: "name" }),
      handler: async (req) => (await app.source.admins(req.query))?.rows ?? [],
    })
    // GET admins - return admin by id
    .get("/admins/:id", {
      schema: app.schemas.idSchema,
      handler: async (req) =>
        (await app.source.admin(req.params.id))?.rows[0] ?? null,
    })
    // POST admins - add a new admin
    .post("/admins", {
      schema: addSchema,
      handler: async (req) => {
        return req.body?.role === "superAdmin"
          ? false
          : await app.source.addAdmin({
              ...req.body,
              password_hash: await app.utils.hashPassword(req.body.password),
            });
      },
    })
    // PUT admins - update a admin details
    .put("/admins/:id", {
      schema: app.schemas.putSchema(putSchema),
      handler: async (req, _) => {
        let targetAdmin =
          (await app.source.admin(req.params.id))?.rows[0] ?? null;
        return targetAdmin
          ? app.source.updateAdmin(req.params.id, {
              ...Object.assign(targetAdmin, req.body),
              password_hash: req.body.password
                ? await app.utils.hashPassword(req.body.password)
                : targetAdmin.password_hash,
            })
          : false;
      },
    })
    // DELETE admins - remove a admin
    .delete("/admins/:id", {
      schema: app.schemas.idSchema,
      handler: async (req) => await app.source.removeAdmin(req.params.id),
    });
});
