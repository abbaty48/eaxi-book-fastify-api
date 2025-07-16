const idSchema = {
  type: "object",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", maxLength: 36 },
    },
  },
};
/* */
const addSchema = {
  type: "object",
  required: [
    "status",
    "book_id",
    "quantity",
    "unit_price",
    "customer_id",
    "total_amount",
    "billing_address",
    "shipping_address",
    "payment_method",
  ],
  properties: {
    book_id: { type: "string", maxLength: 30 },
    customer_id: { type: "string", maxLength: 30 },
    status: {
      type: "string",
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    quantity: { type: "number" },
    discount: { type: "number" },
    unit_price: { type: "number" },
    total_amount: { type: "number" },
    shipping_address: { type: "object" },
    billing_address: { type: "object" },
    payment_method: { type: "string" },
    tracking_number: { type: "number" },
  },
};
/* */
const updateSchema = {
  type: "object",
  params: {
    type: "object",
    properties: idSchema.params.properties,
  },
  body: {
    type: "object",
    properties: addSchema.properties,
  },
};
/* */
const getSchema = {
  type: "object",
  query: {
    type: "object",
    properties: {
      q: { type: "string" },
      page: { type: "number", default: 0 },
      limit: { type: "number", default: 10 },
      order_by: { type: "string", default: "updated_at" },
      sort: { type: "string", enum: ["asc", "desc"], default: "asc" },
    },
  },
};

export default function (app) {
  app.get("/orders", { schema: getSchema }, async (req) => {
    return (await app.source.getOrders(req.query))?.rows ?? [];
  });
  app.post("/orders", { schema: addSchema }, async (req) => {
    return await app.source.upsertOrder("insert", req.body);
  });
  app.get("/orders/:id", { schema: idSchema }, async (req) => {
    return (await app.source.getOrder(req.params.id))?.rows[0] ?? null;
  });
  app.put("/orders/:id", { schema: updateSchema }, async (req) => {
    let target = (await app.source.getOrder(req.params.id))?.rows[0] ?? null;
    return target
      ? await app.source.upsertOrder("update", Object.assign(target, req.body))
      : false;
  });
  app.delete("/orders/:id", { schema: idSchema }, async (req) => {
    return ((await app.source.getOrder(req.params.id))?.rows[0] ?? null)
      ? await app.source.removeOrder(req.params.id)
      : false;
  });
}
