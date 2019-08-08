import { Resolver, Arg, Mutation } from "type-graphql";

import { User } from "../../entity/User";
import { redis } from "../../redis";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userid = await redis.get(token);
    if (!userid) return false;
    await User.update({ id: Number(userid) }, { confirmed: true });
    redis.del(token);
    return true;
  }
}
