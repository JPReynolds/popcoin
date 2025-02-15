import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { PopularMovies } from "@/components/popular-movies";

export default async function Popular() {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<MediaListSkeleton />}>
        <PopularMovies />
      </Suspense>
    </div>
  );
}
