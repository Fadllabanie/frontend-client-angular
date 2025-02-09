// posts.component.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private postService: PostService) { }

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

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.loadPosts(newPage);
    }
  }
}