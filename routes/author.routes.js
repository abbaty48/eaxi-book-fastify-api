const idSchema = {
  type: "object",
  params: {
    required: ["id"],
    properties: {
      id: { type: "string", maxLength: 36 },
    },
  },
};
const addSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", maxLength: 40 },
    bio: { type: "string", maxLength: 255 },
    birth_date: { type: "date" },
    nationality: { type: "string" },
  },
};
const updateSchema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 40 },
    bio: { type: "string", maxLength: 255 },
    birth_date: { type: "date" },
    nationality: { type: "string" },
  },
};
const getSchema = {
  type: "object",
  query: {
    properties: {
      q: { type: "string" },
      page: { type: "number", default: 0 },
      limit: { type: "number", default: 10 },
      order_by: { type: "string", default: "name" },
      sort: { type: "string", enum: ["asc", "desc"], default: "asc" },
    },
  },
};

export default function (app) {
  app.get("/authors", { scheme: getSchema }, async (req) => {
    return (await app.source.getAuthors(req.query)).rows;
  });
  app.get("/authors/:id", { scheme: idSchema }, async (req) => {
    const result = (await app.source.getAuthor(req.params.id)).rows[0];
    if (result) {
      return result;
    }
    return "Not Found";
  });
  app.post("/authors", { scheme: addSchema }, async (req) => {
    const result = await app.source.addAuthor(req.body);
    if (result.rowCount) {
      return "Author added.";
    }
    return "Adding failed.";
  });
  app.put("/authors/:id", { scheme: updateSchema }, async (req) => {
    const id = req.params.id;
    let author = (await app.source.getAuthor(id)).rows[0];
    if (author) {
      const { name, bio, birth_date, nationality } = Object.assign(
        author,
        req.body,
      );
      const result = await app.source.updateAuthor({
        id,
        name,
        bio,
        birth_date,
        nationality,
      });
      if (result.rowCount) {
        return "Author updated.";
      }
    }
    return "Author not updated.";
  });
  app.delete("/authors/:id", { scheme: idSchema }, async (req) => {
    const result = await app.source.removeAuthor(req.params.id);
    if (result.rowCount) {
      return "Author removed";
    }
    return "Author remove failed.";
  });
}
