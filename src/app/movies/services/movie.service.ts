import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { Movie } from '../interfaces/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url:string = environment.API_URL

  constructor(
    private http:HttpClient,
  ) { }

  getAllMovies():Observable<Movie[]>{
    return this.http.get<{ movies: Movie[] }>(`${this.url}/movies/all`).pipe(
      map((response) => response.movies) // Extrae la propiedad 'movies' de la respuesta
    );
  }

  getMovieByName(name:string):Observable<Movie>{
    return this.http.get<{ movie: Movie }>(`${this.url}/movies/${name}`).pipe(
      map((response) => response.movie) // Extrae la propiedad 'movies' de la respuesta
    );
  }

  getTopTenMovies():Observable<Movie[]>{
    return this.http.get<{ movies: Movie[] }>(`${this.url}/movies/top-rated`).pipe(
      map((response) => response.movies) // Extrae la propiedad 'movies' de la respuesta
    );
  }

  updateMovie(movie:FormData, name: string):Observable<Movie>{
    return this.http.put<{ movie: Movie }>(`${this.url}/movies/movie/${name}`, movie).pipe(
      map((response) => response.movie) // Extrae la propiedad 'movies' de la respuesta
    );
  }

  createMovie(movie:FormData):Observable<Movie>{
    return this.http.post<{ movie: Movie }>(`${this.url}/movies/movie`, movie).pipe(
      map((response) => response.movie) // Extrae la propiedad 'movies' de la respuesta
    );
  }

  getMoviesInfo():Observable<any>{
    return this.http.get<any>(`${this.url}/movies/movies-info`);
  }

  searchMovies(
    searchText: string = '',
    genre: string = '',
    ano_lanzamiento?: number,
    calificacion?: number,
    page: number = 1,
    limit: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (searchText) params = params.set('searchText', searchText);
    if (genre) params = params.set('genre', genre);
    if (ano_lanzamiento) params = params.set('ano_lanzamiento', ano_lanzamiento.toString());
    if (calificacion) params = params.set('calificacion', calificacion.toString());


    return this.http.get<any>(`${this.url}/movies/search`, { params });
  }

  deleteMovie(){}

}
