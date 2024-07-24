export interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: string;
  genres?: [{ id: number; name: string }];
  overview?: string;
  backdrop_path?: string;
  tagline?: string;
  runtime?: number;
  original_language?: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}
