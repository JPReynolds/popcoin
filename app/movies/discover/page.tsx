import { Suspense } from "react";
import { MovieListSkeleton } from "@/components/movie-list-skeleton";
import { DiscoverMovies } from "@/components/discover-movies";
import { SearchBar } from "@/components/search-bar";

export default async function Discover(props: {
    // params: Params
    searchParams: Promise<{ query: string }>
  }) {

    const searchParams = await props.searchParams;
    const query = searchParams.query;

    return (
        <div className="flex flex-col justify-center">
            <SearchBar />
            <Suspense fallback={<MovieListSkeleton />}>
                <DiscoverMovies query={query} />   
            </Suspense>
        </div>
    )
}