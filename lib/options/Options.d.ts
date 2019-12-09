/**
 * Defines the options available for an instance of Deltaframe along with their default
 * values if any exist.
 *
 * @since 1.0.0
 */
export default class Options {
    /**
     * The lowest the fps can drop to before the Deltaframe restarts to attempt to fix the
   * problem.
     *
     * @since 1.0.0
     *
     * @property {number}
   *
   * @default 15
     */
    minFps: number;
    /**
     * The fps that the game loop should aim to  achieve.
     *
     * @since 1.0.0
     *
     * @property {number}
   *
   * @default 60
     */
    targetFps: number;
    /**
     * When the fps goes below the minFps Deltaframe will restart. This indicates how many times it will
   * restart before stopping permanently.
     *
     * @since 1.0.0
     *
     * @property {number}
   *
   * @default Infinity
     */
    maxRestartAttempts: number;
    /**
     * Specify the amount of milliseconds that Deltaframe should run for.
     *
     * @since 1.0.0
     *
     * @property {number}
   *
   * @default Infinity
     */
    runTime: number;
    /**
     * Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
     *
     * @since 1.0.0
     *
     * @property {number}
   *
   * @default false
     */
    forceSetTimeout: boolean;
    /**
   * @param {Object} options The initialization options passed to Deltaframe.
   */
    constructor(options?: Object);
    /**
     * Return the minFps as a decimal representing the amount of time before a frame should occur.
     *
     * @since 1.0.0
     *
     * @returns {number}
     */
    get minFpsCalc(): number;
    /**
     * Return the targetFps as a decimal representing the amount of time before a frame should occur.
     *
     * @since 1.0.0
     *
     * @returns {number}
     */
    get targetFpsCalc(): number;
}
