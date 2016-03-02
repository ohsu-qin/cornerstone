// Create a temporary variable to hold the cornerstone
// module. If cornerstone is already in the global
// namespace, then modify that object. Otherwise,
// make a new object.
if(typeof this.cornerstone === 'undefined') {
    var cornerstone = {
        internal : {},
        rendering: {}
    };
} else {
    var cornerstone = this.cornerstone;
}

// Expose the class either via AMD, CommonJS or the global object.
// If a module loader is enabled, then export this cornerstone module.
// Otherwise, add this module to the global namespace, if necessary.
if(typeof define === 'function' && define.amd) {
    // Make an anonymous AMD module.
    define(function () {
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
    this.cornerstone = cornerstone;
}
