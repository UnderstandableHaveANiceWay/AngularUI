import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOptionsPageComponent } from './admin-options-page.component';

describe('AdminOptionsPageComponent', () => {
  let component: AdminOptionsPageComponent;
  let fixture: ComponentFixture<AdminOptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminOptionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
