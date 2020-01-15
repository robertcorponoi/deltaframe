'use strict'

/**
 * Defines the options available for an instance of Deltaframe along with their default values if any exist.
 */
export default class Options {

	/**
	 * The lowest the fps can drop to before the Deltaframe restarts to attempt to fix the problem.
	 * 
	 * @property {number}
   * 
   * @default 15
	 */
  minFps: number = 15;

	/**
	 * The fps that the game loop should aim to  achieve.
	 * 
	 * @property {number}
   * 
   * @default 60
	 */
  targetFps: number = 60;

	/**
	 * When the fps goes below the minFps Deltaframe will restart. This indicates how many times it will  restart before stopping permanently.
	 * 
	 * @property {number}
   * 
   * @default Infinity
	 */
  maxRestartAttempts: number = Infinity;

	/**
	 * Specify the amount of milliseconds that Deltaframe should run for.
	 * 
	 * @property {number}
   * 
   * @default Infinity
	 */
  runTime: number = Infinity;

	/**
	 * Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
	 * 
	 * @property {number}
   * 
   * @default false
	 */
  forceSetTimeout: boolean = false;

	/**
   * @param {Object} options The initialization options passed to Deltaframe.
   */
  constructor(options: Object = {}) {
    Object.assign(this, options);
  }

	/**
	 * Return the minFps as a decimal representing the amount of time before a frame should occur.
	 * 
	 * @returns {number}
	 */
  get minFpsCalc(): number { return Math.floor(1000 / this.minFps); }

	/**
	 * Return the targetFps as a decimal representing the amount of time before a frame should occur.
	 * 
	 * @returns {number}
	 */
  get targetFpsCalc(): number { return Math.floor(1000 / this.targetFps); }
}