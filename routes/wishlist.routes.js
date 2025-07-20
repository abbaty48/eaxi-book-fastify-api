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
  body: { type: "object", properties: addSchema.properties },
};

export default function (app) {
  app
    .get("/wishlists", { schema: app.schemas.getSchema() }, async (req) => {
      return (await app.source.getWishlists(req.query))?.rows ?? [];
    })
    .get("/wishlists/:id", { schema: app.schemas.idSchema }, async (req) => {
      return (await app.source.getWishlist(req.params.id))?.rows[0] ?? null;
    })
    .post("/wishlists", { schema: addSchema }, async (req) => {
      return (
        (await app.source.getWishlistItem(req.body)).rows[0] ??
        (await app.source.addWishlist(req.body))
      );
    })
    .put(
      "/wishlists/:id",
      { schema: app.schemas.putSchema(updateSchema) },
      async (req) => {
        let wishlist =
          (await app.source.getWishlist(req.params.id))?.rows[0] ?? null;
        return wishlist
          ? await app.source.updateWishlist(
              req.params.id,
              Object.assign(wishlist, req.body),
            )
          : false;
      },
    )
    .delete("/wishlists/:id", { schema: app.schemas.idSchema }, async (req) => {
      return (await app.source.getWishlist(req.params.id))?.rows[0]
        ? await app.source.removeWishlist(req.params.id)
        : false;
    });
}
