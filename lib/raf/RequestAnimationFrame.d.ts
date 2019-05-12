/**
 * Abstract the use of requestAnimationFrame and setTimeout under one name so that Deltaframe itself does
 * not have to worry about which one to use.
 *
 * This also uses the requestAnimationFrame and cancelAnimationFrame that are supported by the user's browser
 * and forces setTimeout if desired.
 *
 * @since 0.1.0
 */
export default class RequestAnimationFrame {
    /**
     * A reference to the id returned by requestAnimationFrame or setTimeout so
     * that we can cancel their operation when needed.
     *
     * @since 0.1.0
     *
     * @property {number}
     */
    id: number;
    /**
     * Keeps track of whether the loop is already running or not so it's not accidently
     * restarted.
     *
     * @since 0.1.0
     *
     * @property {boolean}
     *
     * @default false
     */
    running: boolean;
    /**
     * The function that should be run on every update of the loop.
     *
     * @since 0.1.0
     *
     * @property {Function}
     *
     * @default ()=>{}
     */
    fn: Function;
    /**
     * Indicates whether setTImeout is being used instead of requestAnimationFrame.
     *
     * @since 0.1.0
     *
     * @property {boolean}
     *
     * @default false
     */
    private usingSetTimeout;
    constructor();
    /**
     * Start the operation of the requestAnimationFrame or setTimeout loop.
     *
     * @since 0.1.0
     *
     * @param {Function} fn The function to run every update of the loop.
     * @param {boolean} forceSetTimeout Indicates whether setTimeout should be used even if the user's browser supports requestAnimationFrame.
     */
    start(fn: Function, forceSetTimeout: boolean): void;
    /**
     * Call requestAnimationFrame recursively so that the loop keeps going and
     * also send the timestamps over to Deltaframe.
     *
     * @since 0.1.0
     *
     * @param {number} timestamp The timestamp from the most recent requestAnimationFrame request.
     */
    updateRAF(timestamp: number): void;
    /**
     * Call setTimeout recursively so that the loop keeps going and also send
     * the timestamps over to Deltaframe.
     *
     * @since 0.1.0
     */
    updateTimeout(): void;
    /**
     * Restart the requestAnimation or setTimeout loop.
     *
     * @since 0.1.0
     */
    restart(): void;
    /**
     * Stop the loop by calling cancelAnimationFrame or clearTimeout.
     *
     * @since 0.1.0
     */
    stop(): void;
}
