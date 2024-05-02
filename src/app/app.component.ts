import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hr_portal_angular';
  constructor(private router: Router, public authService: AuthService) {}
  get username(): string | null {
    return this.authService.getUsername();
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    // Remove the token and username from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    // redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
