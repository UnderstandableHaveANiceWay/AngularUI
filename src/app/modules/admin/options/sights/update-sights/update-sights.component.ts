import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICountry } from 'src/app/data/models/app-country';
import { ICity } from 'src/app/data/models/cities/app-city';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { CountrySearchFormComponent } from 'src/app/modules/countries/country-search-form/country-search-form.component';
import { CitySearchFormComponent } from 'src/app/modules/cities/city-search-form/city-search-form.component';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { ISightUpdate } from 'src/app/data/models/sights/app-sight-update';
import { SightsService } from 'src/app/services/sights/sights.service';
import { SightImagesService } from 'src/app/services/sight-image/sight-images.service';
import { ImageSliderBlob } from 'src/app/data/image-slider/app-image-slider-blob';
import { AddImagesFormComponent } from 'src/app/modules/add-images-form/add-images-form.component';
import { FilterComponent } from 'src/app/modules/helpers/filter/filter.component';
import { switchMap } from 'rxjs';
import { addImageObservable } from 'src/app/data/image-slider/add-image-observable';
import { SightImageSliderComponent } from 'src/app/modules/sight/sight-image-slider/sight-image-slider.component';
import { base64toBlob } from 'src/app/data/image-slider/base64-to-blob';

@Component({
  selector: 'app-update-sights',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    CountrySearchFormComponent,
    CitySearchFormComponent,
    AddImagesFormComponent,
    SightImageSliderComponent,
    FilterComponent
  ],
  templateUrl: './update-sights.component.html',
  styleUrls: ['./update-sights.component.css']
})
export class UpdateSightsComponent implements OnInit {

  countries: ICountry[] = [];
  cities: ICity[] = [];
  sights: ISight[] = [];

  cashedImageSliders: ImageSliderBlob[] = [];
  cashedImageSlider: ImageSliderBlob = new ImageSliderBlob(undefined, []);
  imageSlider: ImageSliderBlob = new ImageSliderBlob(undefined, []);

  chosenCountry!: ICountry;
  chosenCity!: ICity;

  filteredItems: ISight[] = [];

  shownUpdate: ISight | null = null;

  bisy: boolean = false;
  failed: boolean = false;

  searchGroup: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  updateGroup: FormGroup = new FormGroup({
    country: new FormControl(''),
    city: new FormControl(''),
    sight: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private sightsService: SightsService,
    private sightImagesService: SightImagesService,
    ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  filterFunction(item: ISight, search: string): boolean {
    return item.name.startsWith(search);
  }

  setCountry(country: ICountry): void {
    this.updateGroup.controls['country'].setErrors(null);
    this.updateGroup.controls['country'].setValue(country);
    this.chosenCountry = country;
    this.loadCities();
  }

  setCity(city: ICity): void {
    this.updateGroup.controls['city'].setErrors(null);
    this.updateGroup.controls['city'].setValue(city);
    this.chosenCity = city;
    this.loadSights();
  }

  setUpdatedCountry(country: ICountry): void {
    this.updateGroup.controls['country'].setValue(country);
  }

  setUpdatedCity(city: ICity): void {
    this.updateGroup.controls['city'].setValue(city);
  }

  loadCountries(): void {
    this.route.data.subscribe( (data) => {
      this.countries = data['countries'];
    });
  }

  loadCities(): void {
    this.citiesService.getAllCitiesFromCountry(this.chosenCountry.name).subscribe({
      next: (value) => {
        this.cities = value;
      }
    });
  }

  loadSights(): void {
    
    this.filteredItems = [];

    this.sightsService
      .getAllSightsFromCity(this.chosenCity.name)
      .subscribe({
        next: (x) => {
          this.sights = x;
          this.filteredItems = x;
        },
        error: () => {
          console.log("error");
        }
      });
  }
  
  loadSightImages(sight: ISight): void {
    
    if (this.cashedImageSliders.some(x => x.sight?.id == sight.id )) {
      
      this.cashedImageSlider = this.cashedImageSliders.find(x => x.sight?.id == sight.id) ?? this.imageSlider;
      this.imageSlider = new ImageSliderBlob(this.cashedImageSlider.sight, this.cashedImageSlider.imagesBlobed);

    } else {

      this.uploadSightImagesFromServer(sight);
    }
  }

  uploadSightImagesFromServer(sight: ISight): void {

    let images: Blob[] = [];
    
    this.sightImagesService
      .getAllImagesByteOfSight(sight.id)
      .subscribe({
        next: (sightImages) => {
          images = [];

          for (let sightImage of sightImages){
            images.push(base64toBlob(sightImage.file, sightImage.type));
          }
          
          this.cashedImageSliders.push( new ImageSliderBlob(sight, images) );

          this.cashedImageSlider = this.cashedImageSliders[this.cashedImageSliders.length - 1];
          this.imageSlider = new ImageSliderBlob(sight, images);
        }
      });
  }

  showInput(item: ISight): void {

    if (item.name != this.shownUpdate?.name) {

      this.shownUpdate = item;
      this.updateGroup.controls['sight'].setValue(item.name);
      this.loadSightImages(item);

    } else {

      this.shownUpdate = null;

    }
  }

  update(): void {

    if (this.shownUpdate == null || this.chosenCountry == null) return;

    this.bisy = true;
    this.failed = false;

    let update: ISightUpdate = {
      name: this.updateGroup.controls['sight'].value,
      cityId: this.updateGroup.controls['city'].value.id,
      visitPriority: this.updateGroup.controls['sight'].value.visitPriority,
      reviews: this.updateGroup.controls['sight'].value.reviews
    };

    if (JSON.stringify(this.cashedImageSlider.imagesBlobed) != JSON.stringify(this.imageSlider.imagesBlobed)) {
      this.sightImagesService.deleteAllSightImagesFromSight(this.shownUpdate.id)
        .subscribe({
          next: () => {
            const changedImageSlider = this.cashedImageSliders.findIndex(val => val.sight == this.shownUpdate);
            this.cashedImageSliders.splice(changedImageSlider);
          }
        });

      if (this.imageSlider.imagesBlobed.length > 0) {
        this.sightsService.updateSight(this.shownUpdate?.id ?? 0, update)
        .pipe(switchMap((sight) => addImageObservable(sight, this.imageSlider.imagesBlobed, this.sightImagesService)))
        .subscribe({
          next: () => {
            this.loadSights();
          },
          error: (error) => {
            console.log(error);
            this.failed = true;
          }
        })
        .add(() => this.bisy = false);
      } else {
        this.bisy = false;
      }

    } else {
      this.sightsService.updateSight(this.shownUpdate.id, update)
      .subscribe({
        next: () => {
          this.loadSights();
        },
        error: () => {
          this.failed = true;
        }
      })
      .add(() => this.bisy = false);
    }
  }
}
