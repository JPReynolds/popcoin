import { getPopularMovies } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function PopularMovies({ page = 1 }: { page?: number }) {
  const moviesData = await getPopularMovies(page);

  return (
    <MediaList
      items={moviesData.results}
      type="movies"
      currentPage={moviesData.page}
      totalPages={moviesData.total_pages}
    />
  );
}
