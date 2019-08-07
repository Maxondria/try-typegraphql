import { Resolver, Query, Mutation, ArgsType, Field, Args } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../../entity/User";

@ArgsType()
class registerArgs {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(@Args()
  {
    firstName,
    lastName,
    email,
    password
  }: registerArgs): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
