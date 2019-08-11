import { gCall } from "../test-utils/gCall";
//import chai, { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";
import { RegisterResolver } from "src/modules/user/Register";

const REGISTER_MUTATION = `mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    firstName
    lastName
    email
    id
    name
  }
}`;

describe("User Registration", () => {
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();

    const fakeRegister = sinon.fake.returns({
      data: {
        id: 1,
        firstName: "bob",
        lastName: "bob2",
        email: "bob@bob.com",
        password: "asdfasdf"
      }
    });

    sandbox.replace(RegisterResolver.prototype, "register", fakeRegister);
  });

  afterEach("restore sandbox", () => {
    sandbox.restore();
  });

  it("User Can Register", async () => {
    console.log(
      await gCall({
        source: REGISTER_MUTATION,
        variableValues: {
          data: {
            firstName: "bob",
            lastName: "bob2",
            email: "bob@bob.com",
            password: "asdfasdf"
          }
        }
      })
    );
  });
});
