import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySearchFormComponent } from './city-search-form.component';

describe('CitySearchFormComponent', () => {
  let component: CitySearchFormComponent;
  let fixture: ComponentFixture<CitySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CitySearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
