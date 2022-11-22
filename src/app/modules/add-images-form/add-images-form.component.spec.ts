import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagesFormComponent } from './add-images-form.component';

describe('AddImagesFormComponent', () => {
  let component: AddImagesFormComponent;
  let fixture: ComponentFixture<AddImagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddImagesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
