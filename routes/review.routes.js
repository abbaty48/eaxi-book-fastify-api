const idSchema = {
  type: "object",
  params: {
    required: ["id"],
    properties: { id: { type: "string", maxLength: 36 } },
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

const addSchema = {
  type: "object",
  required: ["book_id", "customer_id", "rating"],
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    book_id: { type: "string", maxLength: 40 },
    is_verified: { type: "boolean", default: false },
    customer_id: { type: "string", maxLength: 40 },
    rating: { type: "number", minimum: 1, maximum: 5 },
  },
};

const updateSchema = {
  type: "object",
  body: { type: "object", properties: addSchema.properties },
  params: { type: "object", properties: idSchema.params.properties },
};

export default function (app) {
  app.get("/reviews", { schema: getSchema }, async (req) => {
    return (await app.source.getReviews(req.query))?.rows ?? [];
  });
  app.get("/reviews/:id", { schema: idSchema }, async (req) => {
    return (await app.source.getReview(req.params.id))?.rows[0] ?? null;
  });
  app.put("/reviews/:id", { schema: updateSchema }, async (req) => {
    let target = (await app.source.getReview(req.params.id))?.rows[0];
    return target
      ? await app.source.updateReview(
          req.params.id,
          Object.assign(target, req.body),
        )
      : false;
  });
  app.post("/reviews", { schema: addSchema }, async (req) => {
    return await app.source.addReview(req.body);
  });
  app.delete("/reviews/:id", { schema: idSchema }, async (req) => {
    return (await app.source.getReview(req.params.id))?.rows[0]
      ? await app.source.removeReview(req.params.id)
      : false;
  });
}
