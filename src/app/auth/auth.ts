import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap, map } from 'rxjs';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);

  isLoggedIn = signal(this.hasToken());

  register(email: string, username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/api/auth/register`, { email, username, password })
      .pipe(tap((res) => this.storeTokens(res)));
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, { username, password })
      .pipe(tap((res) => this.storeTokens(res)));
  }

  logout(): void {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      this.http.post(`${environment.apiUrl}/api/auth/logout`, { refreshToken }).subscribe();
    }
    this.clearTokens();
  }

  refresh(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/api/auth/refresh`, { refreshToken })
      .pipe(
        tap((res) => this.storeTokens(res)),
        map((res) => res.accessToken),
      );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private storeTokens(res: AuthResponse): void {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    this.isLoggedIn.set(true);
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.isLoggedIn.set(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}