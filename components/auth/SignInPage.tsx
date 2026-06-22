"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/slices/authSlice";
import { AlertDemo } from "@/components/shared/AlertDemo";

export default function SignInPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    //  read directly (no useEffect, no state)
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userByEmail = users.find((u: any) => u.email === email);

    if (!userByEmail) {
      setAlert({
        status: "error",
        title: "Login Failed",
        desc: "User not found",
      });
      console.log(users)

      setTimeout(() => router.push("/auth/signUp"), 800);
      return;
    }

    if (userByEmail.password !== password) {
      setAlert({
        status: "error",
        title: "Invalid Password",
        desc: "Password is incorrect",
      });
      return;
    }

    const token = `token-${Date.now()}`;

    dispatch(login({ user: userByEmail, token }));

    localStorage.setItem("user", JSON.stringify(userByEmail));
    localStorage.setItem("token", token);

    setAlert({
      status: "success",
      title: "Login Success",
      desc: "Welcome back 🎉",
    });

    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
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
    </div>
  );
}