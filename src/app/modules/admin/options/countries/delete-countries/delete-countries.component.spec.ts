import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCountriesComponent } from './delete-countries.component';

describe('DeleteCountriesComponent', () => {
  let component: DeleteCountriesComponent;
  let fixture: ComponentFixture<DeleteCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DeleteCountriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
