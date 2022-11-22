import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ICountry } from 'src/app/data/models/app-country';

@Component({
  selector: 'app-update-countries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  templateUrl: './update-countries.component.html',
  styleUrls: ['./update-countries.component.css']
})
export class UpdateCountriesComponent implements OnInit {

  countries: ICountry[] = [];

  filteredCountries: ICountry[] = [];

  shownUpdateByCountryName: string = '';

  bisy: boolean = false;
  failed: boolean = false;

  searchGroup: FormGroup = new FormGroup({
    searchCountry: new FormControl()
  });

  updateGroup: FormGroup = new FormGroup({
    updateCountry: new FormControl()
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

  showInput(inputName: string): void {
    if (inputName != this.shownUpdateByCountryName) {
      this.shownUpdateByCountryName = inputName;
    } else {
      this.shownUpdateByCountryName = '';
    }

    this.updateGroup.controls['updateCountry'].setValue('');
  }
  
  search(): void {
    this.filterCountries(this.searchGroup.controls['searchCountry'].value);
  }

  update(): void {

    let update = this.countries.filter(x => x.name == this.shownUpdateByCountryName).find(x => true);

    if (update) {

      this.bisy = true;
      this.failed = false;

      update.name = this.updateGroup.controls['updateCountry'].value;
      
      this.countriesService.updateCountry(update).subscribe({
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
}
