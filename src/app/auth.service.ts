import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:8765/fawrybook-auth/api/v1/auth/register';
  private loginUrl = 'http://localhost:8765/fawrybook-auth/api/v1/auth/login';

  
  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }) {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  register(user: { email: string, password: string, confirmPassword: string }) {
    return this.http.post<any>(this.registerUrl, user)
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(() => new Error('Error in registration process'));
        })
      );
  }
}
