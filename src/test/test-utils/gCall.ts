import { graphql, GraphQLSchema } from "graphql";
import { testSchema } from "./createTestChema";
import Maybe from "graphql/tsutils/Maybe";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await testSchema();
  }

  return graphql({
    schema,
    source,
    variableValues
  });
};
