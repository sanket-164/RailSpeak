"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { SIDEBAR_ITEMS } from "@/utils/constants";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed top-2 left-2 bottom-2 h-full hidden md:block w-[300px] bg-gray-50 rounded-lg select-none">
      <div className="w-full flex items-center flex-col">
        <Image
          src="/logo.png"
          height={100}
          alt="Logo"
          className="pointer-events-none"
          width={200}
        />
        <div className="flex flex-col gap-5 w-full mt-4">
          {SIDEBAR_ITEMS.map((item, index) => (
            <Link
              href={item.href}
              key={item.title + index + "SIDEBAR_ITEMS"}
              className={twMerge(
                "flex rounded-lg text-white py-3 transition duration-300 hover:bg-purple-500 px-6 gap-x-6 shadow-lg mx-4",
                pathname === item.href ? "bg-purple-500" : "bg-purple-400"
              )}
            >
              <i>
                <item.icon />
              </i>
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
