import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Ajout de FormsModule
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Ajout de FormsModule dans les imports
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null; // Ajout de selectedBook

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }

  deleteBook(book: Book): void {
    if (book.id && confirm(`Supprimer le livre "${book.title}" ?`)) {
      this.bookService.deleteBook(book.id).subscribe(() => {
        this.loadBooks(); // recharge la liste après suppression
      });
    }
  }

  editBook(book: Book): void {
    this.selectedBook = { ...book }; // Clone le livre sélectionné pour éviter les effets de bord
  }

  updateBook(): void {
    if (this.selectedBook && this.selectedBook.id) {
      this.bookService.updateBook(this.selectedBook.id, this.selectedBook).subscribe(() => {
        this.selectedBook = null; // Réinitialiser après modification
        this.loadBooks(); // Recharge la liste des livres
      });
    }
  }
}
