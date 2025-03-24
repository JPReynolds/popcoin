import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { PopularSeries } from "@/components/popular-series";

export default async function Popular(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="flex flex-col justify-center">
      <Suspense fallback={<MediaListSkeleton />}>
        <PopularSeries page={page} />
      </Suspense>
    </div>
  );
}
