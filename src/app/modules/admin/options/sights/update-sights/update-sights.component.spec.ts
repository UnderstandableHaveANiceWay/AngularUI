import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSightsComponent } from './update-sights.component';

describe('UpdateSightsComponent', () => {
  let component: UpdateSightsComponent;
  let fixture: ComponentFixture<UpdateSightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateSightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
