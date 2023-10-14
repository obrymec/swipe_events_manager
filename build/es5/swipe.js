var exports={};
"use strict";
/**
* @project SwipeEventsManager - https://obrymec.github.io/swipe-events-manager
* @fileoverview Manages touch screen events on mobile devices.
* @author Obrymec - obrymecsprinces@gmail.com
* @type {SwipeEventsManager}
* @created 2023-10-06
* @updated 2023-10-13
* @file swipe.ts
* @version 0.0.5
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeEventsManager = exports.SwipeEventType = void 0;
// Enumerations.
/**
 * @description All supported
 * 	touch screen event types.
 * @exports SwipeEventType
 * @public
 * @enum {
 * 	SWIPE_RIGHT,
 *	SWIPE_DOWN,
 *	SWIPE_LEFT,
 *	SWIPE_UP
 * }
 */
var SwipeEventType;
(function (SwipeEventType) {
    SwipeEventType[SwipeEventType["SWIPE_RIGHT"] = 0] = "SWIPE_RIGHT";
    SwipeEventType[SwipeEventType["SWIPE_DOWN"] = 1] = "SWIPE_DOWN";
    SwipeEventType[SwipeEventType["SWIPE_LEFT"] = 2] = "SWIPE_LEFT";
    SwipeEventType[SwipeEventType["SWIPE_UP"] = 3] = "SWIPE_UP";
})(SwipeEventType || (exports.SwipeEventType = SwipeEventType = {}));
;
/**
 * @classdesc Manages touch screen
 * 	events on mobile devices.
 * @type {SwipeEventsManager}
 * @public
 * @class
 */
