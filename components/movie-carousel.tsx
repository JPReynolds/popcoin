import { Movie } from "@/lib/tmdb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { MediaItem } from "./media-list";
interface MovieCarouselProps {
  movies: Movie[];
}

export async function MovieCarousel({ movies }: MovieCarouselProps) {
  return (
    <div className="flex justify-center">
      <Carousel className="w-[90%] mx-auto">
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="basis-1/3 lg:basis-1/5 xl:basis-1/6"
            >
              <MediaItem item={movie} type="movies" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
