import { Resolver, Query } from "type-graphql";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }
}
