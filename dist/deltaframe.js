'use strict'

/**
 * Abstract the use of requestAnimationFrame and setTimeout under one name so that Deltaframe
 * itself does not have to worry about which one to use.
 * 
 * This also uses the requestAnimationFrame and cancelAnimationFrame that are supported by the
 * user's browser and forces setTimeout if desired.
 * 
 * @since 0.1.0
 */
class RequestAnimationFrame {

  constructor() {

    /**
     * Keep track of the id returned from requestAnimationFrame or setTimeout so we can
     * use it to cancel them later on.
     * 
     * @property {number}
     * @readonly
     */
    this.id = null;

    /**
     * Keep track of whether the loop is already running or not so we don't accidently
     * restart it.
     * 
     * @property {boolean}
     * @readonly
     */
    this.running = false;

    /**
     * The function, as sent from Deltaframe, that will be run every update of the loop.
     * 
     * @property {Function}
     * @readonly
     */
    this.fn = () => { };

    /**
     * Indicates whether setTimeout is being used instead of requestAnimationFrame, either by force or
     * by user's browser support.
     * 
     * @property {boolean}
     * @readonly
     */
    this.usingSetTimeout = false;

    /**
     * Use the version of requestAnimationFrame that is supported by the user's browser and if none
     * are supported, use setTimeout instead.
     * 
     * @property {RequestAnimationFrame}
     * @readonly
     */
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (f) { return setTimeout(f, 1000 / 60) };

    /**
     * Use the version of cancelAnimationFrame that is supported by the user's browser and if none are
     * supported, then setTimeout was used and so we use clearTimeout instead.
     * 
     * @property {cancelAnimationFrame}
     * @readonly
     */
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || function () { clearTimeout(this.id) }

  }

  /**
   * Start the operation of the requestAnimationFrame or setTimeout loop.
   * 
   * @since 0.1.0
   * 
   * @param {Function} fn The function to run every update of the loop.
   * @param {boolean} forceSetTimeout Indicates whether setTimeout should be used even if the user's browser supports requestAnimationFrame.
   */
  start(fn, forceSetTimeout) {

    if (this.running) return;

    this.running = true;

    this.fn = fn;

    if (forceSetTimeout) {

      this.usingSetTimeout = true;

      this.updateTimeout();

    }

    else {

      window.requestAnimationFrame((time) => this.updateRAF(time));

    }

  }

  /**
   * Call requestAnimationFrame recursively so that the loop keeps going and
   * also send the timestamps over to Deltaframe.
   * 
   * @since 0.1.0
   */
  updateRAF(timestamp) {

    this.running = true;

    this.fn(timestamp);

    this.id = window.requestAnimationFrame((time) => this.updateRAF(time));

  }

  /**
   * Call setTimeout recursively so that the loop keeps going and also send
   * the timestamps over to Deltaframe.
   * 
   * @since 0.1.0
   */
  updateTimeout() {

    let timestamp = window.performance.now();

    this.fn(timestamp);

    this.id = window.setTimeout(() => this.updateTimeout(), 1000 / 60);

  }

  /**
   * Restart the requestAnimation or setTimeout loop.
   * 
   * @since 0.1.0
   */
  restart() {

    if (this.usingSetTimeout) window.clearTimeout(this.id);

    else window.cancelAnimationFrame(this.id);

    this.id = null;

    this.running = false;

    if (this.usingSetTimeout) this.updateTimeout();

    else window.requestAnimationFrame((time) => this.updateRAF(time));

    this.running = true;

  }

  /**
   * Stop the loop by calling cancelAnimationFrame or clearTimeout.
   * 
   * @since 0.1.0
   */
  stop() {

    if (this.usingSetTimeout) window.clearTimeout(this.id);

    else window.cancelAnimationFrame(this.id);

    this.id = null;

    this.running = false;

    this.fn = () => { };

    return;

  }

}

/**
 * Deltaframe is an animation and game loop manager.
 */
class Deltaframe {

