import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientesService {

  // ===== BASE URL =====
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  // ===== OPCIONES HTTP =====
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // =============================
  // 🔵 MANEJO DE ERRORES GLOBAL
  // =============================
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del cliente:', error.error.message);
    } else {
      console.error(`Backend retornó código ${error.status}, body: `, error.error);
    }
    return throwError(() => 'Error en la comunicación con API');
  }

  // =============================
  // 🔵 CRUD USERS
  // =============================
  
  // GET ALL USERS
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // CREATE USER
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET USER BY ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // UPDATE USER
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE USER
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // =============================
  // 🔵 CRUD POSTS
  // =============================

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createPost(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}