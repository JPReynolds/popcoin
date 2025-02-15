import { getSeriesDetails } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FavoriteButton } from "@/components/favorite-button";
import { getFavoriteStatus } from "../../actions";

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = await getSeriesDetails(id);
  const isFavorited = await getFavoriteStatus(id, "series");

  if (!series) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 flex-1 flex flex-col">
      <Card className="flex-1 border-none shadow-none">
        <div className="flex flex-col md:flex-row h-full p-6 gap-6">
          <div className="flex justify-center">
            <Image
              src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
              alt={series.original_name}
              width={300}
              height={500}
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <CardHeader className="p-0 mb-6">
              <CardTitle>{series.original_name}</CardTitle>
              <CardDescription>{series.overview}</CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Release Date:</span>
                <span>
                  {new Date(series.first_air_date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Seasons:</span>
                <span>{series.number_of_seasons}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Episode Runtime:</span>
                <span>{series.episode_run_time} minutes</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold block mb-2">Genres:</span>
                <div className="flex flex-wrap gap-2">
                  {series.genres.map((genre) => (
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
                  mediaType="series"
                />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
