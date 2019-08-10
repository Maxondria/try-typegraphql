import { Resolver, Arg, Mutation } from "type-graphql";

import { User } from "../../entity/User";
import { sendEmail } from "../utils/sendMail";
import { UrlGenerator } from "../utils/confirmationUrl";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;
    await sendEmail(email, await UrlGenerator(user.id, "forgotpassword"));
    return true;
  }
}
