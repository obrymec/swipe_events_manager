export declare enum SwipeEventType {
    SWIPE_RIGHT = 0,
    SWIPE_DOWN = 1,
    SWIPE_LEFT = 2,
    SWIPE_UP = 3
}
export declare class SwipeEventsManager {
    private onSwipe_;
    private tag_;
    constructor(tag: (Element | String), onSwipe?: Function);
    getTag(): Element;
    free(): void;
    private overrideTag_;
    listen(callback: Function): void;
    setTag(tag: (Element | String)): void;
    private swipe_;
}
