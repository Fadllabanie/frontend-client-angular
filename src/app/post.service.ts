import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getPosts() {
    // API call to retrieve posts
  }

  addPost(post: any) {
    // API call to add a new post
  }

  updatePost(post: any) {
    // API call to update a post
  }

  deletePost(id: number) {
    // API call to delete a post
  }
}
