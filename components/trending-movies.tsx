import { getTrendingMovies } from "@/lib/tmdb";
import { MovieList } from "./movie-list";

export async function TrendingMovies() {
    const movies = await getTrendingMovies();

    return <MovieList movies={movies} />
}