/**
 * The Options Object is used to define a set of options that will merge
 * with the user provided options and fill in default values for options
 * not specified.
 *
 * @since 1.0.0
 */
export default class Options {
    /**
     * The lowest the game loop's frames per second can drop to
     * before the loop panics.
     *
     * @since 1.0.0
     *
     * @property {number}
     * @readonly
     */
    private minFps;
    /**
     * The frames per second that the game loop should aim to
     * achieve.
     *
     * @since 1.0.0
     *
     * @property {number}
     * @readonly
     */
    private targetFps;
    /**
     * When the game loop goes below the minFps it will restart.
     * This indicates how many times it will restart before stopping
     * permanently.
     *
     * @since 1.0.0
     *
     * @property {number}
     * @readonly
     */
    maxRestartAttempts: number;
    /**
     * Specify the amount of milliseconds that Deltaframe should run
     * for.
     *
     * @since 1.0.0
     *
     * @property {number}
     * @readonly
     */
    runTime: number;
    /**
     * Indicates whether setTimeout should be used even if requestAnimationFrame
     * is supported by the user's browser.
     *
     * @since 1.0.0
     *
     * @property {number}
     * @readonly
     */
    forceSetTimeout: boolean;
    /**
   * @param {Object} [options]
   * @param {number} [options.minFps=15] The lowest the game loop's frames per second can drop to before the loop panics.
   * @param {number} [options.targetFps=60] The frames per second that the game loop should aim to achieve.
   * @param {number} [options.maxRestartAttempts=Infinity] When the game loop goes below the minFps it will restart. This indicates how many times it will restart before stopping permanently.
     * @param {number} [options.runTime=Infinity] Specify the amount of milliseconds that Deltaframe should run for.
   * @param {boolean} [options.forceSetTimeout=false] Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
   */
    constructor(options: Object);
    /**
     * Return the minFps as a decimal representing the amount of
     * time before a frame should occur.
     *
     * @since 1.0.0
     *
     * @returns {number}
     */
    readonly minFpsCalc: number;
    /**
     * Return the targetFps as a decimal representing the amount of
     * time before a frame should occur.
     *
     * @since 1.0.0
     *
     * @returns {number}
     */
    readonly targetFpsCalc: number;
}
