import { v4 } from "uuid";
import { redis } from "../../redis";

export const createConfirmationUrl = async (
  userid: number
): Promise<string> => {
  const token = v4();
  redis.set(token, userid, "ex", 60 * 60 * 24);
  return `http://localhost:4000/user/confirm${token}`;
};
