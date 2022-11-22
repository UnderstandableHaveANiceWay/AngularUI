import { TestBed } from '@angular/core/testing';

import { LogUpGuard } from './log-up.guard';

describe('LogUpGuard', () => {
  let guard: LogUpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogUpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
