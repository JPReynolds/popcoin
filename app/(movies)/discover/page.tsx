import { Suspense } from "react";
import { MovieListSkeleton } from "@/components/movie-list-skeleton";
import { DiscoverMovies } from "@/components/discover-movies";
import { SearchBar } from "@/components/search-bar";
import { MovieGenreDropdown } from "@/components/movie-genre-dropdown";

export default async function Discover(props: {
  searchParams: Promise<{ query: string; genres: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;
  const genres = searchParams.genres;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-between align-middle py-4">
        <SearchBar />
        <MovieGenreDropdown />
      </div>
      <Suspense fallback={<MovieListSkeleton />}>
        <DiscoverMovies query={query} genres={genres} />
      </Suspense>
    </div>
  );
}
