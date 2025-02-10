import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule]  
})
export class NewPostComponent {
  postForm: FormGroup;
 
  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.postService.addPost(this.postForm.value).subscribe({
        next: (response) => {
          console.log('Post created successfully', response);
          alert('Post create successfully');

          this.router.navigate(['/posts']);
          // Handle further actions like redirection or display success message
        },
        error: (error) => {
          console.error('Post creation failed', error);
          // Handle errors, show user feedback
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
