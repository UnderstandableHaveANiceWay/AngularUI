import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';

import { ICountry } from '../../../data/models/app-country';
import { ICity } from '../../../data/models/cities/app-city';
import { CitiesService } from '../../../services/cities/cities.service';

import { SightImageSliderComponent } from '../sight-image-slider/sight-image-slider.component';
import { CountrySearchFormComponent } from '../../countries/country-search-form/country-search-form.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CitySearchFormComponent } from '../../cities/city-search-form/city-search-form.component';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { SightsService } from 'src/app/services/sights/sights.service';
import { ImageSlider } from 'src/app/data/image-slider/app-image-slider';
import { SightImagesService } from 'src/app/services/sight-image/sight-images.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sight-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AngularMaterialModule,
    CountrySearchFormComponent,
    CitySearchFormComponent,
    SightImageSliderComponent,
  ],
  templateUrl: './sight-search-form.component.html',
  styleUrls: ['./sight-search-form.component.css']
})

export class SightSearchFormComponent implements OnInit{

  countries: ICountry[] = [];
  
  cities: ICity[] = [];
  chosenCity?: ICity;

  sights: ISight[] = [];

  hotTrip: boolean = false;
  hotColor: string = '';

  loadHotTrip: boolean = false;
  bisy: boolean = false;

  cashedImageSliders: ImageSlider[] = [];
  imageSliders: ImageSlider[] = [];

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private sightsService: SightsService,
    private sightImagesService: SightImagesService
    ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  onHotTrip(): void {
    
    if (this.hotTrip) {

      this.hotTrip = false;
      this.hotColor = '';

    } else {

      this.hotTrip = true;
      this.hotColor = 'warn';

    }
    !this.hotTrip;

    if (this.chosenCity) {
        this.loadSights(this.chosenCity);
    }
  }
  
  loadCountries(): void {

    this.route.data.subscribe( (data) => {
      this.countries = data['countries'];
    });
  }

  loadCities(country: ICountry): void {

    this.cities = [];

    this.citiesService.getAllCitiesFromCountry(country.name)
    .subscribe({
      next: (x) => {
        this.cities = x;
      },
      error: () => {
        console.log("error");
      }
    });
  }

  loadSights(city: ICity): void {

    this.chosenCity = city;
    
    this.sights = [];

    if (!this.hotTrip) {
      this.sightsService
      .getAllSightsFromCity(city.name)
      .subscribe({
        next: (x) => {
          this.sights = x;
          this.loadSightImages();
        },
        error: () => {
          console.log("error");
        }
      });

    } else {

      this.sightsService.getTop10Sights(city.id)
        .subscribe({
          next: (sights) => {
            this.sights = sights;
            this.loadSightImages();
          }
        });
    }
  }
  
  loadSightImages(): void {

    this.imageSliders = [];

    let waitObservable:Subscription | undefined;

    this.imageSliders = [];

    for (let sight of this.sights) {

      if (this.cashedImageSliders.some(x => x.sight?.id == sight.id )) {

        const imageSlider = this.cashedImageSliders.find(x => x.sight?.id == sight.id);

        if (imageSlider) {

          this.imageSliders.push(imageSlider);

        }

      } else {

        waitObservable = this.uploadSightImagesFromServer(sight);
      }
    }

    if (waitObservable) {

      this.bisy = true;
      if (this.hotTrip) this.loadHotTrip = true;

      waitObservable.add(() => {
        this.bisy = false;
        this.loadHotTrip = false;
      });
    }
  }

  uploadSightImagesFromServer(sight: ISight): Subscription {

    let images: string[] = [];
    
    return this.sightImagesService
      .getAllImagesOfSight(sight.id)
      .subscribe({
        next: (sightImages) => {
          images = [];

          for (let sightImage of sightImages){
            images.push(sightImage.fileUrl);
          }
          
          this.cashedImageSliders.push( new ImageSlider(sight, images) );
          
          this.imageSliders.push( this.cashedImageSliders[this.cashedImageSliders.length - 1] );
        }
      });
  }
}