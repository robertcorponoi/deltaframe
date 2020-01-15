'use strict'

import Options from './options/Options';
import RequestAnimationFrame from './raf/RequestAnimationFrame';

/**
 * Deltaframe is an animation and game loop manager that makes sure your application is punctual and performant.
 */
export default class Deltaframe {

  /**
   * A reference to the options for this instance of Deltaframe.
   * 
   * @private
   * 
   * @property {Options}
   */
  private _options: Options;

  /**
   * The amount of times Deltaframe has had to restart due to the average fps dipping below the minimum fps for a 
   * series of frames.
   * 
   * @private
   * 
   * @property {number}
   */
  private _restartAttempts: number;

  /**
   * Indicates whether Deltaframe is currently is currently running and not pausedor stopped.
   * 
   * @private
   * 
   * @property {boolean}
   */
  private _running: boolean;

  /**
   * Indicates whether Deltaframe is currently paused.
   * 
   * @private
   * 
   * @property {boolean}
   */
  private _paused: boolean;

  /**
   * The function that will be called on every Deltaframe update.
   * 
   * @private
   * 
   * @property {Function}
   */
  private _fn: Function;

  /**
   * The current frame that Deltaframe is on.
   * 
   * @private
   * 
   * @property {number}
   */
  private _frame: number;

  /**
   * The current timestamp as of the latest call to RequestAnimationFrame.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */
  private _time: (DOMHighResTimeStamp | number);

  /**
   * The timestamp before the current timestamp.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */
  private _prevTime: (DOMHighResTimeStamp | number);

  /**
   * The difference in time between the current time and the last time.
   * 
   * @private
   * 
   * @property {number}
   */
  private _delta: number;

  /**
   * The average difference in time between frames.
   * 
   * @private
   * 
   * @property {number}
   */
  private _deltaAverage: number;

  /**
   * A set of up to 10 recent previous delta values that are used to get the mean delta.
   * 
   * @private
   * 
   * @property {Array<number>}
   */
  private _deltaHistory: Array<number>;

  /**
   * Since we only want to go up to 10 on the deltaHistory, we keep track of what index we're  on so we can reset to 0 once were at 10.
   * 
   * @private
   * 
   * @property {number}
   */
  private _deltaIndex: number;

  /**
   * Initialize the RequestAnimationFrame abstraction module.
   * 
   * @private
   * 
   * @property {RequestAnimationFrame}
   */
  private _raf: RequestAnimationFrame;

  /**
   * Use the version of hidden that's supported by the user's browser.
   * 
   * @private
   * 
   * @property {document.hidden}
   */
  private _hidden: Object;

  /**
   * @param {Object} [options] The options to pass to this Deltaframe instance.
   * @param {number} [options.minFps=15] The minimum fps value allowed before Deltaframe will restart to try to correct the issue.
   * @param {number} [options.targetFps=60] The fps that Deltaframe should aim to achieve.
   * @param {number} [options.maxRestartAttempts=Infinity] The number of times Deltaframe will restart due to problems before stopping entirely.
   * @param {number} [options.runTime=Infinity] The length of time that this instance of Deltaframe will run. This can be used to create an animation that lasts a specific amount of time.
   * @param {boolean} [options.forceSetTimeout=false] If set to true, Deltaframe will use setTimeout for the loop instead of requestAnimationFrame.
   */
  constructor(options?: Object) {
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

    this._boot();
  }

  /**
   * Return the number of times that Deltafram has restarted.
   * 
   * @returns {number}
   */
  get timesRestarted(): number { return this._restartAttempts; }

  /**
   * Returns if Deltaframe is running or not.
   * 
   * @returns {boolean}
   */
  get isRunning(): boolean { return this._running; }

  /**
   * Returns if Deltaframe is paused or not.
   * 
   * @returns {boolean}
   */
  get isPaused(): boolean { return this._paused; }

  /**
   * Returns the current frame.
   * 
   * @returns {number}
   */
  get frame(): number { return this._frame; }

  /**
   * Returns the current time.
   * 
   * @returns {DOMHighResTimeStamp|number}
   */
  get time(): (DOMHighResTimeStamp | number) { return this._time; }

  /**
   * Start the loop.
   * 
   * @param {Function} fn The function to be called every step by the loop.
   */
  start(fn: Function) {
    this._fn = fn;

    this._prevTime = 0;

    this._running = true;

    this._raf.start((timestamp: number) => this._update(timestamp), this._options.forceSetTimeout);
  }

  /**
   * Pause the loop operation saving the state to be resumed at a later time.
   */
  pause() {
    this._paused = true;

    this._running = false;
  }

  /**
   * Resume the loop from a paused state.
   */
  resume() {
    this._paused = false;

    this._prevTime = window.performance.now();

    this._running = true;
  }

  /**
   * Stop the loop and reset all time values of Deltaframe.
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
   * Initialize the page visibility events which will let us save resources by pausing our updates when the user is not 
   * interacting with the page running Deltaframe.
   * 
   * @private
   */
  private _boot() {
    document.addEventListener("visibilitychange", () => this._visibilityChange());
  }

  /**
   * Update is called whenever requestAnimationFrame decides it can process the next step of the loop  or roughly 60 
   * times per second using setTimeout.
   * 
   * @private
   * 
   * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
   */
  private _update(timestamp: (DOMHighResTimeStamp|number)) {
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
   * When the the user has switched to a different tab and is not on the same page that Deltaframe is running on, Deltaframe 
   * will pause and when the user comes back it will resume.
   * 
   * @private
   */
  private _visibilityChange() {
    const visibility = document.visibilityState;

    if (this.isPaused && visibility === 'visible') this.resume();
    else if (this.isRunning && visibility === 'hidden') this.pause();
  }
}