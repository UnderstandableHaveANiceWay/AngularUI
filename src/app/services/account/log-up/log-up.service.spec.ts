import { TestBed } from '@angular/core/testing';

import { LogUpService } from './log-up.service';

describe('LogUpService', () => {
  let service: LogUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
