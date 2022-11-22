import { TestBed } from '@angular/core/testing';

import { AdminOptionsPageGuard } from './admin-options-page.guard';

describe('AdminOptionsPageGuard', () => {
  let guard: AdminOptionsPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOptionsPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
