'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Options = _interopRequireDefault(require("./options/Options"));

var _TaskManager = _interopRequireDefault(require("./tasks/TaskManager"));

var _RequestAnimationFrame = _interopRequireDefault(require("./raf/RequestAnimationFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(this, "_tasks", new _TaskManager["default"]());

    this._options = new _Options["default"](options);
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
    this._raf = new _RequestAnimationFrame["default"]();
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

exports["default"] = Deltaframe;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWx0YWZyYW1lIiwib3B0aW9ucyIsIlRhc2tNYW5hZ2VyIiwiX29wdGlvbnMiLCJPcHRpb25zIiwiX3Jlc3RhcnRBdHRlbXB0cyIsIl9ydW5uaW5nIiwiX3BhdXNlZCIsIl9mbiIsIl9mcmFtZSIsIl90aW1lIiwiX3ByZXZUaW1lIiwiX2RlbHRhIiwiX2RlbHRhQXZlcmFnZSIsIl9kZWx0YUhpc3RvcnkiLCJfZGVsdGFJbmRleCIsIl9yYWYiLCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfaGlkZGVuIiwiZG9jdW1lbnQiLCJoaWRkZW4iLCJfYm9vdCIsImZuIiwic3RhcnQiLCJ0aW1lc3RhbXAiLCJfdXBkYXRlIiwiZm9yY2VTZXRUaW1lb3V0Iiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJub3ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX3Zpc2liaWxpdHlDaGFuZ2UiLCJzdG9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJ1blRpbWUiLCJtZWFuIiwiaSIsImxlbmd0aCIsIm1pbkZwc0NhbGMiLCJtYXhSZXN0YXJ0QXR0ZW1wdHMiLCJyZXN0YXJ0IiwidGFyZ2V0RnBzQ2FsYyIsIl90YXNrcyIsImFjdGl2ZSIsInVwZGF0ZSIsInRpbWUiLCJ2aXNpYmlsaXR5IiwidmlzaWJpbGl0eVN0YXRlIiwiaXNQYXVzZWQiLCJyZXN1bWUiLCJpc1J1bm5pbmciLCJwYXVzZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdxQkEsVTs7O0FBRW5COzs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7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TCxHQUFpQmEsU0FBakI7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7Ozt3Q0FNNEI7QUFDMUIsVUFBTXNCLFVBQVUsR0FBRzNCLFFBQVEsQ0FBQzRCLGVBQTVCO0FBRUEsVUFBSSxLQUFLQyxRQUFMLElBQWlCRixVQUFVLEtBQUssU0FBcEMsRUFBK0MsS0FBS0csTUFBTCxHQUEvQyxLQUNLLElBQUksS0FBS0MsU0FBTCxJQUFrQkosVUFBVSxLQUFLLFFBQXJDLEVBQStDLEtBQUtLLEtBQUw7QUFDckQ7Ozt3QkF0TDRCO0FBQUUsYUFBTyxLQUFLOUMsZ0JBQVo7QUFBK0I7QUFFOUQ7Ozs7Ozs7O3dCQUt5QjtBQUFFLGFBQU8sS0FBS0MsUUFBWjtBQUF1QjtBQUVsRDs7Ozs7Ozs7d0JBS3dCO0FBQUUsYUFBTyxLQUFLQyxPQUFaO0FBQXNCO0FBRWhEOzs7Ozs7Ozt3QkFLb0I7QUFBRSxhQUFPLEtBQUtFLE1BQVo7QUFBcUI7QUFFM0M7Ozs7Ozs7O3dCQUsyQztBQUFFLGFBQU8sS0FBS0MsS0FBWjtBQUFvQjtBQUVqRTs7Ozs7Ozs7d0JBS3lCO0FBQUUsYUFBTyxLQUFLZ0MsTUFBWjtBQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSAnLi90YXNrcy9UYXNrTWFuYWdlcic7XHJcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZnJvbSAnLi9yYWYvUmVxdWVzdEFuaW1hdGlvbkZyYW1lJztcclxuXHJcbi8qKlxyXG4gKiBEZWx0YWZyYW1lIGlzIGFuIGFuaW1hdGlvbiBhbmQgZ2FtZSBsb29wIG1hbmFnZXIgdGhhdCBtYWtlcyBzdXJlIHlvdXIgYXBwbGljYXRpb24gaXMgcHVuY3R1YWwgYW5kIHBlcmZvcm1hbnQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWx0YWZyYW1lIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgaW5zdGFuY2Ugb2YgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW1vdW50IG9mIHRpbWVzIERlbHRhZnJhbWUgaGFzIGhhZCB0byByZXN0YXJ0IGR1ZSB0byB0aGUgYXZlcmFnZSBmcHMgZGlwcGluZyBiZWxvdyB0aGUgbWluaW11bSBmcHMgZm9yIGEgXHJcbiAgICogc2VyaWVzIG9mIGZyYW1lcy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Jlc3RhcnRBdHRlbXB0czogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBEZWx0YWZyYW1lIGlzIGN1cnJlbnRseSBpcyBjdXJyZW50bHkgcnVubmluZyBhbmQgbm90IHBhdXNlZG9yIHN0b3BwZWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcnVubmluZzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgRGVsdGFmcmFtZSBpcyBjdXJyZW50bHkgcGF1c2VkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3BhdXNlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgb24gZXZlcnkgRGVsdGFmcmFtZSB1cGRhdGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZuOiBGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgZnJhbWUgdGhhdCBEZWx0YWZyYW1lIGlzIG9uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZnJhbWU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIG9mIHRoZSBsYXRlc3QgY2FsbCB0byBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0RPTUhpZ2hSZXNUaW1lU3RhbXB8bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWU6IChET01IaWdoUmVzVGltZVN0YW1wIHwgbnVtYmVyKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWVzdGFtcCBiZWZvcmUgdGhlIGN1cnJlbnQgdGltZXN0YW1wLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wcmV2VGltZTogKERPTUhpZ2hSZXNUaW1lU3RhbXAgfCBudW1iZXIpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGlmZmVyZW5jZSBpbiB0aW1lIGJldHdlZW4gdGhlIGN1cnJlbnQgdGltZSBhbmQgdGhlIGxhc3QgdGltZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhdmVyYWdlIGRpZmZlcmVuY2UgaW4gdGltZSBiZXR3ZWVuIGZyYW1lcy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhQXZlcmFnZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBIHNldCBvZiB1cCB0byAxMCByZWNlbnQgcHJldmlvdXMgZGVsdGEgdmFsdWVzIHRoYXQgYXJlIHVzZWQgdG8gZ2V0IHRoZSBtZWFuIGRlbHRhLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxudW1iZXI+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhSGlzdG9yeTogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2luY2Ugd2Ugb25seSB3YW50IHRvIGdvIHVwIHRvIDEwIG9uIHRoZSBkZWx0YUhpc3RvcnksIHdlIGtlZXAgdHJhY2sgb2Ygd2hhdCBpbmRleCB3ZSdyZSAgb24gc28gd2UgY2FuIHJlc2V0IHRvIDAgb25jZSB3ZXJlIGF0IDEwLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGFJbmRleDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYWJzdHJhY3Rpb24gbW9kdWxlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtSZXF1ZXN0QW5pbWF0aW9uRnJhbWV9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmFmOiBSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGUgdmVyc2lvbiBvZiBoaWRkZW4gdGhhdCdzIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2RvY3VtZW50LmhpZGRlbn1cclxuICAgKi9cclxuICBwcml2YXRlIF9oaWRkZW46IE9iamVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIHRhc2sgbWFuYWdlci5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7VGFza01hbmFnZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGFza3M6IFRhc2tNYW5hZ2VyID0gbmV3IFRhc2tNYW5hZ2VyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGlzIERlbHRhZnJhbWUgaW5zdGFuY2UuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pbkZwcz0xNV0gVGhlIG1pbmltdW0gZnBzIHZhbHVlIGFsbG93ZWQgYmVmb3JlIERlbHRhZnJhbWUgd2lsbCByZXN0YXJ0IHRvIHRyeSB0byBjb3JyZWN0IHRoZSBpc3N1ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMudGFyZ2V0RnBzPTYwXSBUaGUgZnBzIHRoYXQgRGVsdGFmcmFtZSBzaG91bGQgYWltIHRvIGFjaGlldmUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFJlc3RhcnRBdHRlbXB0cz1JbmZpbml0eV0gVGhlIG51bWJlciBvZiB0aW1lcyBEZWx0YWZyYW1lIHdpbGwgcmVzdGFydCBkdWUgdG8gcHJvYmxlbXMgYmVmb3JlIHN0b3BwaW5nIGVudGlyZWx5LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5ydW5UaW1lPUluZmluaXR5XSBUaGUgbGVuZ3RoIG9mIHRpbWUgdGhhdCB0aGlzIGluc3RhbmNlIG9mIERlbHRhZnJhbWUgd2lsbCBydW4uIFRoaXMgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGFuIGFuaW1hdGlvbiB0aGF0IGxhc3RzIGEgc3BlY2lmaWMgYW1vdW50IG9mIHRpbWUuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JjZVNldFRpbWVvdXQ9ZmFsc2VdIElmIHNldCB0byB0cnVlLCBEZWx0YWZyYW1lIHdpbGwgdXNlIHNldFRpbWVvdXQgZm9yIHRoZSBsb29wIGluc3RlYWQgb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBPYmplY3QpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMgPSAwO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9mbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fdGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fcHJldlRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUF2ZXJhZ2UgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIHRoaXMuX3JhZiA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKTtcclxuXHJcbiAgICB0aGlzLl9oaWRkZW4gPSBkb2N1bWVudC5oaWRkZW47XHJcblxyXG4gICAgdGhpcy5fYm9vdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCBEZWx0YWZyYW0gaGFzIHJlc3RhcnRlZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB0aW1lc1Jlc3RhcnRlZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcmVzdGFydEF0dGVtcHRzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgaWYgRGVsdGFmcmFtZSBpcyBydW5uaW5nIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBnZXQgaXNSdW5uaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcnVubmluZzsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIERlbHRhZnJhbWUgaXMgcGF1c2VkIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBnZXQgaXNQYXVzZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9wYXVzZWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBmcmFtZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBmcmFtZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZnJhbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKi9cclxuICBnZXQgdGltZSgpOiAoRE9NSGlnaFJlc1RpbWVTdGFtcCB8IG51bWJlcikgeyByZXR1cm4gdGhpcy5fdGltZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSB0YXNrIG1hbmFnZXIuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1Rhc2tNYW5hZ2VyfVxyXG4gICAqL1xyXG4gIGdldCB0YXNrcygpOiBUYXNrTWFuYWdlciB7IHJldHVybiB0aGlzLl90YXNrczsgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCB0aGUgbG9vcC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGV2ZXJ5IHN0ZXAgYnkgdGhlIGxvb3AuXHJcbiAgICovXHJcbiAgc3RhcnQoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLl9mbiA9IGZuO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RhcnQoKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB0aGlzLl91cGRhdGUodGltZXN0YW1wKSwgdGhpcy5fb3B0aW9ucy5mb3JjZVNldFRpbWVvdXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF1c2UgdGhlIGxvb3Agb3BlcmF0aW9uIHNhdmluZyB0aGUgc3RhdGUgdG8gYmUgcmVzdW1lZCBhdCBhIGxhdGVyIHRpbWUuXHJcbiAgICovXHJcbiAgcGF1c2UoKSB7XHJcbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3VtZSB0aGUgbG9vcCBmcm9tIGEgcGF1c2VkIHN0YXRlLlxyXG4gICAqL1xyXG4gIHJlc3VtZSgpIHtcclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB0aGUgbG9vcCBhbmQgcmVzZXQgYWxsIHRpbWUgdmFsdWVzIG9mIERlbHRhZnJhbWUuXHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2ZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl90aW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RvcCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIHBhZ2UgdmlzaWJpbGl0eSBldmVudHMgd2hpY2ggd2lsbCBsZXQgdXMgc2F2ZSByZXNvdXJjZXMgYnkgcGF1c2luZyBvdXIgdXBkYXRlcyB3aGVuIHRoZSB1c2VyIGlzIG5vdCBcclxuICAgKiBpbnRlcmFjdGluZyB3aXRoIHRoZSBwYWdlIHJ1bm5pbmcgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGlzIGNhbGxlZCB3aGVuZXZlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZGVjaWRlcyBpdCBjYW4gcHJvY2VzcyB0aGUgbmV4dCBzdGVwIG9mIHRoZSBsb29wICBvciByb3VnaGx5IDYwIFxyXG4gICAqIHRpbWVzIHBlciBzZWNvbmQgdXNpbmcgc2V0VGltZW91dC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9IHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIGFzIHJldHVybmVkIGZyb20gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZSh0aW1lc3RhbXA6IChET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcikpIHtcclxuICAgIGlmICh0aGlzLl9wYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodGltZXN0YW1wID49IHRoaXMuX29wdGlvbnMucnVuVGltZSkge1xyXG4gICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl90aW1lID0gdGltZXN0YW1wO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gdGltZXN0YW1wIC0gdGhpcy5fcHJldlRpbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhSW5kZXggPT09IDEwKSB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnlbdGhpcy5fZGVsdGFJbmRleF0gPSB0aGlzLl9kZWx0YTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4Kys7XHJcblxyXG4gICAgbGV0IG1lYW4gPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGVsdGFIaXN0b3J5Lmxlbmd0aDsgKytpKSBtZWFuICs9IHRoaXMuX2RlbHRhSGlzdG9yeVtpXTtcclxuXHJcbiAgICBtZWFuIC89IDEwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhQXZlcmFnZSA9IG1lYW47XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLm1pbkZwc0NhbGMpIHtcclxuICAgICAgaWYgKHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9PT0gdGhpcy5fb3B0aW9ucy5tYXhSZXN0YXJ0QXR0ZW1wdHMpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9yYWYucmVzdGFydCgpO1xyXG5cclxuICAgICAgdGhpcy5fcmVzdGFydEF0dGVtcHRzKys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLnRhcmdldEZwc0NhbGMpIHtcclxuICAgICAgdGhpcy5fZnJhbWUrKztcclxuXHJcbiAgICAgIHRoaXMuX2ZuKHRpbWVzdGFtcCwgdGhpcy5fZGVsdGEsIHRoaXMuX2RlbHRhQXZlcmFnZSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fdGFza3MuYWN0aXZlLmxlbmd0aCA+IDApIHRoaXMuX3Rhc2tzLnVwZGF0ZSh0aGlzLnRpbWUpO1xyXG5cclxuICAgICAgdGhpcy5fcHJldlRpbWUgPSB0aW1lc3RhbXA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSB0aGUgdXNlciBoYXMgc3dpdGNoZWQgdG8gYSBkaWZmZXJlbnQgdGFiIGFuZCBpcyBub3Qgb24gdGhlIHNhbWUgcGFnZSB0aGF0IERlbHRhZnJhbWUgaXMgcnVubmluZyBvbiwgRGVsdGFmcmFtZSBcclxuICAgKiB3aWxsIHBhdXNlIGFuZCB3aGVuIHRoZSB1c2VyIGNvbWVzIGJhY2sgaXQgd2lsbCByZXN1bWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF92aXNpYmlsaXR5Q2hhbmdlKCkge1xyXG4gICAgY29uc3QgdmlzaWJpbGl0eSA9IGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1BhdXNlZCAmJiB2aXNpYmlsaXR5ID09PSAndmlzaWJsZScpIHRoaXMucmVzdW1lKCk7XHJcbiAgICBlbHNlIGlmICh0aGlzLmlzUnVubmluZyAmJiB2aXNpYmlsaXR5ID09PSAnaGlkZGVuJykgdGhpcy5wYXVzZSgpO1xyXG4gIH1cclxufSJdfQ==