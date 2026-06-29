import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-plan-new',
  imports: [],
  templateUrl: './plan-new.html',
  styleUrl: './plan-new.css',
})
export class PlanNew {
  private http = inject(HttpClient);
  private router = inject(Router);

  title = signal('');
  description = signal('');
  startDate = signal('');

  save() {
    const body = {
      title: this.title(),
      description: this.description(),
      startDate: this.startDate(),
    };

    this.http
      .post(`${environment.apiUrl}/api/plans`, body)
      .subscribe(() => this.router.navigate(['/plans']));
  }
}