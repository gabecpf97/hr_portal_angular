import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Address, Landlord, Furniture } from '../interfaces/housing';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  private apiURL = 'http://localhost:3000/housing';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('JWT token not found in local storage');
    }

    // Set the headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Set the Authorization Bearer token
      })
    };
    return httpOptions;
  }

  getAllHousing(): Observable<any> {
    return this.http.get<{allHousing: any[]}>(this.apiURL, this.getHttpOptions())
    .pipe(
      map(response => response.allHousing), // Ensure this matches the actual key in the response
      catchError(error => {
        console.error('An error occurred:', error);
        throw new Error('Something bad happened; please try again later.');
      })
    );;
  }


  getHouseById(id: string): Observable<any> {
    return this.http.get<{ house: any }>(`http://localhost:3000/housing/${id}`, this.getHttpOptions());
  }

  addHousing(housingData: any): Observable<any>{
    return this.http.post('http://localhost:3000/housing', housingData, this.getHttpOptions())
  }

  deleteHousing(id: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/housing/${id}`,this.getHttpOptions())
  }

  addComment(reportId: string, comment: string): Observable<any> {
    console.log('comment in service', comment)
    return this.http.post(`http://localhost:3000/housing/reports/${reportId}/comments`, { "description":comment }, this.getHttpOptions());
  }

  getUserInfo(id: string): Observable<any> {
    return this.http.post(
      `http://localhost:3000/housing/reports/getUserInfo`, 
      {"userIdfront": id}, 
      this.getHttpOptions())
      .pipe(
        catchError(error => {
          throw 'Error in getting user info: ' + error;
        })
      );
  }

  updateReportStatus(reportId: string, newStatus: string): Observable<any> {
    return this.http.post(
      `http://localhost:3000/housing/reports/updateStatus`, 
      {"reportId": reportId,
        "newStatus": newStatus
      }, 
      this.getHttpOptions())
      .pipe(
        catchError(error => {
          throw 'Error in getting user info: ' + error;
        })
      );
  }
  
}
