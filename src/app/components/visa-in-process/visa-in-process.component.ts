import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { visa } from 'src/app/interfaces/visa';
import {
  selectInProcessIds,
  selectVisaIds,
} from 'src/app/store/visa/visa.selector';

@Component({
  selector: 'app-visa-in-process',
  templateUrl: './visa-in-process.component.html',
  styleUrls: ['./visa-in-process.component.css'],
})
export class VisaInProcessComponent implements OnInit {
  theList$: Observable<string[]>;
  private visaListSubscription: Subscription;
  visaList: string[] = []; // To store the visa list

  constructor(private store: Store<visa[]>) {}

  ngOnInit(): void {
    this.theList$ = this.store.pipe(select(selectInProcessIds));
    this.visaListSubscription = this.theList$.subscribe((visaList) => {
      this.visaList = [...visaList];
    });
  }
}
