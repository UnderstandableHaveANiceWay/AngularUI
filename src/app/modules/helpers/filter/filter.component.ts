import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ICountry } from 'src/app/data/models/app-country';
import { ICity } from 'src/app/data/models/cities/app-city';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent<T = ICountry | ICity | ISight> implements OnInit {

  @Input() filterFunction: Function = () => true;

  @Input() items: T[] = [];
  @Input() filteredItems: T[] = [];

  @Output() filterEvent: EventEmitter<T[]> = new EventEmitter<T[]>();

  searchGroup: FormGroup = new FormGroup({
    search: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  filterItems(): void {

    this.filteredItems = this.items;

    this.filteredItems = this.items.filter((item) => this.filterFunction(item, this.searchGroup.controls['search'].value));
  }
  
  search(): void {
    this.filterItems();
    this.filterEvent.emit(this.filteredItems);
  }

}
