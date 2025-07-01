import fastifyPlugin from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";
import authorDatasource from "./author.datasource.js";
import adminDatasource from "./admin.datasource.plugin.js";
import categoryDatasource from "./category.datasource.plugin.js";
import customerDatasource from "./customer.datasource.plugin.js";

export default fastifyPlugin(async (app) => {
  app.log.info(`Connecting to database...`);
  await app.register(fastifyPostgres, {
    connectionString: "postgres://USER:PASSWORD@localhost/pg_eaxibooks",
  });
  app.decorate("source", {
    ...adminDatasource(app),
    ...authorDatasource(app),
    ...customerDatasource(app),
    ...categoryDatasource(app),
  });
});
