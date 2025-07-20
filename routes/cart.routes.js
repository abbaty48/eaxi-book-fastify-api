const addSchema = {
  type: "object",
  body: {
    type: "object",
    required: ["customer_id", "book_id"],
    properties: {
      customer_id: { type: "string" },
      book_id: { type: "string" },
      quantity: { type: "number", default: 1 },
      coupon_code: { type: "string", maxLength: 20 },
      is_active: { type: "boolean", default: true },
    },
  },
};

const updateSchema = {
  type: "object",
  body: {
    type: "object",
    properties: addSchema.properties,
  },
};

export default function (app) {
  app
    .get("/carts", {
      schema: app.schemas.getSchema(),
      handler: async (req) => {
        return (await app.source.getCarts(req.query))?.rows ?? [];
      },
    })
    .get("/carts/:id", {
      schema: app.schemas.idSchema,
      handler: async (req) => {
        return (await app.source.getCart(req.params.id))?.rows[0] ?? null;
      },
    })
    .post("/carts", {
      schema: addSchema,
      handler: async (req) => {
        const exists =
          (await app.source.getCartItem(req.body))?.rows[0] ?? null;
        return exists ?? (await app.source.addCart(req.body));
      },
    })
    .put("/carts/:id", {
      schema: app.schemas.putSchema(updateSchema),
      handler: async (req) => {
        let cart = (await app.source.getCart(req.params.id))?.rows[0] ?? null;
        return cart
          ? await app.source.updateCart(
              req.params.id,
              Object.assign(cart, req.body),
            )
          : false;
      },
    })
    .delete("/carts/:id", {
      schema: app.schemas.idSchema,
      handler: async (req) => {
        return ((await app.source.getCart(req.params.id))?.rows[0] ?? null)
          ? await app.source.removeCart(req.params.id)
          : false;
      },
    });
}
