import { graphql, GraphQLSchema } from "graphql";
import { Options } from "../../types/schema-type";
import { createSchema } from "../../utils/createSchema";

import sinon from "sinon";

let schema: GraphQLSchema;

const fakeCallback = sinon.fake.returns(console.log("Fake Called Instead"));

export const gCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
          destroy: fakeCallback
        }
      },
      res: {
        clearCookie: fakeCallback
      }
    }
  });
};
