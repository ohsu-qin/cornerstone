/**
 * This module is responsible for enabling an element to display images with cornerstone
 */
(function (cornerstone) {

    "use strict";

    function enable(element) {
        if(element === undefined) {
            throw new Error("enable: parameter element cannot be undefined");
        }

        var canvas = document.createElement('canvas');
        element.appendChild(canvas);
        
        // Make a new event engine, e.g. an EventEmitter or
        // jQuery $(element).
        var ee = cornerstone.createEventEngine(element);

        var el = {
            element: element,
            canvas: canvas,
            image : undefined, // will be set once image is loaded
            invalid: false, // true if image needs to be drawn, false if not
            data : {},
            // delegate to the event engine
            on: function() { return ee.on.apply(ee, arguments); },
            trigger: function() { return ee.trigger.apply(ee, arguments); }
        };
        cornerstone.addEnabledElement(el);

        cornerstone.resize(element, true);

        return element;
    }

    // module/private exports
    cornerstone.enable = enable;
}(cornerstone));