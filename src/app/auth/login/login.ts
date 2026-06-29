import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  error = signal('');

  submit() {
    this.auth.login(this.username(), this.password()).subscribe({
      next: () => this.router.navigate(['/plans']),
      error: () => this.error.set('Invalid username or password'),
    });
  }
}