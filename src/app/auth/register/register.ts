import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private auth = inject(Auth);
  private router = inject(Router);

  email = signal('');
  username = signal('');
  password = signal('');
  error = signal('');

  submit() {
    this.auth.register(this.email(), this.username(), this.password()).subscribe({
      next: () => this.router.navigate(['/plans']),
      error: () => this.error.set('Registration failed'),
    });
  }
}