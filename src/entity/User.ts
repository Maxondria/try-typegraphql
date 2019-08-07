import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
/**
 * Fields that we can now query must bear a @Field decorator
 * @Field is what is read by TypeGraphQL
 * Note that for field types forexample number on 'id', we have to specify the type for TypeGraphQL eg ID
 * else TypeGraphQL tries to automatically pick the schema type and datatypes itself
 *
 * What is generated from this below is:
 * - Password is a database field, but not a GraphQL field
 * - Name is a GraphQL Field But Not A DATABASE FIELD!
 */

/*
 type User {
  id: ID!
  firstName: String!
  lastName: String!
  name: string!
  email: String!
}
 */

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  name: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;
}
