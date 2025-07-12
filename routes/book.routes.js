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
      order_by: { type: "string", default: "created_at" },
      sort: { type: "string", enum: ["asc", "desc"], default: "asc" },
    },
  },
};

export default function (app) {
  app.get("/books", { schema: getSchema }, async (req) => {
    return (await app.source.getBooks(req.query))?.rows ?? [];
  });
  app.get("/books/:id", { schema: idSchema }, async (req) => {
    return (await app.source.getBook(req.params.id))?.rows[0] ?? null;
  });
  app.put("/books/:id", { schema: updateSchema }, async (req) => {
    let target = (await app.source.getBook(req.params.id))?.rows[0] ?? null;
    return target
      ? await app.source.upsertBook("update", {
          ...Object.assign(target, req.body),
          book_id: req.params.id,
        })
      : false;
  });
  app.post("/books", { schema: addSchema }, async (req) => {
    return await app.source.upsertBook("insert", req.body);
  });
  app.delete("/books/:id", { schema: idSchema }, async (req) => {
    return (await app.source.getBook(req.params.id))?.rows[0]
      ? await app.source.removeBook(req.params.id)
      : false;
  });
}
