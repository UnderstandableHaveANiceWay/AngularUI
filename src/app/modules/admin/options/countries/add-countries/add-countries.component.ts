import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ICountry } from 'src/app/data/models/app-country';

@Component({
  selector: 'app-add-countries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  templateUrl: './add-countries.component.html',
  styleUrls: ['./add-countries.component.css']
})
export class AddCountriesComponent implements OnInit {

  bisy: boolean = false;
  failed: boolean = false;
  completed: boolean = false;

  form: FormGroup = new FormGroup({
    country: new FormControl()
  });

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
  }

  sendForm(): void {

    this.bisy = true;
    this.failed = false;
    this.completed = false;

    this.countriesService.addCountry({ name: this.form.value['country'] } as ICountry)
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

}
