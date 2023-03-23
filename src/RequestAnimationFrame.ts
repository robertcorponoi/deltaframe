import { RAFUpdateFunction } from "./UpdateFunction.js";

/**
 * Abstracts the use of `requestAnimationFrame` and `setTimeout` under one
 * name so that Deltaframe itself does  not have to worry about which one to
 * use.
 *
 * This also uses the `requestAnimationFrame` and `cancelAnimationFrame` that
 * are supported by the user's browser and forces `setTimeout` if desired.
 */
export default class RequestAnimationFrame {
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
    fn: RAFUpdateFunction = () => null;

    /**
     * Indicates whether `setTimeout` is being used instead of
     * `requestAnimationFrame`.
     */
    private usingSetTimeout = false;

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
            function (this: RequestAnimationFrame) {
                clearTimeout(this.id);
            };
    }

    /**
     * Start the operation of the `requestAnimationFrame` or `setTimeout` loop.
     *
     * @param {RAFUpdateFunction} fn The function to run every update of the loop.
     * @param {boolean} forceSetTimeout Indicates whether `setTimeout` should be used even if the user's browser supports `requestAnimationFrame`.
     */
    start(fn: RAFUpdateFunction, forceSetTimeout: boolean) {
        if (this.running) return;

        this.running = true;
        this.fn = fn;

        if (forceSetTimeout) {
            this.usingSetTimeout = true;
            this.updateTimeout();
        } else {
            window.requestAnimationFrame((time) => this.updateRAF(time));
        }
    }

    /**
     * Calls `requestAnimationFrame` so that the loop keeps going and also
     * sends the timestamps over to Deltaframe.
     *
     * @param {number} timestamp The timestamp from the most recent `requestAnimationFrame` request.
     */
    updateRAF(timestamp: number) {
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
        if (this.usingSetTimeout) window.clearTimeout(this.id);
        else window.cancelAnimationFrame(this.id);

        this.id = 0;

        this.running = false;

        if (this.usingSetTimeout) this.updateTimeout();
        else window.requestAnimationFrame((time) => this.updateRAF(time));

        this.running = true;
    }

    /**
     * Stops the loop by calling `cancelAnimationFrame` or `clearTimeout`.
     */
    stop() {
        if (this.usingSetTimeout) window.clearTimeout(this.id);
        else window.cancelAnimationFrame(this.id);

        this.id = 0;
        this.running = false;
        this.fn = () => null;

        return;
    }
}
