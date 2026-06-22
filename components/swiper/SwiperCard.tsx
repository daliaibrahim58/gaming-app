import Image from "next/image";
import type { Item } from "../Hero";

type Props = {
  item: Item;
};

function SwiperCard({ item }: Props) {
  const imageSrc = item.src || item.cover || "";

  return (
    <div className="relative h-[160px] md:h-[220px] lg:h-[550px] w-full overflow-hidden rounded-xl">
      {item.type === "image" ? (
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <video
          src={item.src}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content */}
      <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md text-white">
        <h3 className="mb-2 sm:mb-3 text-lg sm:text-2xl md:text-4xl font-extrabold">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm md:text-lg text-white/90 line-clamp-3">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default SwiperCard;
