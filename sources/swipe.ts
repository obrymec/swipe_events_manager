/**
* @project SwipeEventsManager - https://github.com/obrymec/swipe_events_manager
* @fileoverview Manages touch screen events on mobile devices.
* @author Obrymec - obrymecsprinces@gmail.com
* @type {SwipeEventsManager}
* @created 2023-10-06
* @updated 2023-10-11
* @file swipe.ts
* @version 0.0.5
*/

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
export enum SwipeEventType {
	SWIPE_RIGHT,
	SWIPE_DOWN,
	SWIPE_LEFT,
	SWIPE_UP
};

/**
 * @classdesc Manages touch screen
 * 	events on mobile devices.
 * @type {SwipeEventsManager}
 * @public
 * @class
 */
export class SwipeEventsManager {
	// Attributes.
	/**
	 * @description Called when a
	 * 	swipe event is detected.
	 * @private {?Function=}
	 * @type {?Function=}
	 * @field
	 */
	private onSwipe_: any = null;
	/**
	 * @description The target tag
	 * 	element into the DOM.
	 * @private {Element|String}
	 * @type {Element|String}
	 * @field
	 */
	private tag_: Element;

	/**
	 * @description Initializes
	 * 	event data and build it.
	 * @constructor
	 */
	constructor (
		tag: (Element | String),
		onSwipe?: Function
	) {
		// Gets the passed callback.
		this.onSwipe_ = onSwipe;
		// Gets the passed tag.
		this.setTag (tag);
	}

	/**
	 * @description Returns the
	 * 	current selected tag
	 * 	element in the DOM.
	 * @function getTag
	 * @public
	 * @return {Element} Element
	 */
	public getTag (): Element {
		// Returns the current
		// tag reference.
		return this.tag_;
	}

	/**
	 * @description Destroys all
	 * 	swipe events from the
	 * 	selected tag inside
	 * 	the DOM.
	 * @function free
	 * @public
	 * @return {void} void
	 */
	public free (): void {
		// Whether the old tag exists.
		if (
			typeof this.onSwipe_ === "function"
			&& this.tag_ instanceof Element
		) {
			// Destroys `touchstart` event
			// from the selected markup.
			this.tag_?.removeEventListener (
				"touchstart", this.onSwipe_
			);
			// Destroys `touchend` event
			// from the selected markup.
			this.tag_?.removeEventListener (
				"touchend", this.onSwipe_
			);
		}
	}

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
	private overrideTag_ (
		tag: Element
	): void {
		// Free the last selected
		// tag swipe events.
		this.free ();
		// Replaces the old
		// tag to the new.
		this.tag_ = tag;
		// Whether the given
		// callback exists.
		if (
			typeof this.onSwipe_
				=== "function"
		) {
			// Listens all swipe
			// events.
			this.swipe_ ();
		}
	}

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
	public listen (
		callback: Function
	): void {
		// Whether the passed callback
		// is really defined.
		if (
			typeof callback === "function"
		) {
			// Updates the callback
			// global field.
			this.onSwipe_ = callback;
			// Listens all swipe
			// events.
			this.swipe_ ();
		// Otherwise.
		} else {
			// Invalid data type.
			throw new Error (`
				Invalid data type. Only 
				a function is required 
				to perform this task. 
				Check the given value 
				to fix that error.
			`.replace (/[\n\t]/g, ''));
		}
	}

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
	public setTag (
		tag: (Element | String)
	): void {
		// Whether the passed tag
		// is a real html element.
		if (tag instanceof Element) {
			// Removes the old tag
			// by the new.
			this.overrideTag_ (tag);
		// Otherwise.
		} else if (
			typeof tag === "string"
		) {
			// Gets the passed tag
			// from his id or class
			// name.
			const markup: (Element | null) = (
				document.querySelector
					<Element> (tag)
			);
			// Whether the given tag
			// is really defined
			// inside the DOM.
			if (
				markup instanceof Element
			) {
				// Removes the old tag
				// by the new.
				this.overrideTag_ (markup);
			// Otherwise.
			} else {
				// Undefined tag element.
				throw new Error (`
					The given tag isn't defined. 
					Check the passed value to 
					fix that error.
				`.replace (/[\n\t]/g, ''));
			}
		// Otherwise.
		} else {
			// Invalid tag data type.
			throw new Error (`
				The given data type doesn't 
				match with the supported 
				data types. Check the 
				passed value to fix 
				that error.
			`.replace (/[\n\t]/g, ''));
		}
	}

	/**
	 * @description Listens a touch
	 * 	screen event on the given
	 * 	tag.
	 * @private {Function}
	 * @function swipe_
	 * @returns {void} void
	 */
	private swipe_ (): void {
		// The swipe direction.
		let swipedir: (null | SwipeEventType);
		// The maximum time allowed
		// to travel that distance.
		let allowedTime: number = 300;
		// The min distance traveled
		// to be considered swipe.
		let threshold: number = 150;
		// The maximum distance allowed 
		// at the same time in
		// perpendicular direction.
		let restraint: number = 100;
		// The elapsed time since
		// the screen drag.
		let elapsedTime: number = 0;
		// The start time to a
		// touch screen motion.
		let startTime: number = 0;
		// The start point on x axis.
		let startX: number = 0;
		// The start point on y axis.
		let startY: number = 0;
		// The distance on x axis.
		let distX: number = 0;
		// The distance on y axis.
		let distY: number = 0;
		// Listens `touchstart` event.
		this.tag_.addEventListener (
			"touchstart", (event: any) => {
				// Sets swipe direction.
				swipedir = null;
				// Records time when finger
				// first makes contact
				// with surface.
				startTime = (
					new Date ().getTime ()
				);
				// Gets touch start x pos.
				startX = (
					event
						.changedTouches[0]
						.pageX
				);
				// Gets touch start y pos.
				startY = (
					event
						.changedTouches[0]
						.pageY
				);
			}, false
		);
		// Listens `touchend` event.
		this.tag_.addEventListener (
			"touchend", (event: any) => {
				// Gets time elapsed.
				elapsedTime = (
					new Date ().getTime ()
						- startTime
				);
				// Gets horizontal distance
				// traveled by finger while
				// in contact with surface.
				distX = (
					event
						.changedTouches[0]
						.pageX - startX
				);
				// Gets vertical distance traveled
				// by finger while in contact with
				// surface.
				distY = (
					event
						.changedTouches[0]
						.pageY - startY
				);
				// Whether swipe meets this test.
				if (
					elapsedTime <= allowedTime
				) {
					// Whether swipe meets this
					// 2nd test for horizontal.
					if (
						Math.abs (distX) >= threshold &&
						Math.abs (distY) <= restraint
					) {
						// Whether distance traveled
						// is negative, it indicates
						// left swipe.
						swipedir = (
							(distX < 0) ?
							SwipeEventType.SWIPE_LEFT :
							SwipeEventType.SWIPE_RIGHT
						);
					}
					// Whether swipe meets this
					// 2nd test for vertical.
					else if (
						Math.abs (distY) >= threshold &&
						Math.abs (distX) <= restraint
					) {
						// Whether distance traveled
						// is negative, it indicates
						// up swipe.
						swipedir = (
							(distY < 0) ?
							SwipeEventType.SWIPE_UP :
							SwipeEventType.SWIPE_DOWN
						);
					}
				}
				// Calls the passed callback
				// with the detected swipe
				// direction.
				this.onSwipe_ (swipedir);
			}, false
		);
	}
}
