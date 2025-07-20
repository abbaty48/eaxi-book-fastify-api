import tagRoutes from "./tag.routes.js";
import cartRoutes from "./cart.routes.js";
import bookRoutes from "./book.routes.js";
import orderRoutes from "./order.routes.js";
import adminRoutes from "./admin.routes.js";
import authorRoutes from "./author.routes.js";
import reviewRoutes from "./review.routes.js";
import wishlistRoutes from "./wishlist.routes.js";
import categoryRoutes from "./category.routes.js";
import customerRoutes from "./customer.routes.js";
import publisherRoutes from "./publisher.routes.js";

export default async function (app) {
  /* */
  app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
      reply.code(403);
      return err.message;
    }
    request.log.error({ err });
    reply.code(err.statusCode || 500);
    return "I'm sorry, there was an error processing your request.";
  });
  /* */
  app.setNotFoundHandler(async (_, reply) => {
    reply.code(404);
    return "I'm sorry, I couldn't find what you were looking for, please check the endpoint reference.";
  });
  /* */
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
  /* */
  await app
    .register(adminRoutes)
    .register(authorRoutes)
    .register(customerRoutes)
    .register(publisherRoutes)
    .register(categoryRoutes)
    .register(wishlistRoutes)
    .register(reviewRoutes)
    .register(orderRoutes)
    .register(bookRoutes)
    .register(cartRoutes)
    .register(tagRoutes)
    .after((err) => {
      app.log.error(
        `Hmms, it seems like one of the route plugin has an error: "${err?.message}", continuing anyway.`,
      );
    });
}
