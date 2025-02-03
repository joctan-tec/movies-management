import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Actor } from '../interfaces/models.interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActorService {


  private url:string = environment.API_URL

  constructor(
    private http:HttpClient,
  ) { }

  getAllActors():Observable<Actor[]>{
    return this.http.get<{ actors: Actor[] }>(`${this.url}/actors`).pipe(
      map((response) => response.actors) // Extrae la propiedad 'actors' de la respuesta
    );
  }

  buscarActores(peliculas: string[]): Observable<Actor[]> {
    const body = { reparto: peliculas };  // Estructura correcta del cuerpo de la petición
    return this.http.post<{ peliculas: Actor[] }>(`${this.url}/actors/movieActors`, body).pipe(
      map((response) => response.peliculas) // Extrae la propiedad 'peliculas' de la respuesta
    );
  }

  searchActors(
    searchText: string = '',
    page: number = 1,
    limit: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
  
    if (searchText) params = params.set('searchText', searchText);
  
    return this.http.get<any>(`${this.url}/actors/search`, { params });
  }


  getActor(name:string):Observable<Actor>{
    return this.http.get<{ actor: Actor }>(`${this.url}/actors/getOne/${name}`).pipe(
      map((response) => response.actor) // Extrae la propiedad 'actors' de la respuesta
    );
  }

  deleteActor(name:string):Observable<Actor>{
    const body = { nombre: name };
    return this.http.patch<{actor:Actor}>(`${this.url}/actors/delete`,body).pipe(
      map((response) => response.actor)
    );
  }

  addActor(formData : FormData):Observable<Actor>{
    return this.http.post<Actor>(`${this.url}/actors/create`,formData)
  }

  editActor(formData : FormData, name : string):Observable<Actor>{
    
    return this.http.put<Actor>(`${this.url}/actors/update/${name}`,formData)
  }

  addImgInActor(nombre:string, imagenes:string[]):Observable<Actor>{
    const body = {
      imagenes: imagenes
    }
    return this.http.patch<Actor>(`${this.url}/actors/addImg/${nombre}`,body)
  }

}
