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
  app
    /** */
    .get("/publishers", {
      schema: app.schemas.getSchema(),
      handler: async (req) =>
        (await app.source.getPublishers(req.query))?.rows ?? [],
    })
    /** */
    .get("/publishers/:id", {
      schema: app.schemas.idSchema,
      handler: async (req) =>
        (await app.source.getPublisher(req.params?.id))?.rows[0] ?? null,
    })
    /** */
    .post("/publishers", {
      schema: addSchema,
      handler: async (req) => await app.source.addPublisher(req.body),
    })
    /** */
    .put("/publishers/:id", {
      schema: app.schemas.putSchema(updateSchema),
      handler: async (req) => {
        let target =
          (await app.source.getPublisher(req.params?.id))?.rows[0] ?? null;
        return target
          ? await app.source.updatePublisher(
              req.params?.id,
              Object.assign(target, req.body),
            )
          : false;
      },
    })
    /** */
    .delete("/publishers/:id", {
      schema: app.schemas.idSchema,
      handler: async (req) => {
        let target =
          (await app.source.getPublisher(req.params?.id))?.rows[0] ?? null;
        return target
          ? await app.source.deletePublisher(req.params?.id)
          : false;
      },
    });
}
