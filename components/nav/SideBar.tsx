/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MdDashboard, MdGames } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { BiCartAdd } from "react-icons/bi";

import NavLink from "./NavLink";
import { AlertDemo } from "@/components/shared/AlertDemo";

const NAV_LINKS = [
  {
    name: "Home",
    href: "/",
    icon: <GoHomeFill />,
    gradient: "from-[#6D5BFF] to-[#8A2BE2]",
  },
  {
    name: "Category",
    icon: <MdDashboard />,
    gradient: "from-[#8A2BE2] to-[#C084FC]",
    hasDropdown: true,
  },
  {
    name: "Games",
    href: "/games",
    icon: <MdGames />,
    gradient: "from-[#3B82F6] to-[#00C6FF]",
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: <FaHeart />,
    gradient: "from-[#EC4899] to-[#FB7185]",
    protected: true,
  },
  {
    name: "Cart",
    href: "/cart",
    icon: <BiCartAdd />,
    gradient: "from-[#F97316] to-[#F43F5E]",
    protected: true,
  },
];

function SideBar({ isOpen, onToggle }: any) {
  const [alert, setAlert] = useState<null | {
    status: "success" | "error";
    title: string;
    desc: string;
  }>(null);

  return (
    <>
     <aside
  className={`fixed top-0 left-0 z-50 h-screen border-r border-white/10 bg-linear-to-b from-[#1B0B2E] via-[#24104A] to-[#12081F] flex flex-col transition-all duration-300 ${
    isOpen ? "w-64" : "w-0"
  }`}
>
        {/* TOGGLE */}
        <button
          onClick={onToggle}
          className="m-3 flex h-10 w-10 items-center justify-center rounded-lg text-white/80 hover:bg-white/10"
        >
          <VscThreeBars />
        </button>

        {/* NAV */}
        <nav className="flex flex-col gap-2 px-3">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              collapsed={!isOpen}
              setAlert={setAlert}
            />
          ))}
        </nav>
      </aside>

      {/* GLOBAL ALERT (OUTSIDE SIDEBAR) */}
      {alert && <AlertDemo {...alert} />}
    </>
  );
}

export default SideBar;
