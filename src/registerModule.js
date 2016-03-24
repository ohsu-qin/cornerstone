/**
 * This footer function registers Cornerstone as a module.
 *
 * Although AMD is customarily anonymous, Cornerstone registers as
 * a named module to support non-AMD environments, which could
 * generate an error when an anonymous define() is called outside
 * of a loader request.
 *
 * This file should be concatenated as the last function in the
 * Cornerstone module for compatibility with all non-RequireJS
 * AMD loaders. The concatenation order is accomplished by
 * specifying the following grunt concat file spec:
 *   src : [...,'!src/registerModule.js','src/registerModule.js'],
 */
(function (cornerstone) {

    "use strict";

    // Expose the class via either AMD, CommonJS or the global object.
    // If a module loader is enabled, then export this cornerstone module.
    // Otherwise, add this module to the global namespace.
    if (typeof define == 'function' && define.amd) {
        // AMD export.
        define('cornerstone', [], function() {
            return cornerstone;
        });
    }
    else if(typeof module === 'object' && module.exports) {
        // CommonJS export.
        module.exports = cornerstone;
    }
    else if(typeof exports !== 'undefined') {
        // NodeJS export.
        exports.cornerstone = cornerstone;
    }
    else {
        // Global export.
        window.cornerstone = cornerstone;
    }
}(cornerstone));
