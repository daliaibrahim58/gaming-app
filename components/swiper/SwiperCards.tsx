"use client";

import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import type { Item } from "../Hero";
import SwiperCard from "./SwiperCard";
import SwiperPagination from "./SwiperPagination";

type Props = {
  items?: Item[];
  item?: Item;
};

export default function SwiperCards({ items, item }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo<Item[]>(() => {
    if (items?.length) return items;

    if (item) {
      const result: Item[] = [];

      result.push({
        ...item,
        src: item.cover,
        type: "image",
      });

      item.screenshots?.forEach((img) => {
        result.push({
          ...item,
          src: img,
          type: "image",
        });
      });

      return result;
    }

    return [];
  }, [items, item]);

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        key={slides.length}
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={slides.length > 1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="rounded-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <SwiperCard item={slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4">
        <SwiperPagination
          items={slides}
          setCurrentSlideIdx={(index) => swiperRef.current?.slideToLoop(index)}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  );
}
