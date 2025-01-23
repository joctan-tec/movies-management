import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<Actor[]>(`${this.url}/api/actors`)
  }
}
