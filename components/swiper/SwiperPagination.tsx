"use client";

import Image from "next/image";
import type { Item } from "../Hero";

type Props = {
  items: Item[];
  setCurrentSlideIdx: (index: number) => void;
  activeIndex: number;
};

function SwiperPagination({ items, activeIndex, setCurrentSlideIdx }: Props) {
  return (
    <div className="mt-4 hidden gap-3 overflow-x-auto md:flex">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlideIdx(index)}
          className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
            activeIndex === index
              ? "border-purple-500 ring-2 ring-purple-500/30"
              : "border-transparent opacity-70 hover:opacity-100"
          }`}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              muted
              playsInline
              className="h-20 w-32 object-cover"
            />
          ) : (
            <Image
              src={item.src || item.cover || ""}
              alt={item.title}
              width={140}
              height={80}
              className="h-20 w-32 object-cover"
            />
          )}
        </button>
      ))}
    </div>
  );
}
export default SwiperPagination;
