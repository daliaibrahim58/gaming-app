/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { AlertDemo } from "@/components/shared/AlertDemo";
import type { RootState } from "@/redux/store";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const users = useSelector((state: RootState) => state.auth.users);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState<any>(null);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const exists = users.find((u) => u.email === email);

    if (exists) {
      setAlert({
        status: "error",
        title: "Sign Up",
        desc: "Email already exists",
      });
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup({ user: newUser, token: "fake-token" }));

    setAlert({
      status: "success",
      title: "Sign Up",
      desc: "Account created successfully",
    });

    setTimeout(() => router.push("/auth/signIn"), 1000);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

      {alert && (
        <AlertDemo
          status={alert.status}
          title={alert.title}
          desc={alert.desc}
        />
      )}

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input placeholder="First Name" value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-3 rounded bg-black/40 border" />

        <input placeholder="Last Name" value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="p-3 rounded bg-black/40 border" />

        <input placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded bg-black/40 border" />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-black/40 border" />

        <button className="p-3 bg-blue-500 text-white rounded">
          Sign Up
        </button>
      </form>
    </>
  );
}