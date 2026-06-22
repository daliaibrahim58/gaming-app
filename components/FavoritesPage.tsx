"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleFavorite } from "@/redux/slices/favoritesSlice";
import Image from "next/image";

function FavoritesPage() {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(
    (state) => state.favorites.items,
  );

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center text-white">
        ❤️ No favorite games yet
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
            className="flex items-center justify-between bg-white/10 p-4 rounded-lg"
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
              className="text-red-500 hover:text-red-400"
            >
              Remove ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;