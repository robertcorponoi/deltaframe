'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Options = _interopRequireDefault(require("./options/Options"));

var _RequestAnimationFrame = _interopRequireDefault(require("./raf/RequestAnimationFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Deltaframe is an animation and game loop manager that makes sure your application
 * is punctual and performant.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 1.0.2
 */
var Deltaframe =
/*#__PURE__*/
function () {
  /**
   * A reference to the options for this instance of Deltaframe.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {Options}
   */

  /**
   * The amount of times Deltaframe has had to restart due to the average fps
   * dipping below the minimum fps for a series of frames.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * Indicates whether Deltaframe is currently is currently running and not paused
   * or stopped.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {boolean}
   */

  /**
   * Indicates whether Deltaframe is currently paused.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {boolean}
   */

  /**
   * The function that will be called on every Deltaframe update.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {Function}
   */

  /**
   * The current frame that Deltaframe is on.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * The current timestamp as of the latest call to RequestAnimationFrame.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The timestamp before the current timestamp.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {DOMHighResTimeStamp|number}
   */

  /**
   * The difference in time between the current time and the last time.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * The average difference in time between frames.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * A set of up to 10 recent previous delta values that are used to get the mean delta.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {Array<number>}
   */

  /**
   * Since we only want to go up to 10 on the deltaHistory, we keep track of what index we're 
   * on so we can reset to 0 once were at 10.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {number}
   */

  /**
   * Initialize the RequestAnimationFrame abstraction module.
   * 
   * @since 0.1.0
   * @private
   * 
   * @property {RequestAnimationFrame}
   */

  /**
   * Use the version of hidden that's supported by the user's browser.
   * 
   * @since 1.0.0
   * @private
   * 
   * @property {document.hidden}
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
   * @since 1.0.0
   * 
   * @returns {number}
   */


  _createClass(Deltaframe, [{
    key: "start",

    /**
     * Start the loop.
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
     * Pause the loop operation saving the state to be resumed at a later time.
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
     * Resume the loop from a paused state.
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
     * Update is called whenever requestAnimationFrame decides it can process the next step of the loop 
     * or roughly 60 times per second using setTimeout.
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
     * @private
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
     * Returns if Deltaframe is running or not.
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
     * Returns if Deltaframe is paused or not.
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

exports["default"] = Deltaframe;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWx0YWZyYW1lIiwib3B0aW9ucyIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9yZXN0YXJ0QXR0ZW1wdHMiLCJfcnVubmluZyIsIl9wYXVzZWQiLCJfZm4iLCJfZnJhbWUiLCJfdGltZSIsIl9wcmV2VGltZSIsIl9kZWx0YSIsIl9kZWx0YUF2ZXJhZ2UiLCJfZGVsdGFIaXN0b3J5IiwiX2RlbHRhSW5kZXgiLCJfcmFmIiwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX2hpZGRlbiIsImRvY3VtZW50IiwiaGlkZGVuIiwiX2Jvb3QiLCJmbiIsInN0YXJ0IiwidGltZXN0YW1wIiwiX3VwZGF0ZSIsImZvcmNlU2V0VGltZW91dCIsIndpbmRvdyIsInBlcmZvcm1hbmNlIiwibm93IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl92aXNpYmlsaXR5Q2hhbmdlIiwic3RvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJydW5UaW1lIiwibWVhbiIsImkiLCJsZW5ndGgiLCJtaW5GcHNDYWxjIiwibWF4UmVzdGFydEF0dGVtcHRzIiwicmVzdGFydCIsInRhcmdldEZwc0NhbGMiLCJ2aXNpYmlsaXR5IiwidmlzaWJpbGl0eVN0YXRlIiwicmVzdW1lIiwicGF1c2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7OztJQVFxQkEsVTs7O0FBRW5COzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7O0FBUUEsc0JBQVlDLE9BQVosRUFBOEI7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFB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Tm1DO0FBRWxDLGFBQU8sS0FBS3hDLGdCQUFaO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozt3QkFPZ0M7QUFFOUIsYUFBTyxLQUFLQyxRQUFaO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozt3QkFPK0I7QUFFN0IsYUFBTyxLQUFLQyxPQUFaO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozt3QkFPMkI7QUFFekIsYUFBTyxLQUFLRSxNQUFaO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcclxuaW1wb3J0IFJlcXVlc3RBbmltYXRpb25GcmFtZSBmcm9tICcuL3JhZi9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUnO1xyXG5cclxuLyoqXHJcbiAqIERlbHRhZnJhbWUgaXMgYW4gYW5pbWF0aW9uIGFuZCBnYW1lIGxvb3AgbWFuYWdlciB0aGF0IG1ha2VzIHN1cmUgeW91ciBhcHBsaWNhdGlvblxyXG4gKiBpcyBwdW5jdHVhbCBhbmQgcGVyZm9ybWFudC5cclxuICogXHJcbiAqIEBhdXRob3IgUm9iZXJ0IENvcnBvbm9pIDxyb2JlcnRjb3Jwb25vaUBnbWFpbC5jb20+XHJcbiAqIFxyXG4gKiBAdmVyc2lvbiAxLjAuMlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsdGFmcmFtZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlIG9mIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge09wdGlvbnN9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFtb3VudCBvZiB0aW1lcyBEZWx0YWZyYW1lIGhhcyBoYWQgdG8gcmVzdGFydCBkdWUgdG8gdGhlIGF2ZXJhZ2UgZnBzXHJcbiAgICogZGlwcGluZyBiZWxvdyB0aGUgbWluaW11bSBmcHMgZm9yIGEgc2VyaWVzIG9mIGZyYW1lcy5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Jlc3RhcnRBdHRlbXB0czogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBEZWx0YWZyYW1lIGlzIGN1cnJlbnRseSBpcyBjdXJyZW50bHkgcnVubmluZyBhbmQgbm90IHBhdXNlZFxyXG4gICAqIG9yIHN0b3BwZWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcnVubmluZzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgRGVsdGFmcmFtZSBpcyBjdXJyZW50bHkgcGF1c2VkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3BhdXNlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgb24gZXZlcnkgRGVsdGFmcmFtZSB1cGRhdGUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZuOiBGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgZnJhbWUgdGhhdCBEZWx0YWZyYW1lIGlzIG9uLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZnJhbWU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIG9mIHRoZSBsYXRlc3QgY2FsbCB0byBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0RPTUhpZ2hSZXNUaW1lU3RhbXB8bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWU6IChET01IaWdoUmVzVGltZVN0YW1wIHwgbnVtYmVyKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWVzdGFtcCBiZWZvcmUgdGhlIGN1cnJlbnQgdGltZXN0YW1wLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wcmV2VGltZTogKERPTUhpZ2hSZXNUaW1lU3RhbXAgfCBudW1iZXIpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGlmZmVyZW5jZSBpbiB0aW1lIGJldHdlZW4gdGhlIGN1cnJlbnQgdGltZSBhbmQgdGhlIGxhc3QgdGltZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhdmVyYWdlIGRpZmZlcmVuY2UgaW4gdGltZSBiZXR3ZWVuIGZyYW1lcy5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhQXZlcmFnZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBIHNldCBvZiB1cCB0byAxMCByZWNlbnQgcHJldmlvdXMgZGVsdGEgdmFsdWVzIHRoYXQgYXJlIHVzZWQgdG8gZ2V0IHRoZSBtZWFuIGRlbHRhLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxudW1iZXI+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhSGlzdG9yeTogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2luY2Ugd2Ugb25seSB3YW50IHRvIGdvIHVwIHRvIDEwIG9uIHRoZSBkZWx0YUhpc3RvcnksIHdlIGtlZXAgdHJhY2sgb2Ygd2hhdCBpbmRleCB3ZSdyZSBcclxuICAgKiBvbiBzbyB3ZSBjYW4gcmVzZXQgdG8gMCBvbmNlIHdlcmUgYXQgMTAuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9kZWx0YUluZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIFJlcXVlc3RBbmltYXRpb25GcmFtZSBhYnN0cmFjdGlvbiBtb2R1bGUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1JlcXVlc3RBbmltYXRpb25GcmFtZX1cclxuICAgKi9cclxuICBwcml2YXRlIF9yYWY6IFJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoZSB2ZXJzaW9uIG9mIGhpZGRlbiB0aGF0J3Mgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3Nlci5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7ZG9jdW1lbnQuaGlkZGVufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hpZGRlbjogT2JqZWN0O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIHRvIHBhc3MgdG8gdGhpcyBEZWx0YWZyYW1lIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5GcHM9MTVdIFRoZSBtaW5pbXVtIGZwcyB2YWx1ZSBhbGxvd2VkIGJlZm9yZSBEZWx0YWZyYW1lIHdpbGwgcmVzdGFydCB0byB0cnkgdG8gY29ycmVjdCB0aGUgaXNzdWUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRhcmdldEZwcz02MF0gVGhlIGZwcyB0aGF0IERlbHRhZnJhbWUgc2hvdWxkIGFpbSB0byBhY2hpZXZlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhSZXN0YXJ0QXR0ZW1wdHM9SW5maW5pdHldIFRoZSBudW1iZXIgb2YgdGltZXMgRGVsdGFmcmFtZSB3aWxsIHJlc3RhcnQgZHVlIHRvIHByb2JsZW1zIGJlZm9yZSBzdG9wcGluZyBlbnRpcmVseS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMucnVuVGltZT1JbmZpbml0eV0gVGhlIGxlbmd0aCBvZiB0aW1lIHRoYXQgdGhpcyBpbnN0YW5jZSBvZiBEZWx0YWZyYW1lIHdpbGwgcnVuLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBhbiBhbmltYXRpb24gdGhhdCBsYXN0cyBhIHNwZWNpZmljIGFtb3VudCBvZiB0aW1lLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZm9yY2VTZXRUaW1lb3V0PWZhbHNlXSBJZiBzZXQgdG8gdHJ1ZSwgRGVsdGFmcmFtZSB3aWxsIHVzZSBzZXRUaW1lb3V0IGZvciB0aGUgbG9vcCBpbnN0ZWFkIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogT2JqZWN0KSB7XHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2ZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl90aW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhQXZlcmFnZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFIaXN0b3J5ID0gW107XHJcblxyXG4gICAgdGhpcy5fZGVsdGFJbmRleCA9IDA7XHJcblxyXG4gICAgdGhpcy5fcmFmID0gbmV3IFJlcXVlc3RBbmltYXRpb25GcmFtZSgpO1xyXG5cclxuICAgIHRoaXMuX2hpZGRlbiA9IGRvY3VtZW50LmhpZGRlbjtcclxuXHJcbiAgICB0aGlzLl9ib290KCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCBEZWx0YWZyYW0gaGFzIHJlc3RhcnRlZC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgdGltZXNSZXN0YXJ0ZWQoKTogbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdGFydEF0dGVtcHRzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgaWYgRGVsdGFmcmFtZSBpcyBydW5uaW5nIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGlzUnVubmluZygpOiBib29sZWFuIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIERlbHRhZnJhbWUgaXMgcGF1c2VkIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGlzUGF1c2VkKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9wYXVzZWQ7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBmcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgZnJhbWUoKTogbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZnJhbWU7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgdGhlIGxvb3AuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBldmVyeSBzdGVwIGJ5IHRoZSBsb29wLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGFydChmbjogRnVuY3Rpb24pIHtcclxuXHJcbiAgICB0aGlzLl9mbiA9IGZuO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RhcnQoKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB0aGlzLl91cGRhdGUodGltZXN0YW1wKSwgdGhpcy5fb3B0aW9ucy5mb3JjZVNldFRpbWVvdXQpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhdXNlIHRoZSBsb29wIG9wZXJhdGlvbiBzYXZpbmcgdGhlIHN0YXRlIHRvIGJlIHJlc3VtZWQgYXQgYSBsYXRlciB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqL1xyXG4gIHB1YmxpYyBwYXVzZSgpIHtcclxuXHJcbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN1bWUgdGhlIGxvb3AgZnJvbSBhIHBhdXNlZCBzdGF0ZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKi9cclxuICBwdWJsaWMgcmVzdW1lKCkge1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgdGhlIGxvb3AgYW5kIHJlc2V0IGFsbCB0aW1lIHZhbHVlcyBvZiBEZWx0YWZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdG9wKCkge1xyXG5cclxuICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2ZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl90aW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RvcCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBwYWdlIHZpc2liaWxpdHkgZXZlbnRzIHdoaWNoIHdpbGwgbGV0IHVzIHNhdmUgcmVzb3VyY2VzIGJ5IHBhdXNpbmdcclxuICAgKiBvdXIgdXBkYXRlcyB3aGVuIHRoZSB1c2VyIGlzIG5vdCBpbnRlcmFjdGluZyB3aXRoIHRoZSBwYWdlIHJ1bm5pbmcgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2UpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBpcyBjYWxsZWQgd2hlbmV2ZXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGRlY2lkZXMgaXQgY2FuIHByb2Nlc3MgdGhlIG5leHQgc3RlcCBvZiB0aGUgbG9vcCBcclxuICAgKiBvciByb3VnaGx5IDYwIHRpbWVzIHBlciBzZWNvbmQgdXNpbmcgc2V0VGltZW91dC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9IHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIGFzIHJldHVybmVkIGZyb20gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZSh0aW1lc3RhbXA6IChET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcikpIHtcclxuXHJcbiAgICBpZiAodGhpcy5fcGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRpbWVzdGFtcCA+PSB0aGlzLl9vcHRpb25zLnJ1blRpbWUpIHtcclxuXHJcbiAgICAgIHRoaXMuc3RvcCgpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl90aW1lID0gdGltZXN0YW1wO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gdGltZXN0YW1wIC0gdGhpcy5fcHJldlRpbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhSW5kZXggPT09IDEwKSB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnlbdGhpcy5fZGVsdGFJbmRleF0gPSB0aGlzLl9kZWx0YTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4Kys7XHJcblxyXG4gICAgbGV0IG1lYW4gPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGVsdGFIaXN0b3J5Lmxlbmd0aDsgKytpKSBtZWFuICs9IHRoaXMuX2RlbHRhSGlzdG9yeVtpXTtcclxuXHJcbiAgICBtZWFuIC89IDEwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhQXZlcmFnZSA9IG1lYW47XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLm1pbkZwc0NhbGMpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMgPT09IHRoaXMuX29wdGlvbnMubWF4UmVzdGFydEF0dGVtcHRzKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9yYWYucmVzdGFydCgpO1xyXG5cclxuICAgICAgdGhpcy5fcmVzdGFydEF0dGVtcHRzKys7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9kZWx0YUF2ZXJhZ2UgPj0gdGhpcy5fb3B0aW9ucy50YXJnZXRGcHNDYWxjKSB7XHJcblxyXG4gICAgICB0aGlzLl9mcmFtZSsrO1xyXG5cclxuICAgICAgdGhpcy5fZm4odGltZXN0YW1wLCB0aGlzLl9kZWx0YSwgdGhpcy5fZGVsdGFBdmVyYWdlKTtcclxuXHJcbiAgICAgIHRoaXMuX3ByZXZUaW1lID0gdGltZXN0YW1wO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSB0aGUgdXNlciBoYXMgc3dpdGNoZWQgdG8gYSBkaWZmZXJlbnQgdGFiIGFuZCBpcyBub3Qgb24gdGhlIHNhbWUgcGFnZSB0aGF0XHJcbiAgICogRGVsdGFmcmFtZSBpcyBydW5uaW5nIG9uLCBEZWx0YWZyYW1lIHdpbGwgcGF1c2UgYW5kIHdoZW4gdGhlIHVzZXIgY29tZXMgYmFjayBpdCB3aWxsIHJlc3VtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4yLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlDaGFuZ2UoKSB7XHJcblxyXG4gICAgbGV0IHZpc2liaWxpdHkgPSBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGU7XHJcblxyXG4gICAgaWYgKHZpc2liaWxpdHkgPT09ICd2aXNpYmxlJykgdGhpcy5yZXN1bWUoKTtcclxuXHJcbiAgICBlbHNlIGlmICh2aXNpYmlsaXR5ID09PSAnaGlkZGVuJykgdGhpcy5wYXVzZSgpO1xyXG5cclxuICB9XHJcblxyXG59Il19