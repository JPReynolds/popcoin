import { getSeries } from "@/lib/tmdb";
import { MediaList } from "./media-list";

interface DiscoverSeriesProps {
  query?: string;
  genres?: string;
}

export async function DiscoverSeries({ query, genres }: DiscoverSeriesProps) {
  const series = await getSeries(query, genres);

  return <MediaList items={series} type="series" />;
}
