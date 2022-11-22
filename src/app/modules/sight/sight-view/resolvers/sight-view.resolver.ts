import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { SightsService } from 'src/app/services/sights/sights.service';
import { ISight } from 'src/app/data/models/sights/app-sight';
import { SightImagesService } from 'src/app/services/sight-image/sight-images.service';

@Injectable({
  providedIn: 'root'
})
export class SightViewResolver implements Resolve<ISight> {

  constructor(
    private sightsService: SightsService,
    private sightImagesService: SightImagesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISight> {
    const id = +(route.paramMap.get('id') ?? '0');
    return this.sightsService.getSightById(id);
  }
}
