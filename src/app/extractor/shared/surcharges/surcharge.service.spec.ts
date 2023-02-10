import { TestBed, inject } from '@angular/core/testing';

import { SurchargeService } from './surcharge.service';

describe('SurchargeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurchargeService]
    });
  });

  it('should be created', inject([SurchargeService], (service: SurchargeService) => {
    expect(service).toBeTruthy();
  }));
});
