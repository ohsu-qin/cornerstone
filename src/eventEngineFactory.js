(function (cornerstone) {

    "use strict";
    
    var createEventEngine;

    if(true || typeof $ === 'undefined') {
        // Delegate to the eventEmitter module.
        createEventEngine = function(element) {
            var ee = new EventEmitter();
            // Return an EventEmitter adapter that aliases two
            // EventEmitter functions.
            return {
                on: function(evt, fn) {
                    // An EventEmitter handler function has a single data
                    // argument, e.g. handler(data). By contrast, jQuery
                    // has two arguments (event, data) The jQuery event
                    // argument is seldom used in practice. If there is
                    // more than one handler argument, then complain. 
                    if (fn.length > 1) {
                        throw new Error("The built-in non-jQuery Cornerstone" +
                                        " event handler function must accept" +
                                        " at most a single data argument.");
                    }
                    return ee.on.apply(ee, arguments); },
                trigger: function() { return ee.emit.apply(ee, arguments); }
            };
        };
    }
    else {
        // Delegate to jQuery.
        createEventEngine = function(element) {
            return $(element);
        };
    }
    
    // module/private exports
    cornerstone.createEventEngine = createEventEngine;
    // Make the Cornerstone event engine.
    var ee = createEventEngine(cornerstone);
    // Delegate the Cornerstone event emitter and handler to the
    // event engine.
    cornerstone.on = function() { return ee.on.apply(ee, arguments); };
    cornerstone.trigger = function() {
        return ee.trigger.apply(ee, arguments);
    };
}(cornerstone));
