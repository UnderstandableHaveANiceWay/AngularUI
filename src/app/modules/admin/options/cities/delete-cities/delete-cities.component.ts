import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { CountrySearchFormComponent } from 'src/app/modules/countries/country-search-form/country-search-form.component';
import { ICountry } from 'src/app/data/models/app-country';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ICity } from 'src/app/data/models/cities/app-city';

@Component({
  selector: 'app-delete-cities',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    CountrySearchFormComponent
  ],
  templateUrl: './delete-cities.component.html',
  styleUrls: ['./delete-cities.component.css']
})
export class DeleteCitiesComponent implements OnInit {

  countries: ICountry[] = [];

  chosenCountry!: ICountry;

  items: ICity[] = [];
  filteredItems: ICity[] = [];

  bisy: boolean = false;
  failed: boolean = false;

  searchGroup: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService
    ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  setCountry(country: ICountry): void {
    this.chosenCountry = country;
    this.loadCities();
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

  delete(city: ICity): void {

    this.bisy = true;
    this.failed = false;
    
    this.citiesService.deleteCity(city.id).subscribe({
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
