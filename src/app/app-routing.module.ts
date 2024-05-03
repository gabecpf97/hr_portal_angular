import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployeeProfilesComponent } from './components/employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HousingManagementComponent } from './components/housing-management/housing-management.component';

import { HiringApplicationComponent } from './components/hiring-application/hiring-application.component';

import { HousingDetailComponent } from './components/housing-detail/housing-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'employee-profiles',
    component: EmployeeProfilesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visa-status-management',
    component: VisaStatusManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hiring-management',
    component: HiringManagementComponent,
    canActivate: [AuthGuard],
  },
  { path: 'hiring-application/:applicationId',
    component: HiringApplicationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'housing-management',
    component: HousingManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:id',
    component: HousingDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
