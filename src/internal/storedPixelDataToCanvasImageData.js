/**
 * This module contains a function to convert stored pixel values to display pixel values using a LUT
 */
(function (cornerstone) {

    "use strict";

    /**
     * This function transforms stored pixel values into a canvas image data buffer
     * by using a LUT.  This is the most performance sensitive code in cornerstone and
     * we use a special trick to make this go as fast as possible.  Specifically we
     * use the alpha channel only to control the luminance rather than the red, green and
     * blue channels which makes it over 3x faster.  The canvasImageDataData buffer needs
     * to be previously filled with white pixels.
     *
     * NOTE: Attribution would be appreciated if you use this technique!
     *
     * @param pixelData the pixel data
     * @param lut the lut
     * @param canvasImageDataData a canvasImgageData.data buffer filled with white pixels
     */
    function storedPixelDataToCanvasImageData(image, lut, canvasImageDataData)
    {
        var pixelData = image.getPixelData();
        var minPixelValue = image.minPixelValue;
        var localPixelData = pixelData;
        var localLut = lut;
        var localCanvasImageDataData = canvasImageDataData;
        // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
        // We have a special offset factor for this case that improves performance.
        // Thanks to @jpambrun for this enhancement.
        var lutOffset = minPixelValue < 0 ? -minPixelValue : 0;
        // All valid pixelData implementations support the getPixelValue accessor function below.
        // However, the following array check provides a slight optimization for native Javascript
        // arrays.
        if (Array.isArray(pixelData)) {
            var canvasImageDataIndex = 3;
            var storedPixelDataIndex = 0;
            var localNumPixels = pixelData.length;
            if (lutOffset == 0) {
                while(storedPixelDataIndex < localNumPixels) {
                    localCanvasImageDataData[canvasImageDataIndex] = localLut[localPixelData[storedPixelDataIndex++]]; // alpha
                    canvasImageDataIndex += 4;
                }
            } else {
                while(storedPixelDataIndex < localNumPixels) {
                    localCanvasImageDataData[canvasImageDataIndex] = localLut[localPixelData[storedPixelDataIndex++] + lutOffset]; // alpha
                    canvasImageDataIndex += 4;
                }
            }
        }
        else {
            var getPixelValue = cornerstone.createStoredPixelAccessor(pixelData);
            // Convert the pixel values to to the canvas buffer values.
            for (var i=0; i < pixelData.length; i++) {
                localCanvasImageDataData[3 + (i * 4)] = localLut[getPixelValue(i) + lutOffset];
            };
        }
    }

    // Module exports
    cornerstone.internal.storedPixelDataToCanvasImageData = storedPixelDataToCanvasImageData;
    cornerstone.storedPixelDataToCanvasImageData = storedPixelDataToCanvasImageData;

}(cornerstone));
