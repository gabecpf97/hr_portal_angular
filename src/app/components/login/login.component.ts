import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { addUser } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['']);
    }
  }

  onSubmit(form: any) {
    const { username, password } = form.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        if (response.isHR) {
          localStorage.setItem('authToken', response.token);
          const user: User = { username: response.username };
          this.store.dispatch(addUser({ user }));
          this.router.navigate(['']);
        } else {
          alert('Access Denied: You must be an HR to log in.');
        }
      },
      error: (error) => {
        alert(error.error.message);
        // console.error('Login failed', error.error.message);
      },
    });
  }
}
