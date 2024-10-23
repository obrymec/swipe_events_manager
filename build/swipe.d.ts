/**
 * @project SwipeEventsManager - https://obrymec.github.io/swipe_events_manager
 * @fileoverview Manages touch screen events on mobile devices.
 * @author Obrymec - https://obrymec.vercel.app
 * @created 2023-10-06
 * @updated 2024-10-23
 * @file swipe.ts
 * @version 1.1.0
 */
export declare enum SwipeEventType {
    SWIPE_RIGHT = 0,
    SWIPE_DOWN = 1,
    SWIPE_LEFT = 2,
    SWIPE_UP = 3
}
/**
 * @classdesc Manages touch screen events on mobile devices.
 * @type {SwipeEventsManager}
 * @public
 * @class
 */
export declare class SwipeEventsManager {
    private onSwipe_;
    private tag_;
    /**
     * @description Initializes event data and build it.
     * @constructor
     */
    constructor(tag?: (Element | string), onSwipe?: Function);
    /**
     * @description Returns the current selected tag element in the DOM.
     * @function getTag
     * @type {?Element}
     * @public
     * @returns {?Element}
     */
    getTag(): (Element | null);
    /**
     * @description Listens swipe events for potential detections.
     * @param {?Function} callback The method to be called when a
     * 	swipe event is detected. The swipe direction is returned
     * 	on detecting events. It's a constant value that can take
     * 	the following values :
     *
     * 	- `SwipeEventType.SWIPE_UP`: Returned when a swipe up is detected.
     *
     * 	- `SwipeEventType.SWIPE_RIGHT`: Returned when a swipe right
     * 		is detected.
     *
     * 	- `SwipeEventType.SWIPE_DOWN`: Returned when a swipe down
     * 		is detected.
     *
     * 	- `SwipeEventType.SWIPE_LEFT`: Returned when a swipe left
     * 		is detected.
     * @function listen
     * @type {void}
     * @public
     * @returns {void}
     */
    listen(callback: (Function | null)): void;
    /**
     * @description Overrides the active tag after remove old events
     *  associated to the previous tag and listen swipe events on
     * 	that new.
     * @param {Element} tag The new tag to put active.
     * @function overrideTag_
     * @private {Function}
     * @type {void}
     * @returns {void}
     */
    private overrideTag_;
    /**
     * @description Sets the current selected markup to another.
     * 	Notice that old tag events are destroyed before go to
     * 	the new tag.
     * @param {undefined|Element|string} tag The new tag element
     * 	defined inside the DOM.
     * @function setTag
     * @type {void}
     * @public
     * @returns {void}
     */
    setTag(tag?: (Element | string)): void;
    /**
     * @description Destroys all swipe events from the selected
     * 	tag inside the DOM.
     * @function free
     * @type {void}
     * @public
     * @returns {void}
     */
    free(): void;
    /**
     * @description Listens a touch screen event on the given tag.
     * @private {Function}
     * @function swipe_
     * @type {void}
     * @returns {void}
     */
    private swipe_;
}
