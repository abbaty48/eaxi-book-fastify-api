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
  required: ["name", "customer_id"],
  properties: {
    name: { type: "string" },
    notes: { type: "string" },
    book_id: { type: "object" },
    customer_id: { type: "object" },
    is_public: { type: "boolean", default: false },
  },
};

const updateSchema = {
  type: "object",
  params: idSchema.params,
  body: { type: "object", properties: addSchema.properties },
};

export default function (app) {
  app.get("/wishlists", { schema: getSchema }, async (req) => {
    return (await app.source.getWishlists(req.query)).rows;
  });
  app.post("/wishlists", { schema: addSchema }, async (req) => {
    return (
      (await app.source.getWishlistItem(req.body)).rows[0] ??
      (await app.source.addWishlist(req.body))
    );
  });
  app.get("/wishlists/:id", { schema: idSchema }, async (req) => {
    return (await app.source.getWishlist(req.params.id))?.rows[0] ?? null;
  });
  app.put("/wishlists/:id", { schema: updateSchema }, async (req) => {
    let wishlist =
      (await app.source.getWishlist(req.params.id))?.rows[0] ?? null;
    return wishlist
      ? await app.source.updateWishlist(
          req.params.id,
          Object.assign(wishlist, req.body),
        )
      : false;
  });
  app.delete("/wishlists/:id", { schema: idSchema }, async (req) => {
    return (await app.source.getWishlist(req.params.id))?.rows[0]
      ? await app.source.removeWishlist(req.params.id)
      : false;
  });
}
