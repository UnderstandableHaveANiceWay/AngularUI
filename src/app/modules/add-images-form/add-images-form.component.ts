import { Component, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSlider } from 'src/app/data/image-slider/app-image-slider';
import { SightImageSliderComponent } from '../sight/sight-image-slider/sight-image-slider.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { EventEmitter } from '@angular/core';
import { ImageSliderBlob } from 'src/app/data/image-slider/app-image-slider-blob';

@Component({
  selector: 'app-add-images-form',
  standalone: true,
  imports: [
    CommonModule,
    SightImageSliderComponent,
    AngularMaterialModule
  ],
  templateUrl: './add-images-form.component.html',
  styleUrls: ['./add-images-form.component.css']
})
export class AddImagesFormComponent implements OnInit {

  @Input() imageSliderBlob!: ImageSliderBlob;

  @Output() sightImagesEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  
  addImage(event: Event): void {

    const accessableTypes: string = 'image/png, image/jpg, image/jpeg';

    let imageBlobs: Blob[] = [];
    const files = ((event as InputEvent).target as HTMLInputElement)?.files;

    if (files) {
      for (let i = 0; i < files.length; ++i) {
        if (!accessableTypes.includes(files[i].type)) {
          continue;
        }
        imageBlobs.push(new Blob([files[i]], {
          type: files[i].type
        }));
      }
    }

    if (imageBlobs.length > 0) {
      this.imageSliderBlob.addImages(imageBlobs);
    }
  }

  clearImages(): void {
    (document.getElementById("input") as HTMLInputElement).value = '';
    this.imageSliderBlob.clearImages();
  }
}
