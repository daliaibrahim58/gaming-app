"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import SideBar from "@/components/nav/SideBar";
import SectionWrapper from "./SectionWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const hideSidebar = pathname.startsWith("/auth");

  return (
    <div className="flex flex-1 w-screen max-w-full overflow-x-hidden">
      {!hideSidebar && (
        <SideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />
      )}

      <SectionWrapper>{children}</SectionWrapper>
    </div>
  );
}
