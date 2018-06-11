import { TestBed, inject } from '@angular/core/testing';

import { GrupaService } from './grupa.service';

describe('GrupaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrupaService]
    });
  });

  it('should be created', inject([GrupaService], (service: GrupaService) => {
    expect(service).toBeTruthy();
  }));
});
