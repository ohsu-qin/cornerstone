/**
 * This module returns a subset of the stored pixels of an image
 */
(function (cornerstone) {

    "use strict";

    /**
     * Returns an array of stored pixels given a rectangle in the image
     * @param element
     * @param x
     * @param y
     * @param width
     * @param height
     * @returns {Array}
     */
    function getStoredPixels(element, x, y, width, height) {
        if(element === undefined) {
            throw "getStoredPixels: parameter element must not be undefined";
        }

        x = Math.round(x);
        y = Math.round(y);
        var ee = cornerstone.getEnabledElement(element);
        var storedPixels = [];
        var index = 0;
        var pixelData = ee.image.getPixelData();
        // All valid pixelData implementations support the getPixelValue
        // accessor below. However, the array check provides a slight
        // optimization for native Javascript arrays.
        var row, column, spIndex;
        if (Array.isArray(pixelData)) {
            for(row=0; row < height; row++) {
                for(column=0; column < width; column++) {
                    spIndex = ((row + y) * ee.image.columns) + (column + x);
                    storedPixels[index++] = pixelData[spIndex];
                }
            }
        }
        else {
            var getPixelValue = cornerstone.createStoredPixelAccessor(pixelData);
            for(row=0; row < height; row++) {
                for(column=0; column < width; column++) {
                    spIndex = ((row + y) * ee.image.columns) + (column + x);
                    storedPixels[index++] = getPixelValue(spIndex);
                }
            }
        }
        return storedPixels;
    }

    // module exports
    cornerstone.getStoredPixels = getStoredPixels;
}(cornerstone));