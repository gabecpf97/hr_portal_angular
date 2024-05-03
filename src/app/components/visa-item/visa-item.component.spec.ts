import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaItemComponent } from './visa-item.component';

describe('VisaItemComponent', () => {
  let component: VisaItemComponent;
  let fixture: ComponentFixture<VisaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
