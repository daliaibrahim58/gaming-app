"use client";

import SideBar from "@/components/nav/SideBar";
import SectionWrapper from "./SectionWrapper";

import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-1 w-screen max-w-full overflow-x-hidden">
      <SideBar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      <SectionWrapper>{children}</SectionWrapper>
    </div>
  );
}