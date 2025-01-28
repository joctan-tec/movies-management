import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getActor(name:string):Observable<Actor>{
    return this.http.get<Actor>(`${this.url}/actors/getOne/${name}`)
  }

  deleteActor(name:string):Observable<Actor>{
    const body = { nombre: name };

    return this.http.patch<{actor:Actor}>(`${this.url}/actors/delete`,body).pipe(
      map((response) => response.actor)
    );
  }

  addActor(nombre:string, biografia:string, peliculas:string[], fechaDeNacimiento:string, imagenes:string[]):Observable<Actor>{
    let params = new HttpParams()
      .set('nombre',nombre)
      .set('biografia', biografia)
      .set('fechaDeNacimiento', fechaDeNacimiento);
      peliculas.forEach((peliculas) => {
        params = params.append('peliculas', peliculas);
      });
      imagenes.forEach((imagenes) => {
        params = params.append('imagenes', imagenes);
      });
    return this.http.post<Actor>(`${this.url}/actors/create`,params)
  }

  editActor(nombre:string, biografia:string, peliculas:string[], fechaDeNacimiento:string, imagenes:string[]):Observable<Actor>{
    let params = new HttpParams()
      .set('nombre',nombre)
      .set('biografia', biografia)
      .set('fechaDeNacimiento', fechaDeNacimiento);
      peliculas.forEach((peliculas) => {
        params = params.append('peliculas', peliculas);
      });
      imagenes.forEach((imagenes) => {
        params = params.append('imagenes', imagenes);
      });
    return this.http.put<Actor>(`${this.url}/actors/update`,params)
  }


}
