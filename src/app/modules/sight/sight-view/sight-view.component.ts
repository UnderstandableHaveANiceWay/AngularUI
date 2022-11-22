import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SightImageSliderComponent } from '../sight-image-slider/sight-image-slider.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { ImageSlider } from 'src/app/data/image-slider/app-image-slider';
import { ISightImage } from 'src/app/data/models/sight-images/app-sight-image';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { SightImagesService } from 'src/app/services/sight-image/sight-images.service';
import { ReviewComponent } from './review/review.component';

@Component({
  selector: 'app-sight-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SightImageSliderComponent,
    ReviewComponent,
    AngularMaterialModule
  ],
  templateUrl: './sight-view.component.html',
  styleUrls: ['./sight-view.component.css']
})
export class SightViewComponent implements OnInit {

  sight!: ISight;
  imageSlider!: ImageSlider;

  constructor(
    private route: ActivatedRoute,
    private sightImagesService: SightImagesService
  ) { }

  ngOnInit(): void {
    this.loadSight();
  }

  loadSight(): void {
    this.route.data
    .pipe(
      switchMap((data) => this.loadSightImages(data['sight']))
    )
    .subscribe({
      next: (sightImages) => {
        let images: string[] = [];
        for (let sightImage of sightImages) {
          images.push(sightImage.fileUrl);
        }
        this.imageSlider = new ImageSlider(this.sight, images);
      }
    });
  }

  loadSightImages(sight: ISight): Observable<ISightImage[]> {
    this.sight = sight;
    return this.sightImagesService.getAllImagesOfSight(sight.id);
  }

}
