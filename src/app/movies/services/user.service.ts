import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.API_URL;


  constructor(
    private http: HttpClient
  ) { }

  createUserWithImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/new`, formData);
  }

  login(formData : FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, formData);
  }
}
