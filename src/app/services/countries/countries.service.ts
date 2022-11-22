import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICountry } from '../../data/models/app-country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('/api/countries');
  }

  addCountry(country: ICountry): Observable<ICountry> {
    return this.http.post<ICountry>('api/countries', country);
  }

  updateCountry(country: ICountry): Observable<ICountry>{
      return this.http.put<ICountry>(`api/countries/${country.id}`, country)
  }

  deleteCountry(id: number): Observable<null>{
    return this.http.delete<null>(`api/countries/${id}`);
  }
}
