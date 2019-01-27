/**
 * Deltaframe is an animation and game loop manager with a focus on punctuality
 * and a highly scalable framework.
 */
export default class Deltaframe {
    /**
     * Create an options Object by merging the user specified options
     * with the defaults.
     *
     * @since 1.0.0
     *
     * @property {Object}
     * @readonly
     */
    private _options;
    /**
     * The amount of times Deltaframe has restarted due to the average
     * fps going below the the minFps.
     *
     * @since 0.1.0
     *
     * @property {number}
     * @readonly
     */
    private _restartAttempts;
    /**
     * Indicates whether Deltaframe is currently running and not paused
     * or stopped.
     *
     * @since 0.1.0
     *
     * @property {boolean}
     * @readonly
     */
    private _running;
    /**
     * Indicates whether Deltaframe is currently paused.
     *
     * @since 0.1.0
     *
     * @property {boolean}
     * @readonly
     */
    private _paused;
    /**
     * The function that will be called on every Deltaframe update.
     *
     * @since 0.1.0
     *
     * @property {Function}
     * @readonly
     */
    private _fn;
    /**
     * The current frame that Deltaframe is on.
     *
     * @since 0.1.0
     *
     * @property {number}
     * @readonly
     */
    private _frame;
    /**
     * The current timestamp as of the latest RequestAnimationFrame
     * update.
     *
     * @since 0.1.0
     *
     * @property {DOMHighResTimeStamp|number}
     * @readonly
     */
    private _time;
    /**
     * The timestamp before the current timestamp.
     *
     * @since 0.1.0
     *
     * @property {DOMHighResTimeStamp|number}
     * @readonly
     */
    private _prevTime;
    /**
     * The difference in time between the current time and the last time.
     *
     * @since 0.1.0
     *
     * @property {number}
     * @readonly
     */
    private _delta;
    /**
     * The average difference in time between frames.
     *
     * @since 0.1.0
     *
     * @property {number}
     * @readonly
     */
    private _deltaAverage;
    /**
     * A set of up to 10 recent previous delta values that are used to get the
     * mean delta.
     *
     * @since 0.1.0
     *
     * @property {Array}
     * @readonly
     */
    private _deltaHistory;
    /**
     * Since we only want to go up to 10 on the deltaHistory, we keep track of
     * what index we're on so we can reset to 0 once were at 10.
     *
     * @since 0.1.0
     *
     * @property {number}
     * @readonly
     */
    private _deltaIndex;
    /**
     * Initialize the RequestAnimationFrame abstraction module.
     *
     * @since 0.1.0
     *
     * @property {RequestAnimationFrame}
     * @readonly
     */
    private _raf;
    /**
     * Use the version of hidden that's supported by the user's browser.
     *
     * @since 1.0.0
     *
     * @property {document.hidden}
     * @readonly
     */
    private _hidden;
    /**
     * @param {Object} [options] The options to pass to this Deltaframe instance.
     */
    constructor(options: Object);
    /**
     * Return the current number of times that Deltafram has
     * restarted.
     *
     * @since 1.0.0
     *
     * @returns {number}
     */
    readonly timesRestarted: number;
    /**
     * Returns the current running status of Deltaframe.
     *
     * @since 1.0.0
     *
     * @returns {boolean}
     */
    readonly isRunning: boolean;
    /**
     * Returns the current paused status of Deltaframe.
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
     * Start the Deltaframe loop using the abstracted requestAnimationFrame
     * or setTimeout methods.
     *
     * @since 0.1.0
     *
     * @param {Function} fn The function to be called every step by the loop.
     */
    start(fn: Function): void;
    /**
     * Temporarily stop the loop, saving values to be resumed at a later point.
     *
     * @since 0.1.0
     */
    pause(): void;
    /**
     * Resume the loop from its paused state.
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
     * Update is called whenever requestAnimationFrame decides it can process the
     * next step of the loop or roughly 60 times per second using setTimeout.
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
     */
    private _visibilityChange;
}
