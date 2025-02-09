import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'http://localhost:8012/api/v1/posts';
  constructor(private http: HttpClient) { }

  getPosts(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(this.postsUrl, { params });
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
