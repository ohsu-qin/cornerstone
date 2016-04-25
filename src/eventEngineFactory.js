(function (cornerstone) {

    "use strict";
    
    var createEventEngine;
    
    // The built-in EventEmitter adapter.
    var builtinFactory = function(element) {
        // Import the EventEmitter module.
        var EventEmitter = require('EventEmitter');
        // Make a new EventEmitter.
        var ee = new EventEmitter();
        // Return an EventEmitter adapter object {on, trigger} that
        // aliases the EventEmitter functions *on* and *emit*, resp.
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
            // trigger is a straight-up alias for EventEmitter emit.
            trigger: function() { return ee.emit.apply(ee, arguments); }
        };
    };
    
    // The jQuery adapter.
    var jQueryFactory = function(element) {
        return $(element);
    };
    
    Object.defineProperties(cornerstone, {
        // Creates the event engine factory on demand, if necessary.
        eventEngineFactory: {
            get: function() {
                if(typeof this._eeFactory === 'undefined') {
                    if(typeof $ === 'undefined') {
                        this._eeFactory = builtinFactory;
                    }
                    else {
                        this._eeFactory = jQueryFactory;
                    }
                }
                return this._eeFactory;
            },
            set: function(fn) { this._eeFactory = fn; }
        },
        // Creates the cornerstone event engine on demand.
        eventEngine: {
            get: function() {
                if(typeof this._eventEngine === 'undefined') {
                    this._eventEngine = this.createEventEngine(this);
                }
                return this._eventEngine;
            }
        }
    });

    // Delegate event engine creation to the factory.
    cornerstone.createEventEngine = function(element) {
        var factory = cornerstone.eventEngineFactory;
        return factory(element);
    };

    // Delegate the Cornerstone event emitter and handler to the
    // event engine.
    cornerstone.on = function() {
        var ee = cornerstone.eventEngine;
        return cornerstone.eventEngine.on.apply(ee, arguments);
    };
    cornerstone.trigger = function() {
        var ee = cornerstone.eventEngine;
        return cornerstone.eventEngine.trigger.apply(ee, arguments);
    };
}(cornerstone));
