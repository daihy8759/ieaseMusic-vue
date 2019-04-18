/* tslint:disable */
export default class AlbumColors {
    private imageUrl : string;
    private image : any;
    private canvas : any;
    private colors : any[][] = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];

    constructor(imageUrl : string) {
        this.imageUrl = imageUrl;
    }

    fetch(callback : Function) {
        this.image = new Image();
        this.image.onload = function () {
            if (callback) {
                callback(this);
            }
        };
        this.image.src = this.imageUrl;
    }

    private getCanvas() {
        if (this.canvas) {
            return this.canvas;
        }

        const canvas = document.createElement('canvas');
        canvas.width = this.image.width;
        canvas.height = this.image.height;
        const context = canvas.getContext('2d');

        context!.drawImage(this.image, 0, 0);

        return (this.canvas = canvas);
    }

    getPixelArray() : number[]{
        return this
            .getCanvas()
            .getContext('2d')
            .getImageData(0, 0, this.image.width, this.image.height)
            .data;
    }

    getColors() {
        return new Promise(resolve => {
            if (this.colors) {
                resolve(this.colors)
                return;
            }
            let p,
                colors: number[][] = [],
                pixelArray = this.getPixelArray();
    
            for (p = 0; p < pixelArray.length; p += 4) {
                colors.push([
                    pixelArray[p],
                    pixelArray[p + 1],
                    pixelArray[p + 2]
                ]);
            }
            this.colors = colors;
            resolve(colors)
        })
    }
}