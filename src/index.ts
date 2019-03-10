'use strict'

import Options from './options/Options';
import RequestAnimationFrame from './raf/RequestAnimationFrame';

/**
 * Deltaframe is an animation and game loop manager with a focus on punctuality
 * and a highly scalable framework.
 */
export default class Deltaframe {

  /**
   * Create an options Object by merging the user specified options 
   * with the defaults.
   * 
   * @since 1.0.0
   * 
   * @property {Object}
   * @readonly
   */
  private _options: Options;

  /**
   * The amount of times Deltaframe has restarted due to the average
   * fps going below the the minFps.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */
  private _restartAttempts: number;

  /**
   * Indicates whether Deltaframe is currently running and not paused 
   * or stopped.
   * 
   * @since 0.1.0
   * 
   * @property {boolean}
   * @readonly
   */
  private _running: boolean;

  /**
   * Indicates whether Deltaframe is currently paused.
   * 
   * @since 0.1.0
   * 
   * @property {boolean}
   * @readonly
   */
  private _paused: boolean;

  /**
   * The function that will be called on every Deltaframe update.
   * 
   * @since 0.1.0
   * 
   * @property {Function}
   * @readonly
   */
  private _fn: Function;

  /**
   * The current frame that Deltaframe is on.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */
  private _frame: number;

  /**
   * The current timestamp as of the latest RequestAnimationFrame 
   * update.
   * 
   * @since 0.1.0
   * 
   * @property {DOMHighResTimeStamp|number}
   * @readonly
   */
  private _time: number;

  /**
   * The timestamp before the current timestamp.
   * 
   * @since 0.1.0
   * 
   * @property {DOMHighResTimeStamp|number}
   * @readonly
   */
  private _prevTime: number;

  /**
   * The difference in time between the current time and the last time.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */
  private _delta: number;

  /**
   * The average difference in time between frames.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */
  private _deltaAverage: number;

  /**
   * A set of up to 10 recent previous delta values that are used to get the
   * mean delta.
   * 
   * @since 0.1.0
   * 
   * @property {Array}
   * @readonly
   */
  private _deltaHistory: Array<number>;

  /**
   * Since we only want to go up to 10 on the deltaHistory, we keep track of
   * what index we're on so we can reset to 0 once were at 10.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */
  private _deltaIndex: number;

  /**
   * Initialize the RequestAnimationFrame abstraction module.
   * 
   * @since 0.1.0
   * 
   * @property {RequestAnimationFrame}
   * @readonly
   */
  private _raf: RequestAnimationFrame;

  /**
   * Use the version of hidden that's supported by the user's browser.
   * 
   * @since 1.0.0
   * 
   * @property {document.hidden}
   * @readonly
   */
  private _hidden: Object;

  /**
   * @param {Object} [options] The options to pass to this Deltaframe instance.
   */
  constructor(options: Object) {

    this._options = new Options(options);

    this._restartAttempts = 0;

    this._running = false;

    this._paused = false;

    this._fn = () => { };

    this._frame = 0;

    this._time = 0;

    this._prevTime = 0;

    this._delta = 0;

    this._deltaAverage = 0;

    this._deltaHistory = [];

    this._deltaIndex = 0;

    this._raf = new RequestAnimationFrame();

    this._hidden = document.hidden;

    /**
     * Run the initialization method after all of the properties have been
     * loaded and assigned.
     * 
     * @since 0.1.0
     */
    this._boot();

  }

  /**
   * Return the current number of times that Deltafram has
   * restarted.
   * 
   * @since 1.0.0
   * 
   * @returns {number}
   */
  public get timesRestarted(): number {

    return this._restartAttempts;

  }

  /**
   * Returns the current running status of Deltaframe.
   * 
   * @since 1.0.0
   * 
   * @returns {boolean}
   */
  public get isRunning(): boolean {

    return this._running;

  }

  /**
   * Returns the current paused status of Deltaframe.
   * 
   * @since 0.1.0
   * 
   * @returns {boolean}
   */
  public get isPaused(): boolean {

    return this._paused;

  }

  /**
   * Returns the current frame.
   * 
   * @since 1.0.0
   * 
   * @returns {number}
   */
  public get frame(): number {

    return this._frame;

  }

  /**
   * Start the Deltaframe loop using the abstracted requestAnimationFrame 
   * or setTimeout methods.
   * 
   * @since 0.1.0
   * 
   * @param {Function} fn The function to be called every step by the loop.
   */
  public start(fn: Function) {

    this._fn = fn;

    this._prevTime = 0;

    this._running = true;

    this._raf.start((timestamp: number) => this._update(timestamp), this._options.forceSetTimeout);

  }

  /**
   * Temporarily stop the loop, saving values to be resumed at a later point.
   * 
   * @since 0.1.0
   */
  public pause() {

    this._paused = true;

    this._running = false;

  }

  /**
   * Resume the loop from its paused state.
   * 
   * @since 0.1.0
   */
  public resume() {

    this._paused = false;

    this._prevTime = window.performance.now();

    this._running = true;

  }

  /**
   * Stop the loop and reset all time values of Deltaframe.
   * 
   * @since 0.1.0
   */
  public stop() {

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
  private _boot() {

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
  private _update(timestamp: number) {

    if (this._paused) return;

    if (timestamp >= this._options.runTime) {

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

    if (this._deltaAverage >= this._options.minFpsCalc) {

      if (this._restartAttempts === this._options.maxRestartAttempts) {

        this.stop();

        return;

      }

      this._raf.restart();

      this._restartAttempts++;

    }

    if (this._deltaAverage >= this._options.targetFpsCalc) {

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
  private _visibilityChange() {

    let visibility = document.visibilityState;

    if (visibility === 'visible') this.resume();

    else if (visibility === 'hidden') this.pause();

  }

}