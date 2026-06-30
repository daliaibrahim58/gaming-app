/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppSelector } from "@/redux/hooks";

import DropMenu from "./DropMenu";

type Props = {
  item: any;
  collapsed?: boolean;
  setAlert: any;
  isSideOpen: boolean;
};

function NavLink({
  item,
  collapsed,
  setAlert,
  isSideOpen,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);

  const isActive =
    item.href === "/"
      ? pathname === "/"
      : item.href
      ? pathname.startsWith(item.href)
      : false;

  const common = `
    flex items-center gap-3 px-4 py-3 rounded-xl
    transition-all duration-300
    ${
      isActive && isSideOpen
        ? `bg-gradient-to-r ${item.gradient}`
        : "hover:bg-white/5"
    }
  `;

  const handleClick = () => {
    if (item.protected && !user) {
      setAlert({
        status: "error",
        title: "Access denied",
        desc: "Please login first",
      });

      setTimeout(() => setAlert(null), 1500);
      return;
    }

    if (item.href) router.push(item.href);
  };

  if (item.hasDropdown) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setOpen(!open)}
          className={common}
        >
          {item.icon}

          {!collapsed && <span>{item.name}</span>}

          {!collapsed && (
            <MdKeyboardArrowDown
              className={`ml-auto transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {!collapsed && open && <DropMenu />}
      </div>
    );
  }

  return (
    <button onClick={handleClick} className={common}>
      {item.icon}

      {!collapsed && <span>{item.name}</span>}
    </button>
  );
}

export default NavLink;
