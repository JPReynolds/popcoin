"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { toggleFavorite } from "@/app/(media)/actions";
import { cn } from "@/lib/utils";
import { MediaType } from "@/app/types";

export function FavoriteButton({
  mediaId,
  initialFavorited,
  variant = "outline",
  showText = true,
  className,
  mediaType,
}: {
  mediaId: string;
  initialFavorited: boolean;
  variant?: "outline" | "ghost";
  showText?: boolean;
  className?: string;
  mediaType: MediaType;
}) {
  const [state, formAction, isPending] = useActionState(toggleFavorite, {
    favorited: initialFavorited,
  });

  const isFavorited = state.favorited;

  return (
    <form action={formAction} onClick={(e) => e.stopPropagation()}>
      <input type="hidden" name="mediaId" defaultValue={mediaId} />
      <input type="hidden" name="mediaType" defaultValue={mediaType} />
      <Button
        variant={variant}
        className={cn("w-fit gap-2", className)}
        type="submit"
        disabled={isPending}
      >
        <StarIcon
          className={cn(
            isFavorited ? "fill-yellow-400" : "",
            "text-white !h-5 !w-5"
          )}
        />
        {showText &&
          (isFavorited ? "Remove from Watchlist" : "Add to Watchlist")}
      </Button>
    </form>
  );
}
