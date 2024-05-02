import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      status: ['', Validators.required],
      feedback: ['', Validators.required],
    });
  }

  handleSubmit = (): void => {
    console.log('Form submitted:', this.form.value);
  };

  ngOnInit(): void {}
}
