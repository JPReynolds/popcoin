import { Suspense } from "react";
import { MediaListSkeleton } from "@/components/media-list-skeleton";
import { PopularMovies } from "@/components/popular-movies";

export default async function Popular(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="flex justify-center">
      <Suspense fallback={<MediaListSkeleton />}>
        <PopularMovies page={page} />
      </Suspense>
    </div>
  );
}
