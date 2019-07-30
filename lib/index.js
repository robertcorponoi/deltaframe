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

      document.addEventListener("visibilitychange", function () {
        _this3._visibilityChange();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWx0YWZyYW1lIiwib3B0aW9ucyIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9yZXN0YXJ0QXR0ZW1wdHMiLCJfcnVubmluZyIsIl9wYXVzZWQiLCJfZm4iLCJfZnJhbWUiLCJfdGltZSIsIl9wcmV2VGltZSIsIl9kZWx0YSIsIl9kZWx0YUF2ZXJhZ2UiLCJfZGVsdGFIaXN0b3J5IiwiX2RlbHRhSW5kZXgiLCJfcmFmIiwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX2hpZGRlbiIsImRvY3VtZW50IiwiaGlkZGVuIiwiX2Jvb3QiLCJmbiIsInN0YXJ0IiwidGltZXN0YW1wIiwiX3VwZGF0ZSIsImZvcmNlU2V0VGltZW91dCIsIndpbmRvdyIsInBlcmZvcm1hbmNlIiwibm93IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl92aXNpYmlsaXR5Q2hhbmdlIiwic3RvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJydW5UaW1lIiwibWVhbiIsImkiLCJsZW5ndGgiLCJtaW5GcHNDYWxjIiwibWF4UmVzdGFydEF0dGVtcHRzIiwicmVzdGFydCIsInRhcmdldEZwc0NhbGMiLCJ2aXNpYmlsaXR5IiwidmlzaWJpbGl0eVN0YXRlIiwiaXNQYXVzZWQiLCJyZXN1bWUiLCJpc1J1bm5pbmciLCJwYXVzZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0lBUXFCQSxVOzs7QUFFbkI7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7QUFRQSxzQkFBWUMsT0FBWixFQUE4QjtBQUFB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QUFLQyxTQUFMLElBQWtCSixVQUFVLEtBQUssUUFBckMsRUFBK0MsS0FBS0ssS0FBTDtBQUVyRDs7O3dCQWxPbUM7QUFFbEMsYUFBTyxLQUFLMUMsZ0JBQVo7QUFFRDtBQUVEOzs7Ozs7Ozs7O3dCQU9nQztBQUU5QixhQUFPLEtBQUtDLFFBQVo7QUFFRDtBQUVEOzs7Ozs7Ozs7O3dCQU8rQjtBQUU3QixhQUFPLEtBQUtDLE9BQVo7QUFFRDtBQUVEOzs7Ozs7Ozs7O3dCQU8yQjtBQUV6QixhQUFPLEtBQUtFLE1BQVo7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5pbXBvcnQgUmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZyb20gJy4vcmFmL1JlcXVlc3RBbmltYXRpb25GcmFtZSc7XHJcblxyXG4vKipcclxuICogRGVsdGFmcmFtZSBpcyBhbiBhbmltYXRpb24gYW5kIGdhbWUgbG9vcCBtYW5hZ2VyIHRoYXQgbWFrZXMgc3VyZSB5b3VyIGFwcGxpY2F0aW9uXHJcbiAqIGlzIHB1bmN0dWFsIGFuZCBwZXJmb3JtYW50LlxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnQgQ29ycG9ub2kgPHJvYmVydGNvcnBvbm9pQGdtYWlsLmNvbT5cclxuICogXHJcbiAqIEB2ZXJzaW9uIDEuMC4yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWx0YWZyYW1lIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgaW5zdGFuY2Ugb2YgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW1vdW50IG9mIHRpbWVzIERlbHRhZnJhbWUgaGFzIGhhZCB0byByZXN0YXJ0IGR1ZSB0byB0aGUgYXZlcmFnZSBmcHNcclxuICAgKiBkaXBwaW5nIGJlbG93IHRoZSBtaW5pbXVtIGZwcyBmb3IgYSBzZXJpZXMgb2YgZnJhbWVzLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVzdGFydEF0dGVtcHRzOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIERlbHRhZnJhbWUgaXMgY3VycmVudGx5IGlzIGN1cnJlbnRseSBydW5uaW5nIGFuZCBub3QgcGF1c2VkXHJcbiAgICogb3Igc3RvcHBlZC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwcml2YXRlIF9ydW5uaW5nOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBEZWx0YWZyYW1lIGlzIGN1cnJlbnRseSBwYXVzZWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGF1c2VkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBvbiBldmVyeSBEZWx0YWZyYW1lIHVwZGF0ZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZm46IEZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBmcmFtZSB0aGF0IERlbHRhZnJhbWUgaXMgb24uXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9mcmFtZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB0aW1lc3RhbXAgYXMgb2YgdGhlIGxhdGVzdCBjYWxsIHRvIFJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZTogKERPTUhpZ2hSZXNUaW1lU3RhbXAgfCBudW1iZXIpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGltZXN0YW1wIGJlZm9yZSB0aGUgY3VycmVudCB0aW1lc3RhbXAuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0RPTUhpZ2hSZXNUaW1lU3RhbXB8bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ByZXZUaW1lOiAoRE9NSGlnaFJlc1RpbWVTdGFtcCB8IG51bWJlcik7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkaWZmZXJlbmNlIGluIHRpbWUgYmV0d2VlbiB0aGUgY3VycmVudCB0aW1lIGFuZCB0aGUgbGFzdCB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGE6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF2ZXJhZ2UgZGlmZmVyZW5jZSBpbiB0aW1lIGJldHdlZW4gZnJhbWVzLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGFBdmVyYWdlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2V0IG9mIHVwIHRvIDEwIHJlY2VudCBwcmV2aW91cyBkZWx0YSB2YWx1ZXMgdGhhdCBhcmUgdXNlZCB0byBnZXQgdGhlIG1lYW4gZGVsdGEuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PG51bWJlcj59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGFIaXN0b3J5OiBBcnJheTxudW1iZXI+O1xyXG5cclxuICAvKipcclxuICAgKiBTaW5jZSB3ZSBvbmx5IHdhbnQgdG8gZ28gdXAgdG8gMTAgb24gdGhlIGRlbHRhSGlzdG9yeSwgd2Uga2VlcCB0cmFjayBvZiB3aGF0IGluZGV4IHdlJ3JlIFxyXG4gICAqIG9uIHNvIHdlIGNhbiByZXNldCB0byAwIG9uY2Ugd2VyZSBhdCAxMC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdEFuaW1hdGlvbkZyYW1lIGFic3RyYWN0aW9uIG1vZHVsZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7UmVxdWVzdEFuaW1hdGlvbkZyYW1lfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JhZjogUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhlIHZlcnNpb24gb2YgaGlkZGVuIHRoYXQncyBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtkb2N1bWVudC5oaWRkZW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaGlkZGVuOiBPYmplY3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGlzIERlbHRhZnJhbWUgaW5zdGFuY2UuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pbkZwcz0xNV0gVGhlIG1pbmltdW0gZnBzIHZhbHVlIGFsbG93ZWQgYmVmb3JlIERlbHRhZnJhbWUgd2lsbCByZXN0YXJ0IHRvIHRyeSB0byBjb3JyZWN0IHRoZSBpc3N1ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMudGFyZ2V0RnBzPTYwXSBUaGUgZnBzIHRoYXQgRGVsdGFmcmFtZSBzaG91bGQgYWltIHRvIGFjaGlldmUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFJlc3RhcnRBdHRlbXB0cz1JbmZpbml0eV0gVGhlIG51bWJlciBvZiB0aW1lcyBEZWx0YWZyYW1lIHdpbGwgcmVzdGFydCBkdWUgdG8gcHJvYmxlbXMgYmVmb3JlIHN0b3BwaW5nIGVudGlyZWx5LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5ydW5UaW1lPUluZmluaXR5XSBUaGUgbGVuZ3RoIG9mIHRpbWUgdGhhdCB0aGlzIGluc3RhbmNlIG9mIERlbHRhZnJhbWUgd2lsbCBydW4uIFRoaXMgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGFuIGFuaW1hdGlvbiB0aGF0IGxhc3RzIGEgc3BlY2lmaWMgYW1vdW50IG9mIHRpbWUuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JjZVNldFRpbWVvdXQ9ZmFsc2VdIElmIHNldCB0byB0cnVlLCBEZWx0YWZyYW1lIHdpbGwgdXNlIHNldFRpbWVvdXQgZm9yIHRoZSBsb29wIGluc3RlYWQgb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBPYmplY3QpIHtcclxuXHJcbiAgICB0aGlzLl9vcHRpb25zID0gbmV3IE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5fcmVzdGFydEF0dGVtcHRzID0gMDtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fZm4gPSAoKSA9PiB7IH07XHJcblxyXG4gICAgdGhpcy5fZnJhbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3RpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFBdmVyYWdlID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICB0aGlzLl9yYWYgPSBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCk7XHJcblxyXG4gICAgdGhpcy5faGlkZGVuID0gZG9jdW1lbnQuaGlkZGVuO1xyXG5cclxuICAgIHRoaXMuX2Jvb3QoKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiB0aW1lcyB0aGF0IERlbHRhZnJhbSBoYXMgcmVzdGFydGVkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHVibGljIGdldCB0aW1lc1Jlc3RhcnRlZCgpOiBudW1iZXIge1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9yZXN0YXJ0QXR0ZW1wdHM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiBEZWx0YWZyYW1lIGlzIHJ1bm5pbmcgb3Igbm90LlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgaXNSdW5uaW5nKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9ydW5uaW5nO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgaWYgRGVsdGFmcmFtZSBpcyBwYXVzZWQgb3Igbm90LlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgaXNQYXVzZWQoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3BhdXNlZDtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHVibGljIGdldCBmcmFtZSgpOiBudW1iZXIge1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9mcmFtZTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCB0aGUgbG9vcC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGV2ZXJ5IHN0ZXAgYnkgdGhlIGxvb3AuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXJ0KGZuOiBGdW5jdGlvbikge1xyXG5cclxuICAgIHRoaXMuX2ZuID0gZm47XHJcblxyXG4gICAgdGhpcy5fcHJldlRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3JhZi5zdGFydCgodGltZXN0YW1wOiBudW1iZXIpID0+IHRoaXMuX3VwZGF0ZSh0aW1lc3RhbXApLCB0aGlzLl9vcHRpb25zLmZvcmNlU2V0VGltZW91dCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGF1c2UgdGhlIGxvb3Agb3BlcmF0aW9uIHNhdmluZyB0aGUgc3RhdGUgdG8gYmUgcmVzdW1lZCBhdCBhIGxhdGVyIHRpbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgcHVibGljIHBhdXNlKCkge1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3VtZSB0aGUgbG9vcCBmcm9tIGEgcGF1c2VkIHN0YXRlLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXN1bWUoKSB7XHJcblxyXG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fcHJldlRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWU7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCB0aGUgbG9vcCBhbmQgcmVzZXQgYWxsIHRpbWUgdmFsdWVzIG9mIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgcHVibGljIHN0b3AoKSB7XHJcblxyXG4gICAgdGhpcy5fcmVzdGFydEF0dGVtcHRzID0gMDtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fZm4gPSAoKSA9PiB7IH07XHJcblxyXG4gICAgdGhpcy5fZnJhbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3RpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFIaXN0b3J5ID0gW107XHJcblxyXG4gICAgdGhpcy5fZGVsdGFJbmRleCA9IDA7XHJcblxyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2UpO1xyXG5cclxuICAgIHRoaXMuX3JhZi5zdG9wKCk7XHJcblxyXG4gICAgcmV0dXJuO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIHBhZ2UgdmlzaWJpbGl0eSBldmVudHMgd2hpY2ggd2lsbCBsZXQgdXMgc2F2ZSByZXNvdXJjZXMgYnkgcGF1c2luZ1xyXG4gICAqIG91ciB1cGRhdGVzIHdoZW4gdGhlIHVzZXIgaXMgbm90IGludGVyYWN0aW5nIHdpdGggdGhlIHBhZ2UgcnVubmluZyBEZWx0YWZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYm9vdCgpIHtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGlzIGNhbGxlZCB3aGVuZXZlciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZGVjaWRlcyBpdCBjYW4gcHJvY2VzcyB0aGUgbmV4dCBzdGVwIG9mIHRoZSBsb29wIFxyXG4gICAqIG9yIHJvdWdobHkgNjAgdGltZXMgcGVyIHNlY29uZCB1c2luZyBzZXRUaW1lb3V0LlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn0gdGltZXN0YW1wIFRoZSB0aW1lc3RhbXAgYXMgcmV0dXJuZWQgZnJvbSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlKHRpbWVzdGFtcDogKERPTUhpZ2hSZXNUaW1lU3RhbXB8bnVtYmVyKSkge1xyXG5cclxuICAgIGlmICh0aGlzLl9wYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodGltZXN0YW1wID49IHRoaXMuX29wdGlvbnMucnVuVGltZSkge1xyXG5cclxuICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3RpbWUgPSB0aW1lc3RhbXA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSB0aW1lc3RhbXAgLSB0aGlzLl9wcmV2VGltZTtcclxuXHJcbiAgICBpZiAodGhpcy5fZGVsdGFJbmRleCA9PT0gMTApIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeVt0aGlzLl9kZWx0YUluZGV4XSA9IHRoaXMuX2RlbHRhO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXgrKztcclxuXHJcbiAgICBsZXQgbWVhbiA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kZWx0YUhpc3RvcnkubGVuZ3RoOyArK2kpIG1lYW4gKz0gdGhpcy5fZGVsdGFIaXN0b3J5W2ldO1xyXG5cclxuICAgIG1lYW4gLz0gMTA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFBdmVyYWdlID0gbWVhbjtcclxuXHJcbiAgICBpZiAodGhpcy5fZGVsdGFBdmVyYWdlID49IHRoaXMuX29wdGlvbnMubWluRnBzQ2FsYykge1xyXG5cclxuICAgICAgaWYgKHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9PT0gdGhpcy5fb3B0aW9ucy5tYXhSZXN0YXJ0QXR0ZW1wdHMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3JhZi5yZXN0YXJ0KCk7XHJcblxyXG4gICAgICB0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMrKztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLnRhcmdldEZwc0NhbGMpIHtcclxuXHJcbiAgICAgIHRoaXMuX2ZyYW1lKys7XHJcblxyXG4gICAgICB0aGlzLl9mbih0aW1lc3RhbXAsIHRoaXMuX2RlbHRhLCB0aGlzLl9kZWx0YUF2ZXJhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5fcHJldlRpbWUgPSB0aW1lc3RhbXA7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIHRoZSB1c2VyIGhhcyBzd2l0Y2hlZCB0byBhIGRpZmZlcmVudCB0YWIgYW5kIGlzIG5vdCBvbiB0aGUgc2FtZSBwYWdlIHRoYXRcclxuICAgKiBEZWx0YWZyYW1lIGlzIHJ1bm5pbmcgb24sIERlbHRhZnJhbWUgd2lsbCBwYXVzZSBhbmQgd2hlbiB0aGUgdXNlciBjb21lcyBiYWNrIGl0IHdpbGwgcmVzdW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjIuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eUNoYW5nZSgpIHtcclxuXHJcbiAgICBjb25zdCB2aXNpYmlsaXR5ID0gZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlO1xyXG5cclxuICAgIGlmICh0aGlzLmlzUGF1c2VkICYmIHZpc2liaWxpdHkgPT09ICd2aXNpYmxlJykgdGhpcy5yZXN1bWUoKTtcclxuXHJcbiAgICBlbHNlIGlmICh0aGlzLmlzUnVubmluZyAmJiB2aXNpYmlsaXR5ID09PSAnaGlkZGVuJykgdGhpcy5wYXVzZSgpO1xyXG5cclxuICB9XHJcblxyXG59Il19