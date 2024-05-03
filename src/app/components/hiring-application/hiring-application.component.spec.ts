import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringApplicationComponent } from './hiring-application.component';

describe('HiringApplicationComponent', () => {
  let component: HiringApplicationComponent;
  let fixture: ComponentFixture<HiringApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiringApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
