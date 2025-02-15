import { getPopularMovies } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function PopularMovies() {
  const movies = await getPopularMovies();

  return <MediaList items={movies} type="movies" />;
}
