"use client";

import React from "react";
import Search from "../Search";
import { usePathname } from "next/navigation";

function SectionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={`flex-1 min-w-0 overflow-x-hidden ${pathname.startsWith("/auth") ? "p-0" : "p-6"}  flex flex-col gap-6`}
    >
      {children}
    </div>
  );
}

export default SectionWrapper;
