import { getTrendingMovies } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function TrendingMovies() {
  const movies = await getTrendingMovies();

  console.log(movies);

  return <MediaList items={movies} type="movies" />;
}
