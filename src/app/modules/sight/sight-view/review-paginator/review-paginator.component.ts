import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { IReview } from 'src/app/data/models/reviews/app-review';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-paginator',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
  ],
  templateUrl: './review-paginator.component.html',
  styleUrls: ['./review-paginator.component.css']
})
export class ReviewPaginatorComponent implements OnInit {

  @Input() pageSize: number = 0;
  @Input() reviews: IReview[] = [];

  @Output() pageChangeEvent: EventEmitter<IReview[]> = new EventEmitter<IReview[]>();

  startIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  reset(): void {
    this.startIndex = 0;
  }

  previous(): void {

    let reviews: IReview[];

    if (this.startIndex - this.pageSize >= this.pageSize) {

      this.startIndex -= this.pageSize;
      reviews = this.reviews.slice(this.startIndex, this.startIndex + this.pageSize);

    } else {

      reviews = this.reviews.slice(0, this.startIndex);
      this.startIndex = 0;

    }

    this.pageChangeEvent.emit(reviews);
  }

  next(): void {

    let reviews: IReview[];

    if (this.startIndex - this.pageSize <= this.reviews.length) {

      reviews = this.reviews.slice(this.startIndex, this.startIndex + this.pageSize);
      this.startIndex += this.pageSize;

    } else {

      reviews = this.reviews.slice(this.startIndex, this.reviews.length);
      this.startIndex = this.reviews.length;

    }

    this.pageChangeEvent.emit(reviews);
  }

}
