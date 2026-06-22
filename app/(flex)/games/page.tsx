import GamesPage from "@/components/GamesPage";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
      <GamesPage />
    </Suspense>
  );
}

export default page;