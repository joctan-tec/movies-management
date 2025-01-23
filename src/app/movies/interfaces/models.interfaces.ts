export interface Movie {
  title: string;
  description: string;
  genre: string;
  director: string;
  cast: string[];
  releaseYear: Date;
  rating: number;
  images: string[];
}

export interface Actor {
  name: string;
  birthDate: Date;
  biography: string;
  images: string[];
  movies: string[];
}
