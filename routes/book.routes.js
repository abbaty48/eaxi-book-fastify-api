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
    .get("/books", {
      schema: app.schemas.getSchema(),
      handler: async (req) => {
        return (await app.source.getBooks(req.query))?.rows ?? [];
      },
    })
    .get("/books/:id", {
      schema: app.schemas.idSchema,
      handler: async (req) => {
        return (await app.source.getBook(req.params.id))?.rows[0] ?? null;
      },
    })
    .put("/books/:id", {
      schema: app.schemas.putSchema(updateSchema),
      handler: async (req) => {
        let target = (await app.source.getBook(req.params.id))?.rows[0] ?? null;
        return target
          ? await app.source.upsertBook("update", {
              ...Object.assign(target, req.body),
              book_id: req.params.id,
            })
          : false;
      },
    })
    .post("/books", {
      schema: addSchema,
      handler: async (req) => {
        return await app.source.upsertBook("insert", req.body);
      },
    })
    .delete("/books/:id", {
      schema: app.schemas.idSchema,
      handler: async (req) => {
        return (await app.source.getBook(req.params.id))?.rows[0]
          ? await app.source.removeBook(req.params.id)
          : false;
      },
    });
}
