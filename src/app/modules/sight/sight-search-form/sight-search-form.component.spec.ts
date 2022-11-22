import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightSearchFormComponent } from './sight-search-form.component';

describe('SightSearchFormComponent', () => {
  let component: SightSearchFormComponent;
  let fixture: ComponentFixture<SightSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SightSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SightSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
