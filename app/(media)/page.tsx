import { getTrendingMovies } from "@/lib/tmdb";
import { FeaturedMovie } from "@/components/featured-movie";
import { MovieCarousel } from "@/components/movie-carousel";
import { headers } from "next/headers";

export default async function Home() {
  const trendingMoviesData = await getTrendingMovies();
  const featuredMovie = trendingMoviesData.results[0]; // Use the first trending movie as featured
  const trendingMovies = trendingMoviesData.results.slice(1); // Use the rest for the carousel
  const headerList = await headers();
  const userAgent = headerList.get("user-agent");
  const isMobile =
    /iPhone|iPad|iPod|Android|Mobile|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent || ""
    );

  return (
    <div className="flex flex-col h-full pb-8 justify-between">
      <FeaturedMovie
        movie={featuredMovie}
        className="flex-1"
        isMobile={isMobile}
      />

      <div className="mx-auto">
        <MovieCarousel movies={trendingMovies} />
      </div>
    </div>
  );
}
