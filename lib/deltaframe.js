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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWx0YWZyYW1lLnRzIl0sIm5hbWVzIjpbIkRlbHRhZnJhbWUiLCJvcHRpb25zIiwiX29wdGlvbnMiLCJPcHRpb25zIiwiX3Jlc3RhcnRBdHRlbXB0cyIsIl9ydW5uaW5nIiwiX3BhdXNlZCIsIl9mbiIsIl9mcmFtZSIsIl90aW1lIiwiX3ByZXZUaW1lIiwiX2RlbHRhIiwiX2RlbHRhQXZlcmFnZSIsIl9kZWx0YUhpc3RvcnkiLCJfZGVsdGFJbmRleCIsIl9yYWYiLCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfaGlkZGVuIiwiZG9jdW1lbnQiLCJoaWRkZW4iLCJfYm9vdCIsImZuIiwic3RhcnQiLCJ0aW1lc3RhbXAiLCJfdXBkYXRlIiwiZm9yY2VTZXRUaW1lb3V0Iiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJub3ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX3Zpc2liaWxpdHlDaGFuZ2UiLCJzdG9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJ1blRpbWUiLCJtZWFuIiwiaSIsImxlbmd0aCIsIm1pbkZwc0NhbGMiLCJtYXhSZXN0YXJ0QXR0ZW1wdHMiLCJyZXN0YXJ0IiwidGFyZ2V0RnBzQ2FsYyIsInZpc2liaWxpdHkiLCJ2aXNpYmlsaXR5U3RhdGUiLCJyZXN1bWUiLCJwYXVzZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7SUFJcUJBLFU7OztBQUVuQjs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7OztBQVVBOzs7QUFHQSxzQkFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUUzQixTQUFLQyxRQUFMLEdBQWdCLElBQUlDLGdCQUFKLENBQVlGLE9BQVosQ0FBaEI7QUFFQSxTQUFLRyxnQkFBTCxHQUF3QixDQUF4QjtBQUVBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFFQSxTQUFLQyxPQUFMLEdBQWUsS0FBZjs7QUFFQSxTQUFLQyxHQUFMLEdBQVcsWUFBTSxDQUFHLENBQXBCOztBQUVBLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBRUEsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFFQSxTQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBRUEsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFFQSxTQUFLQyxhQUFMLEdBQXFCLENBQXJCO0FBRUEsU0FBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUVBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFFQSxTQUFLQyxJQUFMLEdBQVksSUFBSUMsOEJBQUosRUFBWjtBQUVBLFNBQUtDLE9BQUwsR0FBZUMsUUFBUSxDQUFDQyxNQUF4QjtBQUVBOzs7Ozs7O0FBTUEsU0FBS0MsS0FBTDtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUFxREE7Ozs7Ozs7OzBCQVFhQyxFLEVBQWM7QUFBQTs7QUFFekIsV0FBS2QsR0FBTCxHQUFXYyxFQUFYO0FBRUEsV0FBS1gsU0FBTCxHQUFpQixDQUFqQjtBQUVBLFdBQUtMLFFBQUwsR0FBZ0IsSUFBaEI7O0FBRUEsV0FBS1UsSUFBTCxDQUFVTyxLQUFWLENBQWdCLFVBQUNDLFNBQUQ7QUFBQSxlQUF1QixLQUFJLENBQUNDLE9BQUwsQ0FBYUQsU0FBYixDQUF2QjtBQUFBLE9BQWhCLEVBQWdFLEtBQUtyQixRQUFMLENBQWN1QixlQUE5RTtBQUVEO0FBRUQ7Ozs7Ozs7OzRCQUtlO0FBRWIsV0FBS25CLE9BQUwsR0FBZSxJQUFmO0FBRUEsV0FBS0QsUUFBTCxHQUFnQixLQUFoQjtBQUVEO0FBRUQ7Ozs7Ozs7OzZCQUtnQjtBQUVkLFdBQUtDLE9BQUwsR0FBZSxLQUFmO0FBRUEsV0FBS0ksU0FBTCxHQUFpQmdCLE1BQU0sQ0FBQ0MsV0FBUCxDQUFtQkMsR0FBbkIsRUFBakI7QUFFQSxXQUFLdkIsUUFBTCxHQUFnQixJQUFoQjtBQUVEO0FBRUQ7Ozs7Ozs7OzJCQUtjO0FBQUE7O0FBRVosV0FBS0QsZ0JBQUwsR0FBd0IsQ0FBeEI7QUFFQSxXQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBRUEsV0FBS0MsT0FBTCxHQUFlLEtBQWY7O0FBRUEsV0FBS0MsR0FBTCxHQUFXLFlBQU0sQ0FBRyxDQUFwQjs7QUFFQSxXQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUVBLFdBQUtDLEtBQUwsR0FBYSxDQUFiO0FBRUEsV0FBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUVBLFdBQUtDLE1BQUwsR0FBYyxDQUFkO0FBRUEsV0FBS0UsYUFBTCxHQUFxQixFQUFyQjtBQUVBLFdBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFFQUksTUFBQUEsUUFBUSxDQUFDVyxtQkFBVCxDQUE2QixrQkFBN0IsRUFBaUQ7QUFBQSxlQUFNLE1BQUksQ0FBQ0MsaUJBQVg7QUFBQSxPQUFqRDs7QUFFQSxXQUFLZixJQUFMLENBQVVnQixJQUFWOztBQUVBO0FBRUQ7QUFFRDs7Ozs7Ozs7Ozs0QkFPZ0I7QUFBQTs7QUFFZGIsTUFBQUEsUUFBUSxDQUFDYyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEM7QUFBQSxlQUFNLE1BQUksQ0FBQ0YsaUJBQVg7QUFBQSxPQUE5QztBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Ozs0QkFTZ0JQLFMsRUFBbUI7QUFFakMsVUFBSSxLQUFLakIsT0FBVCxFQUFrQjs7QUFFbEIsVUFBSWlCLFNBQVMsSUFBSSxLQUFLckIsUUFBTCxDQUFjK0IsT0FBL0IsRUFBd0M7QUFFdEMsYUFBS0YsSUFBTDtBQUVBO0FBRUQ7O0FBRUQsV0FBS3RCLEtBQUwsR0FBYWMsU0FBYjtBQUVBLFdBQUtaLE1BQUwsR0FBY1ksU0FBUyxHQUFHLEtBQUtiLFNBQS9CO0FBRUEsVUFBSSxLQUFLSSxXQUFMLEtBQXFCLEVBQXpCLEVBQTZCLEtBQUtBLFdBQUwsR0FBbUIsQ0FBbkI7QUFFN0IsV0FBS0QsYUFBTCxDQUFtQixLQUFLQyxXQUF4QixJQUF1QyxLQUFLSCxNQUE1QztBQUVBLFdBQUtHLFdBQUw7QUFFQSxVQUFJb0IsSUFBSSxHQUFHLENBQVg7O0FBRUEsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt0QixhQUFMLENBQW1CdUIsTUFBdkMsRUFBK0MsRUFBRUQsQ0FBakQ7QUFBb0RELFFBQUFBLElBQUksSUFBSSxLQUFLckIsYUFBTCxDQUFtQnNCLENBQW5CLENBQVI7QUFBcEQ7O0FBRUFELE1BQUFBLElBQUksSUFBSSxFQUFSO0FBRUEsV0FBS3RCLGFBQUwsR0FBcUJzQixJQUFyQjs7QUFFQSxVQUFJLEtBQUt0QixhQUFMLElBQXNCLEtBQUtWLFFBQUwsQ0FBY21DLFVBQXhDLEVBQW9EO0FBRWxELFlBQUksS0FBS2pDLGdCQUFMLEtBQTBCLEtBQUtGLFFBQUwsQ0FBY29DLGtCQUE1QyxFQUFnRTtBQUU5RCxlQUFLUCxJQUFMO0FBRUE7QUFFRDs7QUFFRCxhQUFLaEIsSUFBTCxDQUFVd0IsT0FBVjs7QUFFQSxhQUFLbkMsZ0JBQUw7QUFFRDs7QUFFRCxVQUFJLEtBQUtRLGFBQUwsSUFBc0IsS0FBS1YsUUFBTCxDQUFjc0MsYUFBeEMsRUFBdUQ7QUFFckQsYUFBS2hDLE1BQUw7O0FBRUEsYUFBS0QsR0FBTCxDQUFTZ0IsU0FBVCxFQUFvQixLQUFLWixNQUF6QixFQUFpQyxLQUFLQyxhQUF0Qzs7QUFFQSxhQUFLRixTQUFMLEdBQWlCYSxTQUFqQjtBQUVEO0FBRUY7QUFFRDs7Ozs7Ozs7O3dDQU00QjtBQUUxQixVQUFJa0IsVUFBVSxHQUFHdkIsUUFBUSxDQUFDd0IsZUFBMUI7QUFFQSxVQUFJRCxVQUFVLEtBQUssU0FBbkIsRUFBOEIsS0FBS0UsTUFBTCxHQUE5QixLQUVLLElBQUlGLFVBQVUsS0FBSyxRQUFuQixFQUE2QixLQUFLRyxLQUFMO0FBRW5DOzs7d0JBOU5tQztBQUVsQyxhQUFPLEtBQUt4QyxnQkFBWjtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7d0JBT2dDO0FBRTlCLGFBQU8sS0FBS0MsUUFBWjtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7d0JBTytCO0FBRTdCLGFBQU8sS0FBS0MsT0FBWjtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7d0JBTzJCO0FBRXpCLGFBQU8sS0FBS0UsTUFBWjtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvT3B0aW9ucyc7XHJcbmltcG9ydCBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZnJvbSAnLi9yYWYvUmVxdWVzdEFuaW1hdGlvbkZyYW1lJztcclxuXHJcbi8qKlxyXG4gKiBEZWx0YWZyYW1lIGlzIGFuIGFuaW1hdGlvbiBhbmQgZ2FtZSBsb29wIG1hbmFnZXIgd2l0aCBhIGZvY3VzIG9uIHB1bmN0dWFsaXR5XHJcbiAqIGFuZCBhIGhpZ2hseSBzY2FsYWJsZSBmcmFtZXdvcmsuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWx0YWZyYW1lIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIG9wdGlvbnMgT2JqZWN0IGJ5IG1lcmdpbmcgdGhlIHVzZXIgc3BlY2lmaWVkIG9wdGlvbnMgXHJcbiAgICogd2l0aCB0aGUgZGVmYXVsdHMuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDEuMC4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogT3B0aW9ucztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFtb3VudCBvZiB0aW1lcyBEZWx0YWZyYW1lIGhhcyByZXN0YXJ0ZWQgZHVlIHRvIHRoZSBhdmVyYWdlXHJcbiAgICogZnBzIGdvaW5nIGJlbG93IHRoZSB0aGUgbWluRnBzLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Jlc3RhcnRBdHRlbXB0czogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBEZWx0YWZyYW1lIGlzIGN1cnJlbnRseSBydW5uaW5nIGFuZCBub3QgcGF1c2VkIFxyXG4gICAqIG9yIHN0b3BwZWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3J1bm5pbmc6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIERlbHRhZnJhbWUgaXMgY3VycmVudGx5IHBhdXNlZC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGF1c2VkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBvbiBldmVyeSBEZWx0YWZyYW1lIHVwZGF0ZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZuOiBGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgZnJhbWUgdGhhdCBEZWx0YWZyYW1lIGlzIG9uLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZyYW1lOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHRpbWVzdGFtcCBhcyBvZiB0aGUgbGF0ZXN0IFJlcXVlc3RBbmltYXRpb25GcmFtZSBcclxuICAgKiB1cGRhdGUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF90aW1lOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0aW1lc3RhbXAgYmVmb3JlIHRoZSBjdXJyZW50IHRpbWVzdGFtcC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0RPTUhpZ2hSZXNUaW1lU3RhbXB8bnVtYmVyfVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ByZXZUaW1lOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkaWZmZXJlbmNlIGluIHRpbWUgYmV0d2VlbiB0aGUgY3VycmVudCB0aW1lIGFuZCB0aGUgbGFzdCB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhdmVyYWdlIGRpZmZlcmVuY2UgaW4gdGltZSBiZXR3ZWVuIGZyYW1lcy5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9kZWx0YUF2ZXJhZ2U6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBzZXQgb2YgdXAgdG8gMTAgcmVjZW50IHByZXZpb3VzIGRlbHRhIHZhbHVlcyB0aGF0IGFyZSB1c2VkIHRvIGdldCB0aGVcclxuICAgKiBtZWFuIGRlbHRhLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9XHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZGVsdGFIaXN0b3J5OiBBcnJheTxudW1iZXI+O1xyXG5cclxuICAvKipcclxuICAgKiBTaW5jZSB3ZSBvbmx5IHdhbnQgdG8gZ28gdXAgdG8gMTAgb24gdGhlIGRlbHRhSGlzdG9yeSwgd2Uga2VlcCB0cmFjayBvZlxyXG4gICAqIHdoYXQgaW5kZXggd2UncmUgb24gc28gd2UgY2FuIHJlc2V0IHRvIDAgb25jZSB3ZXJlIGF0IDEwLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2RlbHRhSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgUmVxdWVzdEFuaW1hdGlvbkZyYW1lIGFic3RyYWN0aW9uIG1vZHVsZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1JlcXVlc3RBbmltYXRpb25GcmFtZX1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9yYWY6IFJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoZSB2ZXJzaW9uIG9mIGhpZGRlbiB0aGF0J3Mgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3Nlci5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2RvY3VtZW50LmhpZGRlbn1cclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIF9oaWRkZW46IE9iamVjdDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyB0byBwYXNzIHRvIHRoaXMgRGVsdGFmcmFtZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QpIHtcclxuXHJcbiAgICB0aGlzLl9vcHRpb25zID0gbmV3IE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5fcmVzdGFydEF0dGVtcHRzID0gMDtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fZm4gPSAoKSA9PiB7IH07XHJcblxyXG4gICAgdGhpcy5fZnJhbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3RpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFBdmVyYWdlID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUhpc3RvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUluZGV4ID0gMDtcclxuXHJcbiAgICB0aGlzLl9yYWYgPSBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCk7XHJcblxyXG4gICAgdGhpcy5faGlkZGVuID0gZG9jdW1lbnQuaGlkZGVuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUnVuIHRoZSBpbml0aWFsaXphdGlvbiBtZXRob2QgYWZ0ZXIgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzIGhhdmUgYmVlblxyXG4gICAgICogbG9hZGVkIGFuZCBhc3NpZ25lZC5cclxuICAgICAqIFxyXG4gICAgICogQHNpbmNlIDAuMS4wXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2Jvb3QoKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHRpbWVzIHRoYXQgRGVsdGFmcmFtIGhhc1xyXG4gICAqIHJlc3RhcnRlZC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgdGltZXNSZXN0YXJ0ZWQoKTogbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdGFydEF0dGVtcHRzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgcnVubmluZyBzdGF0dXMgb2YgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGlzUnVubmluZygpOiBib29sZWFuIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fcnVubmluZztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHBhdXNlZCBzdGF0dXMgb2YgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGlzUGF1c2VkKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9wYXVzZWQ7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBmcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMS4wLjBcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgZnJhbWUoKTogbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZnJhbWU7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgdGhlIERlbHRhZnJhbWUgbG9vcCB1c2luZyB0aGUgYWJzdHJhY3RlZCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgXHJcbiAgICogb3Igc2V0VGltZW91dCBtZXRob2RzLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgZXZlcnkgc3RlcCBieSB0aGUgbG9vcC5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhcnQoZm46IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgdGhpcy5fZm4gPSBmbjtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5fcmFmLnN0YXJ0KCh0aW1lc3RhbXA6IG51bWJlcikgPT4gdGhpcy5fdXBkYXRlKHRpbWVzdGFtcCksIHRoaXMuX29wdGlvbnMuZm9yY2VTZXRUaW1lb3V0KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZW1wb3JhcmlseSBzdG9wIHRoZSBsb29wLCBzYXZpbmcgdmFsdWVzIHRvIGJlIHJlc3VtZWQgYXQgYSBsYXRlciBwb2ludC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKi9cclxuICBwdWJsaWMgcGF1c2UoKSB7XHJcblxyXG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdW1lIHRoZSBsb29wIGZyb20gaXRzIHBhdXNlZCBzdGF0ZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKi9cclxuICBwdWJsaWMgcmVzdW1lKCkge1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3ByZXZUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgdGhlIGxvb3AgYW5kIHJlc2V0IGFsbCB0aW1lIHZhbHVlcyBvZiBEZWx0YWZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdG9wKCkge1xyXG5cclxuICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cyA9IDA7XHJcblxyXG4gICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2ZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl90aW1lID0gMDtcclxuXHJcbiAgICB0aGlzLl9wcmV2VGltZSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGEgPSAwO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSGlzdG9yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2RlbHRhSW5kZXggPSAwO1xyXG5cclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLl9yYWYuc3RvcCgpO1xyXG5cclxuICAgIHJldHVybjtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBwYWdlIHZpc2liaWxpdHkgZXZlbnRzIHdoaWNoIHdpbGwgbGV0IHVzIHNhdmUgcmVzb3VyY2VzIGJ5IHBhdXNpbmdcclxuICAgKiBvdXIgdXBkYXRlcyB3aGVuIHRoZSB1c2VyIGlzIG5vdCBpbnRlcmFjdGluZyB3aXRoIHRoZSBwYWdlIHJ1bm5pbmcgRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Jvb3QoKSB7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2UpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBpcyBjYWxsZWQgd2hlbmV2ZXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGRlY2lkZXMgaXQgY2FuIHByb2Nlc3MgdGhlXHJcbiAgICogbmV4dCBzdGVwIG9mIHRoZSBsb29wIG9yIHJvdWdobHkgNjAgdGltZXMgcGVyIHNlY29uZCB1c2luZyBzZXRUaW1lb3V0LlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtET01IaWdoUmVzVGltZVN0YW1wfG51bWJlcn0gdGltZXN0YW1wIFRoZSB0aW1lc3RhbXAgYXMgcmV0dXJuZWQgZnJvbSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdXBkYXRlKHRpbWVzdGFtcDogbnVtYmVyKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuX3BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aW1lc3RhbXAgPj0gdGhpcy5fb3B0aW9ucy5ydW5UaW1lKSB7XHJcblxyXG4gICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fdGltZSA9IHRpbWVzdGFtcDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YSA9IHRpbWVzdGFtcCAtIHRoaXMuX3ByZXZUaW1lO1xyXG5cclxuICAgIGlmICh0aGlzLl9kZWx0YUluZGV4ID09PSAxMCkgdGhpcy5fZGVsdGFJbmRleCA9IDA7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFIaXN0b3J5W3RoaXMuX2RlbHRhSW5kZXhdID0gdGhpcy5fZGVsdGE7XHJcblxyXG4gICAgdGhpcy5fZGVsdGFJbmRleCsrO1xyXG5cclxuICAgIGxldCBtZWFuID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RlbHRhSGlzdG9yeS5sZW5ndGg7ICsraSkgbWVhbiArPSB0aGlzLl9kZWx0YUhpc3RvcnlbaV07XHJcblxyXG4gICAgbWVhbiAvPSAxMDtcclxuXHJcbiAgICB0aGlzLl9kZWx0YUF2ZXJhZ2UgPSBtZWFuO1xyXG5cclxuICAgIGlmICh0aGlzLl9kZWx0YUF2ZXJhZ2UgPj0gdGhpcy5fb3B0aW9ucy5taW5GcHNDYWxjKSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5fcmVzdGFydEF0dGVtcHRzID09PSB0aGlzLl9vcHRpb25zLm1heFJlc3RhcnRBdHRlbXB0cykge1xyXG5cclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fcmFmLnJlc3RhcnQoKTtcclxuXHJcbiAgICAgIHRoaXMuX3Jlc3RhcnRBdHRlbXB0cysrO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fZGVsdGFBdmVyYWdlID49IHRoaXMuX29wdGlvbnMudGFyZ2V0RnBzQ2FsYykge1xyXG5cclxuICAgICAgdGhpcy5fZnJhbWUrKztcclxuXHJcbiAgICAgIHRoaXMuX2ZuKHRpbWVzdGFtcCwgdGhpcy5fZGVsdGEsIHRoaXMuX2RlbHRhQXZlcmFnZSk7XHJcblxyXG4gICAgICB0aGlzLl9wcmV2VGltZSA9IHRpbWVzdGFtcDtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgdGhlIHVzZXIgaGFzIHN3aXRjaGVkIHRvIGEgZGlmZmVyZW50IHRhYiBhbmQgaXMgbm90IG9uIHRoZSBzYW1lIHBhZ2UgdGhhdFxyXG4gICAqIERlbHRhZnJhbWUgaXMgcnVubmluZyBvbiwgRGVsdGFmcmFtZSB3aWxsIHBhdXNlIGFuZCB3aGVuIHRoZSB1c2VyIGNvbWVzIGJhY2sgaXQgd2lsbCByZXN1bWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMi4wXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eUNoYW5nZSgpIHtcclxuXHJcbiAgICBsZXQgdmlzaWJpbGl0eSA9IGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZTtcclxuXHJcbiAgICBpZiAodmlzaWJpbGl0eSA9PT0gJ3Zpc2libGUnKSB0aGlzLnJlc3VtZSgpO1xyXG5cclxuICAgIGVsc2UgaWYgKHZpc2liaWxpdHkgPT09ICdoaWRkZW4nKSB0aGlzLnBhdXNlKCk7XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=