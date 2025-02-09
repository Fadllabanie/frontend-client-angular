import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }) {
    // API call to backend to authenticate user
  }

  register(user: { email: string, password: string, confirmPassword: string }) {
    // API call to backend to register user
  }
}
