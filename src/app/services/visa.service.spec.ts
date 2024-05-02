import { TestBed } from '@angular/core/testing';

import { VisaService } from './visa.service';

describe('VisaService', () => {
  let service: VisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
