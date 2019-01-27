/**
 * Abstract the use of requestAnimationFrame and setTimeout under one name so that Deltaframe
 * itself does not have to worry about which one to use.
 *
 * This also uses the requestAnimationFrame and cancelAnimationFrame that are supported by the
 * user's browser and forces setTimeout if desired.
 *
 * @since 0.1.0
 */
export default class RequestAnimationFrame {
    private id;
    private running;
    private fn;
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
