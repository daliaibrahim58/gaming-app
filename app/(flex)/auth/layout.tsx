"use client";

import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">

      {/* BG */}
      <Image
        src="/images/games/bg.jpg"
        alt="bg"
        fill
        className="object-cover -z-10"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* form box */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        {children}
      </div>
    </div>
  );
}