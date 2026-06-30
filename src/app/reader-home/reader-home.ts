import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface Book {
  id: string;
  name: string;
  testament: string;
}

@Component({
  selector: 'app-reader-home',
  imports: [],
  templateUrl: './reader-home.html',
  styleUrl: './reader-home.css',
})
export class ReaderHome implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  books = signal<Book[]>([]);
  chapters = signal<number[]>([]);
  selectedBook = signal<Book | null>(null);
  lastRead = signal<{ book: string; chapter: number } | null>(null);

  ngOnInit() {
    const saved = localStorage.getItem('lastRead');
    if (saved) {
      this.lastRead.set(JSON.parse(saved));
    }

    this.http
      .get<Book[]>(`${environment.apiUrl}/api/bible/books?translation=kjv`)
      .subscribe((data) => this.books.set(data));
  }

  oldTestament(): Book[] {
    return this.books().filter((b) => b.testament === 'OT');
  }

  newTestament(): Book[] {
    return this.books().filter((b) => b.testament === 'NT');
  }

  selectBook(book: Book) {
    this.selectedBook.set(book);
    this.chapters.set([]);
    this.http
      .get<number[]>(`${environment.apiUrl}/api/bible/books/${book.id}/chapters?translation=kjv`)
      .subscribe((data) => this.chapters.set(data));
  }

  openChapter(chapter: number) {
    const book = this.selectedBook();
    if (book) {
      this.router.navigate(['/reader', book.id, chapter]);
    }
  }

  continueReading() {
    const last = this.lastRead();
    if (last) {
      this.router.navigate(['/reader', last.book, last.chapter]);
    }
  }
}