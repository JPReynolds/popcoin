import { getMovies } from "@/lib/tmdb";
import { MovieList } from "./movie-list";

export async function DiscoverMovies() {
    const movies = await getMovies();

    return <MovieList movies={movies} />
}