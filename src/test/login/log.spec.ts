import { gCall } from "../test-utils/gCall";
import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";

import {
  invalidArgs,
  LoginQuery,
  WrongEmailArgs,
  WrongPasswordArgs,
  LoginCorrectResponse,
  correctArgs
} from "./test-data";

import { User } from "../../entity/User";

describe("#User Loggin", () => {
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
    const LoginStunb = sandbox.stub().returns(undefined);

    sandbox.replace(User, "findOne", LoginStunb);

    const response = await gCall({
      source: LoginQuery,
      variableValues: WrongEmailArgs
    });

    expect(response.data!.login).to.equal(null);
  });

  it("User Can't Login With Wrong Password", async () => {
    const LoginStunb = sandbox.stub().resolves({
      password: "$2b$12$etMB.V9JrtQYS/EjSES3WOUaKPujRT0TXXIFB6w.Z/vtLmlbx1.l."
    });

    sandbox.replace(User, "findOne", LoginStunb);

    const response = await gCall({
      source: LoginQuery,
      variableValues: WrongPasswordArgs
    });

    expect(response.data!.login).to.equal(null);
  });

  it("User Can't Login With Without Confirming Their Email", async () => {
    const LoginStunb = sandbox.stub().resolves(LoginCorrectResponse);

    sandbox.replace(User, "findOne", LoginStunb);

    const response = await gCall({
      source: LoginQuery,
      variableValues: correctArgs
    });

    expect(response.data!.login).to.equal(null);
  });

  it("User Can Login", async () => {
    LoginCorrectResponse.confirmed = true;
    const LoginStunb = sandbox.stub().resolves(LoginCorrectResponse);

    sandbox.replace(User, "findOne", LoginStunb);

    const response = await gCall({
      source: LoginQuery,
      variableValues: correctArgs,
      userId: 1
    });

    expect(response).to.be.an("object");
    expect(response.data!.login).to.not.be.undefined;
    expect(response.data!.login).to.have.all.keys(
      "id",
      "name",
      "firstName",
      "lastName",
      "email"
    );
    expect(response.data!.login.name).to.eql("bob bob2");
  });
});
