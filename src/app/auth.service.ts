import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:8765/fawrybook-auth/api/v1/auth/register';
  private loginUrl = 'http://localhost:8015/api/v1/auth/login';


  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials, {
      withCredentials: true 
    });
  }

  register(user: { username: string, password: string, confirmPassword: string }) {
    return this.http.post<any>(this.registerUrl, user)
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(() => new Error('Error in registration process'));
        })
      );
  }
}
