/* ts-check */
/* Define application general configurations */
import fastifyPlugin from "fastify-plugin";
import fastifyEnv from "@fastify/env";

export const fastifyConfig = {
  logger: true,
  removeAdditional: "all",
  ajv: { customOptions: { allErrors: true } },
};

export const configOptions = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV,
  ...process.env,
};

export default fastifyPlugin(async function (app, opts) {
  app.register(fastifyEnv, {
    confKey: "appConfig", // define appConfig global variable to access configuration.
    data: opts,
    schema: {
      type: "object",
      required: ["PORT"],
      properties: {
        NODE_ENV: { type: "string", default: "environment" },
        PORT: { type: "number", default: 4500 },
      },
    },
  });
});
