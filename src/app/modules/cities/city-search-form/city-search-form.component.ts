import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICity } from 'src/app/data/models/cities/app-city';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  selector: 'app-city-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  templateUrl: './city-search-form.component.html',
  styleUrls: ['./city-search-form.component.css']
})
export class CitySearchFormComponent implements OnInit, OnDestroy {

  @Input() public set cities(value: ICity[]) {
    this._cities = value;
    this.filteredCities = value;
  }

  public get cities() {
    return this._cities;
  }

  @Output() cityEvent: EventEmitter<ICity> = new EventEmitter<ICity>();

  private _cities: ICity[] = [];
  public filteredCities: ICity[] = [];

  cityGroup: FormGroup = new FormGroup({
    city: new FormControl(),
    cityFilter: new FormControl()
  });

  _onDestroy: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.subscribeControls();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  loadCities(cities: ICity[]): void {
    this.cities = cities;
  }

  subscribeControls(): void {

    this.cityGroup.controls['city'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        this.cityEvent.emit(value);
      });

    this.cityGroup.controls['cityFilter'].valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCity();
      });
  }

  protected filterCity() {

    if (!this.cities) {
      return;
    }

    this.filteredCities = this.cities;

    let search = this.cityGroup.controls['cityFilter'].value;
    if (search) {
      this.filteredCities = this.cities.filter((city) => city.name.startsWith(search));
    }
  }

}
