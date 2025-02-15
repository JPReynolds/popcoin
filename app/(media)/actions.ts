"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MediaType } from "@/app/types";

async function toggleFavouriteMovie(userId: string, movieId: string) {
  // Check if the movie exists in our db, if not create it
  await prisma.movie.upsert({
    where: { id: movieId },
    update: {},
    create: { id: movieId },
  });

  // Check if the user has already favorited this movie
  const existingFavorite = await prisma.favourite.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId: movieId,
      },
    },
  });

  if (existingFavorite) {
    // If it exists, remove it (unfavorite)
    await prisma.favourite.delete({
      where: {
        userId_movieId: {
          userId,
          movieId: movieId,
        },
      },
    });
    revalidatePath(`/movie/${movieId}`);
    revalidatePath("/watchlist");
    return { favorited: false };
  } else {
    // If it doesn't exist, create it (favorite)
    await prisma.favourite.create({
      data: {
        userId,
        movieId: movieId,
      },
    });
    revalidatePath(`/movie/${movieId}`);
    revalidatePath("/movies/watchlist");
    return { favorited: true };
  }
}

async function toggleFavouriteSeries(userId: string, seriesId: string) {
  // Check if the series exists in our db, if not create it
  await prisma.series.upsert({
    where: { id: seriesId },
    update: {},
    create: { id: seriesId },
  });

  // Check if the user has already favorited this series
  const existingFavorite = await prisma.favourite.findUnique({
    where: {
      userId_seriesId: {
        userId,
        seriesId: seriesId,
      },
    },
  });

  if (existingFavorite) {
    // If it exists, remove it (unfavorite)
    await prisma.favourite.delete({
      where: {
        userId_seriesId: {
          userId,
          seriesId: seriesId,
        },
      },
    });
    revalidatePath(`/series/${seriesId}`);
    revalidatePath("/watchlist");
    return { favorited: false };
  } else {
    // If it doesn't exist, create it (favorite)
    await prisma.favourite.create({
      data: {
        userId,
        seriesId: seriesId,
      },
    });
    revalidatePath(`/series/${seriesId}`);
    revalidatePath("/series/watchlist");
    return { favorited: true };
  }
}

export type ToggleFavoriteActionState = {
  favorited: boolean;
  message?: string;
};

export async function toggleFavorite(
  prevState: ToggleFavoriteActionState,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const userId = session.user.id;
  const mediaId = formData.get("mediaId") as string;
  const mediaType = formData.get("mediaType") as MediaType;

  if (!mediaId || !mediaType) {
    return {
      favorited: prevState.favorited,
      message: "Media ID and type are required",
    };
  }

  if (mediaType === "movies") {
    const result = await toggleFavouriteMovie(userId, mediaId);
    return {
      favorited: result.favorited,
    };
  } else if (mediaType === "series") {
    const result = await toggleFavouriteSeries(userId, mediaId);
    return {
      favorited: result.favorited,
    };
  }

  return {
    favorited: prevState.favorited,
  };
}

export async function getFavoriteStatus(
  mediaId: string | number,
  mediaType: MediaType
) {
  const session = await auth();
  if (!session?.user?.id) {
    return false;
  }

  let favorite;

  if (mediaType === "movies") {
    favorite = await prisma.favourite.findUnique({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: String(mediaId),
        },
      },
    });
  } else if (mediaType === "series") {
    favorite = await prisma.favourite.findUnique({
      where: {
        userId_seriesId: {
          userId: session.user.id,
          seriesId: String(mediaId),
        },
      },
    });
  }

  return !!favorite;
}

export async function getFavorites(type: MediaType) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to view favorites");
  }

  const favorites = await prisma.favourite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      movie: type === "movies" ? true : false,
      series: type === "series" ? true : false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favorites;
}
