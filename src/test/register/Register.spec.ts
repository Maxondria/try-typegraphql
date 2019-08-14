import { gCall } from "../test-utils/gCall";
import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";
import nodemailer from "nodemailer";

import {
  registerMutation,
  correctRegistrationResponse,
  correctArgs,
  invalidArgs
} from "./test-data";
import { testConn } from "../test-utils/testConn";
import { Connection } from "typeorm";
import { User } from "../../entity/User";

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
    const registrationStub = sandbox
      .stub()
      .returns(correctRegistrationResponse);

    const nodemailerTestAccStub = sandbox
      .stub()
      .resolves({ user: "test@test.com", pass: "test" });

    const nodemailerTransStub = sandbox.stub().returns({
      sendMail: () => {
        return Promise.resolve({
          messageId: "Test Message Sent!"
        });
      }
    });

    const nodemailerTestUrlStub = sandbox
      .stub()
      .returns("Some Random Test URL");

    sandbox.replace(User, "create", registrationStub);
    sandbox.replace(nodemailer, "createTransport", nodemailerTransStub);
    sandbox.replace(nodemailer, "createTestAccount", nodemailerTestAccStub);
    sandbox.replace(nodemailer, "getTestMessageUrl", nodemailerTestUrlStub);

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
    expect(response.data!.register.name).to.eql("bob bob2");
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
