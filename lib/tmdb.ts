import "server-only";
import { Genres } from "@/app/types";
import { buildUrl } from "./utils";

export const BASE_TMDB_URL = "https://api.themoviedb.org/3/";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  release_date: string;
  vote_average: number;
}

export interface Series {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export type Movies = Movie[];
export type SeriesList = Series[];

export interface MovieDetails extends Movie {
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genres;
  budget: number;
}

interface SeriesDetails extends Series {
  original_name: string;
  overview: string;
  first_air_date: string;
  episode_run_time: number[];
  genres: Genres;
  number_of_seasons: number;
  number_of_episodes: number;
}

type MediaResponse<T> = {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
};

export async function getMovies(
  query?: string,
  genres?: string,
  page: number = 1
): Promise<MediaResponse<Movie>> {
  const endpoint = query ? "search/movie" : "discover/movie";
  const params = {
    query: query,
    with_genres: genres,
    page: page.toString(),
  };

  const url = buildUrl(BASE_TMDB_URL, endpoint, params);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching movies: ${res.statusText}`);
  }

  const data = (await res.json()) as MediaResponse<Movie>;

  return data;
}

export async function getTrendingMovies(
  page: number = 1
): Promise<MediaResponse<Movie>> {
  const url = buildUrl(BASE_TMDB_URL, "trending/movie/week", {
    page: page.toString(),
  });

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  const data = (await res.json()) as MediaResponse<Movie>;
  return data;
}

export async function getPopularMovies(
  page: number = 1
): Promise<MediaResponse<Movie>> {
  const url = buildUrl(BASE_TMDB_URL, "movie/popular", {
    page: page.toString(),
  });

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  const data = (await res.json()) as MediaResponse<Movie>;
  return data;
}

export async function getTopRatedMovies(
  page: number = 1
): Promise<MediaResponse<Movie>> {
  const url = buildUrl(BASE_TMDB_URL, "movie/top_rated", {
    page: page.toString(),
  });

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  const data = (await res.json()) as MediaResponse<Movie>;
  return data;
}

export async function getMovieDetails(
  id: string
): Promise<MovieDetails | null> {
  const res = await fetch(`${BASE_TMDB_URL}movie/${Number(id)}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch movie details (status: ${res.status})`);
  }

  const data = await res.json();
  return data;
}

export async function getSeries(
  query?: string,
  genres?: string,
  page: number = 1
): Promise<MediaResponse<Series>> {
  const endpoint = query ? "search/tv" : "discover/tv";
  const params = {
    query: query,
    with_genres: genres,
    page: page.toString(),
  };

  const url = buildUrl(BASE_TMDB_URL, endpoint, params);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching series: ${res.statusText}`);
  }

  const data = (await res.json()) as MediaResponse<Series>;
  return data;
}

export async function getTrendingSeries(
  page: number = 1
): Promise<MediaResponse<Series>> {
  const url = buildUrl(BASE_TMDB_URL, "trending/tv/week", {
    page: page.toString(),
  });

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  const data = (await res.json()) as MediaResponse<Series>;
  return data;
}

export async function getPopularSeries(
  page: number = 1
): Promise<MediaResponse<Series>> {
  const url = buildUrl(BASE_TMDB_URL, "tv/popular", { page: page.toString() });

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  const data = (await res.json()) as MediaResponse<Series>;
  return data;
}

export async function getTopRatedSeries(
  page: number = 1
): Promise<MediaResponse<Series>> {
  const url = buildUrl(BASE_TMDB_URL, "tv/top_rated", {
    page: page.toString(),
  });

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  const data = (await res.json()) as MediaResponse<Series>;
  return data;
}

export async function getSeriesDetails(id: string): Promise<SeriesDetails> {
  const res = await fetch(`${BASE_TMDB_URL}tv/${Number(id)}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  });

  const data = await res.json();
  return data;
}
