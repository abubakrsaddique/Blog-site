"use client";

import { usePathname } from "next/navigation";

const useActiveLink = (href: string) => {
  const pathname = usePathname();
  return pathname === href ? "  text-xl font-bold text-white " : "text-white";
};

export default useActiveLink;
