import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  book: Book = { title: '', author: '', isbn: '' };

  constructor(private bookService: BookService) {}

  onSubmit(): void {
    this.bookService.addBook(this.book).subscribe(() => {
      alert('Livre ajouté avec succès !');
      this.book = { title: '', author: '', isbn: '' };
    });
  }
}
