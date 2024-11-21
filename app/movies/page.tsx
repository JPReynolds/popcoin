import { Suspense } from "react";
import { MovieList } from "@/components/movie-list";
import { MovieListSkeleton } from "@/components/movie-list-skeleton";

export default async function Movies() {
    return (
        <div className="flex justify-center">
            <Suspense fallback={<MovieListSkeleton />}>
                <MovieList />    
            </Suspense> 
        </div>
    )
}