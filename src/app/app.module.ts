import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';

import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { EmployeeProfilesComponent } from './components/employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HousingManagementComponent } from './components/housing-management/housing-management.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { FilterPipe } from './pipes/filter.pipe';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { visaReducer } from './store/visa/visa.reducer';
import { VisaInProcessComponent } from './components/visa-in-process/visa-in-process.component';
import { VisaAllSearchComponent } from './components/visa-all-search/visa-all-search.component';
import { VisaItemComponent } from './components/visa-item/visa-item.component';
import { EmployeeEntireProfileComponent } from './components/employee-entire-profile/employee-entire-profile.component';
import { HiringApplicationComponent } from './components/hiring-application/hiring-application.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { MatCardModule } from '@angular/material/card';
import { HousingDetailComponent } from './components/housing-detail/housing-detail.component';
import { MatSelectModule } from '@angular/material/select';

import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    EmployeeProfilesComponent,
    VisaStatusManagementComponent,
    HiringManagementComponent,
    HousingManagementComponent,
    FilterPipe,
    EmployeeEntireProfileComponent,
    HiringApplicationComponent,
    VisaInProcessComponent,
    VisaAllSearchComponent,
    VisaItemComponent,
    FeedbackFormComponent,
    HousingDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ user: userReducer, visa: visaReducer }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatGridListModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
