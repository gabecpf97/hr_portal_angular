import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { visa } from '../interfaces/visa';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  private url = 'http://localhost:3000/visa';

  constructor(private http: HttpClient) {}

  getVisaInProgess(): Observable<visa[]> {
    return this.http.get<any>(`${this.url}/in-process`).pipe(
      catchError((err) => {
        console.log('error in fetching in-progress visa', err);
        return of([]);
      }),
      map((response: { requests: visa[] }) => {
        if (response && response.requests) {
          return response.requests;
        } else {
          return [];
        }
      })
    );
  }

  getVisaAll(query: string): Observable<visa[]> {
    return this.http.get<any>(`${this.url}/${query}`).pipe(
      catchError((err) => {
        console.log('error in fetching all visa', err);
        return of([]);
      }),
      map((response: { requests: visa[] }) => {
        if (response && response.requests) {
          return response.requests;
        } else {
          return [];
        }
      })
    );
  }
}
