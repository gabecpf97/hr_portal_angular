import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hr_portal_angular';
  homeActive: boolean = false;
  employeeProfilesListActive: boolean = false;
  visaStatusManagementActive: boolean = false;
  hiringManagementActive: boolean = false;
  housingManagementActive: boolean = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.homeActive = event.url === '/';
        this.employeeProfilesListActive = event.url === '/employee-profiles';
        this.visaStatusManagementActive =
          event.url === '/visa-status-management';
        this.hiringManagementActive = event.url === '/hiring-management';
        this.housingManagementActive = event.url === '/housing-management';
      });
  }
  get username(): string | null {
    return this.authService.getUsername();
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
