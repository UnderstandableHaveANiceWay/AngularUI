import { TestBed } from '@angular/core/testing';

import { SightService } from './sights.service';

describe('SightService', () => {
  let service: SightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
