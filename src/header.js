// Create a temporary variable to hold the cornerstone
// module. If cornerstone is already in the global
// namespace, then modify that object. Otherwise,
// make a new object.
if(typeof window.cornerstone === 'undefined') {
    var cornerstone = {
        internal : {},
        rendering: {}
    };
} else {
    var cornerstone = window.cornerstone;
}
