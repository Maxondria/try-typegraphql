export const registerMutation = `
    mutation Register(
     $data: RegisterInput!
      ) { 
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
  firstName: "bob",
  lastName: "bob2",
  email: "bob@bob.com",
  password: "asdfasdf"
};

export const invalidArgs = {
  firstName: "",
  lastName: "bob2",
  email: "bob@bob",
  password: "asdfasdf"
};

export const correctRegistrationResponse = {
  data: {
    register: {
      id: "2",
      name: "Tayebwa Maxon",
      firstName: "Tayebwa",
      lastName: "Maxon",
      email: "max@max44.com"
    }
  }
};
