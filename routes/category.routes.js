export default function (app) {
  app.get("/categories", async (req) => {
    return (await app.source.getCategories(req.query)).rows;
  });
  app.get("/categories/:name", async (req) => {
    return (await app.source.getCategory(req.params?.name)).rows[0];
  });
  app.post("/categories", async (req) => {
    const result = await app.source.addCategory(req.body);
    if (result.rowCount) {
      return true;
    }
    return false;
  });
  app.put("/categories/:name", async (req) => {
    let target = (await app.source.getCategory(req.params?.name)).rows[0];
    if (target) {
      const { name } = target;
      const updated = await app.source.updateCategory({
        description: req.body?.description,
        name,
      });
      if (updated.rowCount) {
        return true;
      }
      return false;
    }
    return null;
  });
  app.delete("/categories/:name", async (req) => {
    let target = (await app.source.getCategory(req.params?.name)).rows[0];
    if (target) {
      const result = await app.source.deleteCategory(req.params?.name);
      if (result.rowCount) {
        return true;
      }
      return false;
    }
    return false;
  });
}
