import { graphql, GraphQLSchema } from "graphql";
import { Options } from "../../types/schema-type";
import { createSchema } from "../../utils/createSchema";

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues
  });
};
