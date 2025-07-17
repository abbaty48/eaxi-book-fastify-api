const addSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", maxLength: 40 },
    bio: { type: "string", maxLength: 255 },
    birth_date: { type: "date" },
    nationality: { type: "string" },
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
    .get("/authors", {
      scheme: app.schemas.getSchema({ order_by: "name" }),
      handler: async (req) =>
        (await app.source.getAuthors(req.query))?.rows ?? [],
    })
    .get("/authors/:id", {
      scheme: app.schemas.idSchema,
      handler: async (req) =>
        (await app.source.getAuthor(req.params.id))?.rows[0] ?? null,
    })
    .post("/authors", {
      scheme: addSchema,
      handler: async (req) => await app.source.addAuthor(req.body),
    })
    .put("/authors/:id", {
      scheme: app.schemas.putSchema(updateSchema),
      handler: async (req) => {
        const target =
          (await app.source.getAuthor(req.params.id))?.rows[0] ?? null;
        return target
          ? await app.source.updateAuthor({
              id: req.params.id,
              ...Object.assign(target, req.body),
            })
          : false;
      },
    })
    .delete("/authors/:id", {
      scheme: app.schemas.idSchema,
      handler: async (req) => await app.source.removeAuthor(req.params.id),
    });
}
