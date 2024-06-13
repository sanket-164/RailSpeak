import { redirect } from "next/navigation";
import verifyToken from "./verifyToken";

export default async function verifyAction() {
  const flag = await verifyToken();
  if (!flag) return redirect("/");
}
