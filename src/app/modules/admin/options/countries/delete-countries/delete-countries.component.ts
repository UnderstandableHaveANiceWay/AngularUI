import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ICountry } from 'src/app/data/models/app-country';

@Component({
  selector: 'app-delete-countries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  templateUrl: './delete-countries.component.html',
  styleUrls: ['./delete-countries.component.css']
})
export class DeleteCountriesComponent implements OnInit {

  countries: ICountry[] = [];

  filteredCountries: ICountry[] = [];

  bisy: boolean = false;
  failed: boolean = false;

  searchGroup: FormGroup = new FormGroup({
    searchCountry: new FormControl()
  });

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getAllCountries()
      .subscribe({
        next: (countries) => {
          this.countries = countries;
          this.filteredCountries = countries;
        }
      });
  }

  filterCountries(search: string): void {

    this.filteredCountries = this.countries;

    this.filteredCountries = this.countries.filter(x => x.name.startsWith(search));
  }
  
  search(): void {
    this.filterCountries(this.searchGroup.controls['searchCountry'].value);
  }

  delete(countryId: number): void {

    this.bisy = true;
    this.failed = false;
      
    this.countriesService.deleteCountry(countryId).subscribe({
      next: () => {
        this.loadCountries();
      },
      error: () => {
        this.failed = true;
      }
    })
    .add(() => this.bisy = false);
  }
}

