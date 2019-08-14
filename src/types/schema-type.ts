import Maybe from "graphql/tsutils/Maybe";

export interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}
