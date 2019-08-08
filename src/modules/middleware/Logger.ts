import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../../types/app-context";

export const Logger: MiddlewareFn<AppContext> = async ({ context }, next) => {
  console.log(`${context.req.url} - ${context.req.method}`);
  return next();
};
