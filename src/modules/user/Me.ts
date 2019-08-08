import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { AppContext } from "../../types/app-context";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: AppContext): Promise<User | null> {
    const id = context.req.session!.userId;
    if (id) {
      const user = await User.findOne(id);
      if (!user) return null;
      else return user;
    }
    return null;
  }
}
