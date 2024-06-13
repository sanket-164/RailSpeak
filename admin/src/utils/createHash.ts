import crypto from "node:crypto";

export default function createHashUtil(str: string): string {
  return crypto
    .createHmac("sha256", process.env.HASHING_SECRET ?? "")
    .update(str)
    .digest("hex");
}
