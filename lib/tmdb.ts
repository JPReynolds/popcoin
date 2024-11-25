import { Genres } from '@/app/types';
import 'server-only'
import { buildUrl } from './utils';

export const BASE_TMDB_URL = "https://api.themoviedb.org/3/";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export type Movies = Movie[];

interface MovieDetails extends Movie {
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genres;
  budget: number;
}
  
type TrendingResponse = {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}

export async function getMovies(query?: string, genres?: string): Promise<Movie[]> {
  const endpoint = query ? 'search/movie' : 'discover/movie';
  const params = {
      query: query,
      with_genres: genres,
  };

  const url = buildUrl(BASE_TMDB_URL, endpoint, params);

  const res = await fetch(url, {
      headers: {
          'Authorization': `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
      }
  });

  if (!res.ok) {
      throw new Error(`Error fetching movies: ${res.statusText}`);
  }

  const data = await res.json() as TrendingResponse;

  return data.results;
}

export async function getTrendingMovies(): Promise<Movie[]> {
    const res = await fetch(`${BASE_TMDB_URL}trending/movie/week`, {
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
        }
      });
      
      const data = await res.json() as TrendingResponse;
      return data.results;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_TMDB_URL}movie/popular`, {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
      }
    });
    
    const data = await res.json() as TrendingResponse;
    return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const res = await fetch(`${BASE_TMDB_URL}trending/movie/week`, {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
      }
    });
    
    const data = await res.json() as TrendingResponse;
    return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`${BASE_TMDB_URL}movie/${Number(id)}`, {
    headers: {
      'Authorization': `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
    }
  });

  const data = await res.json()
  return data;
}
