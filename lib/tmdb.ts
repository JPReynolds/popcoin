export const BASE_TMDB_URL = "https://api.themoviedb.org/3/";

export type Genre = {
  id: number;
  name: string;
}

export type Genres = Genre[]

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

// export async function getMovieSearch(query: string, page: string = "1"): Promise<Movie[]> {
//   const url = `${BASE_TMDB_URL}search/movie?query=${encodeURIComponent(query)}&page=${page}&language=en-US`

//   const res = await fetch(url, {
//     headers: {
//       'Authorization': `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
//     }
//   });
  
//   const data = await res.json() as TrendingResponse;
//   return data.results;
// }

export async function getMovies(query?: string): Promise<Movie[]> {
    let url = `${BASE_TMDB_URL}discover/movie`;
    if (query) {
      url = `${BASE_TMDB_URL}search/movie?query=${encodeURIComponent(query)}`
    }
    const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
        }
    });

    
    const data = await res.json() as TrendingResponse;
    console.log(data)
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
