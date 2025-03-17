import { getTrendingMovies } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function TrendingMovies({ page = 1 }: { page?: number }) {
  const moviesData = await getTrendingMovies(page);

  return (
    <MediaList
      items={moviesData.results}
      type="movies"
      currentPage={moviesData.page}
      totalPages={moviesData.total_pages}
    />
  );
}
