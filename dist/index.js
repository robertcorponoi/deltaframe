/**
 * Abstracts the use of `requestAnimationFrame` and `setTimeout` under one
 * name so that Deltaframe itself does  not have to worry about which one to
 * use.
 *
 * This also uses the `requestAnimationFrame` and `cancelAnimationFrame` that
 * are supported by the user's browser and forces `setTimeout` if desired.
 */
class RequestAnimationFrame {
    /**
     * A reference to the id returned by `requestAnimationFrame` or
     * `setTimeout` so  that we can cancel their operation when needed.
     */
    id = 0;
    /**
     * Keeps track of whether the loop is already running or not so it's not
     * accidently restarted.
     */
    running = false;
    /** The function that should be run on every update of the loop. */
    fn = () => null;
    /**
     * Indicates whether `setTimeout` is being used instead of
     * `requestAnimationFrame`.
     */
    usingSetTimeout = false;
    constructor() {
        /**
         * Use the version of `requestAnimationFrame` that is supported by the
         * user's browser and if none are  supported, use `setTimeout` instead.
         */
        window.requestAnimationFrame =
            window.requestAnimationFrame ||
                function (f) {
                    return setTimeout(f, 1000 / 60);
                };
        /**
         * Use the version of `cancelAnimationFrame` that is supported by the
         * user's browser and if none are supported, then `setTimeout` was
         * used and so we use `clearTimeout` instead.
         */
        window.cancelAnimationFrame =
            window.cancelAnimationFrame ||
                function () {
                    clearTimeout(this.id);
                };
    }
    /**
     * Start the operation of the `requestAnimationFrame` or `setTimeout` loop.
     *
     * @param {RAFUpdateFunction} fn The function to run every update of the loop.
     * @param {boolean} forceSetTimeout Indicates whether `setTimeout` should be used even if the user's browser supports `requestAnimationFrame`.
     */
    start(fn, forceSetTimeout) {
        if (this.running)
            return;
        this.running = true;
        this.fn = fn;
        if (forceSetTimeout) {
            this.usingSetTimeout = true;
            this.updateTimeout();
        }
        else {
            window.requestAnimationFrame((time) => this.updateRAF(time));
        }
    }
    /**
     * Calls `requestAnimationFrame` so that the loop keeps going and also
     * sends the timestamps over to Deltaframe.
     *
     * @param {number} timestamp The timestamp from the most recent `requestAnimationFrame` request.
     */
    updateRAF(timestamp) {
        this.running = true;
        this.fn(timestamp);
        this.id = window.requestAnimationFrame((time) => this.updateRAF(time));
    }
    /**
     * Call `setTimeout` so that the loop keeps going and also send the
     * timestamps over to Deltaframe.
     */
    updateTimeout() {
        const timestamp = window.performance.now();
        this.fn(timestamp);
        this.id = window.setTimeout(() => this.updateTimeout(), 1000 / 60);
    }
    /**
     * Restarts the `requestAnimationFrame` or `setTimeout` loop.
     */
    restart() {
        if (this.usingSetTimeout)
            window.clearTimeout(this.id);
        else
            window.cancelAnimationFrame(this.id);
        this.id = 0;
        this.running = false;
        if (this.usingSetTimeout)
            this.updateTimeout();
        else
            window.requestAnimationFrame((time) => this.updateRAF(time));
        this.running = true;
    }
    /**
     * Stops the loop by calling `cancelAnimationFrame` or `clearTimeout`.
     */
    stop() {
        if (this.usingSetTimeout)
            window.clearTimeout(this.id);
        else
            window.cancelAnimationFrame(this.id);
        this.id = 0;
        this.running = false;
        this.fn = () => null;
        return;
    }
}

/**
 * Deltaframe is an animation and game loop manager that makes sure your
 * application is punctual and performant.
 */
class Deltaframe {
    /** A reference to the options for this instance of Deltaframe. */
    options;
    /**
     * The amount of times Deltaframe has had to restart due to the average
     * fps dipping below the minimum fps for a series of frames.
     */
    restartAttempts;
    /**
     * Indicates whether Deltaframe is currently is currently running and not
     * paused or stopped.
     */
    running;
    /** Indicates whether Deltaframe is currently paused. */
    paused;
    /** The function that will be called on every Deltaframe update. */
    fn;
    /** The current frame that Deltaframe is on. */
    frame;
    /** The current timestamp as of the latest call to `RequestAnimationFrame`. */
    time;
    /** The timestamp before the current timestamp. */
    prevTime;
    /** The difference in time between the current time and the last time. */
    delta;
    /** The average difference in time between frames. */
    deltaAverage;
    /**
     * A set of up to 10 recent previous delta values that are used to get the
     * mean delta.
     */
    deltaHistory;
    /**
     * Since we only want to go up to 10 on the deltaHistory, we keep track of
     * what index we're  on so we can reset to 0 once were at 10.
     */
    deltaIndex;
    /** Initialize the RequestAnimationFrame abstraction module. */
    _raf;
    /** Use the version of hidden that's supported by the user's browser. */
    _hidden;
    constructor(options) {
        this.options = Object.assign({
            minFps: 15,
            targetFps: 60,
            maxRestartAttempts: Infinity,
            runTime: Infinity,
            forceSetTimeout: false,
        }, options);
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
    get minFpsCalc() {
        return Math.floor(1000 / this.options.minFps);
    }
    /**
     * Return the targetFps as a decimal representing the amount of time
     * before a frame should occur.
     *
     * @returns {number}
     */
    get targetFpsCalc() {
        return Math.floor(1000 / this.options.targetFps);
    }
    /**
     * Start the loop.
     *
     * @param {UpdateFunction} fn The function to be called every step by the loop.
     */
    start(fn) {
        this.fn = fn;
        this.prevTime = 0;
        this.running = true;
        this._raf.start((timestamp) => this._update(timestamp), this.options.forceSetTimeout);
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
        document.removeEventListener("visibilitychange", () => this._visibilityChange);
        this._raf.stop();
        return;
    }
    /**
     * Initialize the page visibility events which will let us save resources by pausing our updates when the user is not
     * interacting with the page running Deltaframe.
     *
     * @private
     */
    _boot() {
        document.addEventListener("visibilitychange", () => this._visibilityChange());
    }
    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop  or roughly 60
     * times per second using setTimeout.
     *
     * @private
     *
     * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
     */
    _update(timestamp) {
        if (this.paused)
            return;
        if (timestamp >= this.options.runTime) {
            this.stop();
            return;
        }
        this.time = timestamp;
        this.delta = timestamp - this.prevTime;
        if (this.deltaIndex === 10)
            this.deltaIndex = 0;
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
            this.fn(timestamp, this.delta, this.deltaAverage);
            this.prevTime = timestamp;
        }
    }
    /**
     * When the the user has switched to a different tab and is not on the same page that Deltaframe is running on, Deltaframe
     * will pause and when the user comes back it will resume.
     *
     * @private
     */
    _visibilityChange() {
        const visibility = document.visibilityState;
        if (this.paused && visibility === "visible")
            this.resume();
        else if (this.running && visibility === "hidden")
            this.pause();
    }
}

export { Deltaframe as default };
