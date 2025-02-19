// posts.component.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(
    private postService: PostService,
    public authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(page: number = 0): void {
    this.postService.getPosts(page).subscribe({
      next: (response) => {
        this.posts = response.data.content;
        this.currentPage = response.data.number;
        this.totalPages = response.data.totalPages;
      },
      error: (err) => console.error('Error loading posts:', err)
    });
  }

  changePage(newPage: number, event: MouseEvent): void {
    event.preventDefault(); 
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.fetchPosts(this.currentPage); 

    }
  }
  fetchPosts(page: number): void {
   
    this.postService.getPosts(page).subscribe({
      next: (response) => {
        this.posts = response.data.content;
        this.currentPage = response.data.number;
        this.totalPages = response.data.totalPages;
      },
      error: (err) => console.error('Error loading posts:', err)
    });
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addPost(): void {
    this.router.navigate(['/posts/new']);
  }
  
  likePost(postId: number) {
    this.postService.likePost(postId).subscribe({
      next: (response) => {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
          this.posts[index].likes++;  
        }
        alert('Post liked successfully');

        console.log('Post liked successfully:', response);
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
  }
  dislikePost(postId: number) {
    this.postService.dislikePost(postId).subscribe({
      next: (response) => {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
          this.posts[index].likes--;  
        }
        alert('Post disliked successfully');
        console.log('Post disliked successfully:', response);
      },
      error: (error) => {
        alert('Error disliking post:'+error);

        console.error('Error disliking post:', error);
      }
    });
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe({
      next: (response) => {
        const index = this.posts.findIndex(post => post.id === postId);
        this.loadPosts(this.currentPage);
      
        console.log('Post deleted successfully:', response);
      },
      error: (error) => {
        const errorResponse = error.error;
        alert(`Error deleting post: ${errorResponse.error}`);
        console.error('Error disliking post:', error);
      }
    });
  }
  updatePost(postId: number) {
    this.router.navigate(['/posts/update', postId]);
  }

  openPostDetails(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  shareOnTwitter(title: string, content: string): void {
    const tweetText = encodeURIComponent(`New Post: ${title}\n\n${content}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, '_blank');
  }
}