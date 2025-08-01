import Fastify from "fastify";
import metrics from "fastify-metrics";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (fastify, opts) => {
  await fastify.register(metrics, {
    endpoint: null,
    name: "metrics",
    routeMetrics: { enabled: true },
    defaultMetrics: { enabled: true },
  });
  const promServer = Fastify({ logger: true });
  promServer.get("/metrics", { logLevel: "info" }, async (request, reply) => {
    reply.type("text/plain");
    return fastify.metrics.client.register.metrics();
  });

  fastify.addHook("onClose", async () => {
    await promServer.close();
  });

  promServer.listen({ port: 9001, host: "0.0.0.0" });
});
