import { Component, OnInit, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSlider } from 'src/app/data/image-slider/app-image-slider';

import { NgImageSliderModule } from 'ng-image-slider';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { EventEmitter } from '@angular/core';
import { ISightImage } from 'src/app/data/models/sight-images/app-sight-image';
import { AuthenticationService } from 'src/app/services/account/authentication/authentication.service';
import { ImageSliderBlob } from 'src/app/data/image-slider/app-image-slider-blob';

@Component({
  selector: 'app-sight-image-slider',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgImageSliderModule,
  ],
  templateUrl: './sight-image-slider.component.html',
  styleUrls: ['./sight-image-slider.component.css']
})

export class SightImageSliderComponent implements OnInit {

  @Input() imageSlider?: ImageSlider | ImageSliderBlob;

  constructor() { }

  ngOnInit(): void {
  }
}
