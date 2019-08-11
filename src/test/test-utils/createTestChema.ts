import { buildSchema } from "type-graphql";

export const testSchema = async () => {
  return await buildSchema({
    resolvers: [__dirname + "/../../modules/**/*.ts"]
  });
};
