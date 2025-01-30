import { Movies } from "@/lib/tmdb";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";

export function MovieList({ movies }: { movies: Movies }) {
  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <Card className="transition-transform hover:scale-105 overflow-hidden relative">
                <CardContent className="p-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 right-2 h-6 w-6 rounded-full hover:bg-transparent p-0 transition-all [&>svg]:hover:scale-125 [&>svg]:transition-transform"
                  >
                    <StarIcon className="text-white !h-5 !w-5" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
