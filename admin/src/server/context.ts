import verifyToken from "@/utils/verifyToken";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export default async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  let adminFlg = await verifyToken();
  return {
    req,
    resHeaders,
    isAdmin: adminFlg,
  };
}
