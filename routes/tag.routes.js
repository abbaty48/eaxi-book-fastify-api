const paramSchema = {
  type: "object",
  params: {
    type: "object",
    properties: {
      name: { type: "string", maxLength: 40 },
    },
  },
};

const getSchema = {
  type: "object",
  query: {
    type: "object",
    properties: {
      q: { type: "string" },
      limit: { type: "number", default: 10 },
      page: { type: "number", default: 0 },
      order_by: { type: "string", default: "created_at" },
      sort: { type: "string", enum: ["asc", "desc"], default: "asc" },
    },
  },
};

const addSchema = {
  type: "object",
  required: ["name"],
  properties: { name: { type: "string", maxLength: 20 } },
};

export default function (app) {
  app.get("/tags", { schema: getSchema }, async (req) => {
    return (await app.source.getTags(req.query))?.rows ?? [];
  });
  app.get("/tags/:name", { schema: paramSchema }, async (req) => {
    return (await app.source.getTag(req.params.name))?.rows[0] ?? null;
  });
  app.post("/tags", { schema: addSchema }, async (req) => {
    return (
      (await app.source.getTag(req.body.name))?.rows[0] ??
      (await app.source.addTag(req.body.name))
    );
  });
  app.delete("/tags/:name", { schema: paramSchema }, async (req) => {
    return (await app.source.getTag(req.params.name))?.rows[0]
      ? await app.source.removeTag(req.params.name)
      : false;
  });
}
