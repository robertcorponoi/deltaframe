'use strict';
/**
 * Abstract the use of requestAnimationFrame and setTimeout under one name so that Deltaframe
 * itself does not have to worry about which one to use.
 * 
 * This also uses the requestAnimationFrame and cancelAnimationFrame that are supported by the
 * user's browser and forces setTimeout if desired.
 * 
 * @since 0.1.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

exports.default = RequestAnimationFrame;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yYWYvUmVxdWVzdEFuaW1hdGlvbkZyYW1lLnRzIl0sIm5hbWVzIjpbIlJlcXVlc3RBbmltYXRpb25GcmFtZSIsImlkIiwicnVubmluZyIsImZuIiwidXNpbmdTZXRUaW1lb3V0Iiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZiIsInNldFRpbWVvdXQiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJUaW1lb3V0IiwiZm9yY2VTZXRUaW1lb3V0IiwidXBkYXRlVGltZW91dCIsInRpbWUiLCJ1cGRhdGVSQUYiLCJ0aW1lc3RhbXAiLCJwZXJmb3JtYW5jZSIsIm5vdyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTcUJBLHFCOzs7QUFVbkIsbUNBQWM7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFFWjs7Ozs7OztBQU9BLFNBQUtDLEVBQUwsR0FBVSxDQUFWO0FBRUE7Ozs7Ozs7O0FBT0EsU0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFFQTs7Ozs7OztBQU1BLFNBQUtDLEVBQUwsR0FBVSxZQUFNLENBQUcsQ0FBbkI7QUFFQTs7Ozs7Ozs7O0FBT0EsU0FBS0MsZUFBTCxHQUF1QixLQUF2QjtBQUVBOzs7Ozs7OztBQU9BQyxJQUFBQSxNQUFNLENBQUNDLHFCQUFQLEdBQStCRCxNQUFNLENBQUNDLHFCQUFQLElBQWdDRCxNQUFNLENBQUNFLDJCQUF2QyxJQUFzRSxVQUFVQyxDQUFWLEVBQWE7QUFBRSxhQUFPQyxVQUFVLENBQUNELENBQUQsRUFBSSxPQUFPLEVBQVgsQ0FBakI7QUFBaUMsS0FBcko7QUFFQTs7Ozs7Ozs7O0FBT0FILElBQUFBLE1BQU0sQ0FBQ0ssb0JBQVAsR0FBOEJMLE1BQU0sQ0FBQ0ssb0JBQVAsSUFBK0JMLE1BQU0sQ0FBQ00sMEJBQXRDLElBQW9FLFlBQXVDO0FBQUVDLE1BQUFBLFlBQVksQ0FBQyxLQUFLWCxFQUFOLENBQVo7QUFBdUIsS0FBbEs7QUFFRDtBQUVEOzs7Ozs7Ozs7Ozs7MEJBUU1FLEUsRUFBY1UsZSxFQUEwQjtBQUFBOztBQUU1QyxVQUFJLEtBQUtYLE9BQVQsRUFBa0I7QUFFbEIsV0FBS0EsT0FBTCxHQUFlLElBQWY7QUFFQSxXQUFLQyxFQUFMLEdBQVVBLEVBQVY7O0FBRUEsVUFBSVUsZUFBSixFQUFxQjtBQUVuQixhQUFLVCxlQUFMLEdBQXVCLElBQXZCO0FBRUEsYUFBS1UsYUFBTDtBQUVELE9BTkQsTUFPSztBQUVIVCxRQUFBQSxNQUFNLENBQUNDLHFCQUFQLENBQTZCLFVBQUNTLElBQUQ7QUFBQSxpQkFBVSxLQUFJLENBQUNDLFNBQUwsQ0FBZUQsSUFBZixDQUFWO0FBQUEsU0FBN0I7QUFFRDtBQUVGO0FBRUQ7Ozs7Ozs7Ozs7OzhCQVFVRSxTLEVBQW1CO0FBQUE7O0FBRTNCLFdBQUtmLE9BQUwsR0FBZSxJQUFmO0FBRUEsV0FBS0MsRUFBTCxDQUFRYyxTQUFSO0FBRUEsV0FBS2hCLEVBQUwsR0FBVUksTUFBTSxDQUFDQyxxQkFBUCxDQUE2QixVQUFDUyxJQUFEO0FBQUEsZUFBVSxNQUFJLENBQUNDLFNBQUwsQ0FBZUQsSUFBZixDQUFWO0FBQUEsT0FBN0IsQ0FBVjtBQUVEO0FBRUQ7Ozs7Ozs7OztvQ0FNZ0I7QUFBQTs7QUFFZCxVQUFJRSxTQUFTLEdBQUdaLE1BQU0sQ0FBQ2EsV0FBUCxDQUFtQkMsR0FBbkIsRUFBaEI7QUFFQSxXQUFLaEIsRUFBTCxDQUFRYyxTQUFSO0FBRUEsV0FBS2hCLEVBQUwsR0FBVUksTUFBTSxDQUFDSSxVQUFQLENBQWtCO0FBQUEsZUFBTSxNQUFJLENBQUNLLGFBQUwsRUFBTjtBQUFBLE9BQWxCLEVBQThDLE9BQU8sRUFBckQsQ0FBVjtBQUVEO0FBRUQ7Ozs7Ozs7OzhCQUtVO0FBQUE7O0FBRVIsVUFBSSxLQUFLVixlQUFULEVBQTBCQyxNQUFNLENBQUNPLFlBQVAsQ0FBb0IsS0FBS1gsRUFBekIsRUFBMUIsS0FFS0ksTUFBTSxDQUFDSyxvQkFBUCxDQUE0QixLQUFLVCxFQUFqQztBQUVMLFdBQUtBLEVBQUwsR0FBVSxDQUFWO0FBRUEsV0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFFQSxVQUFJLEtBQUtFLGVBQVQsRUFBMEIsS0FBS1UsYUFBTCxHQUExQixLQUVLVCxNQUFNLENBQUNDLHFCQUFQLENBQTZCLFVBQUNTLElBQUQ7QUFBQSxlQUFVLE1BQUksQ0FBQ0MsU0FBTCxDQUFlRCxJQUFmLENBQVY7QUFBQSxPQUE3QjtBQUVMLFdBQUtiLE9BQUwsR0FBZSxJQUFmO0FBRUQ7QUFFRDs7Ozs7Ozs7MkJBS087QUFFTCxVQUFJLEtBQUtFLGVBQVQsRUFBMEJDLE1BQU0sQ0FBQ08sWUFBUCxDQUFvQixLQUFLWCxFQUF6QixFQUExQixLQUVLSSxNQUFNLENBQUNLLG9CQUFQLENBQTRCLEtBQUtULEVBQWpDO0FBRUwsV0FBS0EsRUFBTCxHQUFVLENBQVY7QUFFQSxXQUFLQyxPQUFMLEdBQWUsS0FBZjs7QUFFQSxXQUFLQyxFQUFMLEdBQVUsWUFBTSxDQUFHLENBQW5COztBQUVBO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCB0aGUgdXNlIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSBhbmQgc2V0VGltZW91dCB1bmRlciBvbmUgbmFtZSBzbyB0aGF0IERlbHRhZnJhbWVcclxuICogaXRzZWxmIGRvZXMgbm90IGhhdmUgdG8gd29ycnkgYWJvdXQgd2hpY2ggb25lIHRvIHVzZS5cclxuICogXHJcbiAqIFRoaXMgYWxzbyB1c2VzIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYW5kIGNhbmNlbEFuaW1hdGlvbkZyYW1lIHRoYXQgYXJlIHN1cHBvcnRlZCBieSB0aGVcclxuICogdXNlcidzIGJyb3dzZXIgYW5kIGZvcmNlcyBzZXRUaW1lb3V0IGlmIGRlc2lyZWQuXHJcbiAqIFxyXG4gKiBAc2luY2UgMC4xLjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3RBbmltYXRpb25GcmFtZSB7XHJcblxyXG4gIHByaXZhdGUgaWQ6IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBydW5uaW5nOiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIGZuOiBGdW5jdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSB1c2luZ1NldFRpbWVvdXQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogS2VlcCB0cmFjayBvZiB0aGUgaWQgcmV0dXJuZWQgZnJvbSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgb3Igc2V0VGltZW91dCBzbyB3ZSBjYW5cclxuICAgICAqIHVzZSBpdCB0byBjYW5jZWwgdGhlbSBsYXRlciBvbi5cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdGhpcy5pZCA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZWVwIHRyYWNrIG9mIHdoZXRoZXIgdGhlIGxvb3AgaXMgYWxyZWFkeSBydW5uaW5nIG9yIG5vdCBzbyB3ZSBkb24ndCBhY2NpZGVudGx5XHJcbiAgICAgKiByZXN0YXJ0IGl0LlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZnVuY3Rpb24sIGFzIHNlbnQgZnJvbSBEZWx0YWZyYW1lLCB0aGF0IHdpbGwgYmUgcnVuIGV2ZXJ5IHVwZGF0ZSBvZiB0aGUgbG9vcC5cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgc2V0VGltZW91dCBpcyBiZWluZyB1c2VkIGluc3RlYWQgb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBlaXRoZXIgYnkgZm9yY2Ugb3JcclxuICAgICAqIGJ5IHVzZXIncyBicm93c2VyIHN1cHBvcnQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0aGlzLnVzaW5nU2V0VGltZW91dCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlIHRoZSB2ZXJzaW9uIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0aGF0IGlzIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIgYW5kIGlmIG5vbmVcclxuICAgICAqIGFyZSBzdXBwb3J0ZWQsIHVzZSBzZXRUaW1lb3V0IGluc3RlYWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7UmVxdWVzdEFuaW1hdGlvbkZyYW1lfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKSB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlIHRoZSB2ZXJzaW9uIG9mIGNhbmNlbEFuaW1hdGlvbkZyYW1lIHRoYXQgaXMgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3NlciBhbmQgaWYgbm9uZSBhcmVcclxuICAgICAqIHN1cHBvcnRlZCwgdGhlbiBzZXRUaW1lb3V0IHdhcyB1c2VkIGFuZCBzbyB3ZSB1c2UgY2xlYXJUaW1lb3V0IGluc3RlYWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7Y2FuY2VsQW5pbWF0aW9uRnJhbWV9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbiAodGhpczogUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7IGNsZWFyVGltZW91dCh0aGlzLmlkKSB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgdGhlIG9wZXJhdGlvbiBvZiB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9yIHNldFRpbWVvdXQgbG9vcC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIGV2ZXJ5IHVwZGF0ZSBvZiB0aGUgbG9vcC5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlU2V0VGltZW91dCBJbmRpY2F0ZXMgd2hldGhlciBzZXRUaW1lb3V0IHNob3VsZCBiZSB1c2VkIGV2ZW4gaWYgdGhlIHVzZXIncyBicm93c2VyIHN1cHBvcnRzIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgKi9cclxuICBzdGFydChmbjogRnVuY3Rpb24sIGZvcmNlU2V0VGltZW91dDogYm9vbGVhbikge1xyXG5cclxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZm4gPSBmbjtcclxuXHJcbiAgICBpZiAoZm9yY2VTZXRUaW1lb3V0KSB7XHJcblxyXG4gICAgICB0aGlzLnVzaW5nU2V0VGltZW91dCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLnVwZGF0ZVRpbWVvdXQoKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMudXBkYXRlUkFGKHRpbWUpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcmVjdXJzaXZlbHkgc28gdGhhdCB0aGUgbG9vcCBrZWVwcyBnb2luZyBhbmRcclxuICAgKiBhbHNvIHNlbmQgdGhlIHRpbWVzdGFtcHMgb3ZlciB0byBEZWx0YWZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXAgVGhlIHRpbWVzdGFtcCBmcm9tIHRoZSBtb3N0IHJlY2VudCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcmVxdWVzdC5cclxuICAgKi9cclxuICB1cGRhdGVSQUYodGltZXN0YW1wOiBudW1iZXIpIHtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZm4odGltZXN0YW1wKTtcclxuXHJcbiAgICB0aGlzLmlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy51cGRhdGVSQUYodGltZSkpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGwgc2V0VGltZW91dCByZWN1cnNpdmVseSBzbyB0aGF0IHRoZSBsb29wIGtlZXBzIGdvaW5nIGFuZCBhbHNvIHNlbmRcclxuICAgKiB0aGUgdGltZXN0YW1wcyBvdmVyIHRvIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgdXBkYXRlVGltZW91dCgpIHtcclxuXHJcbiAgICBsZXQgdGltZXN0YW1wID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuZm4odGltZXN0YW1wKTtcclxuXHJcbiAgICB0aGlzLmlkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVUaW1lb3V0KCksIDEwMDAgLyA2MCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdGFydCB0aGUgcmVxdWVzdEFuaW1hdGlvbiBvciBzZXRUaW1lb3V0IGxvb3AuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgcmVzdGFydCgpIHtcclxuXHJcbiAgICBpZiAodGhpcy51c2luZ1NldFRpbWVvdXQpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5pZCk7XHJcblxyXG4gICAgZWxzZSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5pZCk7XHJcblxyXG4gICAgdGhpcy5pZCA9IDA7XHJcblxyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMudXNpbmdTZXRUaW1lb3V0KSB0aGlzLnVwZGF0ZVRpbWVvdXQoKTtcclxuXHJcbiAgICBlbHNlIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMudXBkYXRlUkFGKHRpbWUpKTtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgdGhlIGxvb3AgYnkgY2FsbGluZyBjYW5jZWxBbmltYXRpb25GcmFtZSBvciBjbGVhclRpbWVvdXQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuXHJcbiAgICBpZiAodGhpcy51c2luZ1NldFRpbWVvdXQpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5pZCk7XHJcblxyXG4gICAgZWxzZSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5pZCk7XHJcblxyXG4gICAgdGhpcy5pZCA9IDA7XHJcblxyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5mbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgICByZXR1cm47XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=