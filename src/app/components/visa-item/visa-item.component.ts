import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, catchError, of } from 'rxjs';
import { visa } from 'src/app/interfaces/visa';
import { visaActions } from 'src/app/store/visa/visa.actions';
import { selectVisaById } from 'src/app/store/visa/visa.selector';

@Component({
  selector: 'app-visa-item',
  templateUrl: './visa-item.component.html',
  styleUrls: ['./visa-item.component.css'],
})
export class VisaItemComponent implements OnInit {
  @Input() visa: visa;
  @Input() visaId: string;
  currentVisa: Subscription | undefined;
  notiSent: boolean = false;
  constructor(private http: HttpClient, private store: Store<visa[]>) {}
  private url = 'http://localhost:3000/visa';

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

  handleSubmit = (value: any): void => {
    this.http
      .put<any>(`${this.url}/${this.visaId}/action`, value)
      .pipe(
        catchError((err) => {
          console.log('error in updating visa', this.visaId, err);
          return '';
        })
      )
      .subscribe((response: { visa: visa }) => {
        if (response && response.visa) {
          this.store.dispatch(visaActions.update({ newVisa: response.visa }));
          this.visa = { ...response.visa };
        }
      });
  };

  ngOnInit(): void {
    if (this.visaId) {
      this.currentVisa = this.store
        .select(selectVisaById(this.visaId))
        .subscribe({
          next: (visa) => {
            if (!visa) return;
            this.visa = visa;
          },
        });
    }
  }
}
