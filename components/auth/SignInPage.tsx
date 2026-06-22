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

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      setAlert({
        status: "error",
        title: "Login Failed",
        desc: "Invalid email or password",
      });
      return;
    }

    const token = `token-${Date.now()}`;

    dispatch(login({ user: found, token }));

    localStorage.setItem("user", JSON.stringify(found));
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