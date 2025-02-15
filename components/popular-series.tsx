import { getPopularSeries } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function PopularSeries() {
  const series = await getPopularSeries();

  return <MediaList items={series} type="series" />;
}
