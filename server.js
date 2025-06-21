import appPlugin from "./plugins/app.plugin.js";

const app = await appPlugin();
app.listen({ host: "0.0.0.0", port: app.appConfig.PORT }, () => {
  app.log.info(`Server listening on port ${app.appConfig.PORT}`);
});
