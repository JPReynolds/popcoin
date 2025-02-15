export type Genre = {
  id: number;
  name: string;
};

export type Genres = Genre[];

export type GenresResponse = {
  genres: Genres;
};

export type MediaType = "movies" | "series";
