/**
 * This module returns a function which accesses stored pixel data by index.
 */
(function (cornerstone) {

    "use strict";

    // Returns the accessor function for the given pixelData object.
    // The accessor for index i is determined as follows:
    // * if pixelData is an array, then [i]
    // * otherwise, if pixelData implements the *get* function, then get(i)
    // * otherwise, throw an error.
    //
    // Example:
    //
    // var getPixelValue = createStoredPixelAccessor(pixelData);
    // for (i=start; i < end; i++) {
    //     pixelValue = getPixelValue(i);
    //     ... 
    // }
    function createStoredPixelAccessor(pixelData) {
        if (Array.isArray(pixelData)) {
            return function (i) { return pixelData[i]; };
        }
        else if (typeof pixelData.get === "function" && pixelData.get.length === 1) {
            return function (i) { return pixelData.get(i); };
        }
        else {
            throw new Error("The pixel data is neither an array nor implements a get function");
        }
    }

    // module exports
    cornerstone.createStoredPixelAccessor = createStoredPixelAccessor;
}(cornerstone));
