import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { CommonModule ,} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormGroup, ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule,FormsModule]  
})

export class PostDetailsComponent implements OnInit {
  post: any;
  error: string | undefined;
  postId: number = 0;
  newCommentText: string = ''; 
    data: any; 
    
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = +params['id']; 
      this.loadPost(postId);

    });
  }

  loadPost(id: number): void {
    this.postService.getPostById(id).subscribe({
      next: (response) => {
        console.log('Post Data:', response);
        this.post = response.data; 
      },
      error: (err) => {
        this.error = 'Failed to load post.';
        console.error('Error loading post:', err);
      }
    });
  }
  addComment(): void {
    this.postService.addComment(this.post.id, this.newCommentText).subscribe({
      next: (response) => {
        console.log('response Data:', response); 
        this.newCommentText = ''; 
        this.loadPost(this.post.id);

      },
      error: (error) => console.error('Error adding comment:', error)
    });
  }
  
  deleteComment(commentId: number): void {
    this.postService.deleteComment(commentId).subscribe({
      next: () => {
        this.loadPost(this.post.id);
      },
      error: (error) => {
        const errorResponse = error.error;
        alert(`Error deleting comment: ${errorResponse.error}`);
        console.error('Error deleting comment:', error);
      }
    });
  }
}
