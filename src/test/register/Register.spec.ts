import { gCall } from "../test-utils/gCall";
//import chai, { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";

import {
  //correctArgs,
  //correctRegistrationResponse,
  //invalidArgs,
  registerMutation
} from "./test-data";
import { RegisterResolver } from "../../modules/user/Register";

describe("User Registration", () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    const registrationStub = sandbox.stub();
    registrationStub.returns("Max I am Getting Called");

    // registrationStub
    //   .withArgs({
    //     firstName: "bob",
    //     lastName: "bob2",
    //     email: "bob@bob.com",
    //     password: "asdfasdf"
    //   })
    //   .returns(correctRegistrationResponse);

    // registrationStub
    //   .withArgs({
    //     firstName: "",
    //     lastName: "bob2",
    //     email: "bob@bob",
    //     password: "asdfasdf"
    //   })
    //   .throws("Argument Validation Error");

    sandbox.replace(RegisterResolver.prototype, "register", registrationStub);
  });

  afterEach("restore sandbox", () => {
    sandbox.restore();
  });

  it("User Can Register", async function() {
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            password: "xxx-xxx",
            firstName: "Tayebwa",
            lastName: "Maxon",
            email: "max@max44.com"
          }
        }
      })
    );
  });
});
