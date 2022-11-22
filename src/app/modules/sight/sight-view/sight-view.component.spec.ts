import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightViewComponent } from './sight-view.component';

describe('SightViewComponent', () => {
  let component: SightViewComponent;
  let fixture: ComponentFixture<SightViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SightViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SightViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
