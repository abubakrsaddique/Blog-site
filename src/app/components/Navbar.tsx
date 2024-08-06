"use client";

import React from "react";
import Link from "next/link";
import useActiveLink from "@/src/app/hook/useActiveLink";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-700 p-4 sticky top-0 drop-shadow-xl z-10 ">
      <div className="mx-auto flex gap-4 flex-row">
        <Link href="/" className={useActiveLink("/")}>
          Home
        </Link>
        <Link href="/about" className={useActiveLink("/about")}>
          About
        </Link>
        <Link href="/blog" className={useActiveLink("/blog")}>
          Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
