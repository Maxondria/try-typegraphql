import faker from "faker";

export const meQuery = `{
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`;

export const meInfo = {
  id: 1,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};
