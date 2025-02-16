import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable , tap} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:8015/api/v1/auth/register';
  private loginUrl = 'http://localhost:8015/api/v1/auth/login';
  private readonly TOKEN_KEY = 'auth_token';


  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response.data?.token) {
            this.setToken(response.data.token);
          }
        })
      );
  }

  register(user: { username: string, password: string, confirmPassword: string }) {
    return this.http.post<any>(this.registerUrl, user, { withCredentials: true })
    .pipe(
      tap(response => {
        if (response.data?.token) {
          this.setToken(response.data.token);
        }
      })
    );
  }


 
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
