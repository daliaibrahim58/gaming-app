import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="text-xl font-bold">
      <span className="bg-linear-to-r from-[#552077] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-extrabold tracking-wide">
        GamingApp
      </span>
    </Link>
  );
}

export default Logo;