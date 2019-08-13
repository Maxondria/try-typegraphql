import { gCall } from "../test-utils/gCall";
import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";

import {
  registerMutation,
  correctRegistrationResponse,
  correctArgs,
  invalidArgs
} from "./test-data";
import { testConn } from "../test-utils/testConn";
import { RegisterResolver } from "../../modules/user/Register";
import { Connection } from "typeorm";

let conn: Connection;
before(async () => {
  conn = await testConn();
});
after(async () => {
  await conn.close();
});

describe("User Registration", () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach("Restore Functions", () => {
    sandbox.restore();
  });

  it("User Can Register", async () => {
    const registrationStub = sandbox.stub();
    registrationStub.returns(correctRegistrationResponse);
    sandbox.replace(RegisterResolver.prototype, "register", registrationStub);

    const response = await gCall({
      source: registerMutation,
      variableValues: correctArgs
    });

    expect(response).to.be.an("object");
    expect(response.data!.register).to.not.be.undefined;
    expect(response.data!.register).to.have.all.keys(
      "id",
      "name",
      "firstName",
      "lastName",
      "email"
    );
    expect(response.data!.register.name).eql("Bob Maxon");
  });

  it("Rejects Invalid Arguments", async () => {
    const response = await gCall({
      source: registerMutation,
      variableValues: invalidArgs
    });

    expect(response).to.be.an("object");
    expect(response.errors![0].message).to.equal("Argument Validation Error");
  });
});
