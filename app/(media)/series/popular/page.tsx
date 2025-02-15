import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { PopularSeries } from "@/components/popular-series";

export default function Popular() {
  return (
    <div className="flex flex-col justify-center">
      <Suspense fallback={<MediaListSkeleton />}>
        <PopularSeries />
      </Suspense>
    </div>
  );
}
