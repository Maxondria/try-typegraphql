import { gCall } from "../test-utils/gCall";
import { expect } from "chai";

describe("#Logging Out", () => {
  it("User Logs Out Successfully", async () => {
    const LogOUtQuery = `mutation {
        logout
      }`;
    const response = await gCall({
      source: LogOUtQuery
    });

    expect(response.data!.logout).to.equal(true);
  });
});
