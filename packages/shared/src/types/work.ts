export interface GenreIds {
  genreId: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Work {
  id: number;
  name: string;
  stub: string;
  uniqid: string;
  status: number;
  status_name: string;
  licensed: boolean;
  demographicId: number;
  demographic_name: string;
  type: string;
  adult: boolean;
  hidden: boolean;
  thumbnail: string;
  thumbnail_path: string;
  createdAt: Date;
  updatedAt: Date;
  language: number;
  language_name: string;
  description: string;
  description_short: string;
  works_genres: GenreIds[];
  genres: Genre[];
}
