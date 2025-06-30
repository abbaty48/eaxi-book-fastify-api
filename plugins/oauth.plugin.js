import fastifyOauth2 from "@fastify/oauth2";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (app) => {
  app.register(fastifyOauth2, {
    name: "EAXIBOOKSGMAILOAUTH2",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profle",
      "https://www.googleapis.com/auth/userinfo.name",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
    credentials: {
      client: {
        id: app.appConfig.GOOGLE_CLIENT_ID,
        secret: app.appConfig.GOOGLE_CLIENT_SECRET,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/customers/auth/gmail",
    callbackUri: "/customers/auth/gmail/callback",
  });
});
