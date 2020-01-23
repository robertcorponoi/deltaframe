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
   * The lowest the fps can drop to before the Deltaframe restarts to attempt to fix the problem.
   * 
   * @property {number}
    * 
    * @default 15
   */

  /**
   * The fps that the game loop should aim to  achieve.
   * 
   * @property {number}
    * 
    * @default 60
   */

  /**
   * When the fps goes below the minFps Deltaframe will restart. This indicates how many times it will  restart before stopping permanently.
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Specify the amount of milliseconds that Deltaframe should run for.
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
   * 
   * @property {number}
    * 
    * @default false
   */

  /**
    * @param {Object} options The initialization options passed to Deltaframe.
    */
  function Options() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Options);

    _defineProperty(this, "minFps", 15);

    _defineProperty(this, "targetFps", 60);

    _defineProperty(this, "maxRestartAttempts", Infinity);

    _defineProperty(this, "runTime", Infinity);

    _defineProperty(this, "forceSetTimeout", false);

    Object.assign(this, options);
  }
  /**
   * Return the minFps as a decimal representing the amount of time before a frame should occur.
   * 
   * @returns {number}
   */


  _createClass(Options, [{
    key: "minFpsCalc",
    get: function get() {
      return Math.floor(1000 / this.minFps);
    }
    /**
     * Return the targetFps as a decimal representing the amount of time before a frame should occur.
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

var TaskOptions =
/**
 * Specifies the time in between runs.
 * 
 * @property {number}
 * 
 * @default 1000
 */

/**
 * A delay before running the task for the first time.
 * 
 * @property {number}
 * 
 * @default 0
 */

/**
 * Specify this to have the task be destroyed after being run the specified amount of times.
 * 
 * @property {number}
 * 
 * @default Infinity
 */

/**
 * @param {Object} options The options passed when creating a new task.
 */
function TaskOptions(options) {
  _classCallCheck(this, TaskOptions);

  _defineProperty(this, "interval", 1000);

  _defineProperty(this, "delay", 0);

  _defineProperty(this, "timesToRun", Infinity);

  Object.assign(this, options);
};

/**
 * Defines a task that can be created and added to the task manager.
 */

var Task =
/*#__PURE__*/
function () {
  /**
   * The name of this task.
   * 
   * @property {string}
   */

  /**
   * A reference to the function to call when this task is run.
   * 
   * @property {Function}
   */

  /**
   * A reference to the options for this task.
   * 
   * @property {TaskOptions}
   */

  /**
   * The number of times that this task has been run.
   * 
   * @property {number}
   */

  /**
   * The time this task was last run at.
   * 
   * @property {number}
   */

  /**
   * @param {string} name The name of this task.
   * @param {Function} fn The function to call when this task is run.
   * @param {Object} options The options for this task.
   */
  function Task(name, fn, options) {
    _classCallCheck(this, Task);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "fn", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "timesRun", 0);

    _defineProperty(this, "lastRunAt", 0);

    this.name = name;
    this.fn = fn;
    this.options = new TaskOptions(options);
  }
  /**
   * Runs the function associated with this task.
   */


  _createClass(Task, [{
    key: "run",
    value: function run() {
      this.fn();
      this.timesRun++;
    }
  }]);

  return Task;
}();

/**
 * The task manager is used to add and manage tasks that are supposed to run at specific times, on repeat, or a 
 * predetermined number of times.
 */

var TaskManager =
/*#__PURE__*/
function () {
  function TaskManager() {
    _classCallCheck(this, TaskManager);

    _defineProperty(this, "_active", []);
  }

  _createClass(TaskManager, [{
    key: "addTask",

    /**
     * Adds a task to the task manager.
     * 
     * @param {string} name The name of the task to add.
     * @param {string} fn The function to call when this task is run.
     * @param {Object} [options]
     * @param {number} [options.interval=1000] Specifies the time in between runs.
     * @param {number} [options.delay=0] A delay before running the task for the first time.
     * @param {number} [options.timesToRun=Infinity] Specify this to have the task be destroyed after being run the specified amount of times.
     */
    value: function addTask(name, fn) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var task = new Task(name, fn, options);

      this._active.push(task);
    }
    /**
     * Removes a task by its name.
     * 
     * @param {string} name The name of the task to remove.
     */

  }, {
    key: "removeTask",
    value: function removeTask(name) {
      this._active = this._active.filter(function (task) {
        return task.name !== name;
      });
    }
    /**
     * Checks to see if any tasks need to be run and runs them if so.
     * 
     * This will also remove tasks if they are no longer needed.
     * 
     * @param {number} time The current timestamp.
     */

  }, {
    key: "update",
    value: function update(time) {
      var _this = this;

      this.active.map(function (task) {
        if (time > task.options.delay && time - task.lastRunAt >= task.options.interval) {
          task.run();
          task.lastRunAt = time;
          if (task.timesRun > task.options.timesToRun) _this.removeTask(task.name);
        }
      });
    }
  }, {
    key: "active",

    /**
     * Returns all of the active tasks.
     * 
     * @returns {Array<Tas>}
     */
    get: function get() {
      return this._active;
    }
  }]);

  return TaskManager;
}();

var RequestAnimationFrame =
/*#__PURE__*/
function () {
  /**
   * A reference to the id returned by requestAnimationFrame or setTimeout so  that we can cancel their operation when needed.
   * 
   * @property {number}
   */

  /**
   * Keeps track of whether the loop is already running or not so it's not accidently restarted.
   * 
   * @property {boolean}
   * 
   * @default false
   */

  /**
   * The function that should be run on every update of the loop.
   * 
   * @property {Function}
   * 
   * @default ()=>{}
   */

  /**
   * Indicates whether setTImeout is being used instead of requestAnimationFrame.
   * 
   * @property {boolean}
   * 
   * @default false
   */
  function RequestAnimationFrame() {
    _classCallCheck(this, RequestAnimationFrame);

    _defineProperty(this, "id", 0);

    _defineProperty(this, "running", false);

    _defineProperty(this, "fn", function () {});

    _defineProperty(this, "usingSetTimeout", false);

    /**
     * Use the version of requestAnimationFrame that is supported by the user's browser and if none are  supported, use setTimeout instead.
     * 
     * @property {RequestAnimationFrame|setTimeout}
     */
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (f) {
      return setTimeout(f, 1000 / 60);
    };
    /**
     * Use the version of cancelAnimationFrame that is supported by the user's browser and if none are supported,  then setTimeout was used 
     * and so we use clearTimeout instead.
     * 
     * @property {cancelAnimationFrame}
     */


    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function () {
      clearTimeout(this.id);
    };
  }
  /**
   * Start the operation of the requestAnimationFrame or setTimeout loop.
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
     * Call requestAnimationFrame recursively so that the loop keeps going and also send the timestamps over to Deltaframe.
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
     * Call setTimeout recursively so that the loop keeps going and also send the timestamps over to Deltaframe.
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
 * Deltaframe is an animation and game loop manager that makes sure your application is punctual and performant.
 */

var Deltaframe =
/*#__PURE__*/
function () {
  /**
   * A reference to the options for this instance of Deltaframe.
   * 
   * @private
   * 
   * @property {Options}
   */

  /**
   * The amount of times Deltaframe has had to restart due to the average fps dipping below the minimum fps for a 
   * series of frames.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Indicates whether Deltaframe is currently is currently running and not pausedor stopped.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * Indicates whether Deltaframe is currently paused.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The function that will be called on every Deltaframe update.
   * 
   * @private
   * 
   * @property {Function}
   */

  /**
   * The current frame that Deltaframe is on.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The current timestamp as of the latest call to RequestAnimationFrame.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The timestamp before the current timestamp.
   * 
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The difference in time between the current time and the last time.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The average difference in time between frames.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * A set of up to 10 recent previous delta values that are used to get the mean delta.
   * 
   * @private
   * 
   * @property {Array<number>}
   */

  /**
   * Since we only want to go up to 10 on the deltaHistory, we keep track of what index we're  on so we can reset to 0 once were at 10.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Initialize the RequestAnimationFrame abstraction module.
   * 
   * @private
   * 
   * @property {RequestAnimationFrame}
   */

  /**
   * Use the version of hidden that's supported by the user's browser.
   * 
   * @private
   * 
   * @property {document.hidden}
   */

  /**
   * A reference to the task manager.
   * 
   * @private
   * 
   * @property {TaskManager}
   */

  /**
   * @param {Object} [options] The options to pass to this Deltaframe instance.
   * @param {number} [options.minFps=15] The minimum fps value allowed before Deltaframe will restart to try to correct the issue.
   * @param {number} [options.targetFps=60] The fps that Deltaframe should aim to achieve.
   * @param {number} [options.maxRestartAttempts=Infinity] The number of times Deltaframe will restart due to problems before stopping entirely.
   * @param {number} [options.runTime=Infinity] The length of time that this instance of Deltaframe will run. This can be used to create an animation that lasts a specific amount of time.
   * @param {boolean} [options.forceSetTimeout=false] If set to true, Deltaframe will use setTimeout for the loop instead of requestAnimationFrame.
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

    _defineProperty(this, "_tasks", new TaskManager());

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

    this._boot();
  }
  /**
   * Return the number of times that Deltafram has restarted.
   * 
   * @returns {number}
   */


  _createClass(Deltaframe, [{
    key: "start",

    /**
     * Start the loop.
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
     * Pause the loop operation saving the state to be resumed at a later time.
     */

  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
      this._running = false;
    }
    /**
     * Resume the loop from a paused state.
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
     * Initialize the page visibility events which will let us save resources by pausing our updates when the user is not 
     * interacting with the page running Deltaframe.
     * 
     * @private
     */

  }, {
    key: "_boot",
    value: function _boot() {
      var _this3 = this;

      document.addEventListener("visibilitychange", function () {
        return _this3._visibilityChange();
      });
    }
    /**
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop  or roughly 60 
     * times per second using setTimeout.
     * 
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

        if (this._tasks.active.length > 0) this._tasks.update(this.time);
        this._prevTime = timestamp;
      }
    }
    /**
     * When the the user has switched to a different tab and is not on the same page that Deltaframe is running on, Deltaframe 
     * will pause and when the user comes back it will resume.
     * 
     * @private
     */

  }, {
    key: "_visibilityChange",
    value: function _visibilityChange() {
      var visibility = document.visibilityState;
      if (this.isPaused && visibility === 'visible') this.resume();else if (this.isRunning && visibility === 'hidden') this.pause();
    }
  }, {
    key: "timesRestarted",
    get: function get() {
      return this._restartAttempts;
    }
    /**
     * Returns if Deltaframe is running or not.
     * 
     * @returns {boolean}
     */

  }, {
    key: "isRunning",
    get: function get() {
      return this._running;
    }
    /**
     * Returns if Deltaframe is paused or not.
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
     * @returns {number}
     */

  }, {
    key: "frame",
    get: function get() {
      return this._frame;
    }
    /**
     * Returns the current time.
     * 
     * @returns {DOMHighResTimeStamp|number}
     */

  }, {
    key: "time",
    get: function get() {
      return this._time;
    }
    /**
     * Returns a reference to the task manager.
     * 
     * @returns {TaskManager}
     */

  }, {
    key: "tasks",
    get: function get() {
      return this._tasks;
    }
  }]);

  return Deltaframe;
}();

export default Deltaframe;
