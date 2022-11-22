import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { IReview } from 'src/app/data/models/reviews/app-review';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationService } from 'src/app/services/account/authentication/authentication.service';
import { ReviewPaginatorComponent } from '../review-paginator/review-paginator.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    TextFieldModule,
    MatTooltipModule,
    ReviewPaginatorComponent
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @ViewChild(ReviewPaginatorComponent, {static: false}) paginator?: ReviewPaginatorComponent;

  @Input() sight?: ISight;
  
  starCount: number = 5;
  rating: number = 1;
  ratingArr: number[] = [];

  reviews: IReview[] = [];
  pageReviews: IReview[] = [];
  pageReviewsSize: number = 3;

  reviewGroup: FormGroup = new FormGroup({
    text: new FormControl('')
  });

  constructor(
    private reviewsService: ReviewsService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < this.starCount; ++i) {
      this.ratingArr.push(i);
    }

    this.loadReviews();
  }

  changeReviewPage(reviews: IReview[]): void {
    this.pageReviews = reviews;
  }

  loadReviews(): void {
    this.reviewsService.getReviewsOfSight(this.sight?.id ?? 0)
      .subscribe({
        next: (reviews) => {
          this.reviews = reviews;
          this.pageReviews = reviews.slice(0, this.pageReviewsSize);
        }
      });
  }

  sendReview(): void {
    this.reviewsService.sendReview({
      text: this.reviewGroup.controls['text'].value,
      rating: this.rating,
      username: 'user',
      sightId: this.sight?.id ?? 0
    })
    .subscribe({
      next: () => {
        this.reviewGroup.controls['text'].setValue('');
        this.rating = 1;

        this.pageReviews = this.reviews.slice(0, this.pageReviewsSize);
        this.paginator?.reset();

        this.loadReviews();
      }
    });
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  
  onClick(rating:number) {
    this.rating = rating;
    return false;
  }

  userIsLogged(): boolean {
    return this.authenticationService.isLoggedIn();
  }

}
