import { Movies } from "@/lib/tmdb";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

export function MovieList({ movies }: { movies: Movies }) {
    return (
        <div className="flex justify-center">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <Link href={`/movies/${movie.id}`}>
                            <Card className="transition-transform hover:scale-105 overflow-hidden">
                                <CardContent className="p-0">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                        alt={movie.title}
                                        width={200}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </CardContent>
                            </Card>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}