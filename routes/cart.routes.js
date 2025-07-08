const idSchema = {
  type: "object",
  params: {
    type: "object",
    properties: {
      id: { type: "string", maxLength: 40 },
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
  params: idSchema.params,
  body: {
    type: "object",
    properties: addSchema.properties,
  },
};

export default function (app) {
  app.get("/carts", { schema: getSchema }, async (req) => {
    return (await app.source.getCarts(req.query)).rows;
  });
  app.get("/carts/:id", { schema: idSchema }, async (req) => {
    return (await app.source.getCart(req.params.id))?.rows[0] ?? null;
  });
  app.post("/carts", { schema: addSchema }, async (req) => {
    const exists = await app.source.getCartItem(req.body);
    return exists.rowCount
      ? exists.rows[0]
      : await app.source.addCart(req.body);
  });
  app.put("/carts/:id", { schema: updateSchema }, async (req) => {
    let cart = (await app.source.getCart(req.params.id)).rows[0];
    if (cart) {
      Object.assign(cart, req.body);
      console.log("NEW TARGET: ", cart);
      return (await app.source.updateCart(req.params.id, cart)) ? true : false;
    }
    return false;
  });
  app.delete("/carts/:id", async (req) => {
    return (await app.source.getCart(req.params.id)).rows[0]
      ? (await app.source.removeCart(req.params.id)).rowCount
        ? true
        : false
      : false;
  });
}
