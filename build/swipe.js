export var SwipeEventType;
(function (SwipeEventType) {
    SwipeEventType[SwipeEventType["SWIPE_RIGHT"] = 0] = "SWIPE_RIGHT";
    SwipeEventType[SwipeEventType["SWIPE_DOWN"] = 1] = "SWIPE_DOWN";
    SwipeEventType[SwipeEventType["SWIPE_LEFT"] = 2] = "SWIPE_LEFT";
    SwipeEventType[SwipeEventType["SWIPE_UP"] = 3] = "SWIPE_UP";
})(SwipeEventType || (SwipeEventType = {}));
;
var SwipeEventsManager = (function () {
    function SwipeEventsManager(tag, onSwipe) {
        this.onSwipe_ = null;
        this.onSwipe_ = onSwipe;
        this.setTag(tag);
    }
    SwipeEventsManager.prototype.getTag = function () {
        return this.tag_;
    };
    SwipeEventsManager.prototype.free = function () {
        var _a, _b;
        if (typeof this.onSwipe_ === "function"
            && this.tag_ instanceof Element) {
            (_a = this.tag_) === null || _a === void 0 ? void 0 : _a.removeEventListener("touchstart", this.onSwipe_);
            (_b = this.tag_) === null || _b === void 0 ? void 0 : _b.removeEventListener("touchend", this.onSwipe_);
        }
    };
    SwipeEventsManager.prototype.overrideTag_ = function (tag) {
        this.free();
        this.tag_ = tag;
        if (typeof this.onSwipe_
            === "function") {
            this.swipe_();
        }
    };
    SwipeEventsManager.prototype.listen = function (callback) {
        if (typeof callback === "function") {
            this.onSwipe_ = callback;
            this.swipe_();
        }
        else {
            throw new Error("\n\t\t\t\tInvalid data type. Only \n\t\t\t\ta function is required \n\t\t\t\tto perform this task. \n\t\t\t\tCheck the given value \n\t\t\t\tto fix that error.\n\t\t\t".replace(/[\n\t]/g, ''));
        }
    };
    SwipeEventsManager.prototype.setTag = function (tag) {
        if (tag instanceof Element) {
            this.overrideTag_(tag);
        }
        else if (typeof tag === "string") {
            var markup = (document.querySelector(tag));
            if (markup instanceof Element) {
                this.overrideTag_(markup);
            }
            else {
                throw new Error("\n\t\t\t\t\tThe given tag isn't defined. \n\t\t\t\t\tCheck the passed value to \n\t\t\t\t\tfix that error.\n\t\t\t\t".replace(/[\n\t]/g, ''));
            }
        }
        else {
            throw new Error("\n\t\t\t\tThe given data type doesn't \n\t\t\t\tmatch with the supported \n\t\t\t\tdata types. Check the \n\t\t\t\tpassed value to fix \n\t\t\t\tthat error.\n\t\t\t".replace(/[\n\t]/g, ''));
        }
    };
    SwipeEventsManager.prototype.swipe_ = function () {
        var _this = this;
        var swipedir;
        var allowedTime = 300;
        var threshold = 150;
        var restraint = 100;
        var elapsedTime = 0;
        var startTime = 0;
        var startX = 0;
        var startY = 0;
        var distX = 0;
        var distY = 0;
        this.tag_.addEventListener("touchstart", function (event) {
            swipedir = null;
            startTime = (new Date().getTime());
            startX = (event
                .changedTouches[0]
                .pageX);
            startY = (event
                .changedTouches[0]
                .pageY);
        }, false);
        this.tag_.addEventListener("touchend", function (event) {
            elapsedTime = (new Date().getTime()
                - startTime);
            distX = (event
                .changedTouches[0]
                .pageX - startX);
            distY = (event
                .changedTouches[0]
                .pageY - startY);
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold &&
                    Math.abs(distY) <= restraint) {
                    swipedir = ((distX < 0) ?
                        SwipeEventType.SWIPE_LEFT :
                        SwipeEventType.SWIPE_RIGHT);
                }
                else if (Math.abs(distY) >= threshold &&
                    Math.abs(distX) <= restraint) {
                    swipedir = ((distY < 0) ?
                        SwipeEventType.SWIPE_UP :
                        SwipeEventType.SWIPE_DOWN);
                }
            }
            _this.onSwipe_(swipedir);
        }, false);
    };
    return SwipeEventsManager;
}());
export { SwipeEventsManager };
