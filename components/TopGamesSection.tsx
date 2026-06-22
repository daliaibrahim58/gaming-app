"use client";

import { useGetProductsQuery } from "@/redux/api/productsApi";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function TopGamesSection() {
  const { data, isLoading } = useGetProductsQuery("");
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;

  const topGames = [...(data || [])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="w-full px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Top 4 Games</h2>

      {/* Scroll Area */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-20 w-max pb-4">
          {topGames.map((game, index) => (
            <motion.div
              key={game.id}
              className="w-64 bg-[#111] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => router.push(`/games/${game.id}`)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-20 md:h-40">
                <Image
                  src={game.cover}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <h3 className="font-semibold">{game.title}</h3>
                <p className="text-sm text-gray-400">{game.genre}</p>

                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span>{game.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
