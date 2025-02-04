"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

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
    throw new Error("You must be logged in to favorite movies");
  }

  const userId = session.user.id;
  const movieIdString = formData.get("movieId");

  // Check if the movie exists in our db, if not create it
  await prisma.movie.upsert({
    where: { id: movieIdString },
    update: {},
    create: { id: movieIdString },
  });

  // Check if the user has already favorited this movie
  const existingFavorite = await prisma.favourite.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId: movieIdString,
      },
    },
  });

  if (existingFavorite) {
    // If it exists, remove it (unfavorite)
    await prisma.favourite.delete({
      where: {
        userId_movieId: {
          userId,
          movieId: movieIdString,
        },
      },
    });
    revalidatePath(`/movie/${movieIdString}`);
    revalidatePath("/watchlist");
    return { favorited: false };
  } else {
    // If it doesn't exist, create it (favorite)
    await prisma.favourite.create({
      data: {
        userId,
        movieId: movieIdString,
      },
    });
    revalidatePath(`/movie/${movieIdString}`);
    revalidatePath("/watchlist");
    return { favorited: true };
  }
}

export async function getFavoriteStatus(movieId: string | number) {
  const session = await auth();
  if (!session?.user?.id) {
    return false;
  }

  const favorite = await prisma.favourite.findUnique({
    where: {
      userId_movieId: {
        userId: session.user.id,
        movieId: String(movieId),
      },
    },
  });

  return !!favorite;
}

export async function getFavoriteMovies() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to view favorites");
  }

  const favorites = await prisma.favourite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      movie: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favorites;
}
