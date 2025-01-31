import { HttpClient } from '@angular/common/http';
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

  deleteMovie(){}

}
