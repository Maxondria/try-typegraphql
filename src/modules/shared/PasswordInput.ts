import { MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class PasswordInput {
  @Field()
  @MinLength(5, { message: "Password Must Be Atleast 5 Character Long" })
  password: string;
}
