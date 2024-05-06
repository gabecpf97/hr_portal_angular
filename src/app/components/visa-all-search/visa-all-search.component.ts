import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { visa } from 'src/app/interfaces/visa';
import { VisaService } from 'src/app/services/visa.service';
import { visaActions } from 'src/app/store/visa/visa.actions';
import { selectByName, selectVisaIds } from 'src/app/store/visa/visa.selector';

@Component({
  selector: 'app-visa-all-search',
  templateUrl: './visa-all-search.component.html',
  styleUrls: ['./visa-all-search.component.css'],
})
export class VisaAllSearchComponent implements OnInit {
  visaList$: Observable<string[]>;
  form: FormGroup;

  constructor(
    private visaService: VisaService,
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.visaList$ = this.store.pipe(select(selectVisaIds));
    this.form = this.fb.group({
      query: ['', Validators.required],
    });
    this.form.get('query')?.valueChanges.subscribe((value) => {
      this.visaList$ = this.store.pipe(select(selectByName(value)));
    });
  }

  ngOnInit(): void {
    this.visaService.getVisaAll('').subscribe((theList) => {
      if (theList) {
        this.store.dispatch(visaActions.addall({ visaList: theList }));
      }
    });
  }
}
