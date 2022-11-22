import { ISight } from "../models/sights/app-sight";

export class ImageSlider {
    sight: ISight;
    imageObjects: Array<object>;
    imagesBlobed: Blob[] = [];

    constructor (sight: ISight | undefined, images: string[]) {

        this.sight = sight ?? {id: 0, name: 'none', visitPriority: 0, cityId: 0, reviews: []};
        this.imageObjects = new Array<object>;

        this.addImages(images);
    }

    addImages(images: string[]): void {
        for (let image of images) {
            this.imageObjects.push({
                image: `${image}`,
                thumbImage: `${image}`,
                alt: 'alt of image',
                title: ''
            });
        }
    }

    clearImages(): void {
        this.imageObjects = new Array<object>();
    }
}