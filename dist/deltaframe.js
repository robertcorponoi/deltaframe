function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Options =
/*#__PURE__*/
function () {
  /**
   * The lowest the game loop's frames per second can drop to 
   * before the loop panics.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * The frames per second that the game loop should aim to 
   * achieve.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

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

  /**
   * Specify the amount of milliseconds that Deltaframe should run 
   * for.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * Indicates whether setTimeout should be used even if requestAnimationFrame
   * is supported by the user's browser.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

  /**
    * @param {Object} [options]
    * @param {number} [options.minFps=15] The lowest the game loop's frames per second can drop to before the loop panics.
    * @param {number} [options.targetFps=60] The frames per second that the game loop should aim to achieve.
    * @param {number} [options.maxRestartAttempts=Infinity] When the game loop goes below the minFps it will restart. This indicates how many times it will restart before stopping permanently.
   * @param {number} [options.runTime=Infinity] Specify the amount of milliseconds that Deltaframe should run for.
    * @param {boolean} [options.forceSetTimeout=false] Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
    */
  function Options(options) {
    _classCallCheck(this, Options);

    _defineProperty(this, "minFps", void 0);

    _defineProperty(this, "targetFps", void 0);

    _defineProperty(this, "maxRestartAttempts", void 0);

    _defineProperty(this, "runTime", void 0);

    _defineProperty(this, "forceSetTimeout", void 0);

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


  _createClass(Options, [{
    key: "minFpsCalc",
    get: function get() {
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

  }, {
    key: "targetFpsCalc",
    get: function get() {
      return Math.floor(1000 / this.targetFps);
    }
  }]);

  return Options;
}();

var RequestAnimationFrame =
/*#__PURE__*/
function () {
  function RequestAnimationFrame() {
    _classCallCheck(this, RequestAnimationFrame);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "running", void 0);

    _defineProperty(this, "fn", void 0);

    _defineProperty(this, "usingSetTimeout", void 0);

    /**
     * Keep track of the id returned from requestAnimationFrame or setTimeout so we can
     * use it to cancel them later on.
     * 
     * @property {number}
     * @readonly
     */
    this.id = 0;
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

    this.fn = function () {};
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

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (f) {
      return setTimeout(f, 1000 / 60);
    };
    /**
     * Use the version of cancelAnimationFrame that is supported by the user's browser and if none are
     * supported, then setTimeout was used and so we use clearTimeout instead.
     * 
     * @property {cancelAnimationFrame}
     * @readonly
     */


    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function () {
      clearTimeout(this.id);
    };
  }
  /**
   * Start the operation of the requestAnimationFrame or setTimeout loop.
   * 
   * @since 0.1.0
   * 
   * @param {Function} fn The function to run every update of the loop.
   * @param {boolean} forceSetTimeout Indicates whether setTimeout should be used even if the user's browser supports requestAnimationFrame.
   */


  _createClass(RequestAnimationFrame, [{
    key: "start",
    value: function start(fn, forceSetTimeout) {
      var _this = this;

      if (this.running) return;
      this.running = true;
      this.fn = fn;

      if (forceSetTimeout) {
        this.usingSetTimeout = true;
        this.updateTimeout();
      } else {
        window.requestAnimationFrame(function (time) {
          return _this.updateRAF(time);
        });
      }
    }
    /**
     * Call requestAnimationFrame recursively so that the loop keeps going and
     * also send the timestamps over to Deltaframe.
     * 
     * @since 0.1.0
     * 
     * @param {number} timestamp The timestamp from the most recent requestAnimationFrame request.
     */

  }, {
    key: "updateRAF",
    value: function updateRAF(timestamp) {
      var _this2 = this;

      this.running = true;
      this.fn(timestamp);
      this.id = window.requestAnimationFrame(function (time) {
        return _this2.updateRAF(time);
      });
    }
    /**
     * Call setTimeout recursively so that the loop keeps going and also send
     * the timestamps over to Deltaframe.
     * 
     * @since 0.1.0
     */

  }, {
    key: "updateTimeout",
    value: function updateTimeout() {
      var _this3 = this;

      var timestamp = window.performance.now();
      this.fn(timestamp);
      this.id = window.setTimeout(function () {
        return _this3.updateTimeout();
      }, 1000 / 60);
    }
    /**
     * Restart the requestAnimation or setTimeout loop.
     * 
     * @since 0.1.0
     */

  }, {
    key: "restart",
    value: function restart() {
      var _this4 = this;

      if (this.usingSetTimeout) window.clearTimeout(this.id);else window.cancelAnimationFrame(this.id);
      this.id = 0;
      this.running = false;
      if (this.usingSetTimeout) this.updateTimeout();else window.requestAnimationFrame(function (time) {
        return _this4.updateRAF(time);
      });
      this.running = true;
    }
    /**
     * Stop the loop by calling cancelAnimationFrame or clearTimeout.
     * 
     * @since 0.1.0
     */

  }, {
    key: "stop",
    value: function stop() {
      if (this.usingSetTimeout) window.clearTimeout(this.id);else window.cancelAnimationFrame(this.id);
      this.id = 0;
      this.running = false;

      this.fn = function () {};

      return;
    }
  }]);

  return RequestAnimationFrame;
}();

/**
 * Deltaframe is an animation and game loop manager with a focus on punctuality
 * and a highly scalable framework.
 */

var Deltaframe =
/*#__PURE__*/
function () {
  /**
   * Create an options Object by merging the user specified options 
   * with the defaults.
   * 
   * @since 1.0.0
   * 
   * @property {Object}
   * @readonly
   */

  /**
   * The amount of times Deltaframe has restarted due to the average
   * fps going below the the minFps.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * Indicates whether Deltaframe is currently running and not paused 
   * or stopped.
   * 
   * @since 0.1.0
   * 
   * @property {boolean}
   * @readonly
   */

  /**
   * Indicates whether Deltaframe is currently paused.
   * 
   * @since 0.1.0
   * 
   * @property {boolean}
   * @readonly
   */

  /**
   * The function that will be called on every Deltaframe update.
   * 
   * @since 0.1.0
   * 
   * @property {Function}
   * @readonly
   */

  /**
   * The current frame that Deltaframe is on.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * The current timestamp as of the latest RequestAnimationFrame 
   * update.
   * 
   * @since 0.1.0
   * 
   * @property {DOMHighResTimeStamp|number}
   * @readonly
   */

  /**
   * The timestamp before the current timestamp.
   * 
   * @since 0.1.0
   * 
   * @property {DOMHighResTimeStamp|number}
   * @readonly
   */

  /**
   * The difference in time between the current time and the last time.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * The average difference in time between frames.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * A set of up to 10 recent previous delta values that are used to get the
   * mean delta.
   * 
   * @since 0.1.0
   * 
   * @property {Array}
   * @readonly
   */

  /**
   * Since we only want to go up to 10 on the deltaHistory, we keep track of
   * what index we're on so we can reset to 0 once were at 10.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * Initialize the RequestAnimationFrame abstraction module.
   * 
   * @since 0.1.0
   * 
   * @property {RequestAnimationFrame}
   * @readonly
   */

  /**
   * Use the version of hidden that's supported by the user's browser.
   * 
   * @since 1.0.0
   * 
   * @property {document.hidden}
   * @readonly
   */

  /**
   * @param {Object} [options] The options to pass to this Deltaframe instance.
   */
  function Deltaframe(options) {
    _classCallCheck(this, Deltaframe);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_restartAttempts", void 0);

    _defineProperty(this, "_running", void 0);

    _defineProperty(this, "_paused", void 0);

    _defineProperty(this, "_fn", void 0);

    _defineProperty(this, "_frame", void 0);

    _defineProperty(this, "_time", void 0);

    _defineProperty(this, "_prevTime", void 0);

    _defineProperty(this, "_delta", void 0);

    _defineProperty(this, "_deltaAverage", void 0);

    _defineProperty(this, "_deltaHistory", void 0);

    _defineProperty(this, "_deltaIndex", void 0);

    _defineProperty(this, "_raf", void 0);

    _defineProperty(this, "_hidden", void 0);

    this._options = new Options(options);
    this._restartAttempts = 0;
    this._running = false;
    this._paused = false;

    this._fn = function () {};

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


  _createClass(Deltaframe, [{
    key: "start",

    /**
     * Start the Deltaframe loop using the abstracted requestAnimationFrame 
     * or setTimeout methods.
     * 
     * @since 0.1.0
     * 
     * @param {Function} fn The function to be called every step by the loop.
     */
    value: function start(fn) {
      var _this = this;

      this._fn = fn;
      this._prevTime = 0;
      this._running = true;

      this._raf.start(function (timestamp) {
        return _this._update(timestamp);
      }, this._options.forceSetTimeout);
    }
    /**
     * Temporarily stop the loop, saving values to be resumed at a later point.
     * 
     * @since 0.1.0
     */

  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
      this._running = false;
    }
    /**
     * Resume the loop from its paused state.
     * 
     * @since 0.1.0
     */

  }, {
    key: "resume",
    value: function resume() {
      this._paused = false;
      this._prevTime = window.performance.now();
      this._running = true;
    }
    /**
     * Stop the loop and reset all time values of Deltaframe.
     * 
     * @since 0.1.0
     */

  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      this._restartAttempts = 0;
      this._running = false;
      this._paused = false;

      this._fn = function () {};

      this._frame = 0;
      this._time = 0;
      this._prevTime = 0;
      this._delta = 0;
      this._deltaHistory = [];
      this._deltaIndex = 0;
      document.removeEventListener('visibilitychange', function () {
        return _this2._visibilityChange;
      });

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

  }, {
    key: "_boot",
    value: function _boot() {
      var _this3 = this;

      document.addEventListener('visibilitychange', function () {
        return _this3._visibilityChange;
      });
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

  }, {
    key: "_update",
    value: function _update(timestamp) {
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
      var mean = 0;

      for (var i = 0; i < this._deltaHistory.length; ++i) {
        mean += this._deltaHistory[i];
      }

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

  }, {
    key: "_visibilityChange",
    value: function _visibilityChange() {
      var visibility = document.visibilityState;
      if (visibility === 'visible') this.resume();else if (visibility === 'hidden') this.pause();
    }
  }, {
    key: "timesRestarted",
    get: function get() {
      return this._restartAttempts;
    }
    /**
     * Returns the current running status of Deltaframe.
     * 
     * @since 1.0.0
     * 
     * @returns {boolean}
     */

  }, {
    key: "isRunning",
    get: function get() {
      return this._running;
    }
    /**
     * Returns the current paused status of Deltaframe.
     * 
     * @since 0.1.0
     * 
     * @returns {boolean}
     */

  }, {
    key: "isPaused",
    get: function get() {
      return this._paused;
    }
    /**
     * Returns the current frame.
     * 
     * @since 1.0.0
     * 
     * @returns {number}
     */

  }, {
    key: "frame",
    get: function get() {
      return this._frame;
    }
  }]);

  return Deltaframe;
}();

export default Deltaframe;
