import { TestBed } from '@angular/core/testing';

import { HeroeServiceService } from './heroe-service.service';

describe('HeroeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroeServiceService = TestBed.get(HeroeServiceService);
    expect(service).toBeTruthy();
  });
});
