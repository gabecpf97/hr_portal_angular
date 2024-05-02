import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private loginUrl = 'http://127.0.0.1:3000/auth/login';

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    // Remove the token and username from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    // redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
