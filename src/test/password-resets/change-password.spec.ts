import { gCall } from "../test-utils/gCall";
import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";

import {
  ChangePassQuery,
  correctChangePasswordArgs,
  wrongChangePasswordArgs
} from "./test-data";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { meInfo } from "../me/test-data";

describe("#User Set New Password", () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach("Restore Functions", () => {
    sandbox.restore();
  });

  it("Invalid Arguments Fail Validation Tests", async () => {
    const response = await gCall({
      source: ChangePassQuery,
      variableValues: wrongChangePasswordArgs
    });

    expect(response).to.be.an("object");
    expect(response.errors![0].message).to.equal("Argument Validation Error");
  });

  it("Returns NULL for fake token", async () => {
    const redisStunb = sandbox.stub().resolves(null);

    sandbox.replace(redis, "get", redisStunb);
    const response = await gCall({
      source: ChangePassQuery,
      variableValues: correctChangePasswordArgs
    });

    expect(response.data!.changePassword).to.equal(null);
  });

  it("Returns NULL for if User ID Is Not Valid", async () => {
    const redisStunb = sandbox.stub().resolves(1);
    const noUserStub = sandbox.stub().resolves(undefined);

    sandbox.replace(redis, "get", redisStunb);
    sandbox.replace(User, "findOne", noUserStub);

    const response = await gCall({
      source: ChangePassQuery,
      variableValues: correctChangePasswordArgs
    });

    expect(response.data!.changePassword).to.equal(null);
  });

  it("Returns NULL for if User ID Is Not Valid", async () => {
    const redisStunb = sandbox.stub().resolves(1);
    const UserFoundStub = sandbox.stub().resolves(meInfo);
    const ForceResolveStub = sandbox.stub().resolves();

    sandbox.replace(redis, "get", redisStunb);
    sandbox.replace(User, "findOne", UserFoundStub);
    sandbox.replace(User, "update", ForceResolveStub);
    sandbox.replace(redis, "del", ForceResolveStub);

    const response = await gCall({
      source: ChangePassQuery,
      variableValues: correctChangePasswordArgs
    });

    expect(response).to.be.an("object");
    expect(response.data!.changePassword).to.not.be.undefined;
    expect(response.data!.changePassword).to.have.all.keys(
      "id",
      "name",
      "firstName",
      "lastName",
      "email"
    );
    expect(response.data!.changePassword.firstName).to.eql(meInfo.firstName);
  });
});
