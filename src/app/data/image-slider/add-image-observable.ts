import { ISightImage } from "../models/sight-images/app-sight-image";
import { ISight } from "../models/sights/app-sight";
import { Observable, switchMap } from 'rxjs';
import { SightImagesService } from "src/app/services/sight-image/sight-images.service";

export function addImageObservable(sight: ISight, imagesAsBlob: Blob[], sightImagesService: SightImagesService): Observable<ISightImage> {
    let prevObs!: Observable<ISightImage>;
    for (let i = 0; i < imagesAsBlob.length; ++i) {

      let fileFormData = new FormData();

      const date = (Date.now() + i).toString();

      fileFormData.append('name', date);
      fileFormData.append('type', imagesAsBlob[i].type);
      fileFormData.append('file', imagesAsBlob[i]);
      fileFormData.append('sightId', sight.id.toString());
      
      if (prevObs == undefined) {
        prevObs = sightImagesService.addSightImage(sight.id, fileFormData);
      } else {
        prevObs = prevObs.pipe(switchMap(() => sightImagesService.addSightImage(sight.id, fileFormData)));
      }
    }
    return prevObs;
  }