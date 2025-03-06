import { getTrendingSeries } from "@/lib/tmdb";
import { MediaList } from "./media-list";

export async function TrendingSeries() {
  const series = await getTrendingSeries();
  return <MediaList items={series} type="series" />;
}
