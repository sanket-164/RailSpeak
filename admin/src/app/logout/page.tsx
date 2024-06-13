"use client";

import deleteCookie from "@/actions/deleteCookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  document.cookie = "";
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await deleteCookie();
    })();
    router.push("/");
  }, [router]);
  return null;
};

export default Logout;
