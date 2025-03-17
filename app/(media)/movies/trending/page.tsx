import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { TrendingMovies } from "@/components/trending-movies";

export default async function Trending({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="flex justify-center">
      <Suspense fallback={<MediaListSkeleton />}>
        <TrendingMovies page={page} />
      </Suspense>
    </div>
  );
}
