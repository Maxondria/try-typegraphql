import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExists";
import { PasswordInput } from '../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 30, { message: "First name not provided" })
  firstName: string;

  @Field()
  @Length(1, 30, { message: "Last name not provided" })
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "User already exists" })
  email: string;
}
