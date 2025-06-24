import fastify from "fastify";
import utilsPlugin from "./utils.plugin.js";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import appRoutes from "../routes/app.route.js";
import datasourcePlugin from "./datasources/datasource.plugin.js";
import config, { fastifyConfig, configOptions } from "./config.plugin.js";

export default async function () {
  const app = fastify(fastifyConfig);

  await app.register(config, configOptions);
  await app.register(fastifyCors, { origin: "*" }); // change this to refer to the website url only
  await app.register(fastifyHelmet, { global: true });
  await app.register(datasourcePlugin);
  await app.register(utilsPlugin);
  await app.register(appRoutes, { prefix: "/api" });
  return app;
}