var SwipeEventsManager = /** @class */ (function () {
    /**
     * @description Initializes
     * 	event data and build it.
     * @constructor
     */
    function SwipeEventsManager(tag, onSwipe) {
        // Attributes.
        /**
         * @description Called when a
         * 	swipe event is detected.
         * @private {?Function=}
         * @type {?Function=}
         * @field
         */
        this.onSwipe_ = null;
        // Gets the passed callback.
        this.onSwipe_ = onSwipe;
        // Gets the passed tag.
        this.setTag(tag);
    }
    /**
     * @description Returns the
     * 	current selected tag
     * 	element in the DOM.
     * @function getTag
     * @public
     * @return {Element} Element
     */
    SwipeEventsManager.prototype.getTag = function () {
        // Returns the current
        // tag reference.
        return this.tag_;
    };
    /**
     * @description Destroys all
     * 	swipe events from the
     * 	selected tag inside
     * 	the DOM.
     * @function free
     * @public
     * @return {void} void
     */
    SwipeEventsManager.prototype.free = function () {
        var _a, _b;
        // Whether the old tag exists.
        if (typeof this.onSwipe_ === "function"
            && this.tag_ instanceof Element) {
            // Destroys `touchstart` event
            // from the selected markup.
            (_a = this.tag_) === null || _a === void 0 ? void 0 : _a.removeEventListener("touchstart", this.onSwipe_);
            // Destroys `touchend` event
            // from the selected markup.
            (_b = this.tag_) === null || _b === void 0 ? void 0 : _b.removeEventListener("touchend", this.onSwipe_);
        }
    };
    /**
     * @description Overrides the active
     *  tag after remove old events
     *  associated to the previous
     *  tag and listen swipe events
     *  on that new.
     * @param {Element} tag The
     *  new tag to put active.
     * @function overrideTag_
     * @private {Function}
     * @returns {void} void
     */
    SwipeEventsManager.prototype.overrideTag_ = function (tag) {
        // Free the last selected
        // tag swipe events.
        this.free();
        // Replaces the old
        // tag to the new.
        this.tag_ = tag;
        // Whether the given
        // callback exists.
        if (typeof this.onSwipe_
            === "function") {
            // Listens all swipe
            // events.
            this.swipe_();
        }
    };
    /**
     * @description Listens swipe events
     * 	for potential detections.
     * @param {
     * 	Function(SwipeEventType)
     * } callback The method to be called
     * 	when a swipe event is detected.
     * 	The swipe direction is returned
     * 	on detecting events. It's a
     * 	constant value that can take
     * 	the following values:
     *
     * 	- `SwipeEventType.SWIPE_RIGHT`:
     * 		Returned when a swipe right
     * 		is detected.
     *
     * 	- `SwipeEventType.SWIPE_DOWN`:
     * 		Returned when a swipe down
     * 		is detected.
     *
     * 	- `SwipeEventType.SWIPE_LEFT`:
     * 		Returned when a swipe left
     * 		is detected.
     *
     * 	- `SwipeEventType.SWIPE_UP`:
     * 		Returned when a swipe up
     * 		is detected.
     * @function listen
     * @public
     * @returns {void} void
     */
    SwipeEventsManager.prototype.listen = function (callback) {
        // Whether the passed callback
        // is really defined.
        if (typeof callback === "function") {
            // Updates the callback
            // global field.
            this.onSwipe_ = callback;
            // Listens all swipe
            // events.
            this.swipe_();
            // Otherwise.
        }
        else {
            // Invalid data type.
            throw new Error("\n\t\t\t\tInvalid data type. Only \n\t\t\t\ta function is required \n\t\t\t\tto perform this task. \n\t\t\t\tCheck the given value \n\t\t\t\tto fix that error.\n\t\t\t".replace(/[\n\t]/g, ''));
        }
    };
    /**
     * @description Sets the current
     * 	selected markup to another.
     * 	Notice that old tag events
     * 	are destroyed before go to
     * 	the new tag.
     * @param {SwipeEventTarget} tag
     * 	The new tag element defined
     * 	inside the DOM.
     * @function setTag
     * @public
     * @return {void} void
     */
    SwipeEventsManager.prototype.setTag = function (tag) {
        // Whether the passed tag
        // is a real html element.
        if (tag instanceof Element) {
            // Removes the old tag
            // by the new.
            this.overrideTag_(tag);
            // Otherwise.
        }
        else if (typeof tag === "string") {
            // Gets the passed tag
            // from his id or class
            // name.
            var markup = (document.querySelector(tag));
            // Whether the given tag
            // is really defined
            // inside the DOM.
            if (markup instanceof Element) {
                // Removes the old tag
                // by the new.
                this.overrideTag_(markup);
                // Otherwise.
            }
            else {
                // Undefined tag element.
                throw new Error("\n\t\t\t\t\tThe given tag isn't defined. \n\t\t\t\t\tCheck the passed value to \n\t\t\t\t\tfix that error.\n\t\t\t\t".replace(/[\n\t]/g, ''));
            }
            // Otherwise.
        }
        else {
            // Invalid tag data type.
            throw new Error("\n\t\t\t\tThe given data type doesn't \n\t\t\t\tmatch with the supported \n\t\t\t\tdata types. Check the \n\t\t\t\tpassed value to fix \n\t\t\t\tthat error.\n\t\t\t".replace(/[\n\t]/g, ''));
        }
    };
    /**
     * @description Listens a touch
     * 	screen event on the given
     * 	tag.
     * @private {Function}
     * @function swipe_
     * @returns {void} void
     */
    SwipeEventsManager.prototype.swipe_ = function () {
        var _this = this;
        // The swipe direction.
        var swipedir;
        // The maximum time allowed
        // to travel that distance.
        var allowedTime = 300;
        // The min distance traveled
        // to be considered swipe.
        var threshold = 150;
        // The maximum distance allowed 
        // at the same time in
        // perpendicular direction.
        var restraint = 100;
        // The elapsed time since
        // the screen drag.
        var elapsedTime = 0;
        // The start time to a
        // touch screen motion.
        var startTime = 0;
        // The start point on x axis.
        var startX = 0;
        // The start point on y axis.
        var startY = 0;
        // The distance on x axis.
        var distX = 0;
        // The distance on y axis.
        var distY = 0;
        // Listens `touchstart` event.
        this.tag_.addEventListener("touchstart", function (event) {
            // Sets swipe direction.
            swipedir = null;
            // Records time when finger
            // first makes contact
            // with surface.
            startTime = (new Date().getTime());
            // Gets touch start x pos.
            startX = (event
                .changedTouches[0]
                .pageX);
            // Gets touch start y pos.
            startY = (event
                .changedTouches[0]
                .pageY);
        }, false);
        // Listens `touchend` event.
        this.tag_.addEventListener("touchend", function (event) {
            // Gets time elapsed.
            elapsedTime = (new Date().getTime()
                - startTime);
            // Gets horizontal distance
            // traveled by finger while
            // in contact with surface.
            distX = (event
                .changedTouches[0]
                .pageX - startX);
            // Gets vertical distance traveled
            // by finger while in contact with
            // surface.
            distY = (event
                .changedTouches[0]
                .pageY - startY);
            // Whether swipe meets this test.
            if (elapsedTime <= allowedTime) {
                // Whether swipe meets this
                // 2nd test for horizontal.
                if (Math.abs(distX) >= threshold &&
                    Math.abs(distY) <= restraint) {
                    // Whether distance traveled
                    // is negative, it indicates
                    // left swipe.
                    swipedir = ((distX < 0) ?
                        SwipeEventType.SWIPE_LEFT :
                        SwipeEventType.SWIPE_RIGHT);
                }
                // Whether swipe meets this
                // 2nd test for vertical.
                else if (Math.abs(distY) >= threshold &&
                    Math.abs(distX) <= restraint) {
                    // Whether distance traveled
                    // is negative, it indicates
                    // up swipe.
                    swipedir = ((distY < 0) ?
                        SwipeEventType.SWIPE_UP :
                        SwipeEventType.SWIPE_DOWN);
                }
            }
            // Calls the passed callback
            // with the detected swipe
            // direction.
            _this.onSwipe_(swipedir);
        }, false);
    };
    return SwipeEventsManager;
}());
exports.SwipeEventsManager = SwipeEventsManager;
// SwipeEventsManager v1.0.5 | © CodiTheck organization
