import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSightsComponent } from './add-sights.component';

describe('AddSightsComponent', () => {
  let component: AddSightsComponent;
  let fixture: ComponentFixture<AddSightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddSightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
