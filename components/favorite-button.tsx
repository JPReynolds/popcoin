"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { toggleFavorite } from "@/app/(movies)/actions";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  movieId,
  initialFavorited,
  variant = "outline",
  showText = true,
  className,
}: {
  movieId: string;
  initialFavorited: boolean;
  variant?: "outline" | "ghost";
  showText?: boolean;
  className?: string;
}) {
  const [state, formAction, isPending] = useActionState(toggleFavorite, {
    favorited: initialFavorited,
  });

  const isFavorited = state.favorited;

  return (
    <form action={formAction} onClick={(e) => e.stopPropagation()}>
      <input type="hidden" name="movieId" defaultValue={movieId} />
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
