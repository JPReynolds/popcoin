import { getTrendingMovies } from "@/lib/tmdb";
import { FeaturedMovie } from "@/components/featured-movie";
import { MovieCarousel } from "@/components/movie-carousel";

export default async function Home() {
  const trendingMoviesData = await getTrendingMovies();
  const featuredMovie = trendingMoviesData.results[0]; // Use the first trending movie as featured
  const trendingMovies = trendingMoviesData.results.slice(1); // Use the rest for the carousel

  return (
    <div className="flex flex-col h-full pb-8 justify-between">
      <FeaturedMovie movie={featuredMovie} className="flex-1" />

      <div className="mx-auto px-4">
        <MovieCarousel movies={trendingMovies} />
      </div>
    </div>
  );
}
