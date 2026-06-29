import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Auth } from '../auth/auth';

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
  private auth = inject(Auth);
  private router = inject(Router);

  plans = signal<Plan[]>([]);

  ngOnInit() {
    this.http
      .get<Plan[]>(`${environment.apiUrl}/api/plans`)
      .subscribe((data) => this.plans.set(data));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}