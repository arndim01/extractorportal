import { TestBed, inject } from '@angular/core/testing';

import { RouteProgressService } from './route-progress.service';

describe('RouteProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteProgressService]
    });
  });

  it('should be created', inject([RouteProgressService], (service: RouteProgressService) => {
    expect(service).toBeTruthy();
  }));
});
