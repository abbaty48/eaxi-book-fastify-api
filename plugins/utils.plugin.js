import bcrypt from "bcrypt";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (app) => {
  app.decorate("utils", {
    /**/
    hashPassword: async (password) =>
      await bcrypt.hash(password, await bcrypt.genSalt()),
  });
});
