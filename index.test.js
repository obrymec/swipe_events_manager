/**
* @project SwipeEventsManager - https://github.com/obrymec/swipe_events_manager
* @fileoverview Tests the package to prevent upcomming bugs.
* @author Obrymec - obrymecsprinces@gmail.com
* @type {SwipeEventsManager}
* @created 2023-10-12
* @updated 2023-10-14
* @file index.test.js
* @version 0.0.2
*/

// Plugin dependencies.
import {SwipeEventsManager, SwipeEventType} from "./build/swipe.js";

// The bottom card tag reference.
const bottomCard = (
  document.querySelector (
    "div.bottom-card"
  )
);
// The top card tag reference.
const topCard = (
  document.querySelector (
    "div.top-card"
  )
);
// Initializes the package
// instance.
const swipeManager = (
  new SwipeEventsManager (
    "div.top-card"
  )
);
// Free all swipe effects.
document.querySelector (
  "button"
).addEventListener (
  "click", () => (
    swipeManager.free ()
  )
);
// Listens `click` event
// on the top card.
topCard.addEventListener (
  "click", () => {
    // Remove `active` class
    // from the `bottom-card`.
    bottomCard.classList.remove (
      "active"
    );
    // Adds `active` class
    // to the `top-card`.
    topCard.classList.add (
      "active"
    );
    // Sets target.
    swipeManager.setTag (
      topCard
    );
  }
);
// Listens `click` event
// on the bottom card.
bottomCard.addEventListener (
  "click", () => {
    // Remove `active` class
    // from the `top-card`.
    topCard.classList.remove (
      "active"
    );
    // Adds `active` class
    // to the `bottom-card`.
    bottomCard.classList.add (
      "active"
    );
    // Sets target.
    swipeManager.setTag (
      bottomCard
    );
  }
);
// Listens swipe directions.
swipeManager.listen (
  function (direction) {
    // The active tag reference.
    const tagName = (
      swipeManager.getTag ()
        .getAttribute ("name")
    );
    // Whether the direction
    // is to right.
    if (
      direction ===
        SwipeEventType.SWIPE_RIGHT
    ) {
      // Makes a warn on the
      // browser.
      window.alert (
        `SWIPE RIGHT DETECTED: ${
          tagName
        }`
      );
    // Whether the direction
    // is to bottom.
    } else if (
      direction ===
        SwipeEventType.SWIPE_DOWN
    ) {
      // Makes a warn on the
      // browser.
      window.alert (
        `SWIPE DOWN DETECTED: ${
          tagName
        }`
      );
    // Whether the direction
    // is to left.
    } else if (
      direction ===
        SwipeEventType.SWIPE_LEFT
    ) {
      // Makes a warn on the
      // browser.
      window.alert (
        `SWIPE LEFT DETECTED: ${
          tagName
        }`
      );
    // Whether the direction
    // is to top.
    } else if (
      direction ===
        SwipeEventType.SWIPE_UP
    ) {
      // Makes a warn on the
      // browser.
      window.alert (
        `SWIPE UP DETECTED: ${
          tagName
        }`
      );
    }
  }
);
