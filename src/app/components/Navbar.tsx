import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-slate-700 p-4 sticky top-0 drop-shadow-xl z-10 ">
      <div className="mx-auto flex gap-4 flex-row">
        <Link href="/" className="text-white ">
          Home
        </Link>
        <Link href="/about" className="text-white ">
          About
        </Link>
        <Link href="/blog" className="text-white ">
          Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
