import bcrypt from "bcrypt";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (app) => {
  app.decorate("utils", {
    /**/
    hashPassword: async (password) =>
      await bcrypt.hash(password, await bcrypt.genSalt()),
    /* */
    checkPassword: async (password, hash_password) =>
      await bcrypt.compare(password, hash_password),
    /** Regex for special characters in password, this ensure that the password contains at least
     *  special character, in addition to alphanumeric characters, and is between eight and sixteen characters long.
     */
    pwdRegex: "*([!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
  });
});
