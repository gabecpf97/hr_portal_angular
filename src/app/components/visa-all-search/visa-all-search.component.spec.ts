import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaAllSearchComponent } from './visa-all-search.component';

describe('VisaAllSearchComponent', () => {
  let component: VisaAllSearchComponent;
  let fixture: ComponentFixture<VisaAllSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaAllSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaAllSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
