import { gCall } from "../test-utils/gCall";
import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";
import nodemailer from "nodemailer";

import { forgotPasswordQuery, correctEmail, invalidEmail } from "./test-data";

import { User } from "../../entity/User";
import { meInfo } from "../me/test-data";
import { redis } from "../../redis";

describe("#User Forgot Password Email", () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach("Restore Functions", () => {
    sandbox.restore();
  });

  it("Reset Email Isn't Sent To A Non-existent Email", async () => {
    const LoginStunb = sandbox.stub().returns(undefined);

    sandbox.replace(User, "findOne", LoginStunb);

    const response = await gCall({
      source: forgotPasswordQuery,
      variableValues: invalidEmail
    });

    expect(response.data!.forgotPassword).to.eql(false);
  });

  it("Password Reset Email Is Sent Successfully", async () => {
    const successfulUserStub = sandbox.stub().returns(meInfo);

    const redisStub = sandbox.stub().resolves();

    const nodemailerTestAccStub = sandbox
      .stub()
      .resolves({ user: meInfo.email, pass: meInfo.password });

    const nodemailerTransStub = sandbox.stub().returns({
      sendMail: () => {
        return Promise.resolve({
          messageId: "Rest Email Test Message Sent!"
        });
      }
    });

    const nodemailerTestUrlStub = sandbox
      .stub()
      .returns("Some Random Email Reset Test URL");

    sandbox.replace(redis, "set", redisStub);
    sandbox.replace(User, "findOne", successfulUserStub);
    sandbox.replace(nodemailer, "createTransport", nodemailerTransStub);
    sandbox.replace(nodemailer, "createTestAccount", nodemailerTestAccStub);
    sandbox.replace(nodemailer, "getTestMessageUrl", nodemailerTestUrlStub);

    const response = await gCall({
      source: forgotPasswordQuery,
      variableValues: correctEmail
    });
    expect(response.data!.forgotPassword).to.eql(true);
  });
});
