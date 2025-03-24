import { GenresResponse } from "@/app/types";
import { BASE_TMDB_URL } from "@/lib/tmdb";

export async function GET() {
  try {
    const res = await fetch(`${BASE_TMDB_URL}genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
      },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch genres" },
        { status: res.status }
      );
    }

    const data = (await res.json()) as GenresResponse;
    return Response.json(data.genres);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
