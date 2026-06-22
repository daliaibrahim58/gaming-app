"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";

import { useGetProductsQuery } from "@/redux/api/productsApi";

type Game = {
  id: number;
  title: string;
  genre: string;
};

function DropMenu() {
  const router = useRouter();

  const { data: games = [] } = useGetProductsQuery(undefined);

  const categories = useMemo(
    () => [...new Set(games.map((game: Game) => game.genre))].sort(),
    [games]
  );

  return (
    <div
      className="
         mt-2
        overflow-hidden rounded-2xl
        border border-white/10
        bg-[#1B0B2E]/95
        shadow-[0_12px_40px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
      "
    >
      

      <ul className="p-2">
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/games?genre=${encodeURIComponent(category)}`
                )
              }
              className="
                group flex w-full items-center justify-between
                rounded-xl px-3 py-2.5
                text-sm text-white/80
                transition-all duration-200
                hover:bg-white/10 hover:text-white
              "
            >
              <span>{category}</span>

              <MdChevronRight
                className="
                  h-4 w-4 opacity-0
                  transition-all duration-200
                  group-hover:translate-x-1
                  group-hover:opacity-100
                "
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropMenu;