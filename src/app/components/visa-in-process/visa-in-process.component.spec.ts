import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaInProcessComponent } from './visa-in-process.component';

describe('VisaInProcessComponent', () => {
  let component: VisaInProcessComponent;
  let fixture: ComponentFixture<VisaInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaInProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
