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

// If a module loader is enabled, then export this cornerstone module.
// Otherwise, add this module to the global namespace if necessary.
if(typeof exports !== 'undefined') {
  if(typeof module !== 'undefined' && module.exports) {
    exports = module.exports = cornerstone;
  }
  exports.cornerstone = cornerstone;
} else if(typeof this.cornerstone === 'undefined') {
  this.cornerstone = cornerstone;
}
