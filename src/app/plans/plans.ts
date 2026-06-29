import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// TEMP: hardcoded token until real auth is built. Never commit a real value.
const token = 'PASTE_TOKEN_HERE';

interface Plan {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  createdAt: string;
}

@Component({
  selector: 'app-plans',
  imports: [],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements OnInit {
  private http = inject(HttpClient);

  plans = signal<Plan[]>([]);

  ngOnInit() {
    this.http
      .get<Plan[]>(`${environment.apiUrl}/api/plans`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe((data) => this.plans.set(data));
  }
}