import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEntireProfileComponent } from './employee-entire-profile.component';

describe('EmployeeEntireProfileComponent', () => {
  let component: EmployeeEntireProfileComponent;
  let fixture: ComponentFixture<EmployeeEntireProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeEntireProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEntireProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
