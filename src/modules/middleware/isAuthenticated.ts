import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../../types/app-context";

export const isAuth: MiddlewareFn<AppContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("Not Authenticated!");
  }
  return next();
};
