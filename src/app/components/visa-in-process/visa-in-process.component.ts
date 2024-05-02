import { Component, OnInit } from '@angular/core';
import { visa } from 'src/app/interfaces/visa';
import { VisaService } from 'src/app/services/visa.service';

@Component({
  selector: 'app-visa-in-process',
  templateUrl: './visa-in-process.component.html',
  styleUrls: ['./visa-in-process.component.css'],
})
export class VisaInProcessComponent implements OnInit {
  theList: visa[];

  constructor(private visaServices: VisaService) {
    this.theList = [];
  }

  ngOnInit(): void {
    this.visaServices.getVisaInProgess().subscribe((visaList) => {
      if (visaList) {
        this.theList = visaList;
      }
    });
  }
}
