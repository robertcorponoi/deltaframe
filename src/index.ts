import { type Options } from "./Options.js";
import { type UpdateFunction } from "./UpdateFunction.js";
import RequestAnimationFrame from "./RequestAnimationFrame.js";

/**
 * Deltaframe is an animation and game loop manager that makes sure your
 * application is punctual and performant.
 */
export default class Deltaframe {
    /** A reference to the options for this instance of Deltaframe. */
    options;

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
    private _raf: RequestAnimationFrame;

    /** Use the version of hidden that's supported by the user's browser. */
    private _hidden: boolean;

    constructor(options?: Options) {
        this.options = Object.assign(
            {
                minFps: 15,
                targetFps: 60,
                maxRestartAttempts: Infinity,
                runTime: Infinity,
                forceSetTimeout: false,
            },
            options,
        );

        this.restartAttempts = 0;

        this.running = false;
        this.paused = false;

        this.fn = () => null;
        this.frame = 0;

        this.time = 0;
        this.prevTime = 0;

        this.delta = 0;
        this.deltaAverage = 0;
        this.deltaHistory = [];
        this.deltaIndex = 0;

        this._raf = new RequestAnimationFrame();
        this._hidden = document.hidden;

        this._boot();
    }

    /**
     * Return the minFps as a decimal representing the amount of time before a
     * frame should occur.
     *
     * @returns {number}
     */
    get minFpsCalc(): number {
        return Math.floor(1000 / this.options.minFps);
    }

    /**
     * Return the targetFps as a decimal representing the amount of time
     * before a frame should occur.
     *
     * @returns {number}
     */
    get targetFpsCalc(): number {
        return Math.floor(1000 / this.options.targetFps);
    }

    /**
     * Start the loop.
     *
     * @param {UpdateFunction} fn The function to be called every step by the loop.
     */
    start(fn: UpdateFunction) {
        this.fn = fn;

        this.prevTime = 0;
        this.running = true;

        this._raf.start(
            (timestamp: number) => this._update(timestamp),
            this.options.forceSetTimeout,
        );
    }

    /**
     * Pause the loop operation saving the state to be resumed at a later time.
     */
    pause() {
        this.paused = true;
        this.running = false;
    }

    /**
     * Resume the loop from a paused state.
     */
    resume() {
        this.paused = false;
        this.prevTime = window.performance.now();

        this.running = true;
    }

    /**
     * Stop the loop and reset all time values of Deltaframe.
     */
    stop() {
        this.restartAttempts = 0;

        this.running = false;
        this.paused = false;

        this.fn = () => null;
        this.frame = 0;

        this.time = 0;
        this.prevTime = 0;

        this.delta = 0;
        this.deltaHistory = [];
        this.deltaIndex = 0;

        document.removeEventListener(
            "visibilitychange",
            () => this._visibilityChange,
        );

        this._raf.stop();

        return;
    }

    /**
     * Initialize the page visibility events which will let us save resources by pausing our updates when the user is not
     * interacting with the page running Deltaframe.
     *
     * @private
     */
    private _boot() {
        document.addEventListener("visibilitychange", () =>
            this._visibilityChange(),
        );
    }

    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop  or roughly 60
     * times per second using setTimeout.
     *
     * @private
     *
     * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
     */
    private _update(timestamp: DOMHighResTimeStamp | number) {
        if (this.paused) return;

        if (timestamp >= this.options.runTime) {
            this.stop();

            return;
        }

        this.time = timestamp;
        this.delta = timestamp - this.prevTime;

        if (this.deltaIndex === 10) this.deltaIndex = 0;

        this.deltaHistory[this.deltaIndex] = this.delta;
        this.deltaIndex++;

        let mean = 0;

        for (let i = 0; i < this.deltaHistory.length; ++i)
            mean += this.deltaHistory[i];

        mean /= 10;

        this.deltaAverage = mean;

        if (this.deltaAverage >= this.minFpsCalc) {
            if (this.restartAttempts === this.options.maxRestartAttempts) {
                this.stop();
                return;
            }

            this._raf.restart();
            this.restartAttempts++;
        }

        if (this.deltaAverage >= this.targetFpsCalc) {
            this.frame++;

            this.fn(this.delta, this.deltaAverage, timestamp);

            this.prevTime = timestamp;
        }
    }

    /**
     * When the the user has switched to a different tab and is not on the same page that Deltaframe is running on, Deltaframe
     * will pause and when the user comes back it will resume.
     *
     * @private
     */
    private _visibilityChange() {
        const visibility = document.visibilityState;

        if (this.paused && visibility === "visible") this.resume();
        else if (this.running && visibility === "hidden") this.pause();
    }
}
