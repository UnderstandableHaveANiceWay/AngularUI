import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPaginatorComponent } from './review-paginator.component';

describe('ReviewPaginatorComponent', () => {
  let component: ReviewPaginatorComponent;
  let fixture: ComponentFixture<ReviewPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReviewPaginatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
