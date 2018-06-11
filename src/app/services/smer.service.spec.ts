import { TestBed, inject } from '@angular/core/testing';

import { SmerService } from './smer.service';

describe('SmerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmerService]
    });
  });

  it('should be created', inject([SmerService], (service: SmerService) => {
    expect(service).toBeTruthy();
  }));
});
