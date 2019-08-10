import { Resolver, Mutation, Ctx } from "type-graphql";
import { AppContext } from "../../types/app-context";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() context: AppContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      context.req.session!.destroy(error => {
        console.log(error);
        reject(false);
      });
      context.res.clearCookie("qid");
      resolve(true);
    });
  }
}
