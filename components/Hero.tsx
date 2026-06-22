import SwiperCards from "./swiper/SwiperCards";

export type Item = {
  title: string;
  description: string;
  src?: string;
  type?: "image" | "video";
  cover?: string;
  screenshots?: string[];
};

function Hero() {
  const items: Item[] = [
    {
      title: "Spider-Man 2",
      description:
        "Swing through New York City as Peter Parker and Miles Morales in an epic open-world adventure filled with action and emotion.",
      src: "/images/games/spidervideo.mp4",
      type: "video",
    },
    {
      title: "Call of Duty: Modern Warfare",
      description:
        "Engage in intense modern combat missions with realistic graphics, tactical gameplay, and cinematic storytelling.",
      src: "/images/games/call-of-duty.mp4",
      type: "video",
    },
    {
      title: "Dragon Ball Z: Kakarot",
      description:
        "Relive the legendary Dragon Ball Z story, from epic battles to emotional moments across iconic sagas.",
      src: "/images/games/Dragon-Ball.webp",
      type: "image",
    },
    {
      title: "Cyberpunk 2077",
      description:
        "Explore the neon-lit streets of Night City in a futuristic RPG filled with choices, chaos, and high-tech action.",
      src: "/images/games/cyb.webp",
      type: "image",
    },
  ];

  return (
    <div className="w-full">
      <SwiperCards items={items} />
    </div>
  );
}

export default Hero;
