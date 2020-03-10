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
var Deltaframe = /*#__PURE__*/function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWx0YWZyYW1lIiwib3B0aW9ucyIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9yZXN0YXJ0QXR0ZW1wdHMiLCJfcnVubmluZyIsIl9wYXVzZWQiLCJfZm4iLCJfZnJhbWUiLCJfdGltZSIsIl9wcmV2VGltZSIsIl9kZWx0YSIsIl9kZWx0YUF2ZXJhZ2UiLCJfZGVsdGFIaXN0b3J5IiwiX2RlbHRhSW5kZXgiLCJfcmFmIiwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX2hpZGRlbiIsImRvY3VtZW50IiwiaGlkZGVuIiwiX2Jvb3QiLCJmbiIsInN0YXJ0IiwidGltZXN0YW1wIiwiX3VwZGF0ZSIsImZvcmNlU2V0VGltZW91dCIsIndpbmRvdyIsInBlcmZvcm1hbmNlIiwibm93IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl92aXNpYmlsaXR5Q2hhbmdlIiwic3RvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJydW5UaW1lIiwibWVhbiIsImkiLCJsZW5ndGgiLCJtaW5GcHNDYWxjIiwibWF4UmVzdGFydEF0dGVtcHRzIiwicmVzdGFydCIsInRhcmdldEZwc0NhbGMiLCJ2aXNpYmlsaXR5IiwidmlzaWJpbGl0eVN0YXRlIiwiaXNQYXVzZWQiLCJyZXN1bWUiLCJpc1J1bm5pbmciLCJwYXVzZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdxQkEsVTtBQUVuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBUUEsc0JBQVlDLE9BQVosRUFBOEI7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFB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QyxLQUFLSyxLQUFMO0FBQ3JEOzs7d0JBN0s0QjtBQUFFLGFBQU8sS0FBSzFDLGdCQUFaO0FBQStCO0FBRTlEOzs7Ozs7Ozt3QkFLeUI7QUFBRSxhQUFPLEtBQUtDLFFBQVo7QUFBdUI7QUFFbEQ7Ozs7Ozs7O3dCQUt3QjtBQUFFLGFBQU8sS0FBS0MsT0FBWjtBQUFzQjtBQUVoRDs7Ozs7Ozs7d0JBS29CO0FBQUUsYUFBTyxLQUFLRSxNQUFaO0FBQXFCO0FBRTNDOzs7Ozs7Ozt3QkFLMkM7QUFBRSxhQUFPLEtBQUtDLEtBQVo7QUFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcclxuaW1wb3J0IFJlcXVlc3RBbmltYXRpb25GcmFtZSBmcm9tICcuL3JhZi9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUnO1xyXG5cclxuLyoqXHJcbiAqIERlbHRhZnJhbWUgaXMgYW4gYW5pbWF0aW9uIGFuZCBnYW1lIGxvb3AgbWFuYWdlciB0aGF0IG1ha2VzIHN1cmUgeW91ciBhcHBsaWNhdGlvbiBpcyBwdW5jdHVhbCBhbmQgcGVyZm9ybWFudC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbHRhZnJhbWUge1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9ucyBmb3IgdGhpcyBpbnN0YW5jZSBvZiBEZWx0YWZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29wdGlvbnM6IE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhbW91bnQgb2YgdGltZXMgRGVsdGFmcmFtZSBoYXMgaGFkIHRvIHJlc3RhcnQgZHVlIHRvIHRoZSBhdmVyYWdlIGZwcyBkaXBwaW5nIGJlbG93IHRoZSBtaW5pbXVtIGZwcyBmb3IgYSBcclxuICAgKiBzZXJpZXMgb2YgZnJhbWVzLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVzdGFydEF0dGVtcHRzOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIERlbHRhZnJhbWUgaXMgY3VycmVudGx5IGlzIGN1cnJlbnRseSBydW5uaW5nIGFuZCBub3QgcGF1c2Vkb3Igc3RvcHBlZC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwcml2YXRlIF9ydW5uaW5nOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBEZWx0YWZyYW1lIGlzIGN1cnJlbnRseSBwYXVzZWQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGF1c2VkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBvbiBldmVyeSBEZWx0YWZyYW1lIHVwZGF0ZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZm46IEZ1bmN0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBmcmFtZSB0aGF0IERlbHRhZnJhbWUgaXMgb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9mcmFtZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB0aW1lc3RhbXAgYXMgb2YgdGhlIGxhdGVzdCBjYWxsIHRvIFJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZTogKERPTUhpZ2hSZXNUaW1lU3RhbXAgfCBudW1iZXIpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGltZXN0YW1wIGJlZm9yZSB0aGUgY3VycmVudCB0aW1lc3RhbXAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0RPTUhpZ2hSZXNUaW1lU3RhbXB8bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ByZXZUaW1lOiAoRE9NSGlnaFJlc1RpbWVTdGFtcCB8IG51bWJlcik7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkaWZmZXJlbmNlIGluIHRpbWUgYmV0d2VlbiB0aGUgY3VycmVudCB0aW1lIGFuZCB0aGUgbGFzdCB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGE6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF2ZXJhZ2UgZGlmZmVyZW5jZSBpbiB0aW1lIGJldHdlZW4gZnJhbWVzLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGFBdmVyYWdlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2V0IG9mIHVwIHRvIDEwIHJlY2VudCBwcmV2aW91cyBkZWx0YSB2YWx1ZXMgdGhhdCBhcmUgdXNlZCB0byBnZXQgdGhlIG1lYW4gZGVsdGEuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PG51bWJlcj59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGFIaXN0b3J5OiBBcnJheTxudW1iZXI+O1xyXG5cclxuICAvKipcclxuICAgKiBTaW5jZSB3ZSBvbmx5IHdhbnQgdG8gZ28gdXAgdG8gMTAgb24gdGhlIGRlbHRhSGlzdG9yeSwgd2Uga2VlcCB0cmFjayBvZiB3aGF0IGluZGV4IHdlJ3JlICBvbiBzbyB3ZSBjYW4gcmVzZXQgdG8gMCBvbmNlIHdlcmUgYXQgMTAuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9kZWx0YUluZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIFJlcXVlc3RBbmltYXRpb25GcmFtZSBhYnN0cmFjdGlvbiBtb2R1bGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1JlcXVlc3RBbmltYXRpb25GcmFtZX1cclxuICAgKi9cclxuICBwcml2YXRlIF9yYWY6IFJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoZSB2ZXJzaW9uIG9mIGhpZGRlbiB0aGF0J3Mgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3Nlci5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7ZG9jdW1lbnQuaGlkZGVufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hpZGRlbjogT2JqZWN0O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIHRvIHBhc3MgdG8gdGhpcyBEZWx0YWZyYW1lIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5GcHM9MTVdIFRoZSBtaW5pbXVtIGZwcyB2YWx1ZSBhbGxvd2VkIGJlZm9yZSBEZWx0YWZyYW1lIHdpbGwgcmVzdGFydCB0byB0cnkgdG8gY29ycmVjdCB0aGUgaXNzdWUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRhcmdldEZwcz02MF0gVGhlIGZwcyB0aGF0IERlbHRhZnJhbWUgc2hvdWxkIGFpbSB0byBhY2hpZXZlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhSZXN0YXJ0QXR0ZW1wdHM9SW5maW5pdHldIFRoZSBudW1iZXIgb2YgdGltZXMgRGVsdGFmcmFtZSB3aWxsIHJlc3RhcnQgZHVlIHRvIHByb2JsZW1zIGJlZm9yZSBzdG9wcGluZyBlbnRpcmVseS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMucnVuVGltZT1JbmZpbml0eV0gVGhlIGxlbmd0aCBvZiB0aW1lIHRoYXQgdGhpcyBpbnN0YW5jZSBvZiBEZWx0YWZyYW1lIHdpbGwgcnVuLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBhbiBhbmltYXRpb24gdGhhdCBsYXN0cyBhIHNwZWNpZmljIGFtb3VudCBvZiB0aW1lLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZm9yY2VTZXRUaW1lb3V0PWZhbHNlXSBJZiBzZXQgdG8gdHJ1ZSwgRGVsdGFmcmFtZSB3aWxsIHVzZSBzZXRUaW1lb3V0IGZvciB0aGUgbG9vcCBpbnN0ZWFkIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogT2JqZWN0KSB7XHJcbiAgICB0aGlzLl9vcHRpb25zID0gbmV3IE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5fcmVzdGFydEF0dGVtcHRzID0gMDtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fZm4gPSAoKSA9PiB7IH07XHJcblxyXG4gICAgdGhpcy5fZnJhbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3RpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFBdmVyYWdlID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICB0aGlzLl9yYWYgPSBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCk7XHJcblxyXG4gICAgdGhpcy5faGlkZGVuID0gZG9jdW1lbnQuaGlkZGVuO1xyXG5cclxuICAgIHRoaXMuX2Jvb3QoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIHRpbWVzIHRoYXQgRGVsdGFmcmFtIGhhcyByZXN0YXJ0ZWQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgdGltZXNSZXN0YXJ0ZWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3Jlc3RhcnRBdHRlbXB0czsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIERlbHRhZnJhbWUgaXMgcnVubmluZyBvciBub3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgZ2V0IGlzUnVubmluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3J1bm5pbmc7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiBEZWx0YWZyYW1lIGlzIHBhdXNlZCBvciBub3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgZ2V0IGlzUGF1c2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcGF1c2VkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgZnJhbWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZyYW1lOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgdGltZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IHRpbWUoKTogKERPTUhpZ2hSZXNUaW1lU3RhbXAgfCBudW1iZXIpIHsgcmV0dXJuIHRoaXMuX3RpbWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgdGhlIGxvb3AuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBldmVyeSBzdGVwIGJ5IHRoZSBsb29wLlxyXG4gICAqL1xyXG4gIHN0YXJ0KGZuOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5fZm4gPSBmbjtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5fcmFmLnN0YXJ0KCh0aW1lc3RhbXA6IG51bWJlcikgPT4gdGhpcy5fdXBkYXRlKHRpbWVzdGFtcCksIHRoaXMuX29wdGlvbnMuZm9yY2VTZXRUaW1lb3V0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhdXNlIHRoZSBsb29wIG9wZXJhdGlvbiBzYXZpbmcgdGhlIHN0YXRlIHRvIGJlIHJlc3VtZWQgYXQgYSBsYXRlciB0aW1lLlxyXG4gICAqL1xyXG4gIHBhdXNlKCkge1xyXG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN1bWUgdGhlIGxvb3AgZnJvbSBhIHBhdXNlZCBzdGF0ZS5cclxuICAgKi9cclxuICByZXN1bWUoKSB7XHJcbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgdGhlIGxvb3AgYW5kIHJlc2V0IGFsbCB0aW1lIHZhbHVlcyBvZiBEZWx0YWZyYW1lLlxyXG4gICAqL1xyXG4gIHN0b3AoKSB7XHJcbiAgICB0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMgPSAwO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9mbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fdGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fcHJldlRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4gdGhpcy5fdmlzaWJpbGl0eUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5fcmFmLnN0b3AoKTtcclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBwYWdlIHZpc2liaWxpdHkgZXZlbnRzIHdoaWNoIHdpbGwgbGV0IHVzIHNhdmUgcmVzb3VyY2VzIGJ5IHBhdXNpbmcgb3VyIHVwZGF0ZXMgd2hlbiB0aGUgdXNlciBpcyBub3QgXHJcbiAgICogaW50ZXJhY3Rpbmcgd2l0aCB0aGUgcGFnZSBydW5uaW5nIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9ib290KCkge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKCkgPT4gdGhpcy5fdmlzaWJpbGl0eUNoYW5nZSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBpcyBjYWxsZWQgd2hlbmV2ZXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGRlY2lkZXMgaXQgY2FuIHByb2Nlc3MgdGhlIG5leHQgc3RlcCBvZiB0aGUgbG9vcCAgb3Igcm91Z2hseSA2MCBcclxuICAgKiB0aW1lcyBwZXIgc2Vjb25kIHVzaW5nIHNldFRpbWVvdXQuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0RPTUhpZ2hSZXNUaW1lU3RhbXB8bnVtYmVyfSB0aW1lc3RhbXAgVGhlIHRpbWVzdGFtcCBhcyByZXR1cm5lZCBmcm9tIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGUodGltZXN0YW1wOiAoRE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXIpKSB7XHJcbiAgICBpZiAodGhpcy5fcGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRpbWVzdGFtcCA+PSB0aGlzLl9vcHRpb25zLnJ1blRpbWUpIHtcclxuICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fdGltZSA9IHRpbWVzdGFtcDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YSA9IHRpbWVzdGFtcCAtIHRoaXMuX3ByZXZUaW1lO1xyXG5cclxuICAgIGlmICh0aGlzLl9kZWx0YUluZGV4ID09PSAxMCkgdGhpcy5fZGVsdGFJbmRleCA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFIaXN0b3J5W3RoaXMuX2RlbHRhSW5kZXhdID0gdGhpcy5fZGVsdGE7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFJbmRleCsrO1xyXG5cclxuICAgIGxldCBtZWFuID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RlbHRhSGlzdG9yeS5sZW5ndGg7ICsraSkgbWVhbiArPSB0aGlzLl9kZWx0YUhpc3RvcnlbaV07XHJcblxyXG4gICAgbWVhbiAvPSAxMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUF2ZXJhZ2UgPSBtZWFuO1xyXG5cclxuICAgIGlmICh0aGlzLl9kZWx0YUF2ZXJhZ2UgPj0gdGhpcy5fb3B0aW9ucy5taW5GcHNDYWxjKSB7XHJcbiAgICAgIGlmICh0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMgPT09IHRoaXMuX29wdGlvbnMubWF4UmVzdGFydEF0dGVtcHRzKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fcmFmLnJlc3RhcnQoKTtcclxuXHJcbiAgICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cysrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9kZWx0YUF2ZXJhZ2UgPj0gdGhpcy5fb3B0aW9ucy50YXJnZXRGcHNDYWxjKSB7XHJcbiAgICAgIHRoaXMuX2ZyYW1lKys7XHJcblxyXG4gICAgICB0aGlzLl9mbih0aW1lc3RhbXAsIHRoaXMuX2RlbHRhLCB0aGlzLl9kZWx0YUF2ZXJhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5fcHJldlRpbWUgPSB0aW1lc3RhbXA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSB0aGUgdXNlciBoYXMgc3dpdGNoZWQgdG8gYSBkaWZmZXJlbnQgdGFiIGFuZCBpcyBub3Qgb24gdGhlIHNhbWUgcGFnZSB0aGF0IERlbHRhZnJhbWUgaXMgcnVubmluZyBvbiwgRGVsdGFmcmFtZSBcclxuICAgKiB3aWxsIHBhdXNlIGFuZCB3aGVuIHRoZSB1c2VyIGNvbWVzIGJhY2sgaXQgd2lsbCByZXN1bWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF92aXNpYmlsaXR5Q2hhbmdlKCkge1xyXG4gICAgY29uc3QgdmlzaWJpbGl0eSA9IGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1BhdXNlZCAmJiB2aXNpYmlsaXR5ID09PSAndmlzaWJsZScpIHRoaXMucmVzdW1lKCk7XHJcbiAgICBlbHNlIGlmICh0aGlzLmlzUnVubmluZyAmJiB2aXNpYmlsaXR5ID09PSAnaGlkZGVuJykgdGhpcy5wYXVzZSgpO1xyXG4gIH1cclxufSJdfQ==