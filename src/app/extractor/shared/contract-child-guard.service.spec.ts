import { TestBed, inject } from '@angular/core/testing';

import { ContractChildGuardService } from './contract-child-guard.service';

describe('ContractChildGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractChildGuardService]
    });
  });

  it('should be created', inject([ContractChildGuardService], (service: ContractChildGuardService) => {
    expect(service).toBeTruthy();
  }));
});
