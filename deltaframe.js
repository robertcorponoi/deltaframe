'use strict'

import { RequestAnimationFrame } from './requestanimationframe.js';

/**
 * Deltaframe is an animation and game loop manager.
 */
export class Deltaframe {

  /**
   * @param {Object} options A set of options to extend and alter the functionality of Deltaframe.
   * @param {number} [options.minFps=15] The lowest the game loop's frames per second can drop to before the loop panics.
   * @param {number} [options.targetFps=60] The frames per second that the game loop should aim to achieve.
   * @param {number} [options.maxRestartAttempts=Infinity] When the game loop goes below the minFps it will restart. This indicates how many times it will restart before stopping permanently.
   * @param {boolean} [options.forceSetTimeout=false] Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
   * @param {number} [options.runTime=Infinite] Specify the amount of milliseconds that Deltaframe should run for.
   */
  constructor(options = {}) {

    /**
     * Create an options object by merging the user specified options with the defaults.
     * 
     * @property {Object}
     * @readonly
     */
    this._options = Object.assign({

      minFps: 15,

      targetFps: 60,

      maxRestartAttempts: Infinity,

      forceSetTimeout: false,

      runTime: Infinity

    }, options);

    /**
     * A reference to the length of time Deltaframe should run for before automatically
     * stopping.
     * 
     * @property {number}
     * @readonly
     */
    this._runTime = this._options.runTime;

    /**
     * A reference to forceSetTimeout from the options.
     *property
     * @property {boolean}
     * @readonly
     */
    this._forceSetTimeout = this._options.forceSetTimeout;

    /**
     * Store a copy of the minFps as a millisecond value to avoid constant conversions.
     * 
     * @property {number}
     * @readonly
     */
    this._minFps = Math.floor(1000 / this._options.minFps);

    /**
     * Store a copy of the targetFps as a millisecond value to avoid constant conversions.
     * 
     * @property {number}
     * @readonly
     */
    this._targetFps = Math.floor(1000 / this._options.targetFps);

    /**
     * The number of times Deltaframe should attempt to restart the game loop before quitting.
     * 
     * @property {number}
     * @readonly
     */
    this._maxRestartAttempts = this._options.maxRestartAttempts;                                                                                                            

    /**
     * The amount of times Deltaframe has restarted the game loop.
     * 
     * @property {number}
     * @readonly
     */
    this._restartAttempts = 0;

    /**
     * Indicates whether Deltaframe is currently running and not paused or stopped.
     * 
     * @property {boolean}
     * @readonly
     */
    this._running = false;

    /**
     * Indicates whether Deltaframe is currently paused.
     * 
     * @property {boolean}
     * @readonly
     */
    this._paused = false;

    /**
     * THe function that will be called on every Deltaframe update.
     * 
     * @property {Function}
     * @readonly
     */
    this._fn = () => { };

    /**
     * The current frame that Deltaframe is on.
     * 
     * @property {number}
     * @readonly
     */
    this._frame = 0;

    /**
     * The current timestamp as of the latest RequestAnimationFrame update.
     * 
     * @property {DOMHighResTimeStamp|number}
     * @readonly
     */
    this._time = 0;

    /**
     * The timestamp before the current timestamp.
     * 
     * @property {DOMHighResTimeStamp|number}
     * @readonly
     */
    this._prevTime = 0;

    /**
     * The difference in time between the current time and the last time.
     * 
     * @property {number}
     * @readonly
     */
    this._delta = 0;

    /**
     * A set of up to 10 recent previous delta values that are used to get the
     * mean delta.
     * 
     * @property {Array}
     * @readonly
     */
    this._deltaHistory = [];

    /**
     * Since we only want to go up to 10 on the deltaHistory, we keep track of
     * what index we're on so we can reset to 0 once were at 10.
     * 
     * @property {number}
     * @readonly
     */
    this._deltaIndex = 0;

    /**
     * Initialize the RequestAnimationFrame abstraction module.
     * 
     * @property {RequestAnimationFrame}
     * @readonly
     */
    this._raf = new RequestAnimationFrame();

    /**
     * Use the version of hidden that's supported by the user's browser.
     * 
     * @property {document.hidden}
     * @readonly
     */
    this._hidden = document.hidden || document.webkitHidden || document.mozHidden || document.msHidden || document.oHidden;

    /**
     * Run the boot method which initializes the hidden events.
     */
    this._boot();

  }

