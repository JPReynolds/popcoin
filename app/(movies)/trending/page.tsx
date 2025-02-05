import { Suspense } from "react";
import { MovieListSkeleton } from "@/components/movie-list-skeleton";
import { TrendingMovies } from "@/components/trending-movies";

export default async function Trending() {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<MovieListSkeleton />}>
        <TrendingMovies />
      </Suspense>
    </div>
  );
}
