import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface Verse {
  verse: number;
  text: string;
}

interface Chapter {
  reference: string;
  book: string;
  chapter: number;
  translation: string;
  copyright: string;
  verses: Verse[];
}

@Component({
  selector: 'app-reader',
  imports: [],
  templateUrl: './reader.html',
  styleUrl: './reader.css',
})
export class Reader implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  chapter = signal<Chapter | null>(null);
  error = signal('');
  translation = signal('kjv');
  highlightVerse = signal<number | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const book = params['book'];
      const chapterNum = params['chapter'];
      this.load(book, chapterNum);
    });

    this.route.queryParams.subscribe((q) => {
      this.highlightVerse.set(q['verse'] ? Number(q['verse']) : null);
    });
  }

  load(book: string, chapter: string) {
    this.error.set('');
    this.http
      .get<Chapter>(`${environment.apiUrl}/api/bible/${book}/${chapter}?translation=${this.translation()}`)
      .subscribe({
        next: (data) => {
          this.chapter.set(data);
          this.scrollToVerse();
        },
        error: () => this.error.set('Could not load chapter'),
      });
  }

  private scrollToVerse() {
    const verse = this.highlightVerse();
    if (!verse) return;
    setTimeout(() => {
      document.getElementById('v' + verse)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  changeTranslation(value: string) {
    this.translation.set(value);
    const c = this.chapter();
    if (c) {
      this.load(c.book, String(c.chapter));
    }
  }
}