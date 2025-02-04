import { getFavoriteMovies } from "../actions";
import { getMovieDetails } from "@/lib/tmdb";
import { MovieList } from "@/components/movie-list";

export default async function WatchlistPage() {
  const favorites = await getFavoriteMovies();

  // Fetch full movie details for each favorite
  const movies = await Promise.all(
    favorites.map(async (fav) => {
      const movie = await getMovieDetails(fav.movieId);
      return movie;
    })
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>
      {movies.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t added any movies to your watchlist yet.
        </p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}
