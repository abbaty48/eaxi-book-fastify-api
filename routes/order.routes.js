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
  body: {
    type: "object",
    properties: addSchema.properties,
  },
};

export default function (app) {
  app
    .get(
      "/orders",
      { schema: app.schemas.getSchema("updated_at") },
      async (req) => {
        return (await app.source.getOrders(req.query))?.rows ?? [];
      },
    )
    .post("/orders", { schema: addSchema }, async (req) => {
      return await app.source.upsertOrder("insert", req.body);
    })
    .get("/orders/:id", { schema: app.schemas.idSchema }, async (req) => {
      return (await app.source.getOrder(req.params.id))?.rows[0] ?? null;
    })
    .put(
      "/orders/:id",
      { schema: app.schemas.putSchema(updateSchema) },
      async (req) => {
        let target =
          (await app.source.getOrder(req.params.id))?.rows[0] ?? null;
        return target
          ? await app.source.upsertOrder(
              "update",
              Object.assign(target, req.body),
            )
          : false;
      },
    )
    .delete("/orders/:id", { schema: app.schemas.idSchema }, async (req) => {
      return ((await app.source.getOrder(req.params.id))?.rows[0] ?? null)
        ? await app.source.removeOrder(req.params.id)
        : false;
    });
}
