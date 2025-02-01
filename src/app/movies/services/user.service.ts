import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.API_URL;
  public headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };


  constructor(
    private http: HttpClient
  ) { }

  createUserWithImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/new`, formData);
  }

  login(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, formData, { withCredentials: true });
  }
  

  userInformation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/getUserInfo`, { withCredentials: true });
  }
}
