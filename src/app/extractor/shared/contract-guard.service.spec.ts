import { TestBed, inject } from '@angular/core/testing';

import { ContractGuardService } from './contract-guard.service';

describe('ContractGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractGuardService]
    });
  });

  it('should be created', inject([ContractGuardService], (service: ContractGuardService) => {
    expect(service).toBeTruthy();
  }));
});
