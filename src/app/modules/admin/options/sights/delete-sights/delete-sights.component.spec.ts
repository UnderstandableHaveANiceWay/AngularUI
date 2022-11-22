import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSightsComponent } from './delete-sights.component';

describe('DeleteSightsComponent', () => {
  let component: DeleteSightsComponent;
  let fixture: ComponentFixture<DeleteSightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DeleteSightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
