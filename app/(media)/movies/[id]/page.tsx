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
  const isFavorited = await getFavoriteStatus(id);

  return (
    <div className="container mx-auto py-8 flex-1 flex flex-col">
      <Card className="flex-1 border-none shadow-none">
        <div className="flex flex-col md:flex-row h-full p-6 gap-6">
          <div className="flex justify-center">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.original_title}
              width={300}
              height={500}
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <CardHeader className="p-0 mb-6">
              <CardTitle>{movie.original_title}</CardTitle>
              <CardDescription>{movie.overview}</CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
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
                <FavoriteButton movieId={id} initialFavorited={isFavorited} />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
