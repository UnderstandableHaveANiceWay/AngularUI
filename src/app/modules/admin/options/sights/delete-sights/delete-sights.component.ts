import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageSlider } from 'src/app/data/image-slider/app-image-slider';
import { ICountry } from 'src/app/data/models/app-country';
import { ICity } from 'src/app/data/models/cities/app-city';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { SightsService } from 'src/app/services/sights/sights.service';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { CountrySearchFormComponent } from 'src/app/modules/countries/country-search-form/country-search-form.component';
import { CitySearchFormComponent } from 'src/app/modules/cities/city-search-form/city-search-form.component';
import { FilterComponent } from 'src/app/modules/helpers/filter/filter.component';

@Component({
  selector: 'app-delete-sights',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    CountrySearchFormComponent,
    CitySearchFormComponent,
    FilterComponent
  ],
  templateUrl: './delete-sights.component.html',
  styleUrls: ['./delete-sights.component.css']
})
export class DeleteSightsComponent implements OnInit {

  countries: ICountry[] = [];
  cities: ICity[] = [];
  sights: ISight[] = [];

  cashedImageSliders: ImageSlider[] = [];
  cashedImageSlider: ImageSlider = new ImageSlider(undefined, []);
  imageSlider: ImageSlider = new ImageSlider(undefined, []);

  chosenCountry!: ICountry;
  chosenCity!: ICity;

  filteredItems: ISight[] = [];

  shownUpdate: ISight | null = null;

  bisy: boolean = false;
  failed: boolean = false;

  searchGroup: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private sightsService: SightsService
  ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  filterFunction(item: ISight, search: string): boolean {
    return item.name.startsWith(search);
  }

  setCountry(country: ICountry): void {
    this.chosenCountry = country;
    this.loadCities();
  }

  setCity(city: ICity): void {
    this.chosenCity = city;
    this.loadSights();
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

  delete(sight: ISight): void {

    this.bisy = true;
    this.failed = false;
    
    this.sightsService.deleteSight(sight.id).subscribe({
      next: () => {
        this.loadSights();
      },
      error: () => {
        alert("Deleting failed");
      }
    })
    .add(() => this.bisy = false);
  }

}
