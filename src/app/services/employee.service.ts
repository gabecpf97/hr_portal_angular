import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://127.0.0.1:3000/users/';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching employees:', error);
        return of([]); // Return an empty array on error
      }),
      map((response: any) => {
        if (
          response &&
          response.applications &&
          response.applications.length > 0
        ) {
          return response.applications.map((application: any) => {
            return {
              id: application._id,
              firstName: application.firstName,
              lastName: application.lastName,
              middleName: application.middleName,
              preferredName: application.preferredName,
              SSN: application.SSN,
              DOB: application.DOB,
              gender: application.gender,
              citizenship: application.citizenship,
              email: application.email,
              cellPhone: application.cellPhone,
              workPhone: application.workPhone,
              address: application.address,
              car: application.car,
              workAuthorization: application.workAuthorization,
              driverLicense: application.driverLicense,
              reference: application.reference,
              emergency: application.emergency,
              status: application.status,
              picture: application.picture,
              feedback: application.feedback,
            };
          });
        } else {
          return [];
        }
      })
    );
  }
}
