const paramSchema = {
  type: "object",
  params: {
    type: "object",
    properties: {
      name: { type: "string", maxLength: 40 },
    },
  },
};

const addSchema = {
  type: "object",
  required: ["name"],
  properties: { name: { type: "string", maxLength: 20 } },
};

export default function (app) {
  app
    .get("/tags", {
      schema: app.schemas.getSchema(),
      handler: async (req) => {
        return (await app.source.getTags(req.query))?.rows ?? [];
      },
    })
    .get("/tags/:name", {
      schema: paramSchema,
      handler: async (req) => {
        return (await app.source.getTag(req.params.name))?.rows[0] ?? null;
      },
    })
    .post("/tags", {
      schema: addSchema,
      handler: async (req) => {
        return (
          (await app.source.getTag(req.body.name))?.rows[0] ??
          (await app.source.addTag(req.body.name))
        );
      },
    })
    .delete("/tags/:name", {
      schema: paramSchema,
      handler: async (req) => {
        return (await app.source.getTag(req.params.name))?.rows[0]
          ? await app.source.removeTag(req.params.name)
          : false;
      },
    });
}
