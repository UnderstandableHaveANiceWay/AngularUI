import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightImageSliderComponent } from './sight-image-slider.component';

describe('SightImageSliderComponent', () => {
  let component: SightImageSliderComponent;
  let fixture: ComponentFixture<SightImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SightImageSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SightImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
