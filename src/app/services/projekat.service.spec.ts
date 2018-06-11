import { TestBed, inject } from '@angular/core/testing';

import { ProjekatService } from './projekat.service';

describe('ProjekatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjekatService]
    });
  });

  it('should be created', inject([ProjekatService], (service: ProjekatService) => {
    expect(service).toBeTruthy();
  }));
});
