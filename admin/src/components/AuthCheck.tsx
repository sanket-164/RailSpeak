import { redirect } from "next/navigation";

import verifyToken from "@/utils/verifyToken";

type Props = {
  children: React.ReactNode;
};

const AuthCheck = async ({ children }: Props) => {
  const flag = await verifyToken();
  if (!flag) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default AuthCheck;
