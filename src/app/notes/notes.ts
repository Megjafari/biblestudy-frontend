import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface Note {
  id: number;
  content: string;
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  createdAt: string;
}

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  notes = signal<Note[]>([]);

  ngOnInit() {
    this.http
      .get<Note[]>(`${environment.apiUrl}/api/notes`)
      .subscribe((data) => this.notes.set(data));
  }

  readInContext(note: Note) {
    this.router.navigate(['/reader', note.book, note.chapter], {
      queryParams: { verse: note.startVerse },
    });
  }

  deleteNote(note: Note) {
    this.http
      .delete(`${environment.apiUrl}/api/notes/${note.id}`)
      .subscribe(() => this.notes.set(this.notes().filter((n) => n.id !== note.id)));
  }
}