import { getSeries } from "@/lib/tmdb";
import { MediaList } from "./media-list";

interface DiscoverSeriesProps {
  query?: string;
  genres?: string;
  page?: number;
}

export async function DiscoverSeries({
  query,
  genres,
  page = 1,
}: DiscoverSeriesProps) {
  const seriesData = await getSeries(query, genres, page);

  return (
    <MediaList
      items={seriesData.results}
      type="series"
      currentPage={seriesData.page}
      totalPages={seriesData.total_pages}
    />
  );
}
