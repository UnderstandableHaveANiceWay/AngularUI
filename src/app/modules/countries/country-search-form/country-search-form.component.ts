import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICountry } from 'src/app/data/models/app-country';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-country-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
  ],
  templateUrl: './country-search-form.component.html',
  styleUrls: ['./country-search-form.component.css']
})
export class CountrySearchFormComponent implements OnInit, OnDestroy {

  @Input() countries: ICountry[] = [];

  @Output() countryEvent: EventEmitter<ICountry> = new EventEmitter<ICountry>();

  filteredCountries: ICountry[] = [];

  countryGroup: FormGroup = new FormGroup({
    country: new FormControl(),
    countryFilter: new FormControl()
  });
  
  _onDestroy: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.loadCountries();
    this.subscribeControls();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  loadCountries(): void {
    this.filteredCountries = this.countries;
  }

  subscribeControls(): void {

    this.countryGroup.controls['country'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        this.countryEvent.emit(value);
      });

    this.countryGroup.controls['countryFilter'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries();
      });
  }

  protected filterCountries() {

    if (!this.countries) {
      return;
    }
    
    this.filteredCountries = this.countries;

    let search = this.countryGroup.controls['countryFilter'].value;

    if (search) {
      this.filteredCountries = this.countries.filter((countries) => countries.name.startsWith(search));
    }
  }

}
