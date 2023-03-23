export type Options = {
    /**
     * The lowest the fps can drop to before the Deltaframe restarts to
     * attempt to fix the problem.
     *
     * @default 15
     */
    minFps?: number;
    /**
     * The fps that the game loop should aim to  achieve.
     *
     * @default 60
     */
    targetFps?: number;
    /**
     * When the fps goes below the minFps Deltaframe will restart. This
     * indicates how many times it will  restart before stopping permanently.
     *
     * @default Infinity
     */
    maxRestartAttempts?: number;
    /**
     * Specify the amount of milliseconds that Deltaframe should run for.
     *
     * @default Infinity
     */
    runTime?: number;
    /**
     * Indicates whether setTimeout should be used even if
     * `requestAnimationFrame` is supported by the user's browser.
     *
     * @default false
     */
    forceSetTimeout?: boolean;
};
