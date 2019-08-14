import { gCall } from "../test-utils/gCall";
import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";

import { confirmUserQuery, CorrectToken, WrongToken } from "./test-data";
import { redis } from "../../redis";
import { User } from "../../entity/User";

describe("User Email Confirmation", () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach("Restore Functions", () => {
    sandbox.restore();
  });

  it("User Confirmation Fails If Wrong Token Is Provided", async () => {
    const confirmationStunb = sandbox.stub().resolves(null);

    sandbox.replace(redis, "get", confirmationStunb);
    const response = await gCall({
      source: confirmUserQuery,
      variableValues: WrongToken
    });

    expect(response.data!.confirmUser).to.equal(false);
  });

  it("User Confirmation Succeeds If Correct Token Is Provided", async () => {
    const confirmationStunb = sandbox.stub().resolves(1);
    const forceToResolveStub = sandbox.stub().resolves();

    sandbox.replace(redis, "get", confirmationStunb);
    sandbox.replace(redis, "del", forceToResolveStub);
    sandbox.replace(User, "update", forceToResolveStub);
    const response = await gCall({
      source: confirmUserQuery,
      variableValues: CorrectToken
    });

    expect(response.data!.confirmUser).to.equal(true);
  });
});
