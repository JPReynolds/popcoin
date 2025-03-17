import { getMovies } from "@/lib/tmdb";
import { MediaList } from "./media-list";

interface DiscoverMoviesProps {
  query?: string;
  genres?: string;
  page?: number;
}

export async function DiscoverMovies({
  query,
  genres,
  page = 1,
}: DiscoverMoviesProps) {
  const moviesData = await getMovies(query, genres, page);

  return (
    <MediaList
      items={moviesData.results}
      type="movies"
      currentPage={moviesData.page}
      totalPages={moviesData.total_pages}
    />
  );
}
