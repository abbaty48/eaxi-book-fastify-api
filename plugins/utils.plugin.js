import bcrypt from "bcrypt";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (app) => {
  /* */
  app
    .decorate("utils", {
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
    })
    .decorate("schemas", {
      idSchema: {
        type: "object",
        params: {
          type: "object",
          properties: {
            id: { type: "string", maxLength: 40 },
          },
        },
      },
      getSchema(
        { page, limit, sort, order_by } = {
          page: 0,
          limit: 10,
          sort: "asc",
          order_by: "created_at",
        },
      ) {
        return {
          type: "object",
          query: {
            type: "object",
            properties: {
              q: { type: "string" },
              page: { type: "number", default: page || 0 },
              limit: { type: "number", default: limit || 10 },
              order_by: { type: "string", default: order_by || "created_at" },
              sort: {
                type: "string",
                enum: ["asc", "desc"],
                default: sort || "asc",
              },
            },
          },
        };
      },
      putSchema(payload) {
        return {
          ...this.idSchema,
          ...payload,
        };
      },
    });
});
