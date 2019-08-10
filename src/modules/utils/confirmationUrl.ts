import { redis } from "../../redis";
import { v4 } from "uuid";
import {
  forgotPasswordPrefix,
  confirmUserPrefix
} from "../constants/redisConstants";

async function getLink(userid: number, prefix: string): Promise<string> {
  const token: string = `${prefix}${v4()}`;
  await redis.set(`${token}`, userid, "ex", 60 * 60 * 24);
  return `http://localhost:4000/user/${prefix}/${token}`;
}

export const UrlGenerator = async (
  userid: number,
  mailType?: string
): Promise<string> => {
  return mailType
    ? await getLink(userid, forgotPasswordPrefix)
    : await getLink(userid, confirmUserPrefix);
};
