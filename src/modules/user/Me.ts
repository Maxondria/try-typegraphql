import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { AppContext } from "../../types/app-context";

@Resolver()
export class MeResolver {
  @Query(() => String, { nullable: true })
  async me(@Ctx() context: AppContext) {
    const id = context.req.session!.userId;
    if (id) {
      return await User.findOne(id);
    }
    return null;
  }
}