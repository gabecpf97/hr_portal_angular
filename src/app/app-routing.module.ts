import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployeeProfilesComponent } from './employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './hiring-management/hiring-management.component';
import { HousingManagementComponent } from './housing-management/housing-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee-profiles', component: EmployeeProfilesComponent },
  { path: 'visa-status-management', component: VisaStatusManagementComponent },
  { path: 'hiring-management', component: HiringManagementComponent },
  { path: 'housing-management', component: HousingManagementComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
