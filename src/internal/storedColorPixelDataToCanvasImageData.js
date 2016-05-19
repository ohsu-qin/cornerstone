/**
 * This module contains a function to convert stored pixel values to display pixel values using a LUT
 */
(function (cornerstone) {

    "use strict";

    function storedColorPixelDataToCanvasImageData(image, lut, canvasImageDataData)
    {
        var minPixelValue = image.minPixelValue;
        var canvasImageDataIndex = 0;
        var storedPixelDataIndex = 0;
        var numPixels = image.width * image.height * 4;
        var storedPixelData = image.getPixelData();
        var localLut = lut;
        var localCanvasImageDataData = canvasImageDataData;
        // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
        // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
        var lutOffset = minPixelValue < 0 ? -minPixelValue : 0;
        // All valid pixelData implementations support thet the getPixelValue accessor function below.
        // However, the following array check provides a slight optimization for native Javascript arrays.
        if (Array.isArray(pixelData)) {
            if (lutOffset == 0) {
                while(storedPixelDataIndex < numPixels) {
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // red
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // green
                    localCanvasImageDataData[canvasImageDataIndex] = localLut[storedPixelData[storedPixelDataIndex]]; // blue
                    storedPixelDataIndex+=2;
                    canvasImageDataIndex+=2;
                }
            } else{
                while(storedPixelDataIndex < numPixels) {
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + lutOffset]; // red
                    localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + lutOffset]; // green
                    localCanvasImageDataData[canvasImageDataIndex] = localLut[storedPixelData[storedPixelDataIndex] + lutOffset]; // blue
                    storedPixelDataIndex+=2;
                    canvasImageDataIndex+=2;
                }
            }
        } else {
            // Convert the pixel values to to the canvas buffer values.
            var getPixelValue = cornerstone.createStoredPixelAccessor(pixelData);
            // Convert the pixel values to to the canvas buffer values.
            for (var i=0; i<pixelData.length; i++) {
                // Convert the RGB triplet, but skip the fourth pixel.
                if (index % 4 < 3) {
                    localCanvasImageDataData[index] = localLut[getPixelValue(i) + lutOffset];
                }
            };
            pixelData.map(convert);
        }
    }

    // Module exports
    cornerstone.internal.storedColorPixelDataToCanvasImageData = storedColorPixelDataToCanvasImageData;
    cornerstone.storedColorPixelDataToCanvasImageData = storedColorPixelDataToCanvasImageData;

}(cornerstone));
