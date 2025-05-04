import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Version classique si le backend répond bien du JSON
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // --- Si jamais tu as encore "Http failure during parsing" ---
  // Utilise cette version à la place, qui parse manuellement la réponse :
  /*
  getBooks(): Observable<Book[]> {
    return this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
      map(text => JSON.parse(text))
    );
  }
  */

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }
}
