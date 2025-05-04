import { Component } from '@angular/core';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,           // Nécessaire pour les directives de base (*ngIf, *ngFor, etc.)
    HttpClientModule,       // Nécessaire pour les requêtes HTTP
    BookListComponent,
    BookFormComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {}
