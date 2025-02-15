import { getFavorites } from "../../actions";
import { getMovieDetails } from "@/lib/tmdb";
import { MediaList } from "@/components/media-list";

export default async function WatchlistPage() {
  const favorites = await getFavorites("movies");

  // Fetch full movie details for each favorite
  const movies = await Promise.all(
    favorites
      .filter(
        (fav): fav is typeof fav & { movieId: string } => fav.movieId !== null
      )
      .map(async (fav) => {
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
        <MediaList items={movies} type="movies" />
      )}
    </div>
  );
}
