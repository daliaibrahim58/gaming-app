/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { IoMdSearch } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetProductsQuery } from "@/redux/api/productsApi";

export default function Search({ searchWord }: { searchWord?: string }) {
  const [query, setQuery] = useState<string>(searchWord ?? "");
  const router = useRouter();

  // API
  const { data: apiGames = [] } = useGetProductsQuery(query ? query : undefined);

  return (
    <div className="relative w-full max-w-md overflow-visible">
      {/* INPUT */}
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games..."
          className="w-full pl-10 pr-10 py-2 rounded-xl bg-black/55 text-white"
        />

        <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />

        {query && (
          <FaXmark
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
          />
        )}
      </div>

      {/* DROPDOWN (FIXED OVERLAY) */}
      {query && (
        <div className="absolute left-0 top-full mt-2 w-full z-50">
          <ScrollArea className="max-h-60 overflow-y-auto rounded-xl border bg-black/90">
            <div className="p-2">
              {apiGames.length > 0 ? (
                apiGames.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      router.push(`/games/${item.id}`);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-white/10 cursor-pointer rounded-md"
                  >
                    <Image
                      src={item.cover}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <span className="text-white text-sm">{item.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-white text-sm p-3">No results found</p>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}