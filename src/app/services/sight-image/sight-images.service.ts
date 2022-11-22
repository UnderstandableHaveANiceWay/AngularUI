import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISightImageBytes } from 'src/app/data/models/sight-images/app-sight-image-byte';
import { ISightImageUpdate } from 'src/app/data/models/sight-images/app-sight-image-update';
import { blob } from 'stream/consumers';

import { ISightImage } from '../../data/models/sight-images/app-sight-image';

@Injectable({
  providedIn: 'root'
})
export class SightImagesService {

  constructor(private http: HttpClient) { }

  getAllImagesOfSight(sightId: number): Observable<ISightImage[]> {
    return this.http.get<ISightImage[]>(`/api/sights/${sightId}/images`);
  }

  getAllImagesByteOfSight(sightId: number): Observable<ISightImageBytes[]> {
    return this.http.get<ISightImageBytes[]>(`/api/sights/${sightId}/images/byte`);
  }

  addSightImage(sightId: number, sightImageUpdateFormData: FormData): Observable<any> {
    return this.http.post(`/api/sights/${sightId}/images`, sightImageUpdateFormData);
  }

  deleteAllSightImagesFromSight(sightId: number): Observable<null> {
    return this.http.delete<null>(`/api/sights/${sightId}/images`);
  }
}
