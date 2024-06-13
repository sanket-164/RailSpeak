// verify jwt token and return boolean flag

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export default async function verifyToken(): Promise<boolean> {
  try {
    const token = cookies().get("token")?.value ?? "";
    jwt.verify(token, process.env.JWT_SECRET ?? "");
    return true;
  } catch (error: any) {
    console.log("Token verification failed: ", error.message);
    return false;
  }
}
