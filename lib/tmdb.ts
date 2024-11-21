export const BASE_TMDB_URL = "https://api.themoviedb.org/3/";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}
  
interface TrendingResponse {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
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
