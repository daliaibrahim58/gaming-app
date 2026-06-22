"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import Logo from "../defaults/Logo";
import { useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";

function NavBar() {
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-white/10 bg-linear-to-r from-[#1B0B2E] via-[#24104A] to-[#12081F] px-4 text-white md:px-8">
      {/* LOGO */}
      <Logo />

      {/* RIGHT SIDE */}
      <nav className="flex items-center gap-3 text-sm md:gap-6 md:text-base">
        {!isAuthenticated || !user ? (
          <>
            <Link
              href="/auth/signIn"
              className="transition hover:text-purple-300"
            >
              Sign In
            </Link>

            <Link
              href="/auth/signUp"
              className="rounded-xl bg-linear-to-r from-[#6D5BFF] to-[#8A2BE2] px-3 py-1.5 transition hover:opacity-90 md:px-4 md:py-2"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {/* USER NAME */}
            <span className="text-sm text-white/80">
              {user.firstName} {user.lastName}
            </span>

            {/* LOGOUT */}
            <button
              onClick={() => dispatch(logout())}
              className="rounded-xl bg-red-500/20 px-3 py-1.5 text-red-300 transition hover:bg-red-500/30"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar;