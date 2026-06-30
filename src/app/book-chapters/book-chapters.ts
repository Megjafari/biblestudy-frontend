import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { bookInfo, BookInfo } from './book-info';

interface Book {
  id: string;
  name: string;
  testament: string;
}

@Component({
  selector: 'app-book-chapters',
  imports: [],
  templateUrl: './book-chapters.html',
  styleUrl: './book-chapters.css',
})
export class BookChapters implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  book = signal('');
  bookName = signal('');
  chapters = signal<number[]>([]);
  info = signal<BookInfo | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const book = params['book'];
      this.book.set(book);
      this.info.set(bookInfo[book] ?? null);

      this.http
        .get<number[]>(`${environment.apiUrl}/api/bible/books/${book}/chapters?translation=kjv`)
        .subscribe((data) => this.chapters.set(data));

      this.http
        .get<Book[]>(`${environment.apiUrl}/api/bible/books?translation=kjv`)
        .subscribe((books) => {
          const match = books.find((b) => b.id === book);
          this.bookName.set(match ? match.name : book);
        });
    });
  }

  openChapter(chapter: number) {
    this.router.navigate(['/reader', this.book(), chapter]);
  }
}