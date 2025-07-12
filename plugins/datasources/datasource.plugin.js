import fastifyPlugin from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";
import cartDatasource from "./cart.datasource.js";
import tagDatasource from "./tag.datasource.plugin.js";
import authorDatasource from "./author.datasource.js";
import bookDatasource from "./book.datasource.plugin.js";
import adminDatasource from "./admin.datasource.plugin.js";
import reviewDatasource from "./review.datasource.plugin.js";
import wishlistDatasource from "./wishlist.datasource.plugin.js";
import categoryDatasource from "./category.datasource.plugin.js";
import customerDatasource from "./customer.datasource.plugin.js";
import publisherDatasource from "./publisher.datasource.plugin.js";

export default fastifyPlugin(async (app) => {
  app.log.info(`Connecting to database...`);
  await app.register(fastifyPostgres, {
    connectionString: "postgres://USER:PASSWORD@localhost/pg_eaxibooks",
  });
  app.decorate("source", {
    ...adminDatasource(app),
    ...authorDatasource(app),
    ...categoryDatasource(app),
    ...customerDatasource(app),
    ...publisherDatasource(app),
    ...wishlistDatasource(app),
    ...reviewDatasource(app),
    ...bookDatasource(app),
    ...cartDatasource(app),
    ...tagDatasource(app),
  });
});
