import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Component, inject, signal, OnInit, HostListener } from '@angular/core';

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

interface Highlight {
  id: number;
  color: string;
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
}

interface Note {
  id: number;
  content: string;
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
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

  chapter = signal<Chapter | null>(null);
  highlights = signal<Highlight[]>([]);
  notes = signal<Note[]>([]);
  error = signal('');
  translation = signal('kjv');
  highlightVerse = signal<number | null>(null);
  selectedNote = signal<Note | null>(null);
  noteDraft = signal<string>('');
  writingNote = signal(false);
  selectedHighlight = signal<Highlight | null>(null);

  // Drag selection state
  private dragging = signal(false);
  private dragStart = signal<number | null>(null);
  private dragEnd = signal<number | null>(null);
  menuVerses = signal<{ start: number; end: number } | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.load(params['book'], params['chapter']);
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
          localStorage.setItem('lastRead', JSON.stringify({ book: data.book, chapter: data.chapter }));
        },
        error: () => this.error.set('Could not load chapter'),
      });

    this.http
      .get<Highlight[]>(`${environment.apiUrl}/api/highlights?book=${book}&chapter=${chapter}`)
      .subscribe((data) => this.highlights.set(data));

    this.http
      .get<Note[]>(`${environment.apiUrl}/api/notes?book=${book}&chapter=${chapter}`)
      .subscribe((data) => this.notes.set(data));
  }

  startDrag(verse: number) {
    this.dragging.set(true);
    this.dragStart.set(verse);
    this.dragEnd.set(verse);
    this.menuVerses.set(null);
    this.writingNote.set(false);
    this.noteDraft.set('');
    this.selectedNote.set(null);
    this.selectedHighlight.set(null);
  }

  extendDrag(verse: number) {
    if (this.dragging()) {
      this.dragEnd.set(verse);
    }
  }

  endDrag() {
    if (!this.dragging()) return;
    this.dragging.set(false);
    const start = this.dragStart();
    const end = this.dragEnd();
    if (start === null || end === null) return;

    if (start === end) {
      const note = this.noteForVerse(start);
      if (note) {
        this.selectedNote.set(note);
        this.clearSelection();
        return;
      }
      const hl = this.highlights().find((h) => start >= h.startVerse && start <= h.endVerse);
      if (hl) {
        this.selectedHighlight.set(hl);
        this.clearSelection();
        return;
      }
    }

    this.menuVerses.set({ start: Math.min(start, end), end: Math.max(start, end) });
  }

  inDragRange(verse: number): boolean {
    const start = this.dragStart();
    const end = this.dragEnd();
    if (start === null || end === null) return false;
    return verse >= Math.min(start, end) && verse <= Math.max(start, end);
  }

  noteForVerse(verse: number): Note | null {
    return this.notes().find((n) => verse >= n.startVerse && verse <= n.endVerse) ?? null;
  }

  selectVerse(verse: number) {
    this.selectedNote.set(this.noteForVerse(verse));
  }

  closeNote() {
    this.selectedNote.set(null);
  }

  colorForVerse(verse: number): string | null {
    if (this.inDragRange(verse)) {
      return '#d0d0d0';
    }
    if (this.noteForVerse(verse)) {
      return '#cce5ff';
    }
    const match = this.highlights().find(
      (h) => verse >= h.startVerse && verse <= h.endVerse,
    );
    return match ? match.color : null;
  }

  clearSelection() {
    this.menuVerses.set(null);
    this.dragStart.set(null);
    this.dragEnd.set(null);
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('p') && !target.closest('.selection-menu')) {
      this.clearSelection();
    }
  }

  createHighlight() {
    const sel = this.menuVerses();
    const ch = this.chapter();
    if (!sel || !ch) return;

    this.http
      .post(`${environment.apiUrl}/api/highlights`, {
        color: 'yellow',
        book: ch.book,
        chapter: ch.chapter,
        startVerse: sel.start,
        endVerse: sel.end,
      })
      .subscribe(() => {
        this.load(ch.book, String(ch.chapter));
        this.clearSelection();
      });
  }

  startNote() {
    this.writingNote.set(true);
  }

  saveNote() {
    const sel = this.menuVerses();
    const ch = this.chapter();
    if (!sel || !ch || !this.noteDraft().trim()) return;

    this.http
      .post(`${environment.apiUrl}/api/notes`, {
        content: this.noteDraft(),
        book: ch.book,
        chapter: ch.chapter,
        startVerse: sel.start,
        endVerse: sel.end,
      })
      .subscribe(() => {
        this.load(ch.book, String(ch.chapter));
        this.noteDraft.set('');
        this.writingNote.set(false);
        this.clearSelection();
      });
  }

  deleteNote() {
    const note = this.selectedNote();
    const ch = this.chapter();
    if (!note || !ch) return;

    this.http
      .delete(`${environment.apiUrl}/api/notes/${note.id}`)
      .subscribe(() => {
        this.load(ch.book, String(ch.chapter));
        this.selectedNote.set(null);
      });
  }

  deleteHighlight() {
    const hl = this.selectedHighlight();
    const ch = this.chapter();
    if (!hl || !ch) return;

    this.http
      .delete(`${environment.apiUrl}/api/highlights/${hl.id}`)
      .subscribe(() => {
        this.load(ch.book, String(ch.chapter));
        this.selectedHighlight.set(null);
      });
  }

  changeTranslation(value: string) {
    this.translation.set(value);
    const c = this.chapter();
    if (c) {
      this.load(c.book, String(c.chapter));
    }
  }

  private scrollToVerse() {
    const verse = this.highlightVerse();
    if (!verse) return;
    setTimeout(() => {
      document.getElementById('v' + verse)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}