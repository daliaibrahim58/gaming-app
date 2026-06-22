"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleFavorite } from "@/redux/slices/favoritesSlice";
import Image from "next/image";
import { Heart } from "lucide-react";

function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const isFavorite = (id: number) => favorites.some((item) => item.id === id);

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center text-white">
        <Heart className="inline-block w-5 h-5 text-red-500 mr-2" />
        No favorite games yet
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Favorites</h1>

      <div className="space-y-4">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/10 p-4 rounded-lg gap-4"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <Image
                src={item.cover}
                alt={item.title}
                width={60}
                height={60}
                className="rounded object-cover"
              />

              <h2 className="font-bold">{item.title}</h2>
            </div>

            {/* RIGHT */}
            <button
              onClick={() =>
                dispatch(
                  toggleFavorite({
                    id: item.id,
                    title: item.title,
                    cover: item.cover,
                  }),
                )
              }
              className="flex items-center gap-2"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite(item.id)
                    ? "text-red-500 fill-red-500"
                    : "text-white"
                }`}
              />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
