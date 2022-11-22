import { TestBed } from '@angular/core/testing';

import { CountrySearchResolver } from './country-search.resolver';

describe('CountrySearchResolver', () => {
  let resolver: CountrySearchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CountrySearchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
