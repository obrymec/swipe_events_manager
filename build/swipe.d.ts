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
export declare enum SwipeEventType {
    SWIPE_RIGHT = 0,
    SWIPE_DOWN = 1,
    SWIPE_LEFT = 2,
    SWIPE_UP = 3
}
/**
 * @classdesc Manages touch screen
 * 	events on mobile devices.
 * @type {SwipeEventsManager}
 * @public
 * @class
 */
export declare class SwipeEventsManager {
    /**
     * @description Called when a
     * 	swipe event is detected.
     * @private {?Function=}
     * @type {?Function=}
     * @field
     */
    private onSwipe_;
    /**
     * @description The target tag
     * 	element into the DOM.
     * @private {Element|String}
     * @type {Element|String}
     * @field
     */
    private tag_;
    /**
     * @description Initializes
     * 	event data and build it.
     * @constructor
     */
    constructor(tag: (Element | String), onSwipe?: Function);
    /**
     * @description Returns the
     * 	current selected tag
     * 	element in the DOM.
     * @function getTag
     * @public
     * @return {Element} Element
     */
    getTag(): Element;
    /**
     * @description Destroys all
     * 	swipe events from the
     * 	selected tag inside
     * 	the DOM.
     * @function free
     * @public
     * @return {void} void
     */
    free(): void;
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
    private overrideTag_;
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
    listen(callback: Function): void;
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
    setTag(tag: (Element | String)): void;
    /**
     * @description Listens a touch
     * 	screen event on the given
     * 	tag.
     * @private {Function}
     * @function swipe_
     * @returns {void} void
     */
    private swipe_;
}
