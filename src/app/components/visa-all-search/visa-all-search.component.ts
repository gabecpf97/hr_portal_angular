import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visa } from 'src/app/interfaces/visa';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-visa-all-search',
  templateUrl: './visa-all-search.component.html',
  styleUrls: ['./visa-all-search.component.css'],
})
export class VisaAllSearchComponent implements OnInit {
  visaList: visa[];
  form: FormGroup;

  constructor(private visaService: VisaService, private fb: FormBuilder) {
    this.visaList = [];
    this.form = this.fb.group({
      query: ['', Validators.required],
    });
  }

  handleSearch(): void {
    this.visaService
      .getVisaAll(this.form.get('query')?.value)
      .subscribe((theList) => {
        if (theList) {
          this.visaList = theList;
        }
      });
  }

  ngOnInit(): void {
    this.visaService.getVisaAll('').subscribe((theList) => {
      if (theList) {
        this.visaList = theList;
      }
    });
  }
}
