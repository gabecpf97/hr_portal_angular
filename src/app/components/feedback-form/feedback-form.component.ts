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
  @Input() handleSubmit: (value: any) => void;
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

  onSubmit = (): void => {
    this.handleSubmit(this.form.value);
  };

  ngOnInit(): void {}
}
