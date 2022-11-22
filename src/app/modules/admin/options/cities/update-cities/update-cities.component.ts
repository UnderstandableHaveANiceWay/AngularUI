import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CountrySearchFormComponent } from 'src/app/modules/countries/country-search-form/country-search-form.component';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { ICountry } from 'src/app/data/models/app-country';
import { ICity } from 'src/app/data/models/cities/app-city';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ICityUpdate } from 'src/app/data/models/cities/app-city-update';

@Component({
  selector: 'app-update-cities',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    CountrySearchFormComponent,
    AngularMaterialModule
  ],
  templateUrl: './update-cities.component.html',
  styleUrls: ['./update-cities.component.css']
})
export class UpdateCitiesComponent implements OnInit {

  countries: ICountry[] = [];

  chosenCountry!: ICountry;

  items: ICity[] = [];
  filteredItems: ICity[] = [];

  shownUpdate: ICity | null = null;

  bisy: boolean = false;
  failed: boolean = false;

  searchGroup: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  updateGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    country: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService
    ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  setCountry(country: ICountry): void {
    this.updateGroup.controls['name'].setErrors(null);
    this.updateGroup.controls['country'].setValue(country);
    this.chosenCountry = country;
    this.loadCities();
  }

  setUpdatedCountry(country: ICountry): void {
    this.updateGroup.controls['country'].setValue(country);
  }

  loadCountries(): void {
    this.route.data.subscribe( (data) => {
      this.countries = data['countries'];
    });
  }

  loadCities(): void {
    this.citiesService.getAllCitiesFromCountry(this.chosenCountry.name).subscribe({
      next: (value) => {
        this.items = value;
        this.filteredItems = value;
      }
    });
  }

  filterItems(search: string): void {

    this.filteredItems = this.items;

    this.filteredItems = this.items.filter(x => x.name.startsWith(search));
  }
  
  search(): void {
    this.filterItems(this.searchGroup.controls['search'].value);
  }

  showInput(item: ICity): void {
    if (item.name != this.shownUpdate?.name) {
      this.shownUpdate = item;
      this.updateGroup.controls['name'].setValue(item.name);
    } else {
      this.shownUpdate = null;
    }
  }

  update(): void {

    if (this.shownUpdate && this.chosenCountry) {

      this.bisy = true;
      this.failed = false;

      let update: ICityUpdate = {
        name: this.shownUpdate?.name ?? 'none',
        countryId: this.updateGroup.controls['country'].value.id
      };

      update.name = this.updateGroup.controls['name'].value;
      
      this.citiesService.updateCity(this.shownUpdate.id, update).subscribe({
        next: () => {
          this.loadCities();
        },
        error: () => {
          this.failed = true;
        }
      })
      .add(() => this.bisy = false);
    }
  }

}
