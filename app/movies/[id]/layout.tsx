import { MovieSkeleton } from "@/components/movie-skeleton";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex flex-col">
            <Suspense fallback={<MovieSkeleton />}>
                {children}
            </Suspense>
        </div>
    )
}