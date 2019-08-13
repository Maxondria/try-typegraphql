import { gCall } from "../test-utils/gCall";
//import chai, { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";

import { registerMutation, correctRegistrationResponse } from "./test-data";
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

    const registrationStub = sandbox.stub();
    registrationStub.returns(correctRegistrationResponse);
    sandbox.replace(RegisterResolver.prototype, "register", registrationStub);
  });

  afterEach("Restore Functions", () => {
    sandbox.restore();
  });

  it("User Can Register", async () => {
    console.log(
      await gCall({
        source: registerMutation,
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
