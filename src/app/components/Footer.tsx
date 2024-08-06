import Link from "next/link";
import Image from "next/image";
import React from "react";

import Github from "@/public/github.svg";
import Linkedin from "@/public/linkedin.svg";

const Footer = () => {
  return (
    <footer className="bg-slate-700 p-3 fixed bottom-0 w-full drop-shadow-xl z-10 ">
      <div className=" flex justify-center items-center flex-row">
        <Link href="https://github.com/abubakrsaddique">
          <Image src={Github} alt={""} className="h-[20px]  " />
        </Link>
        <Link href="https://www.linkedin.com/in/muhammad-abubakar-saddique-7a0688223">
          <Image src={Linkedin} alt={""} className="h-[20px] " />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
