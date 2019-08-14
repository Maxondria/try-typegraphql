import { gCall } from "../test-utils/gCall";
import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon";

import { meQuery, meInfo } from "./test-data";

import { User } from "../../entity/User";

describe("#Me Info", () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach("Restore Functions", () => {
    sandbox.restore();
  });

  it("Me Resolver Returns NULL  If User Is Not Logged In", async () => {
    const response = await gCall({
      source: meQuery,
      userId: undefined
    });

    expect(response.data!.me).to.equal(null);
  });

  it("Me Resolver Returns NULL If User ID Doesn't Exist", async () => {
    const MeStub = sandbox.stub().resolves(undefined);
    sandbox.replace(User, "findOne", MeStub);

    const response = await gCall({
      source: meQuery,
      userId: 1
    });

    expect(response.data!.me).to.equal(null);
  });

  it("Can Find And Return Logged In User Info", async () => {
    const MeStub = sandbox.stub().resolves(meInfo);

    sandbox.replace(User, "findOne", MeStub);

    const response = await gCall({
      source: meQuery,
      userId: 1
    });

    expect(response).to.be.an("object");
    expect(response.data!.me).to.not.be.undefined;
    expect(response.data!.me).to.have.all.keys(
      "id",
      "name",
      "firstName",
      "lastName",
      "email"
    );
    expect(response.data!.me.firstName).to.eql(meInfo.firstName);
  });
});
