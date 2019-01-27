'use strict'

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
	private minFps: number;

	/**
	 * The frames per second that the game loop should aim to 
	 * achieve.
	 * 
	 * @since 1.0.0
	 * 
	 * @property {number}
	 * @readonly
	 */
	private targetFps: number;

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
	public maxRestartAttempts: number;

	/**
	 * Specify the amount of milliseconds that Deltaframe should run 
	 * for.
	 * 
	 * @since 1.0.0
	 * 
	 * @property {number}
	 * @readonly
	 */
	public runTime: number;

	/**
	 * Indicates whether setTimeout should be used even if requestAnimationFrame
	 * is supported by the user's browser.
	 * 
	 * @since 1.0.0
	 * 
	 * @property {number}
	 * @readonly
	 */
	public forceSetTimeout: boolean;

	/**
   * @param {Object} [options]
   * @param {number} [options.minFps=15] The lowest the game loop's frames per second can drop to before the loop panics.
   * @param {number} [options.targetFps=60] The frames per second that the game loop should aim to achieve.
   * @param {number} [options.maxRestartAttempts=Infinity] When the game loop goes below the minFps it will restart. This indicates how many times it will restart before stopping permanently.
	 * @param {number} [options.runTime=Infinity] Specify the amount of milliseconds that Deltaframe should run for.
   * @param {boolean} [options.forceSetTimeout=false] Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
   */
	constructor(options: Object) {

		this.minFps = 15;

		this.targetFps = 60;

		this.maxRestartAttempts = Infinity;

		this.runTime = Infinity;

		this.forceSetTimeout = false;

		/**
		 * Replace the default values with the user specified values, if they exist.
		 * 
		 * @since 1.0.0
		 */
		Object.assign(this, this, options);

	}

	/**
	 * Return the minFps as a decimal representing the amount of
	 * time before a frame should occur.
	 * 
	 * @since 1.0.0
	 * 
	 * @returns {number}
	 */
	public get minFpsCalc(): number {

		return Math.floor(1000 / this.minFps);

	}

	/**
	 * Return the targetFps as a decimal representing the amount of
	 * time before a frame should occur.
	 * 
	 * @since 1.0.0
	 * 
	 * @returns {number}
	 */
	public get targetFpsCalc(): number {

		return Math.floor(1000 / this.targetFps);

	}

}