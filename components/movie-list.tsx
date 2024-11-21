import { getTrendingMovies } from "@/lib/tmdb";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

export async function MovieList() {
    const movies = await getTrendingMovies();
    return (
        <div className="flex justify-center">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{movie.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                    width={200}
                                    height={300}
                                />
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    )
}