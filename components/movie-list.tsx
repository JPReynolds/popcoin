import { Movies } from "@/lib/tmdb";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { getFavoriteStatus } from "@/app/(movies)/actions";
import { FavoriteButton } from "./favorite-button";

async function MovieListItem({ movie }: { movie: Movies }) {
  const isFavorited = await getFavoriteStatus(movie.id);
  return (
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
            <FavoriteButton
              movieId={movie.id}
              initialFavorited={isFavorited}
              variant="ghost"
              showText={false}
              className="absolute bottom-2 right-2 h-6 w-6 rounded-full hover:bg-transparent p-0 transition-all [&>svg]:hover:scale-125 [&>svg]:transition-transform"
            />
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}

export function MovieList({ movies }: { movies: Movies }) {
  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {movies.map((movie) => (
          <MovieListItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
