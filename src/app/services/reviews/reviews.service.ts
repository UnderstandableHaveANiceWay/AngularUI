import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReview } from 'src/app/data/models/reviews/app-review';
import { IReviewUpdate } from 'src/app/data/models/reviews/app-review-update';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviewsOfSight(sightId: number): Observable<IReview[]> {
    return this.http.get<IReview[]>(`/api/reviews/sight/${sightId}`);
  }

  sendReview(reviewUpdate: IReviewUpdate): Observable<IReview> {
    return this.http.post<IReview>('/api/reviews', reviewUpdate);
  }
}