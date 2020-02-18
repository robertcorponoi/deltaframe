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
  }]);

  return Deltaframe;
}();

exports["default"] = Deltaframe;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWx0YWZyYW1lIiwib3B0aW9ucyIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9yZXN0YXJ0QXR0ZW1wdHMiLCJfcnVubmluZyIsIl9wYXVzZWQiLCJfZm4iLCJfZnJhbWUiLCJfdGltZSIsIl9wcmV2VGltZSIsIl9kZWx0YSIsIl9kZWx0YUF2ZXJhZ2UiLCJfZGVsdGFIaXN0b3J5IiwiX2RlbHRhSW5kZXgiLCJfcmFmIiwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX2hpZGRlbiIsImRvY3VtZW50IiwiaGlkZGVuIiwiX2Jvb3QiLCJmbiIsInN0YXJ0IiwidGltZXN0YW1wIiwiX3VwZGF0ZSIsImZvcmNlU2V0VGltZW91dCIsIndpbmRvdyIsInBlcmZvcm1hbmNlIiwibm93IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl92aXNpYmlsaXR5Q2hhbmdlIiwic3RvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJydW5UaW1lIiwibWVhbiIsImkiLCJsZW5ndGgiLCJtaW5GcHNDYWxjIiwibWF4UmVzdGFydEF0dGVtcHRzIiwicmVzdGFydCIsInRhcmdldEZwc0NhbGMiLCJ2aXNpYmlsaXR5IiwidmlzaWJpbGl0eVN0YXRlIiwiaXNQYXVzZWQiLCJyZXN1bWUiLCJpc1J1bm5pbmciLCJwYXVzZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdxQkEsVTs7O0FBRW5COzs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFRQSxzQkFBWUMsT0FBWixFQUE4QjtBQUFBOztBQUFBOztBQUFBOztBQUFBOztB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QStDLEtBQUtLLEtBQUw7QUFDckQ7Ozt3QkE3SzRCO0FBQUUsYUFBTyxLQUFLMUMsZ0JBQVo7QUFBK0I7QUFFOUQ7Ozs7Ozs7O3dCQUt5QjtBQUFFLGFBQU8sS0FBS0MsUUFBWjtBQUF1QjtBQUVsRDs7Ozs7Ozs7d0JBS3dCO0FBQUUsYUFBTyxLQUFLQyxPQUFaO0FBQXNCO0FBRWhEOzs7Ozs7Ozt3QkFLb0I7QUFBRSxhQUFPLEtBQUtFLE1BQVo7QUFBcUI7QUFFM0M7Ozs7Ozs7O3dCQUsyQztBQUFFLGFBQU8sS0FBS0MsS0FBWjtBQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5pbXBvcnQgUmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZyb20gJy4vcmFmL1JlcXVlc3RBbmltYXRpb25GcmFtZSc7XHJcblxyXG4vKipcclxuICogRGVsdGFmcmFtZSBpcyBhbiBhbmltYXRpb24gYW5kIGdhbWUgbG9vcCBtYW5hZ2VyIHRoYXQgbWFrZXMgc3VyZSB5b3VyIGFwcGxpY2F0aW9uIGlzIHB1bmN0dWFsIGFuZCBwZXJmb3JtYW50LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsdGFmcmFtZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlIG9mIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge09wdGlvbnN9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFtb3VudCBvZiB0aW1lcyBEZWx0YWZyYW1lIGhhcyBoYWQgdG8gcmVzdGFydCBkdWUgdG8gdGhlIGF2ZXJhZ2UgZnBzIGRpcHBpbmcgYmVsb3cgdGhlIG1pbmltdW0gZnBzIGZvciBhIFxyXG4gICAqIHNlcmllcyBvZiBmcmFtZXMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9yZXN0YXJ0QXR0ZW1wdHM6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgRGVsdGFmcmFtZSBpcyBjdXJyZW50bHkgaXMgY3VycmVudGx5IHJ1bm5pbmcgYW5kIG5vdCBwYXVzZWRvciBzdG9wcGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3J1bm5pbmc6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIERlbHRhZnJhbWUgaXMgY3VycmVudGx5IHBhdXNlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wYXVzZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIG9uIGV2ZXJ5IERlbHRhZnJhbWUgdXBkYXRlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuICAgKi9cclxuICBwcml2YXRlIF9mbjogRnVuY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IGZyYW1lIHRoYXQgRGVsdGFmcmFtZSBpcyBvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZyYW1lOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHRpbWVzdGFtcCBhcyBvZiB0aGUgbGF0ZXN0IGNhbGwgdG8gUmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lOiAoRE9NSGlnaFJlc1RpbWVTdGFtcCB8IG51bWJlcik7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0aW1lc3RhbXAgYmVmb3JlIHRoZSBjdXJyZW50IHRpbWVzdGFtcC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcHJldlRpbWU6IChET01IaWdoUmVzVGltZVN0YW1wIHwgbnVtYmVyKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRpZmZlcmVuY2UgaW4gdGltZSBiZXR3ZWVuIHRoZSBjdXJyZW50IHRpbWUgYW5kIHRoZSBsYXN0IHRpbWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9kZWx0YTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXZlcmFnZSBkaWZmZXJlbmNlIGluIHRpbWUgYmV0d2VlbiBmcmFtZXMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9kZWx0YUF2ZXJhZ2U6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBzZXQgb2YgdXAgdG8gMTAgcmVjZW50IHByZXZpb3VzIGRlbHRhIHZhbHVlcyB0aGF0IGFyZSB1c2VkIHRvIGdldCB0aGUgbWVhbiBkZWx0YS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8bnVtYmVyPn1cclxuICAgKi9cclxuICBwcml2YXRlIF9kZWx0YUhpc3Rvcnk6IEFycmF5PG51bWJlcj47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpbmNlIHdlIG9ubHkgd2FudCB0byBnbyB1cCB0byAxMCBvbiB0aGUgZGVsdGFIaXN0b3J5LCB3ZSBrZWVwIHRyYWNrIG9mIHdoYXQgaW5kZXggd2UncmUgIG9uIHNvIHdlIGNhbiByZXNldCB0byAwIG9uY2Ugd2VyZSBhdCAxMC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdEFuaW1hdGlvbkZyYW1lIGFic3RyYWN0aW9uIG1vZHVsZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7UmVxdWVzdEFuaW1hdGlvbkZyYW1lfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JhZjogUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIHZlcnNpb24gb2YgaGlkZGVuIHRoYXQncyBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtkb2N1bWVudC5oaWRkZW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaGlkZGVuOiBPYmplY3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGlzIERlbHRhZnJhbWUgaW5zdGFuY2UuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pbkZwcz0xNV0gVGhlIG1pbmltdW0gZnBzIHZhbHVlIGFsbG93ZWQgYmVmb3JlIERlbHRhZnJhbWUgd2lsbCByZXN0YXJ0IHRvIHRyeSB0byBjb3JyZWN0IHRoZSBpc3N1ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMudGFyZ2V0RnBzPTYwXSBUaGUgZnBzIHRoYXQgRGVsdGFmcmFtZSBzaG91bGQgYWltIHRvIGFjaGlldmUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFJlc3RhcnRBdHRlbXB0cz1JbmZpbml0eV0gVGhlIG51bWJlciBvZiB0aW1lcyBEZWx0YWZyYW1lIHdpbGwgcmVzdGFydCBkdWUgdG8gcHJvYmxlbXMgYmVmb3JlIHN0b3BwaW5nIGVudGlyZWx5LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5ydW5UaW1lPUluZmluaXR5XSBUaGUgbGVuZ3RoIG9mIHRpbWUgdGhhdCB0aGlzIGluc3RhbmNlIG9mIERlbHRhZnJhbWUgd2lsbCBydW4uIFRoaXMgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGFuIGFuaW1hdGlvbiB0aGF0IGxhc3RzIGEgc3BlY2lmaWMgYW1vdW50IG9mIHRpbWUuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JjZVNldFRpbWVvdXQ9ZmFsc2VdIElmIHNldCB0byB0cnVlLCBEZWx0YWZyYW1lIHdpbGwgdXNlIHNldFRpbWVvdXQgZm9yIHRoZSBsb29wIGluc3RlYWQgb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBPYmplY3QpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMgPSAwO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9mbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fdGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fcHJldlRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUF2ZXJhZ2UgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIHRoaXMuX3JhZiA9IG5ldyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKTtcclxuXHJcbiAgICB0aGlzLl9oaWRkZW4gPSBkb2N1bWVudC5oaWRkZW47XHJcblxyXG4gICAgdGhpcy5fYm9vdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCBEZWx0YWZyYW0gaGFzIHJlc3RhcnRlZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB0aW1lc1Jlc3RhcnRlZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcmVzdGFydEF0dGVtcHRzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgaWYgRGVsdGFmcmFtZSBpcyBydW5uaW5nIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBnZXQgaXNSdW5uaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcnVubmluZzsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIERlbHRhZnJhbWUgaXMgcGF1c2VkIG9yIG5vdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBnZXQgaXNQYXVzZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9wYXVzZWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBmcmFtZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBmcmFtZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZnJhbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKi9cclxuICBnZXQgdGltZSgpOiAoRE9NSGlnaFJlc1RpbWVTdGFtcCB8IG51bWJlcikgeyByZXR1cm4gdGhpcy5fdGltZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCB0aGUgbG9vcC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGV2ZXJ5IHN0ZXAgYnkgdGhlIGxvb3AuXHJcbiAgICovXHJcbiAgc3RhcnQoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLl9mbiA9IGZuO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RhcnQoKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB0aGlzLl91cGRhdGUodGltZXN0YW1wKSwgdGhpcy5fb3B0aW9ucy5mb3JjZVNldFRpbWVvdXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF1c2UgdGhlIGxvb3Agb3BlcmF0aW9uIHNhdmluZyB0aGUgc3RhdGUgdG8gYmUgcmVzdW1lZCBhdCBhIGxhdGVyIHRpbWUuXHJcbiAgICovXHJcbiAgcGF1c2UoKSB7XHJcbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3VtZSB0aGUgbG9vcCBmcm9tIGEgcGF1c2VkIHN0YXRlLlxyXG4gICAqL1xyXG4gIHJlc3VtZSgpIHtcclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB0aGUgbG9vcCBhbmQgcmVzZXQgYWxsIHRpbWUgdmFsdWVzIG9mIERlbHRhZnJhbWUuXHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2ZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl90aW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RvcCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIHBhZ2UgdmlzaWJpbGl0eSBldmVudHMgd2hpY2ggd2lsbCBsZXQgdXMgc2F2ZSByZXNvdXJjZXMgYnkgcGF1c2luZyBvdXIgdXBkYXRlcyB3aGVuIHRoZSB1c2VyIGlzIG5vdCBcclxuICAgKiBpbnRlcmFjdGluZyB3aXRoIHRoZSBwYWdlIHJ1bm5pbmcgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGlzIGNhbGxlZCB3aGVuZXZlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZGVjaWRlcyBpdCBjYW4gcHJvY2VzcyB0aGUgbmV4dCBzdGVwIG9mIHRoZSBsb29wICBvciByb3VnaGx5IDYwIFxyXG4gICAqIHRpbWVzIHBlciBzZWNvbmQgdXNpbmcgc2V0VGltZW91dC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9IHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIGFzIHJldHVybmVkIGZyb20gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZSh0aW1lc3RhbXA6IChET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcikpIHtcclxuICAgIGlmICh0aGlzLl9wYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodGltZXN0YW1wID49IHRoaXMuX29wdGlvbnMucnVuVGltZSkge1xyXG4gICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl90aW1lID0gdGltZXN0YW1wO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gdGltZXN0YW1wIC0gdGhpcy5fcHJldlRpbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhSW5kZXggPT09IDEwKSB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnlbdGhpcy5fZGVsdGFJbmRleF0gPSB0aGlzLl9kZWx0YTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4Kys7XHJcblxyXG4gICAgbGV0IG1lYW4gPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGVsdGFIaXN0b3J5Lmxlbmd0aDsgKytpKSBtZWFuICs9IHRoaXMuX2RlbHRhSGlzdG9yeVtpXTtcclxuXHJcbiAgICBtZWFuIC89IDEwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhQXZlcmFnZSA9IG1lYW47XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLm1pbkZwc0NhbGMpIHtcclxuICAgICAgaWYgKHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9PT0gdGhpcy5fb3B0aW9ucy5tYXhSZXN0YXJ0QXR0ZW1wdHMpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9yYWYucmVzdGFydCgpO1xyXG5cclxuICAgICAgdGhpcy5fcmVzdGFydEF0dGVtcHRzKys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLnRhcmdldEZwc0NhbGMpIHtcclxuICAgICAgdGhpcy5fZnJhbWUrKztcclxuXHJcbiAgICAgIHRoaXMuX2ZuKHRpbWVzdGFtcCwgdGhpcy5fZGVsdGEsIHRoaXMuX2RlbHRhQXZlcmFnZSk7XHJcblxyXG4gICAgICB0aGlzLl9wcmV2VGltZSA9IHRpbWVzdGFtcDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIHRoZSB1c2VyIGhhcyBzd2l0Y2hlZCB0byBhIGRpZmZlcmVudCB0YWIgYW5kIGlzIG5vdCBvbiB0aGUgc2FtZSBwYWdlIHRoYXQgRGVsdGFmcmFtZSBpcyBydW5uaW5nIG9uLCBEZWx0YWZyYW1lIFxyXG4gICAqIHdpbGwgcGF1c2UgYW5kIHdoZW4gdGhlIHVzZXIgY29tZXMgYmFjayBpdCB3aWxsIHJlc3VtZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCB2aXNpYmlsaXR5ID0gZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlO1xyXG5cclxuICAgIGlmICh0aGlzLmlzUGF1c2VkICYmIHZpc2liaWxpdHkgPT09ICd2aXNpYmxlJykgdGhpcy5yZXN1bWUoKTtcclxuICAgIGVsc2UgaWYgKHRoaXMuaXNSdW5uaW5nICYmIHZpc2liaWxpdHkgPT09ICdoaWRkZW4nKSB0aGlzLnBhdXNlKCk7XHJcbiAgfVxyXG59Il19