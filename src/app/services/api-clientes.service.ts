import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientesService {

  private apiUsers = 'https://jsonplaceholder.typicode.com/users';
  private apiPosts = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  // ===== USUARIOS =====
  getUsers(): Observable<any> {
    return this.http.get(this.apiUsers);
  }

  AddUser(user: any): Observable<any> {
    return this.http.post(this.apiUsers, user);
  }

  // ===== POSTS =====
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiPosts);
  }

  createPost(data: any): Observable<any> {
    return this.http.post(this.apiPosts, data);
  }
}
