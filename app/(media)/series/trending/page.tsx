import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { TrendingSeries } from "@/components/trending-series";

export default async function Trending({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="flex justify-center">
      <Suspense fallback={<MediaListSkeleton />}>
        <TrendingSeries page={page} />
      </Suspense>
    </div>
  );
}
