import { Suspense } from "react";
import { MovieListSkeleton } from "@/components/movie-list-skeleton";
import { DiscoverMovies } from "@/components/discover-movies";

export default function Discover() {
    return (
        <div className="flex justify-center">
            <Suspense fallback={<MovieListSkeleton />}>
                <DiscoverMovies />   
            </Suspense>
        </div>
    )
}