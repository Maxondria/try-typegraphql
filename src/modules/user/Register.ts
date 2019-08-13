import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

import { isAuth } from "../middleware/isAuthenticated";
import { Logger } from "../middleware/Logger";

import { sendEmail } from "../utils/sendMail";
import { UrlGenerator } from "../utils/confirmationUrl";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  @UseMiddleware(isAuth, Logger)
  hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    await sendEmail(email, await UrlGenerator(user.id));
    return user;
  }
}
