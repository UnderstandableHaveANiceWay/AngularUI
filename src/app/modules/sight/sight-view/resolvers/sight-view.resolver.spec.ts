import { TestBed } from '@angular/core/testing';

import { SightViewResolver } from './sight-view.resolver';

describe('SightViewResolver', () => {
  let resolver: SightViewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SightViewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
