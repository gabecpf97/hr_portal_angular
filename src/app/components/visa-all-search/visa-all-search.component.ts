import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { visa } from 'src/app/interfaces/visa';
import { VisaService } from 'src/app/services/visa.service';
import { visaActions } from 'src/app/store/visa/visa.actions';

@Component({
  selector: 'app-visa-all-search',
  templateUrl: './visa-all-search.component.html',
  styleUrls: ['./visa-all-search.component.css'],
})
export class VisaAllSearchComponent implements OnInit {
  visaList: visa[];
  form: FormGroup;

  constructor(
    private visaService: VisaService,
    private fb: FormBuilder,
    private store: Store<any>
  ) {
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
        this.store.dispatch(visaActions.addall({ visaList: theList }));
      }
    });
  }
}
