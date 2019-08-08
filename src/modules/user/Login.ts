import { Resolver, Query, Arg, Ctx } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../../entity/User";
import { AppContext } from "../../types/app-context";

@Resolver()
export class LoginResolver {
  @Query(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: AppContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      if (!user.confirmed) {
        return null;
      } else {
        context.req.session!.userId = user.id;
        return user;
      }
    } else {
      return null;
    }
  }
}
