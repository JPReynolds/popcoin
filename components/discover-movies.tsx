import { getMovies } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function DiscoverMovies(props: { query: string; genres: string }) {
  const movies = await getMovies(props.query, props.genres);

  return <MediaList items={movies} type="movies" />;
}
