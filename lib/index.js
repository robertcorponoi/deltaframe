'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Options = _interopRequireDefault(require("./options/Options"));

var _RequestAnimationFrame = _interopRequireDefault(require("./raf/RequestAnimationFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    this._options = new _Options.default(options);
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
    this._raf = new _RequestAnimationFrame.default();
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

exports.default = Deltaframe;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWx0YWZyYW1lIiwib3B0aW9ucyIsIl9vcHRpb25zIiwiT3B0aW9ucyIsIl9yZXN0YXJ0QXR0ZW1wdHMiLCJfcnVubmluZyIsIl9wYXVzZWQiLCJfZm4iLCJfZnJhbWUiLCJfdGltZSIsIl9wcmV2VGltZSIsIl9kZWx0YSIsIl9kZWx0YUF2ZXJhZ2UiLCJfZGVsdGFIaXN0b3J5IiwiX2RlbHRhSW5kZXgiLCJfcmFmIiwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiX2hpZGRlbiIsImRvY3VtZW50IiwiaGlkZGVuIiwiX2Jvb3QiLCJmbiIsInN0YXJ0IiwidGltZXN0YW1wIiwiX3VwZGF0ZSIsImZvcmNlU2V0VGltZW91dCIsIndpbmRvdyIsInBlcmZvcm1hbmNlIiwibm93IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl92aXNpYmlsaXR5Q2hhbmdlIiwic3RvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJydW5UaW1lIiwibWVhbiIsImkiLCJsZW5ndGgiLCJtaW5GcHNDYWxjIiwibWF4UmVzdGFydEF0dGVtcHRzIiwicmVzdGFydCIsInRhcmdldEZwc0NhbGMiLCJ2aXNpYmlsaXR5IiwidmlzaWJpbGl0eVN0YXRlIiwicmVzdW1lIiwicGF1c2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7O0lBSXFCQSxVOzs7QUFFbkI7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7O0FBR0Esc0JBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFB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O3dCQTlObUM7QUFFbEMsYUFBTyxLQUFLeEMsZ0JBQVo7QUFFRDtBQUVEOzs7Ozs7Ozs7O3dCQU9nQztBQUU5QixhQUFPLEtBQUtDLFFBQVo7QUFFRDtBQUVEOzs7Ozs7Ozs7O3dCQU8rQjtBQUU3QixhQUFPLEtBQUtDLE9BQVo7QUFFRDtBQUVEOzs7Ozs7Ozs7O3dCQU8yQjtBQUV6QixhQUFPLEtBQUtFLE1BQVo7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5pbXBvcnQgUmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZyb20gJy4vcmFmL1JlcXVlc3RBbmltYXRpb25GcmFtZSc7XHJcblxyXG4vKipcclxuICogRGVsdGFmcmFtZSBpcyBhbiBhbmltYXRpb24gYW5kIGdhbWUgbG9vcCBtYW5hZ2VyIHdpdGggYSBmb2N1cyBvbiBwdW5jdHVhbGl0eVxyXG4gKiBhbmQgYSBoaWdobHkgc2NhbGFibGUgZnJhbWV3b3JrLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsdGFmcmFtZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBvcHRpb25zIE9iamVjdCBieSBtZXJnaW5nIHRoZSB1c2VyIHNwZWNpZmllZCBvcHRpb25zIFxyXG4gICAqIHdpdGggdGhlIGRlZmF1bHRzLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAxLjAuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29wdGlvbnM6IE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhbW91bnQgb2YgdGltZXMgRGVsdGFmcmFtZSBoYXMgcmVzdGFydGVkIGR1ZSB0byB0aGUgYXZlcmFnZVxyXG4gICAqIGZwcyBnb2luZyBiZWxvdyB0aGUgdGhlIG1pbkZwcy5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9yZXN0YXJ0QXR0ZW1wdHM6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgRGVsdGFmcmFtZSBpcyBjdXJyZW50bHkgcnVubmluZyBhbmQgbm90IHBhdXNlZCBcclxuICAgKiBvciBzdG9wcGVkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9ydW5uaW5nOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBEZWx0YWZyYW1lIGlzIGN1cnJlbnRseSBwYXVzZWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3BhdXNlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgb24gZXZlcnkgRGVsdGFmcmFtZSB1cGRhdGUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9mbjogRnVuY3Rpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IGZyYW1lIHRoYXQgRGVsdGFmcmFtZSBpcyBvbi5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9mcmFtZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB0aW1lc3RhbXAgYXMgb2YgdGhlIGxhdGVzdCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgXHJcbiAgICogdXBkYXRlLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9XHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdGltZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGltZXN0YW1wIGJlZm9yZSB0aGUgY3VycmVudCB0aW1lc3RhbXAuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9wcmV2VGltZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGlmZmVyZW5jZSBpbiB0aW1lIGJldHdlZW4gdGhlIGN1cnJlbnQgdGltZSBhbmQgdGhlIGxhc3QgdGltZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9kZWx0YTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXZlcmFnZSBkaWZmZXJlbmNlIGluIHRpbWUgYmV0d2VlbiBmcmFtZXMuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGFBdmVyYWdlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2V0IG9mIHVwIHRvIDEwIHJlY2VudCBwcmV2aW91cyBkZWx0YSB2YWx1ZXMgdGhhdCBhcmUgdXNlZCB0byBnZXQgdGhlXHJcbiAgICogbWVhbiBkZWx0YS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5fVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhSGlzdG9yeTogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2luY2Ugd2Ugb25seSB3YW50IHRvIGdvIHVwIHRvIDEwIG9uIHRoZSBkZWx0YUhpc3RvcnksIHdlIGtlZXAgdHJhY2sgb2ZcclxuICAgKiB3aGF0IGluZGV4IHdlJ3JlIG9uIHNvIHdlIGNhbiByZXNldCB0byAwIG9uY2Ugd2VyZSBhdCAxMC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9kZWx0YUluZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIFJlcXVlc3RBbmltYXRpb25GcmFtZSBhYnN0cmFjdGlvbiBtb2R1bGUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtSZXF1ZXN0QW5pbWF0aW9uRnJhbWV9XHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmFmOiBSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGUgdmVyc2lvbiBvZiBoaWRkZW4gdGhhdCdzIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtkb2N1bWVudC5oaWRkZW59XHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaGlkZGVuOiBPYmplY3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGlzIERlbHRhZnJhbWUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0KSB7XHJcblxyXG4gICAgdGhpcy5fb3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2ZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl90aW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhQXZlcmFnZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFIaXN0b3J5ID0gW107XHJcblxyXG4gICAgdGhpcy5fZGVsdGFJbmRleCA9IDA7XHJcblxyXG4gICAgdGhpcy5fcmFmID0gbmV3IFJlcXVlc3RBbmltYXRpb25GcmFtZSgpO1xyXG5cclxuICAgIHRoaXMuX2hpZGRlbiA9IGRvY3VtZW50LmhpZGRlbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJ1biB0aGUgaW5pdGlhbGl6YXRpb24gbWV0aG9kIGFmdGVyIGFsbCBvZiB0aGUgcHJvcGVydGllcyBoYXZlIGJlZW5cclxuICAgICAqIGxvYWRlZCBhbmQgYXNzaWduZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBzaW5jZSAwLjEuMFxyXG4gICAgICovXHJcbiAgICB0aGlzLl9ib290KCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IG51bWJlciBvZiB0aW1lcyB0aGF0IERlbHRhZnJhbSBoYXNcclxuICAgKiByZXN0YXJ0ZWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IHRpbWVzUmVzdGFydGVkKCk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHJ1bm5pbmcgc3RhdHVzIG9mIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHVibGljIGdldCBpc1J1bm5pbmcoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3J1bm5pbmc7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBwYXVzZWQgc3RhdHVzIG9mIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHVibGljIGdldCBpc1BhdXNlZCgpOiBib29sZWFuIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fcGF1c2VkO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGZyYW1lKCk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2ZyYW1lO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHRoZSBEZWx0YWZyYW1lIGxvb3AgdXNpbmcgdGhlIGFic3RyYWN0ZWQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIFxyXG4gICAqIG9yIHNldFRpbWVvdXQgbWV0aG9kcy5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGV2ZXJ5IHN0ZXAgYnkgdGhlIGxvb3AuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXJ0KGZuOiBGdW5jdGlvbikge1xyXG5cclxuICAgIHRoaXMuX2ZuID0gZm47XHJcblxyXG4gICAgdGhpcy5fcHJldlRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3JhZi5zdGFydCgodGltZXN0YW1wOiBudW1iZXIpID0+IHRoaXMuX3VwZGF0ZSh0aW1lc3RhbXApLCB0aGlzLl9vcHRpb25zLmZvcmNlU2V0VGltZW91dCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVtcG9yYXJpbHkgc3RvcCB0aGUgbG9vcCwgc2F2aW5nIHZhbHVlcyB0byBiZSByZXN1bWVkIGF0IGEgbGF0ZXIgcG9pbnQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgcHVibGljIHBhdXNlKCkge1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3VtZSB0aGUgbG9vcCBmcm9tIGl0cyBwYXVzZWQgc3RhdGUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgcHVibGljIHJlc3VtZSgpIHtcclxuXHJcbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHRoZSBsb29wIGFuZCByZXNldCBhbGwgdGltZSB2YWx1ZXMgb2YgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKi9cclxuICBwdWJsaWMgc3RvcCgpIHtcclxuXHJcbiAgICB0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMgPSAwO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9mbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fdGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fcHJldlRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4gdGhpcy5fdmlzaWJpbGl0eUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5fcmFmLnN0b3AoKTtcclxuXHJcbiAgICByZXR1cm47XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgcGFnZSB2aXNpYmlsaXR5IGV2ZW50cyB3aGljaCB3aWxsIGxldCB1cyBzYXZlIHJlc291cmNlcyBieSBwYXVzaW5nXHJcbiAgICogb3VyIHVwZGF0ZXMgd2hlbiB0aGUgdXNlciBpcyBub3QgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgcGFnZSBydW5uaW5nIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9ib290KCkge1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgaXMgY2FsbGVkIHdoZW5ldmVyIHJlcXVlc3RBbmltYXRpb25GcmFtZSBkZWNpZGVzIGl0IGNhbiBwcm9jZXNzIHRoZVxyXG4gICAqIG5leHQgc3RlcCBvZiB0aGUgbG9vcCBvciByb3VnaGx5IDYwIHRpbWVzIHBlciBzZWNvbmQgdXNpbmcgc2V0VGltZW91dC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7RE9NSGlnaFJlc1RpbWVTdGFtcHxudW1iZXJ9IHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIGFzIHJldHVybmVkIGZyb20gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZSh0aW1lc3RhbXA6IG51bWJlcikge1xyXG5cclxuICAgIGlmICh0aGlzLl9wYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodGltZXN0YW1wID49IHRoaXMuX29wdGlvbnMucnVuVGltZSkge1xyXG5cclxuICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3RpbWUgPSB0aW1lc3RhbXA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSB0aW1lc3RhbXAgLSB0aGlzLl9wcmV2VGltZTtcclxuXHJcbiAgICBpZiAodGhpcy5fZGVsdGFJbmRleCA9PT0gMTApIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeVt0aGlzLl9kZWx0YUluZGV4XSA9IHRoaXMuX2RlbHRhO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXgrKztcclxuXHJcbiAgICBsZXQgbWVhbiA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kZWx0YUhpc3RvcnkubGVuZ3RoOyArK2kpIG1lYW4gKz0gdGhpcy5fZGVsdGFIaXN0b3J5W2ldO1xyXG5cclxuICAgIG1lYW4gLz0gMTA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFBdmVyYWdlID0gbWVhbjtcclxuXHJcbiAgICBpZiAodGhpcy5fZGVsdGFBdmVyYWdlID49IHRoaXMuX29wdGlvbnMubWluRnBzQ2FsYykge1xyXG5cclxuICAgICAgaWYgKHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9PT0gdGhpcy5fb3B0aW9ucy5tYXhSZXN0YXJ0QXR0ZW1wdHMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3JhZi5yZXN0YXJ0KCk7XHJcblxyXG4gICAgICB0aGlzLl9yZXN0YXJ0QXR0ZW1wdHMrKztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RlbHRhQXZlcmFnZSA+PSB0aGlzLl9vcHRpb25zLnRhcmdldEZwc0NhbGMpIHtcclxuXHJcbiAgICAgIHRoaXMuX2ZyYW1lKys7XHJcblxyXG4gICAgICB0aGlzLl9mbih0aW1lc3RhbXAsIHRoaXMuX2RlbHRhLCB0aGlzLl9kZWx0YUF2ZXJhZ2UpO1xyXG5cclxuICAgICAgdGhpcy5fcHJldlRpbWUgPSB0aW1lc3RhbXA7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIHRoZSB1c2VyIGhhcyBzd2l0Y2hlZCB0byBhIGRpZmZlcmVudCB0YWIgYW5kIGlzIG5vdCBvbiB0aGUgc2FtZSBwYWdlIHRoYXRcclxuICAgKiBEZWx0YWZyYW1lIGlzIHJ1bm5pbmcgb24sIERlbHRhZnJhbWUgd2lsbCBwYXVzZSBhbmQgd2hlbiB0aGUgdXNlciBjb21lcyBiYWNrIGl0IHdpbGwgcmVzdW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjIuMFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlDaGFuZ2UoKSB7XHJcblxyXG4gICAgbGV0IHZpc2liaWxpdHkgPSBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGU7XHJcblxyXG4gICAgaWYgKHZpc2liaWxpdHkgPT09ICd2aXNpYmxlJykgdGhpcy5yZXN1bWUoKTtcclxuXHJcbiAgICBlbHNlIGlmICh2aXNpYmlsaXR5ID09PSAnaGlkZGVuJykgdGhpcy5wYXVzZSgpO1xyXG5cclxuICB9XHJcblxyXG59Il19