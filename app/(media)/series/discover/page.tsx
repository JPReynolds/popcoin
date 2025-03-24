import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { SearchBar } from "@/components/search-bar";
import { DiscoverSeries } from "@/components/discover-series";

export default async function Discover(props: {
  searchParams: Promise<{ query?: string; genres?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;
  const genres = searchParams.genres;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-between align-middle py-4 gap-4">
        <SearchBar />
      </div>
      <Suspense fallback={<MediaListSkeleton />}>
        <DiscoverSeries query={query} genres={genres} page={page} />
      </Suspense>
    </div>
  );
}
