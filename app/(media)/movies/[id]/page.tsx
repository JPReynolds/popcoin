import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMovieDetails } from "@/lib/tmdb";
import Image from "next/image";
import { getFavoriteStatus } from "../../actions";
import { FavoriteButton } from "@/components/favorite-button";

export default async function Movie(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const movie = await getMovieDetails(id);
  const isFavorited = await getFavoriteStatus(id, "movies");

  return (
    <div className="mx-auto h-full flex items-center justify-center">
      <Card className="border-none shadow-none max-w-5xl w-full">
        <div className="flex flex-col 2xl:flex-row h-full p-3 sm:p-4 gap-4">
          <div className="flex justify-center">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.original_title}
              width={300}
              height={450}
              className="object-cover rounded-lg max-h-[450px] w-auto"
              priority
            />
          </div>
          <div className="flex-1">
            <CardHeader className="p-0 mb-4">
              <CardTitle>{movie.original_title}</CardTitle>
              <CardDescription>{movie.overview}</CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Release Date:</span>
                <span>{new Date(movie.release_date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Runtime:</span>
                <span>{movie.runtime} minutes</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Budget:</span>
                <span>{movie.budget}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold block mb-2">Genres:</span>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <FavoriteButton
                  mediaId={id}
                  initialFavorited={isFavorited}
                  mediaType="movies"
                />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
