import fastifyPostgres from "@fastify/postgres";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (app) => {
  app.log.info(`Connecting to database...`);
  await app.register(fastifyPostgres, {
    connectionString: "postgres://postgres@localhost/pg_eaxibooks",
  });
  app.log.info(`Connection to database established.`);
});
