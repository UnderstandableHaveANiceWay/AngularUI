import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICity } from 'src/app/data/models/cities/app-city';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { ActivatedRoute } from '@angular/router';
import { ICountry } from 'src/app/data/models/app-country';
import { ICityUpdate } from 'src/app/data/models/cities/app-city-update';
import { CountrySearchFormComponent } from 'src/app/modules/countries/country-search-form/country-search-form.component';

@Component({
  selector: 'app-add-cities',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    CountrySearchFormComponent,
    AngularMaterialModule
  ],
  templateUrl: './add-cities.component.html',
  styleUrls: ['./add-cities.component.css']
})
export class AddCitiesComponent implements OnInit {

  countries: ICountry[] = [];
  cities: ICity[] = [];

  chosenCountry: ICountry | null = null;

  bisy: boolean = false;
  failed: boolean = false;
  completed: boolean = false;

  form: FormGroup = new FormGroup({
    city: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService
    ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  sendForm(): void {

    if (this.chosenCountry == null) {
      this.form.controls['city'].setErrors({countryNotChosen: true});
      return;
    }

    if (this.form.invalid || this.form.controls['city'].value == '') return;

    let cityUpdate: ICityUpdate = {
      name: this.form.value['city'],
      countryId: this.chosenCountry.id
    };

    this.bisy = true;
    this.failed = false;
    this.completed = false;

    this.citiesService.addCity(cityUpdate)
      .subscribe({
        next: () => {
          this.completed = true;
        },
        error: () => {
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

  setCountry(country: ICountry): void {
    this.form.controls['city'].setErrors(null);
    this.chosenCountry = country;
  }

}
