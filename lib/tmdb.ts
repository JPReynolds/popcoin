import "server-only";
import { Genres } from "@/app/types";
import { buildUrl } from "./utils";

export const BASE_TMDB_URL = "https://api.themoviedb.org/3/";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
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

interface MovieDetails extends Movie {
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
  genres?: string
): Promise<Movie[]> {
  const endpoint = query ? "search/movie" : "discover/movie";
  const params = {
    query: query,
    with_genres: genres,
  };

  const url = buildUrl(BASE_TMDB_URL, endpoint, params);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching movies: ${res.statusText}`);
  }

  const data = (await res.json()) as MediaResponse<Movie>;

  return data.results;
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_TMDB_URL}trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  const data = (await res.json()) as MediaResponse<Movie>;
  return data.results;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_TMDB_URL}movie/popular`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  const data = (await res.json()) as MediaResponse<Movie>;
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_TMDB_URL}trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  const data = (await res.json()) as MediaResponse<Movie>;
  return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`${BASE_TMDB_URL}movie/${Number(id)}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
}

export async function getSeries(
  query?: string,
  genres?: string
): Promise<Series[]> {
  const endpoint = query ? "search/tv" : "discover/tv";
  const params = {
    query: query,
    with_genres: genres,
  };

  const url = buildUrl(BASE_TMDB_URL, endpoint, params);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching series: ${res.statusText}`);
  }

  const data = (await res.json()) as MediaResponse<Series>;
  return data.results;
}

export async function getTrendingSeries(): Promise<Series[]> {
  const res = await fetch(`${BASE_TMDB_URL}trending/tv/week`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  const data = (await res.json()) as MediaResponse<Series>;
  return data.results;
}

export async function getPopularSeries(): Promise<Series[]> {
  const res = await fetch(`${BASE_TMDB_URL}tv/popular`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  const data = (await res.json()) as MediaResponse<Series>;
  return data.results;
}

export async function getTopRatedSeries(): Promise<Series[]> {
  const res = await fetch(`${BASE_TMDB_URL}tv/top_rated`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  const data = (await res.json()) as MediaResponse<Series>;
  return data.results;
}

export async function getSeriesDetails(id: string): Promise<SeriesDetails> {
  const res = await fetch(`${BASE_TMDB_URL}tv/${Number(id)}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  const data = await res.json();
  return data;
}
