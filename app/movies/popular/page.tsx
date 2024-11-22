import { Suspense } from "react";
import { MovieListSkeleton } from "@/components/movie-list-skeleton";
import { PopularMovies } from "@/components/popular-movies";

export default async function Popular() {
    return (
        <div className="flex justify-center">
            <Suspense fallback={<MovieListSkeleton />}>
                <PopularMovies />   
            </Suspense>
        </div>
    )
}