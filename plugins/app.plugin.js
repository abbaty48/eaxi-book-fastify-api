import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import utilsPlugin from "./utils.plugin.js";
import oauthPlugin from "./oauth.plugin.js";
import fastifyHelmet from "@fastify/helmet";
import appRoutes from "../routes/app.route.js";
import datasourcePlugin from "./datasources/datasource.plugin.js";
import config, { fastifyConfig, configOptions } from "./config.plugin.js";
import metricPlugin from "./metric.plugin.js";

export default async function () {
  const app = fastify(fastifyConfig);

  await app
    .register(config, configOptions)
    .register(fastifyCors, { origin: "*" }) // change this to refer to the website url only
    .register(fastifyHelmet, { global: true })
    .register(datasourcePlugin)
    .register(oauthPlugin)
    .register(utilsPlugin)
    .register(metricPlugin)
    .register(appRoutes, { prefix: "/api" });
  return app;
}
