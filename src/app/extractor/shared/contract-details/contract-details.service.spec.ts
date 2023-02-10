import { TestBed, inject } from '@angular/core/testing';

import { ContractDetailsService } from './contract-details.service';

describe('ContractDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractDetailsService]
    });
  });

  it('should be created', inject([ContractDetailsService], (service: ContractDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