  /**
   * Return the current number of times that Deltaframe has had to restart.
   * 
   * @since 1.0.0
   * 
   * @returns {number}
   */
  get timesRestarted() {

    return this._restartAttempts;

  }

  /**
   * Returns whether Deltaframe is currently running or not.
   * 
   * @since 1.0.0
   * 
   * @returns {boolean}
   */
  get isRunning() {

    return this._running;

  }

  /**
   * Returns whether Deltaframe is currently paused or not.
   * 
   * @since 1.0.0
   * 
   * @returns {boolean}
   */
  get isPaused() {

    return this._paused;

  }

  /**
   * Returns the current frame that Deltaframe is on.
   * 
   * @since 1.0.0
   * 
   * @returns {number}
   */
  get frame() {

    return this._frame;

  }

  /**
   * Returns the most recent timestamp from Deltaframe.
   * 
   * @since 1.0.0
   * 
   * @returns {number}
   */
  get time() {

    return this._time;

  }

  /**
   * Returns the average time between frames.
   * 
   * @since 1.0.0
   * 
   * @returns {number}
   */
  get delta() {

    return this._delta;

  }

  /**
   * Start the Deltaframe loop using the abstracted requestAnimationFrame or
   * setTimeout methods.
   * 
   * @since 0.1.0
   * 
   * @param {Function} fn The function to be called every step by the loop.
   */
  start(fn) {

    this._fn = fn;

    this._prevTime = 0;

    this._running = true;

    this._raf.start((timestamp) => this._update(timestamp), this._forceSetTimeout);

  }

  /**
   * Temporarily stop the loop, saving values to be resumed at a later point.
   * 
   * @since 0.1.0
   */
  pause() {

    this._paused = true;

    this._running = false;

  }

  /**
   * Resume the loop from its paused state.
   * 
   * @since 0.1.0
   */
  resume() {

    this._paused = false;

    this._prevTime = window.performance.now();

    this._running = true;

  }

  /**
   * Stop the loop and reset all time values of Deltaframe.
   * 
   * @since 0.1.0
   */
  stop() {

    this._restartAttempts = 0;

    this._running = false;

    this._paused = false;

    this._fn = () => { };

    this._frame = 0;

    this._time = 0;

    this._prevTime = 0;

    this._delta = 0;

    this._deltaHistory = [];

    this._deltaIndex = 0;

    document.removeEventListener('visibilitychange', () => this._visibilityChange);

    this._raf.stop();

    return;

  }

  /**
   * Initialize the page visibility events which will let us save resources by pausing
   * our updates when the user is not interacting with the page running Deltaframe.
   * 
   * @since 0.1.0
   * @private
   */
  _boot() {

    document.addEventListener('visibilitychange', () => this._visibilityChange);

  }

  /**
   * Update is called whenever requestAnimationFrame decides it can process the
   * next step of the loop or roughly 60 times per second using setTimeout.
   * 
   * @since 0.1.0
   * @private
   * 
   * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
   */
  _update(timestamp) {

    if (this._paused) return;

    if (timestamp >= this._runTime) {

      this.stop();

      return;

    }

    this._time = timestamp;

    this._delta = timestamp - this._prevTime;

    if (this._deltaIndex === 10) this._deltaIndex = 0;

    this._deltaHistory[this._deltaIndex] = this._delta;

    this._deltaIndex++;

    let mean = 0;

    for (let i = 0; i < this._deltaHistory.length; ++i) mean += this._deltaHistory[i];

    mean /= 10;

    this._deltaAverage = mean;

    if (this._deltaAverage >= this._minFps) {

      if (this._restartAttempts === this._maxRestartAttempts) {

        this.stop();

        return;

      }

      this._raf.restart();

      this._restartAttempts++;

    }

    if (this._deltaAverage >= this._targetFps) {

      this._frame++;

      this._fn(timestamp, this._delta, this._deltaAverage);

      this._prevTime = timestamp;

    }

  }

  /**
   * When the the user has switched to a different tab and is not on the same page that
   * Deltaframe is running on, Deltaframe will pause and when the user comes back it will resume.
   * 
   * @since 0.2.0
   */
  _visibilityChange() {

    let visibility = document.visibilityState;

    if (visibility === 'visible') this.resume();

    else if (visibility === 'hidden') this.pause();

  }

}