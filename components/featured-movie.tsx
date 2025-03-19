import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/tmdb";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FeaturedMovieProps {
  movie: Movie;
  className?: string;
}

export function FeaturedMovie({ movie, className }: FeaturedMovieProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute inset-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.title}
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 max-w-7xl mx-auto pb-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {movie.title}
        </h1>
        <p className="text-lg text-white/80 mb-6 max-w-3xl line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" size="lg">
            <Link href={`/movies/${movie.id}`}>More Info</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
