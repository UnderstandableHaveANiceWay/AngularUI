import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { Router, RouterModule } from '@angular/router';
import { Subject, Observable, takeUntil, ReplaySubject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-admin-options-page',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
  ],
  templateUrl: './admin-options-page.component.html',
  styleUrls: ['./admin-options-page.component.css']
})
export class AdminOptionsPageComponent implements OnInit, OnDestroy {

  private debounceTime: number = 200;

  countriesHovered: boolean = false;
  citiesHovered: boolean = false;
  sightsHovered: boolean = false;
  usersHovered: boolean = false;

  hoverCountriesSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  hoverCountriesChanged: Observable<boolean> = this.hoverCountriesSubject.asObservable();

  hoverCitiesSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  hoverCitiesChanged: Observable<boolean> = this.hoverCitiesSubject.asObservable();
  
  hoverSightsSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  hoverSightsChanged: Observable<boolean> = this.hoverSightsSubject.asObservable();
  
  hoverUsersSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  hoverUsersChanged: Observable<boolean> = this.hoverUsersSubject.asObservable();

  _onDestroy: Subject<void> = new Subject<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subscribeChanges();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private subscribeChanges(): void {

    this.hoverCountriesChanged
      .pipe(debounceTime(this.debounceTime), takeUntil(this._onDestroy))
      .subscribe({
        next: (hovered) => {
          if (hovered) this.countriesHovered = hovered;
        }
      });

    this.hoverCitiesChanged
      .pipe(debounceTime(this.debounceTime), takeUntil(this._onDestroy))
      .subscribe({
        next: (hovered) => {
          if (hovered) this.citiesHovered = hovered;
        }
      });

    this.hoverSightsChanged
      .pipe(debounceTime(this.debounceTime), takeUntil(this._onDestroy))
      .subscribe({
        next: (hovered) => {
          if (hovered) this.sightsHovered = hovered;
        }
      });

    this.hoverUsersChanged
      .pipe(debounceTime(this.debounceTime), takeUntil(this._onDestroy))
      .subscribe({
        next: (hovered) => {
          if (hovered) this.usersHovered = hovered;
        }
      });
  }

  mouseMoveOnCountries(event: MouseEvent): void {

    if (event.type == 'mouseleave') {

      this.countriesHovered = false;
      this.hoverCountriesSubject.next(false);

    } else if (event.type == 'mouseenter') {

      this.hoverCountriesSubject.next(true);

    }
  }

  mouseMoveOnCities(event: MouseEvent): void {
    if (event.type == 'mouseleave') {

      this.citiesHovered = false;
      this.hoverCitiesSubject.next(false);

    } else if (event.type == 'mouseenter') {

      this.hoverCitiesSubject.next(true);

    }
  }

  mouseMoveOnSights(event: MouseEvent): void {
    if (event.type == 'mouseleave') {

      this.sightsHovered = false;
      this.hoverSightsSubject.next(false);

    } else if (event.type == 'mouseenter') {

      this.hoverSightsSubject.next(true);

    }
  }

  mouseMoveOnUsers(event: MouseEvent): void {
    if (event.type == 'mouseleave') {

      this.usersHovered = false;
      this.hoverUsersSubject.next(false);

    } else if (event.type == 'mouseenter') {

      this.hoverUsersSubject.next(true);

    }
  }

  add(): void {
    if (this.countriesHovered) {

      this.router.navigateByUrl('admin/options/countries/add');

    } else if (this.citiesHovered){

      this.router.navigateByUrl('admin/options/cities/add');

    } else if (this.sightsHovered){

      this.router.navigateByUrl('admin/options/sights/add');

    } else if (this.usersHovered){

      this.router.navigateByUrl('admin/options/users/add');

    }
  }

  update(): void {
    if (this.countriesHovered) {

      this.router.navigateByUrl('admin/options/countries/update');

    } else if (this.citiesHovered){

      this.router.navigateByUrl('admin/options/cities/update');

    } else if (this.sightsHovered){

      this.router.navigateByUrl('admin/options/sights/update');

    } else if (this.usersHovered){

      this.router.navigateByUrl('admin/options/users/update');

    }
  }

  delete(): void {
    if (this.countriesHovered) {

      this.router.navigateByUrl('admin/options/countries/delete');

    } else if (this.citiesHovered){

      this.router.navigateByUrl('admin/options/cities/delete');

    } else if (this.sightsHovered){

      this.router.navigateByUrl('admin/options/sights/delete');

    } else if (this.usersHovered){

      this.router.navigateByUrl('admin/options/users/delete');

    }
  }

}
