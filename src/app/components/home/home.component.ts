import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  isLoggedIn(): boolean {
    // Check if the auth token exists in local storage
    return !!localStorage.getItem('authToken');
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    // Remove the token from local storage
    localStorage.removeItem('authToken');
    // redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
