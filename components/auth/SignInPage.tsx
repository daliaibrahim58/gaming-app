/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/slices/authSlice";
import { AlertDemo } from "@/components/shared/AlertDemo";
import type { RootState } from "@/redux/store";

export default function SignInPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const users = useSelector((state: RootState) => state.auth.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const userByEmail = users.find((u) => u.email === email);

    // 1. User not found at all
    if (!userByEmail) {
      setAlert({
        status: "error",
        title: "Login Failed",
        desc: "User not found",
      });

      router.push("./signUp");
      return;
    }

    // 2. Email exists but password is wrong
    if (userByEmail.password !== password) {
      setAlert({
        status: "error",
        title: "Invalid Password",
        desc: "Password is incorrect",
      });
      return;
    }

    // 3. Success
    const token = `token-${Date.now()}`;

    dispatch(login({ user: userByEmail, token }));

    localStorage.setItem("user", JSON.stringify(userByEmail));
    localStorage.setItem("token", token);

    setAlert({
      status: "success",
      title: "Login",
      desc: "Welcome back 🎉",
    });

    setTimeout(() => router.push("/"), 800);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

      {alert && (
        <AlertDemo
          status={alert.status}
          title={alert.title}
          desc={alert.desc}
        />
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded bg-black/40 border"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-black/40 border"
        />

        <button className="p-3 bg-purple-500 text-white rounded">
          Sign In
        </button>
      </form>
    </>
  );
}
