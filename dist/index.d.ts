import { type Options } from "./Options.js";
import { type UpdateFunction } from "./UpdateFunction.js";
/**
 * Deltaframe is an animation and game loop manager that makes sure your
 * application is punctual and performant.
 */
export default class Deltaframe {
    /** A reference to the options for this instance of Deltaframe. */
    options: {
        minFps: number;
        targetFps: number;
        maxRestartAttempts: number;
        runTime: number;
        forceSetTimeout: boolean;
    } & Options;
    /**
     * The amount of times Deltaframe has had to restart due to the average
     * fps dipping below the minimum fps for a series of frames.
     */
    restartAttempts: number;
    /**
     * Indicates whether Deltaframe is currently is currently running and not
     * paused or stopped.
     */
    running: boolean;
    /** Indicates whether Deltaframe is currently paused. */
    paused: boolean;
    /** The function that will be called on every Deltaframe update. */
    fn: UpdateFunction;
    /** The current frame that Deltaframe is on. */
    frame: number;
    /** The current timestamp as of the latest call to `RequestAnimationFrame`. */
    time: DOMHighResTimeStamp | number;
    /** The timestamp before the current timestamp. */
    prevTime: DOMHighResTimeStamp | number;
    /** The difference in time between the current time and the last time. */
    delta: number;
    /** The average difference in time between frames. */
    deltaAverage: number;
    /**
     * A set of up to 10 recent previous delta values that are used to get the
     * mean delta.
     */
    deltaHistory: Array<number>;
    /**
     * Since we only want to go up to 10 on the deltaHistory, we keep track of
     * what index we're  on so we can reset to 0 once were at 10.
     */
    deltaIndex: number;
    /** Initialize the RequestAnimationFrame abstraction module. */
    private _raf;
    /** Use the version of hidden that's supported by the user's browser. */
    private _hidden;
    constructor(options?: Options);
    /**
     * Return the minFps as a decimal representing the amount of time before a
     * frame should occur.
     *
     * @returns {number}
     */
    get minFpsCalc(): number;
    /**
     * Return the targetFps as a decimal representing the amount of time
     * before a frame should occur.
     *
     * @returns {number}
     */
    get targetFpsCalc(): number;
    /**
     * Start the loop.
     *
     * @param {UpdateFunction} fn The function to be called every step by the loop.
     */
    start(fn: UpdateFunction): void;
    /**
     * Pause the loop operation saving the state to be resumed at a later time.
     */
    pause(): void;
    /**
     * Resume the loop from a paused state.
     */
    resume(): void;
    /**
     * Stop the loop and reset all time values of Deltaframe.
     */
    stop(): void;
    /**
     * Initialize the page visibility events which will let us save resources by pausing our updates when the user is not
     * interacting with the page running Deltaframe.
     *
     * @private
     */
    private _boot;
    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop  or roughly 60
     * times per second using setTimeout.
     *
     * @private
     *
     * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
     */
    private _update;
    /**
     * When the the user has switched to a different tab and is not on the same page that Deltaframe is running on, Deltaframe
     * will pause and when the user comes back it will resume.
     *
     * @private
     */
    private _visibilityChange;
}
