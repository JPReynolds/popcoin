import { getPopularSeries } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function PopularSeries({ page = 1 }: { page?: number }) {
  const seriesData = await getPopularSeries(page);

  return (
    <MediaList
      items={seriesData.results}
      type="series"
      currentPage={seriesData.page}
      totalPages={seriesData.total_pages}
    />
  );
}
