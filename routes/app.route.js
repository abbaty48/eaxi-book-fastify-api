import adminRoutes from "./admin.routes.js";
import authorRoutes from "./author.routes.js";
import categoryRoutes from "./category.routes.js";
import customerRoutes from "./customer.routes.js";

export default async function (app) {
  app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
      reply.code(403);
      return err.message;
    }
    request.log.error({ err });
    reply.code(err.statusCode || 500);
    return "I'm sorry, there was an error processing your request.";
  });
  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404);
    return "I'm sorry, I couldn't find what you were looking for.";
  });
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
  app.register(customerRoutes);
  app.register(categoryRoutes);
}
