import { graphql, GraphQLSchema } from "graphql";
import { Options } from "../../types/schema-type";
import { createSchema } from "../../utils/createSchema";

import sinon, { SinonSandbox } from "sinon";

let schema: GraphQLSchema;

const sandbox: SinonSandbox = sinon.createSandbox();

const clearCookieStub = sandbox.stub().resolves();

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
          userId
        }
      },
      res: {
        clearCookie: clearCookieStub
      }
    }
  });
};
