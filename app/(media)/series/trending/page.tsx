import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { TrendingSeries } from "@/components/trending-series";

export default async function Trending() {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<MediaListSkeleton />}>
        <TrendingSeries />
      </Suspense>
    </div>
  );
}
