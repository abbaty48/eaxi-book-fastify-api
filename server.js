import { fastify } from "fastify";

const app = fastify({
  logger: true,
  ajv: { customOptions: { allErrors: true } },
});
app.listen({ host: "0.0.0.0", port: 3000 }, () => {
  app.log.info(`Server listening on port 3000`);
});
