import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CountrySearchFormComponent } from 'src/app/modules/countries/country-search-form/country-search-form.component';
import { CitySearchFormComponent } from 'src/app/modules/cities/city-search-form/city-search-form.component';
import { ICountry } from 'src/app/data/models/app-country';
import { ICity } from 'src/app/data/models/cities/app-city';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { SightsService } from 'src/app/services/sights/sights.service';
import { ISightUpdate } from 'src/app/data/models/sights/app-sight-update';
import { SightImageSliderComponent } from 'src/app/modules/sight/sight-image-slider/sight-image-slider.component';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { SightImagesService } from 'src/app/services/sight-image/sight-images.service';
import { switchMap } from 'rxjs';
import { addImageObservable } from 'src/app/data/image-slider/add-image-observable';
import { AddImagesFormComponent } from 'src/app/modules/add-images-form/add-images-form.component';
import { ImageSliderBlob } from 'src/app/data/image-slider/app-image-slider-blob';

@Component({
  selector: 'app-add-sights',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    MatCardModule,
    CountrySearchFormComponent,
    CitySearchFormComponent,
    SightImageSliderComponent,
    AddImagesFormComponent
  ],
  templateUrl: './add-sights.component.html',
  styleUrls: ['./add-sights.component.css']
})
export class AddSightsComponent implements OnInit {

  countries: ICountry[] = [];
  cities: ICity[] = [];
  sights: ISight[] = [];

  chosenCountry: ICountry | null = null;
  chosenCity: ICity | null = null;

  imageSliderBlob: ImageSliderBlob = new ImageSliderBlob(undefined, []);

  bisy: boolean = false;
  failed: boolean = false;
  completed: boolean = false;

  form: FormGroup = new FormGroup({
    country: new FormControl(),
    city: new FormControl(),
    sight: new FormControl('', [Validators.minLength(3), Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private sightsService: SightsService,
    private sightImagesService: SightImagesService
    ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  sendForm(): void {
    if (this.chosenCountry == null) {
      this.form.controls['country'].setErrors({countryNotChosen: true});
      return;
    }

    if (this.chosenCity == null) {
      this.form.controls['city'].setErrors({cityNotChosen: true});
      return;
    }

    if (this.form.invalid || this.form.controls['sight'].value == '') return;

    const cityUpdate: ISightUpdate = {
      name: this.form.value['sight'],
      visitPriority: 0,
      cityId: this.chosenCity.id,
      reviews: []
    };

    this.bisy = true;
    this.failed = false;
    this.completed = false;

    this.sightsService.addSight(cityUpdate)
      .pipe(switchMap((sight) => addImageObservable(sight, this.imageSliderBlob.imagesBlobed, this.sightImagesService)))
      .subscribe({
        next: () => {
          this.completed = true;
        },
        error: (error) => {
          this.failed = true;
        }
      })
      .add( () => this.bisy = false );
  }

  loadCountries(): void {
    this.route.data.subscribe( (data) => {
      this.countries = data['countries'];
    });
  }

  loadCities(): void {
    this.citiesService.getAllCitiesFromCountry(this.chosenCountry?.name ?? '').subscribe({
      next: (cities) => {
        this.cities = cities;
      }
    });
  }

  
  
  loadSights(city: ICity): void {
    
    this.sights = [];

    this.sightsService
      .getAllSightsFromCity(city.name)
      .subscribe({
        next: (x) => {
          this.sights = x;
        }
      });
  }

  setCountry(country: ICountry): void {
    this.form.controls['country'].setErrors(null);
    this.chosenCountry = country;
    this.loadCities();
  }

  setCity(city: ICity): void {
    this.form.controls['city'].setErrors(null);
    this.chosenCity = city;
  }

}
