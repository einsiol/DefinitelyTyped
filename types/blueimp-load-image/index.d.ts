/**
 * Type definitions for blueimp-load-image 5.12.0
 * Project: https://github.com/blueimp/JavaScript-Load-Image
 * Definitions by: Evan Kesten <https://github.com/ebk46>
 *                 Konstantin Lukaschenko <https://github.com/KonstantinLukaschenko>
 *                 Saeid Rezaei <https://github.com/moeinio>
 *                 Einar Ólafsson <https://github.com/einsiol
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */

/// <reference types="node" />

declare namespace loadImage {
    type LoadImageCallback = (eventOrImage: Event | HTMLCanvasElement | HTMLImageElement, data?: MetaData) => void;

    type Orientation = number | boolean;
    type AspectRatio = number;
    type ParseMetaDataCallback = (data: ImageHead) => void;

    interface Exif {
        [tag: number]: number | string | string[];
    }

    interface Iptc {
        [tag: number]: number | string | string[];
    }

    interface ImageHead {
        imageHead?: ArrayBuffer | Uint8Array;
    }

    interface MetaData extends ImageHead {
        originalWidth?: number;
        originalHeight?: number;
        exif?: Exif;
        exifOffsets?: Exif;
        exifTiffOffset?: number;
        exifLittleEndia?: boolean;
        iptc?: Iptc;
        iptcOffsets?: Iptc;
    }

    /**
     * Data interface that is used when the loadImage
     * returns a promise
     */
    interface PromiseData extends MetaData {
        image: HTMLCanvasElement & HTMLImageElement;
    }

    interface BasicOptions {
        maxWidth?: number;
        maxHeight?: number;
        minWidth?: number;
        minHeight?: number;
        contain?: boolean;
        cover?: boolean;
        crossOrigin?: string;
        noRevoke?: boolean;
    }

    /**
     * Some options are only valid if 'canvas' is true.
     * In addition, if 'crop' is true or 'orientation' is set,
     * it automatically enables 'canvas' so in those cases,
     * 'canvas' cannot be false
     */
    interface CanvasTrueOptions {
        canvas: true;
        sourceWidth?: number;
        sourceHeight?: number;
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
        pixelRatio?: number;
        downsamplingRatio?: number;
        orientation?: Orientation;
        crop?: boolean;
    }

    interface CanvasFalseOptions {
        canvas?: false;
    }

    type CanvasOptions = CanvasTrueOptions | CanvasFalseOptions;

    /**
     * Setting 'aspectRatio' automatically enables 'crop', so setting 'crop' to
     * 'false' in that case is not valid
     */
    interface CropTrueOptions {
        crop?: true;
        aspectRatio?: AspectRatio;
    }

    interface CropFalseOptions {
        crop?: false;
    }

    type CropOptions = CropTrueOptions | CropFalseOptions;

    /**
     * Setting 'orientation' automatically sets 'meta' to true
     * so setting it to false is not valid in that case
     */
    interface MetaTrueOptions {
        meta?: true;
        orientation: Orientation;
    }

    interface MetaFalseOptions {
        meta?: false;
    }

    type MetaOptions = MetaTrueOptions | MetaFalseOptions;

    interface ParseOptions {
        // Defines the maximum number of bytes to parse.
        maxMetaDataSize?: number;

        // Disables creating the imageHead property.
        disableImageHead?: boolean;
    }

    type LoadImageOptions = BasicOptions & CanvasOptions & CropOptions & MetaOptions;
}

/**
 * loadImage is implemented as a callable object or returned a Promise
 * if the callback argument contains the option object.
 */

interface LoadImage {
    (
        file: File | Blob | string,
        callbackOrOption?: loadImage.LoadImageCallback | loadImage.LoadImageOptions,
        options?: loadImage.LoadImageOptions,
    ): Promise<loadImage.PromiseData> & HTMLImageElement & FileReader & false;

    // Parses image meta data and calls the callback with the image head
    parseMetaData: (
        file: File | Blob | string,
        callback: loadImage.ParseMetaDataCallback,
        options?: loadImage.ParseOptions,
        data?: loadImage.ImageHead,
    ) => void;

    blobSlice: (this: Blob, start?: number, end?: number) => Blob;
}

declare const loadImage: LoadImage;

export = loadImage;
