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
    id: number;
    /**
     * Keeps track of whether the loop is already running or not so it's not
     * accidently restarted.
     */
    running: boolean;
    /** The function that should be run on every update of the loop. */
    fn: RAFUpdateFunction;
    /**
     * Indicates whether `setTimeout` is being used instead of
     * `requestAnimationFrame`.
     */
    private usingSetTimeout;
    constructor();
    /**
     * Start the operation of the `requestAnimationFrame` or `setTimeout` loop.
     *
     * @param {RAFUpdateFunction} fn The function to run every update of the loop.
     * @param {boolean} forceSetTimeout Indicates whether `setTimeout` should be used even if the user's browser supports `requestAnimationFrame`.
     */
    start(fn: RAFUpdateFunction, forceSetTimeout: boolean): void;
    /**
     * Calls `requestAnimationFrame` so that the loop keeps going and also
     * sends the timestamps over to Deltaframe.
     *
     * @param {number} timestamp The timestamp from the most recent `requestAnimationFrame` request.
     */
    updateRAF(timestamp: number): void;
    /**
     * Call `setTimeout` so that the loop keeps going and also send the
     * timestamps over to Deltaframe.
     */
    updateTimeout(): void;
    /**
     * Restarts the `requestAnimationFrame` or `setTimeout` loop.
     */
    restart(): void;
    /**
     * Stops the loop by calling `cancelAnimationFrame` or `clearTimeout`.
     */
    stop(): void;
}
