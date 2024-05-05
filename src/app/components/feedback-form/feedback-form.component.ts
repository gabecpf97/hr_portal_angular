import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { visa } from 'src/app/interfaces/visa';
import { visaActions } from 'src/app/store/visa/visa.actions';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  @Input() id: string;
  form: FormGroup;
  private url = 'http://localhost:3000/visa';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store
  ) {
    this.form = this.fb.group({
      status: ['', Validators.required],
      feedback: ['', Validators.required],
    });
  }

  handleSubmit = (): void => {
    console.log('Form submitted:', this.form.value);
    this.http
      .put<any>(`${this.url}/${this.id}/action`, this.form.value)
      .pipe(
        catchError((err) => {
          console.log('error in updating visa', this.id, err);
          return '';
        })
      )
      .subscribe((response: { visa: visa }) => {
        if (response && response.visa) {
          this.store.dispatch(visaActions.update({ newVisa: response.visa }));
        }
      });
  };

  ngOnInit(): void {
    console.log(this.id);
  }
}
