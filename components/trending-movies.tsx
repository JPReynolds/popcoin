import { getTrendingMovies } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function TrendingMovies() {
  const movies = await getTrendingMovies();

  return <MediaList items={movies} type="movies" />;
}
