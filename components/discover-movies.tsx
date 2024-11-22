import { getMovies } from "@/lib/tmdb";
import { MovieList } from "./movie-list";

export async function DiscoverMovies(props: { query: string }) {
    const movies = await getMovies(props.query);

    return <MovieList movies={movies} />
}