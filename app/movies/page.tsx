import { MovieList } from "@/components/movie-list";
import { Suspense } from "react";

export default async function Movies() {
    return (
        <div>
            <Suspense fallback={<div>loading...</div>}>
                <MovieList />    
            </Suspense> 
        </div>
    )
}