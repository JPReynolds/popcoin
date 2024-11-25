import { getMovies } from "@/lib/tmdb";
import { MovieList } from "./movie-list";

export async function DiscoverMovies(props: { query: string, genres: string }) {
    const movies = await getMovies(props.query, props.genres);

    return <MovieList movies={movies} />
}