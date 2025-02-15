import { getFavorites } from "../../actions";
import { getSeriesDetails } from "@/lib/tmdb";
import { MediaList } from "@/components/media-list";

export default async function WatchlistPage() {
  const favorites = await getFavorites("series");

  // Fetch full movie details for each favorite
  const series = await Promise.all(
    favorites
      .filter(
        (fav): fav is typeof fav & { seriesId: string } => fav.seriesId !== null
      )
      .map(async (fav) => {
        const series = await getSeriesDetails(fav.seriesId);
        return series;
      })
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>
      {series.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t added any series to your watchlist yet.
        </p>
      ) : (
        <MediaList items={series} type="series" />
      )}
    </div>
  );
}
