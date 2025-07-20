export default function (app) {
  app
    .get(
      "/categories",
      async (req) => (await app.source.getCategories(req.query))?.rows ?? [],
    )
    .get(
      "/categories/:name",
      async (req) =>
        (await app.source.getCategory(req.params?.name)).rows[0] ?? null,
    )
    .post("/categories", async (req) => {
      return await app.source.addCategory(req.body);
    })
    .put("/categories/:name", async (req) => {
      let target =
        (await app.source.getCategory(req.params?.name))?.rows[0] ?? null;
      return target
        ? await app.source.updateCategory({
            description: req.body?.description,
            name: target.name,
          })
        : false;
    })
    .delete("/categories/:name", async (req) => {
      let target =
        (await app.source.getCategory(req.params?.name))?.rows[0] ?? null;
      return target ? await app.source.deleteCategory(req.params?.name) : false;
    });
}
