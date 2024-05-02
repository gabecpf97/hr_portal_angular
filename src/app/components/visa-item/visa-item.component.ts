import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { visa } from 'src/app/interfaces/visa';

@Component({
  selector: 'app-visa-item',
  templateUrl: './visa-item.component.html',
  styleUrls: ['./visa-item.component.css'],
})
export class VisaItemComponent implements OnInit {
  @Input() visa: visa;
  notiSent: boolean = false;
  constructor(private http: HttpClient) {}

  handleSendNoti(): void {
    this.http
      .post<any>(`http://localhost:3000/visa/${this.visa._id}/notification`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .pipe(
        catchError((err) => {
          console.log(`error in send notification `, err.error.message);
          return of('');
        })
      )
      .subscribe((response: { message: string }) => {
        if (response && response.message) {
          this.notiSent = true;
        }
      });
  }

  ngOnInit(): void {}
}
