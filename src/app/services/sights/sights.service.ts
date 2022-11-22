import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { ISightUpdate } from 'src/app/data/models/sights/app-sight-update';

@Injectable({
  providedIn: 'root'
})
export class SightsService {

  constructor(private http: HttpClient) { }

  getSightById(sightId: number): Observable<ISight> {
    return this.http.get<ISight>(`/api/sights/${sightId}`);
  }

  getAllSightsFromCity(cityName: string): Observable<ISight[]> {
    return this.http.get<ISight[]>(`/api/sights/from/${cityName}`);
  }

  getTop10Sights(cityId: number): Observable<ISight[]> {
    return this.http.get<ISight[]>(`/api/sights/hot/from/${cityId}`);
  }

  addSight(sightUpdate: ISightUpdate): Observable<ISight> {
    return this.http.post<ISight>('/api/sights', sightUpdate);
  }

  deleteSight(sightId: number): Observable<null> {
    return this.http.delete<null>(`/api/sights/${sightId}`);
  }

  updateSight(sightId: number, sightUpdate: ISightUpdate): Observable<ISight> {
    return this.http.put<ISight>(`/api/sights/${sightId}`, sightUpdate);
  }
}
