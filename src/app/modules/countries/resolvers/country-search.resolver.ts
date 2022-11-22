import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICountry } from 'src/app/data/models/app-country';
import { CountriesService } from 'src/app/services/countries/countries.service';

@Injectable({
  providedIn: 'root'
})
export class CountrySearchResolver implements Resolve<ICountry[]> {
  
  constructor(private countriesService: CountriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICountry[]> {
    return this.countriesService.getAllCountries();
  }
}
