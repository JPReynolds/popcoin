import Link from "next/link";
import { Movie, Series } from "@/lib/tmdb";
import { MediaType } from "@/app/types";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { FavoriteButton } from "./favorite-button";
import { getFavoriteStatus } from "@/app/(media)/actions";
import { MediaPagination } from "./media-pagination";

type MediaItem = Movie | Series;

interface MediaListProps {
  items: MediaItem[];
  type: MediaType;
  currentPage?: number;
  totalPages?: number;
}

function getTitle(item: MediaItem, type: MediaType): string {
  if (type === "movies") {
    return (item as Movie).title;
  }
  return (item as Series).name;
}

export async function MediaItem({
  item,
  type,
}: {
  item: MediaItem;
  type: MediaType;
}) {
  const isFavorited = await getFavoriteStatus(item.id, type);
  return (
    <Link href={`/${type}/${item.id}`}>
      <Card className="transition-transform hover:scale-105 overflow-hidden relative">
        <CardContent className="p-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt={getTitle(item, type)}
            width={150}
            height={225}
            className="w-full h-full object-cover"
          />
          <FavoriteButton
            mediaId={item.id.toString()}
            mediaType={type}
            initialFavorited={isFavorited}
            variant="ghost"
            showText={false}
            className="absolute bottom-2 right-2 h-6 w-6 rounded-full hover:bg-transparent p-0 transition-all [&>svg]:hover:scale-125 [&>svg]:transition-transform"
          />
        </CardContent>
      </Card>
    </Link>
  );
}

export function MediaList({
  items,
  type,
  currentPage = 1,
  totalPages = 1,
}: MediaListProps) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {items.map((item) => (
          <li key={item.id}>
            <MediaItem key={item.id} item={item} type={type} />
          </li>
        ))}
      </ul>
      <MediaPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
