import Hero from "./Hero";
import Search from "./Search";
import TopGamesSection from "./TopGamesSection";

function HomePage() {
  return (
    <div className="flex flex-col gap-5 lg:gap-10">
      <Search/>
      <Hero />
      <TopGamesSection/>
    </div>
  );
}

export default HomePage;
