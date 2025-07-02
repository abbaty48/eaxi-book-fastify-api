const idSchema = {
  type: "object",
  params: {
    type: "object",
    required: ["id"],
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
      sort: { type: "string", enum: ["asc", "desc"], default: "asc" },
      order_by: { type: "string", default: "created_at" },
      limit: { type: "number", default: 10 },
      page: { type: "number", default: 0 },
    },
  },
};

const addSchema = {
  type: "object",
  required: ["name", "founded_year"],
  properties: {
    name: { type: "string", maxLength: 255 },
    founded_year: { type: "number", maxLength: 4 },
    headquarters: { type: "string", maxLength: 255 },
    website: { type: "string", maxLength: 255 },
  },
};

const updateSchema = {
  type: "object",
  params: idSchema.params,
  body: {
    type: "object",
    properties: {
      name: { type: "string", maxLength: 255 },
      founded_year: { type: "number" },
      headquarters: { type: "string", maxLength: 255 },
      website: { type: "string", maxLength: 255 },
    },
  },
};

export default function (app) {
  app.get(
    "/publishers",
    { schema: getSchema },
    async (req) => (await app.source.getPublishers(req.query)).rows,
  );
  app.get(
    "/publishers/:id",
    { schema: idSchema },
    async (req) => (await app.source.getPublisher(req.params?.id)).rows[0],
  );
  app.post("/publishers", { schema: addSchema }, async (req) => {
    const result = await app.source.addPublisher(req.body);
    if (result.rowCount) {
      return true;
    }
    return false;
  });
  app.put("/publishers/:id", { schema: updateSchema }, async (req) => {
    let target = (await app.source.getPublisher(req.params?.id)).rows[0];
    if (target) {
      const new_target = Object.assign(target, req.body);
      if (
        (await app.source.updatePublisher(req.params?.id, new_target)).rowCount
      ) {
        return true;
      }
      return false;
    }
    return false;
  });
  app.delete("/publishers/:id", { schema: idSchema }, async (req) => {
    let target = (await app.source.getPublisher(req.params?.id)).rows[0];
    if (target) {
      if ((await app.source.deletePublisher(req.params?.id)).rowCount) {
        return true;
      }
      return false;
    }
    return false;
  });
}
