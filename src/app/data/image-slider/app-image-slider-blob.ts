import { ISight } from "../models/sights/app-sight";

export class ImageSliderBlob {
    sight: ISight;
    imageObjects: Array<object>;
    imagesBlobed: Blob[] = [];

    constructor (sight: ISight | undefined, images: Blob[]) {

        this.sight = sight ?? {id: 0, name: 'none', visitPriority: 0, cityId: 0, reviews: []};
        this.imageObjects = new Array<object>;

        this.addImages(images);
    }

    addImages(images: Blob[]): void {
        for (let image of images) {
            this.imagesBlobed.push(image);
            const imageUrl = URL.createObjectURL(image);
            this.imageObjects.push({
                image: `${imageUrl}`,
                thumbImage: `${imageUrl}`,
                alt: 'alt of image',
                title: ''
            });
        }
    }

    clearImages(): void {
        this.imageObjects = new Array<object>();
        this.imagesBlobed = [];
    }
}