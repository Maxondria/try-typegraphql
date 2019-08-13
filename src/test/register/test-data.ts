export const registerMutation = `
    mutation Register($data: RegisterInput!) {
      register(
        data: $data
      ) {
        id
        firstName
        lastName
        email
        name
      }
}
`;
export const correctArgs = {
  data: {
    firstName: "bob",
    lastName: "bob2",
    email: "bob@bob.com",
    password: "asdfasdf"
  }
};

export const invalidArgs = {
  data: {
    firstName: "bob",
    lastName: "bob2",
    email: "bob@bob",
    password: "asdfasdf"
  }
};

export const correctRegistrationResponse = {
  id: "1",
  name: "Bob Maxon",
  firstName: "bob",
  lastName: "bob2",
  email: "bob@bob.com"
};
