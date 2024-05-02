import { Component, Input, OnInit } from '@angular/core';
import { visa } from 'src/app/interfaces/visa';

@Component({
  selector: 'app-visa-item',
  templateUrl: './visa-item.component.html',
  styleUrls: ['./visa-item.component.css'],
})
export class VisaItemComponent implements OnInit {
  @Input() visa: visa;
  constructor() {}

  ngOnInit(): void {}
}
