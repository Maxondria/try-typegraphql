import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { User } from "../../entity/User";

import bcrypt from "bcrypt";
import { redis } from "../../redis";
import { ChangePasswordInput } from "./changepassword/changePasswordInput";
import { AppContext } from "../../types/app-context";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { newpassword, token }: ChangePasswordInput,
    @Ctx() context: AppContext
  ): Promise<User | null> {
    const userid = await redis.get(token);
    if (!userid) return null;
    const user = await User.findOne(Number(userid));
    if (!user) return null;
    const hashedPassword = await bcrypt.hash(newpassword, 12);
    await User.update({ id: Number(userid) }, { password: hashedPassword });
    redis.del(token);
    //Log the user in
    context.req.session!.userId = user.id;
    return user;
  }
}