  /**
   * @param {Object} options A set of options to extend and alter the functionality of Deltaframe.
   * @param {number} [minFps=15] The lowest the game loop's frames per second can drop to before the loop panics.
   * @param {number} [targetFps=60] The frames per second that the game loop should aim to achieve.
   * @param {number} [maxRestartAttempts=Infinity] When the game loop goes below the minFps it will restart. This indicates how many times it will restart before stopping permanently.
   * @param {boolean} [forceSetTimeout=false] Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
   */
  constructor(options = {}) {

    /**
     * Create an options object by merging the user specified options with the defaults.
     * 
     * @property {Object}
     * @readonly
     */
    this.options = Object.assign({

      // The lowest value that the frames per second can drop to before Deltaframe panics.
      minFps: 15,

      // The frames per second that Deltaframe should aim to achieve.
      targetFps: 60,

      // The amount of times the game loop should restart before stopping permanently.
      maxRestartAttempts: Infinity,

      // Indicates whether setTimeout should be used even if requestAnimationFrame is supported.
      forceSetTimeout: false,

    }, options);

    /**
     * A reference to forceSetTimeout from the options.
     *property
     * @prop {boolean}
     * @readonly
     * 
     * @default false
     */
    this.forceSetTimeout = this.options.forceSetTimeout;

    /**
     * A reference to the minFps from the options.
     * 
     * @property {number}
     * @readonly
     * 
     * @default 5
     */
    this.minFps = this.options.minFps;

    /**
     * A reference to the targetFps from the options.
     * 
     * @property {number}
     * @readonly
     * 
     * @default 60
     */
    this.targetFps = this.options.targetFps;

    /**
     * Store a copy of the minFps as a millisecond value to avoid constant conversions.
     * 
     * @property {number}
     * @readonly
     */
    this._minFps = Math.floor(1000 / this.minFps);

    /**
     * Store a copy of the targetFps as a millisecond value to avoid constant conversions.
     * 
     * @property {number}
     * @readonly
     */
    this._targetFps = Math.floor(1000 / this.targetFps);

    /**
     * The number of times Deltaframe should attempt to restart the game loop before quitting.
     * 
     * @property {number}
     * @readonly
     * 
     * @default Infinity
     */
    this.maxRestartAttempts = this.options.maxRestartAttempts;

    /**
     * The amount of times Deltaframe has restarted the game loop.
     * 
     * @property {number}
     * @readonly
     */
    this.restartAttempts = 0;

    /**
     * Indicates whether Deltaframe is currently running and not paused or stopped.
     * 
     * @property {boolean}
     * @readonly
     */
    this.running = false;

    /**
     * Indicates whether Deltaframe is currently paused.
     * 
     * @property {boolean}
     * @readonly
     */
    this.paused = false;

    /**
     * THe function that will be called on every Deltaframe update.
     * 
     * @property {Function}
     * @readonly
     */
    this.fn = () => { };

    /**
     * The current frame that Deltaframe is on.
     * 
     * @property {number}
     * @readonly
     */
    this.frame = 0;

    /**
     * The current timestamp as of the latest RequestAnimationFrame update.
     * 
     * @property {DOMHighResTimeStamp|number}
     * @readonly
     */
    this.time = 0;

    /**
     * The timestamp before the current timestamp.
     * 
     * @property {DOMHighResTimeStamp|number}
     * @readonly
     */
    this.prevTime = 0;

    /**
     * The difference in time between the current time and the last time.
     * 
     * @property {number}
     * @readonly
     */
    this.delta = 0;

    /**
     * A set of up to 10 recent previous delta values that are used to get the
     * mean delta.
     * 
     * @property {Array}
     * @readonly
     */
    this.deltaHistory = [];

    /**
     * Since we only want to go up to 10 on the deltaHistory, we keep track of
     * what index we're on so we can reset to 0 once were at 10.
     * 
     * @property {number}
     * @readonly
     */
    this.deltaIndex = 0;

    /**
     * Initialize the RequestAnimationFrame abstraction module.
     * 
     * @property {RequestAnimationFrame}
     * @readonly
     */
    this.raf = new RequestAnimationFrame();

    /**
     * Use the version of hidden that's supported by the user's browser.
     * 
     * @property {document.hidden}
     * @readonly
     */
    this.hidden = document.hidden || document.webkitHidden || document.mozHidden || document.msHidden || document.oHidden;

    /**
     * Run the boot method which initializes the hidden events.
     */
    this._boot();

  }

  /**
   * Initialize the page visibility events which will let us save resources by pausing
   * our updates when the user is not interacting with the page running Deltaframe.
   * 
   * @since 0.1.0
   */
  _boot() {

    document.onvisibilitychange = () => {

      let visibility = document.visibilityState;

      if (visibility === 'visible') this.resume();

      else if (visibility === 'hidden') this.pause();

    };

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

    this.fn = fn;

    this.prevTime = 0;

    this.raf.start((timestamp) => this._update(timestamp), this.forceSetTimeout);

  }

  /**
   * Update is called whenever requestAnimationFrame decides it can process the
   * next step of the loop or roughly 60 times per second using setTimeout.
   * 
   * @since 0.1.0
   * 
   * @param {DOMHighResTimeStamp|number} timestamp The timestamp as returned from requestAnimationFrame.
   */
  _update(timestamp) {

    if (this.paused) return;

    this.time = timestamp;

    this.delta = timestamp - this.prevTime;

    if (this.deltaIndex === 10) this.deltaIndex = 0;

    this.deltaHistory[this.deltaIndex] = this.delta;

    this.deltaIndex++;

    let mean = 0;

    for (let i = 0; i < this.deltaHistory.length; ++i) mean += this.deltaHistory[i];

    mean /= 10;

    this.deltaAverage = mean;

    if (this.deltaAverage >= this._minFps) {

      if (this.restartAttempts === this.maxRestartAttempts) {

        this.stop();

        return;

      }

      this.raf.restart();

      this.restartAttempts++;

    }

    if (this.deltaAverage >= this._targetFps) {

      this.frame++;

      this.fn(timestamp, this.delta, this.deltaAverage);

      this.prevTime = timestamp;

    }

  }

  /**
   * Temporarily stop the loop, saving values to be resumed at a later point.
   * 
   * @since 0.1.0
   */
  pause() {

    this.paused = true;

    this.running = false;

  }

  /**
   * Resume the loop from its paused state.
   * 
   * @since 0.1.0
   */
  resume() {

    this.paused = false;

    this.prevTime = window.performance.now();

    this.running = true;

  }

  /**
   * Stop the loop and reset all time values of Deltaframe.
   * 
   * @since 0.1.0
   */
  stop() {

    this.restartAttempts = 0;

    this.running = false;

    this.paused = false;

    this.fn = () => { };

    this.frame = 0;

    this.time = 0;

    this.prevTime = 0;

    this.delta = 0;

    this.deltaHistory = [];

    this.deltaIndex = 0;

    this.raf.stop();

    return;

  }

}