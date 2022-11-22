import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICity } from '../../data/models/cities/app-city';
import { ICityUpdate } from 'src/app/data/models/cities/app-city-update';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>('/api/cities');
  }

  getAllCitiesFromCountry(countryName: string): Observable<ICity[]> {
    return this.http.get<ICity[]>(`/api/cities/from/${countryName}`);
  }

  addCity(cityUpdate: ICityUpdate): Observable<ICity> {
    return this.http.post<ICity>('api/cities', cityUpdate);
  }

  updateCity(id: number, cityUpdate: ICityUpdate): Observable<ICity> {
    return this.http.put<ICity>(`api/cities/${id}`, cityUpdate);
  }

  deleteCity(id: number): Observable<null> {
    return this.http.delete<null>(`api/cities/${id}`);
  }
}
