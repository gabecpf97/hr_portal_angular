import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {}

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
