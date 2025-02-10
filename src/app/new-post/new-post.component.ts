import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Add this import

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule]  
})
export class NewPostComponent {
  postForm: FormGroup;
 
  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    console.log('Initial Form Value:', this.postForm.value);
    console.log('Initial Form Status:', this.postForm.status);
  }

  
  movePost(): void {
    this.router.navigate(['/posts']);
  }


  onSubmit(): void {
  if (this.postForm.valid) {
    this.postService.addPost(this.postForm.value).subscribe({
      next: (response) => {
        console.log('Post created successfully', response);
        alert('Post created successfully');
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.error('Post creation failed', error);
      }
    });
  } else {
    this.postForm.markAllAsTouched();
    console.log('Form is not valid');
    console.log('Form Errors:', this.postForm.errors);
  }
  }
}
