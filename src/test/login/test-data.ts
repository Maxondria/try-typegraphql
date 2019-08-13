export const LoginQuery = `
query Login($email: String!, $password: String! ) {
    login (email: $email, password:  $password) {
      id
      name
      firstName
      lastName
    }
  }
`;
export const WrongEmailArgs = {
  email: "mail@not.exist",
  password: "asdfasdf"
};

export const correctArgs = {
  email: "mail@not.exist",
  password: "asdfasdf"
};

export const invalidArgs = {
  email: "bob@bob",
  password: "asdfasdf"
};
