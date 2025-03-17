import { getTrendingSeries } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function TrendingSeries({ page = 1 }: { page?: number }) {
  const seriesData = await getTrendingSeries(page);
  return (
    <MediaList
      items={seriesData.results}
      type="series"
      currentPage={seriesData.page}
      totalPages={seriesData.total_pages}
    />
  );
}
