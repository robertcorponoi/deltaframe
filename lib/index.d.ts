/**
 * Deltaframe is an animation and game loop manager that makes sure your application
 * is punctual and performant.
 *
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 *
 * @version 1.0.2
 */
export default class Deltaframe {
    /**
     * A reference to the options for this instance of Deltaframe.
     *
     * @since 0.1.0
     * @private
     *
     * @property {Options}
     */
    private _options;
    /**
     * The amount of times Deltaframe has had to restart due to the average fps
     * dipping below the minimum fps for a series of frames.
     *
     * @since 0.1.0
     * @private
     *
     * @property {number}
     */
    private _restartAttempts;
    /**
     * Indicates whether Deltaframe is currently is currently running and not paused
     * or stopped.
     *
     * @since 0.1.0
     * @private
     *
     * @property {boolean}
     */
    private _running;
    /**
     * Indicates whether Deltaframe is currently paused.
     *
     * @since 0.1.0
     * @private
     *
     * @property {boolean}
     */
    private _paused;
    /**
     * The function that will be called on every Deltaframe update.
     *
     * @since 0.1.0
     * @private
     *
     * @property {Function}
     */
    private _fn;
    /**
     * The current frame that Deltaframe is on.
     *
     * @since 0.1.0
     * @private
     *
     * @property {number}
     */
    private _frame;
    /**
     * The current timestamp as of the latest call to RequestAnimationFrame.
     *
     * @since 0.1.0
     * @private
     *
     * @property {DOMHighResTimeStamp|number}
     */
    private _time;
    /**
     * The timestamp before the current timestamp.
     *
     * @since 0.1.0
     * @private
     *
     * @property {DOMHighResTimeStamp|number}
     */
    private _prevTime;
    /**
     * The difference in time between the current time and the last time.
     *
     * @since 0.1.0
     * @private
     *
     * @property {number}
     */
    private _delta;
    /**
     * The average difference in time between frames.
     *
     * @since 0.1.0
     * @private
     *
     * @property {number}
     */
    private _deltaAverage;
    /**
     * A set of up to 10 recent previous delta values that are used to get the mean delta.
     *
     * @since 0.1.0
     * @private
     *
     * @property {Array<number>}
     */
    private _deltaHistory;
    /**
     * Since we only want to go up to 10 on the deltaHistory, we keep track of what index we're
     * on so we can reset to 0 once were at 10.
     *
     * @since 0.1.0
     * @private
     *
     * @property {number}
     */
    private _deltaIndex;
    /**
     * Initialize the RequestAnimationFrame abstraction module.
     *
     * @since 0.1.0
     * @private
     *
     * @property {RequestAnimationFrame}
     */
    private _raf;
    /**
     * Use the version of hidden that's supported by the user's browser.
     *
     * @since 1.0.0
     * @private
     *
     * @property {document.hidden}
     */
    private _hidden;
    /**
     * @param {Object} [options] The options to pass to this Deltaframe instance.
     * @param {number} [options.minFps=15] The minimum fps value allowed before Deltaframe will restart to try to correct the issue.
     * @param {number} [options.targetFps=60] The fps that Deltaframe should aim to achieve.
     * @param {number} [options.maxRestartAttempts=Infinity] The number of times Deltaframe will restart due to problems before stopping entirely.
     * @param {number} [options.runTime=Infinity] The length of time that this instance of Deltaframe will run. This can be used to create an animation that lasts a specific amount of time.
     * @param {boolean} [options.forceSetTimeout=false] If set to true, Deltaframe will use setTimeout for the loop instead of requestAnimationFrame.
     */
    constructor(options?: Object);
    /**
     * Return the number of times that Deltafram has restarted.
     *
     * @since 1.0.0
     *
     * @returns {number}
     */
    readonly timesRestarted: number;
    /**
     * Returns if Deltaframe is running or not.
     *
     * @since 1.0.0
     *
     * @returns {boolean}
     */
    readonly isRunning: boolean;
    /**
     * Returns if Deltaframe is paused or not.
     *
     * @since 0.1.0
     *
     * @returns {boolean}
     */
    readonly isPaused: boolean;
    /**
     * Returns the current frame.
     *
     * @since 1.0.0
     *
     * @returns {number}
     */
    readonly frame: number;
    /**
     * Start the loop.
     *
     * @since 0.1.0
     *
     * @param {Function} fn The function to be called every step by the loop.
     */
    start(fn: Function): void;
    /**
     * Pause the loop operation saving the state to be resumed at a later time.
     *
     * @since 0.1.0
     */
    pause(): void;
    /**
     * Resume the loop from a paused state.
     *
     * @since 0.1.0
     */
    resume(): void;
    /**
     * Stop the loop and reset all time values of Deltaframe.
     *
     * @since 0.1.0
     */
    stop(): void;
    /**
     * Initialize the page visibility events which will let us save resources by pausing
     * our updates when the user is not interacting with the page running Deltaframe.
     *
     * @since 0.1.0
     * @private
     */
    private _boot;
    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop
     * or roughly 60 times per second using setTimeout.
     *
     * @since 0.1.0
     * @private
     *
     * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
     */
    private _update;
    /**
     * When the the user has switched to a different tab and is not on the same page that
     * Deltaframe is running on, Deltaframe will pause and when the user comes back it will resume.
     *
     * @since 0.2.0
     * @private
     */
    private _visibilityChange;
}
