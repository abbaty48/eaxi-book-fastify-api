import fastifyPlugin from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";
import authorDatasource from "./author.datasource.js";
import tagDatasource from "./tag.datasource.plugin.js";
import cartDatasource from "./cart.datasource.plugin.js";
import bookDatasource from "./book.datasource.plugin.js";
import orderDatasource from "./order.datasource.plugin.js";
import adminDatasource from "./admin.datasource.plugin.js";
import reviewDatasource from "./review.datasource.plugin.js";
import wishlistDatasource from "./wishlist.datasource.plugin.js";
import categoryDatasource from "./category.datasource.plugin.js";
import publisherDatasource from "./publisher.datasource.plugin.js";
import customerDatasource from "./customer.datasource.plugin.js";

export default fastifyPlugin(async (app) => {
  app.log.info(`Connecting to database...`);
  await app.register(fastifyPostgres, {
    // connectionString: "postgres://USER:PASSWORD@localhost/pg_eaxibooks",
    connectionString:
      "postgresql://eaxi_pg_user:14xBQMXWQrk4b1N5UJFnfo7Hc9kEfjm2@dpg-d26h876mcj7s73evp7c0-a.oregon-postgres.render.com/eaxi_pg",
  });
  app.decorate("source", {
    ...adminDatasource(app),
    ...authorDatasource(app),
    ...categoryDatasource(app),
    ...customerDatasource(app),
    ...publisherDatasource(app),
    ...wishlistDatasource(app),
    ...reviewDatasource(app),
    ...orderDatasource(app),
    ...bookDatasource(app),
    ...cartDatasource(app),
    ...tagDatasource(app),
  });
});
