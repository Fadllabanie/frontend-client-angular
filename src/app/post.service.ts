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

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.postsUrl}/${id}`);
  }
  
  likePost(postId: number): Observable<any> {
    return this.http.post<any>(`${this.postsUrl}/${postId}/like`, {});
  }
  dislikePost(postId: number): Observable<any> {
    return this.http.post<any>(`${this.postsUrl}/${postId}/dislike`, {});
  }

  addPost(post: any) {
    return this.http.post<any>(this.postsUrl, post);
  }

  updatePost(id: number, postData: { title: string; content: string }): Observable<any> {
    return this.http.put(`${this.postsUrl}/${id}`, postData);
  }
  
  deletePost(postId: number) {
    return this.http.delete<any>(`${this.postsUrl}/${postId}`);
  }


}
