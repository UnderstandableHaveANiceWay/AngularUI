import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySearchFormComponent } from './country-search-form.component';

describe('CountrySearchFormComponent', () => {
  let component: CountrySearchFormComponent;
  let fixture: ComponentFixture<CountrySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CountrySearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
