import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { TrendingMovies } from "@/components/trending-movies";

export default async function Trending() {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<MediaListSkeleton />}>
        <TrendingMovies />
      </Suspense>
    </div>
  );
}
