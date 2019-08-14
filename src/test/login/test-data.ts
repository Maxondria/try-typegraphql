export const LoginQuery = `
query Login($email: String!, $password: String! ) {
    login (email: $email, password:  $password) {
      id
      name
      firstName
      lastName
      email
    }
  }
`;

export const WrongEmailArgs = {
  email: "mail@not.exist",
  password: "asdfasdf"
};

export const WrongPasswordArgs = {
  email: "mail@not.exist",
  password: "wrongPassword"
};

export const correctArgs = {
  email: "bob@bob.com",
  password: "correctpassword"
};

export const invalidArgs = {
  email: "bob@bob",
  password: "asdfasdf"
};

export const LoginCorrectResponse = {
  id: "1",
  firstName: "bob",
  lastName: "bob2",
  confirmed: false,
  email: "bob@bob.com",
  password: "$2b$12$AEC7rrmkrHsJjNeq3m9zuOVpwW.TyAzNgI5NJwg.jftT5rRt/Tuqa"
};
