import { getMovies, getPopularMovies } from "@/lib/tmdb";
import { MovieList } from "./movie-list";

export async function PopularMovies() {
    const movies = await getPopularMovies();

    return <MovieList movies={movies} />
}