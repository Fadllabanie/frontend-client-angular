import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Add this import

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule]  
})
export class LoginComponent {
  loginForm: FormGroup;
 
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register(): void {
    this.router.navigate(['/register']);
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          this.router.navigate(['/posts']);
         
        },
        error: (error) => {
          console.error('Login failed', error);
         
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
