import createHashUtil from "@/utils/createHash";
import db from "@/utils/db";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const hashedPassword = createHashUtil(password);
  await db.admin.create({ data: { name: username, password: hashedPassword } });
  return new Response("Done");
}
