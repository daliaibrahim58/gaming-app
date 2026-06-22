"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { useGetProductsQuery } from "@/redux/api/productsApi";
import { Input } from "./ui/input";
import { IoMdSearch } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

function GamesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const genre = searchParams.get("genre"); // THIS IS THE KEY

  const [query, setQuery] = useState("");

  const {
    data: games = [],
    isLoading,
    isError,
  } = useGetProductsQuery(undefined);

  if (isLoading) return <div className="p-6 text-white">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error</div>;

  // 1️- filter by category (from URL)
  const genreFiltered = genre
    ? games.filter((g) => g.genre.toLowerCase() === genre.toLowerCase())
    : games;

  // 2️- filter by search input
  const filteredGames = genreFiltered.filter((game) =>
    game.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-6 text-white">
      {/* SEARCH */}
      <div className="relative w-full md:w-1/3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games..."
          className="w-full rounded-xl bg-black/55 py-2 pl-10 pr-10 text-white"
        />

        <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />

        {query && (
          <FaXmark
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold">
        {genre ? `${genre} Games` : "All Games"}
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => router.push(`/games/${game.id}`)}
            className="cursor-pointer overflow-hidden rounded-lg bg-white/10 transition hover:scale-105"
          >
            <Image
              src={game.cover}
              alt={game.title}
              width={300}
              height={200}
              className="h-20 md:h-40 w-full object-cover"
            />

            <div className="p-3">
              <h2 className="text-sm font-bold">{game.title}</h2>
              <p className="text-xs text-white/70">{game.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
