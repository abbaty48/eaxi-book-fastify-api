/* ts-check */
/* Define application general configurations */
import fastifyPlugin from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { config } from "dotenv";

export const fastifyConfig = {
  logger: true,
  bodyLimit: 1048576,
  caseSensitive: false,
  removeAdditional: "all",
  ignoreTrailingSlash: true,
  ajv: { customOptions: { allErrors: true }, coerceTypes: false },
};

export const configOptions = {
  PORT: process.env.PORT || 4500,
  NODE_ENV: process.env.NODE_ENV,
  ...process.env,
};

export default fastifyPlugin(async function (app, opts) {
  app.register(fastifyEnv, {
    confKey: "appConfig", // define appConfig global variable to access configuration.
    data: opts,
    schema: {
      type: "object",
      required: ["GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_ID"],
      properties: {
        NODE_ENV: { type: "string", default: "environment" },
        GOOGLE_CLIENT_SECRET: { type: "string" },
        GOOGLE_CLIENT_ID: { type: "string" },
        PORT: { type: "number", default: 4500 },
      },
    },
  });
});
