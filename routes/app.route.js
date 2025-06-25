import adminRoutes from "./admin.routes.js";
import authorRoutes from "./author.routes.js";

export default async function (app) {
  app.get("/", async (_) => {
    return {
      api: "Eaxi-book api.",
      version: 1.0,
      author: "Abbatyya",
      email: "abbaty48@gmail.com",
      description:
        "A fastify api for serving eaxi-books an online ebooks ecommerce web application",
    };
  });
  app.register(adminRoutes);
  app.register(authorRoutes);
}
