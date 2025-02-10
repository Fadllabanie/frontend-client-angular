import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule]  
})

export class UpdatePostComponent implements OnInit {
  postForm: FormGroup;
  postId: number = 0;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id']; // '+' converts the parameter to a number
      this.loadPost(this.postId);
    });
  }

  loadPost(id: number): void {
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.postForm.patchValue({
          title: post.data.title,
          content: post.data.content
        });
      },
      error: (error) => console.error('Error loading post:', error)
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.postService.updatePost(this.postId, this.postForm.value).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
          alert('Post updated successfully');
        },
        error: (error) => alert('Error updating post: ' + error)
      });
    }
  }
}
