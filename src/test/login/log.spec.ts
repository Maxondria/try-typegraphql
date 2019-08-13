import { gCall } from "../test-utils/gCall";
import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";

//import { correctRegistrationResponse } from "../register/test-data";
import {
  /*correctArgs*/ invalidArgs,
  LoginQuery,
  WrongEmailArgs
} from "./test-data";
import { User } from "../../entity/User";

describe("User Loggin / Sign In", () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach("Restore Functions", () => {
    sandbox.restore();
  });

  it("User Login Retuns NULL If Arguments Are Invalid", async () => {
    const response = await gCall({
      source: LoginQuery,
      variableValues: invalidArgs
    });

    expect(response.data!.login).to.equal(null);
  });

  it("User Can't Login With Non-existent Email", async () => {
    const LoginStunb = sandbox.stub();
    LoginStunb.returns(undefined);
    sandbox.replace(User, "findOne", LoginStunb);

    const response = await gCall({
      source: LoginQuery,
      variableValues: WrongEmailArgs
    });

    expect(response.data!.login).to.equal(null);
  });
});
