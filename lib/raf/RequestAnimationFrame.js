'use strict';
/**
 * Abstract the use of requestAnimationFrame and setTimeout under one name so that Deltaframe itself does 
 * not have to worry about which one to use.
 * 
 * This also uses the requestAnimationFrame and cancelAnimationFrame that are supported by the user's browser 
 * and forces setTimeout if desired.
 * 
 * @since 0.1.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RequestAnimationFrame =
/*#__PURE__*/
function () {
  /**
   * A reference to the id returned by requestAnimationFrame or setTimeout so 
   * that we can cancel their operation when needed.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */

  /**
   * Keeps track of whether the loop is already running or not so it's not accidently 
   * restarted.
   * 
   * @since 0.1.0
   * 
   * @property {boolean}
   * 
   * @default false
   */

  /**
   * The function that should be run on every update of the loop.
   * 
   * @since 0.1.0
   * 
   * @property {Function}
   * 
   * @default ()=>{}
   */

  /**
   * Indicates whether setTImeout is being used instead of requestAnimationFrame.
   * 
   * @since 0.1.0
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
     * Use the version of requestAnimationFrame that is supported by the user's browser and if none are 
     * supported, use setTimeout instead.
     * 
     * @property {RequestAnimationFrame|setTimeout}
     */
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (f) {
      return setTimeout(f, 1000 / 60);
    };
    /**
     * Use the version of cancelAnimationFrame that is supported by the user's browser and if none are supported, 
     * then setTimeout was used and so we use clearTimeout instead.
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

exports["default"] = RequestAnimationFrame;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yYWYvUmVxdWVzdEFuaW1hdGlvbkZyYW1lLnRzIl0sIm5hbWVzIjpbIlJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImYiLCJzZXRUaW1lb3V0IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImNsZWFyVGltZW91dCIsImlkIiwiZm4iLCJmb3JjZVNldFRpbWVvdXQiLCJydW5uaW5nIiwidXNpbmdTZXRUaW1lb3V0IiwidXBkYXRlVGltZW91dCIsInRpbWUiLCJ1cGRhdGVSQUYiLCJ0aW1lc3RhbXAiLCJwZXJmb3JtYW5jZSIsIm5vdyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTcUJBLHFCOzs7QUFFbkI7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7OztBQVlBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7OztBQVdBLG1DQUFjO0FBQUE7O0FBQUEsZ0NBcENELENBb0NDOztBQUFBLHFDQXhCSyxLQXdCTDs7QUFBQSxnQ0FiQyxZQUFNLENBQUcsQ0FhVjs7QUFBQSw2Q0FGcUIsS0FFckI7O0FBRVo7Ozs7OztBQU1BQyxJQUFBQSxNQUFNLENBQUNDLHFCQUFQLEdBQStCRCxNQUFNLENBQUNDLHFCQUFQLElBQWdDRCxNQUFNLENBQUNFLDJCQUF2QyxJQUFzRSxVQUFVQyxDQUFWLEVBQWE7QUFBRSxhQUFPQyxVQUFVLENBQUNELENBQUQsRUFBSSxPQUFPLEVBQVgsQ0FBakI7QUFBaUMsS0FBcko7QUFFQTs7Ozs7Ozs7QUFNQUgsSUFBQUEsTUFBTSxDQUFDSyxvQkFBUCxHQUE4QkwsTUFBTSxDQUFDSyxvQkFBUCxJQUErQkwsTUFBTSxDQUFDTSwwQkFBdEMsSUFBb0UsWUFBdUM7QUFBRUMsTUFBQUEsWUFBWSxDQUFDLEtBQUtDLEVBQU4sQ0FBWjtBQUF1QixLQUFsSztBQUVEO0FBRUQ7Ozs7Ozs7Ozs7OzswQkFRTUMsRSxFQUFjQyxlLEVBQTBCO0FBQUE7O0FBRTVDLFVBQUksS0FBS0MsT0FBVCxFQUFrQjtBQUVsQixXQUFLQSxPQUFMLEdBQWUsSUFBZjtBQUVBLFdBQUtGLEVBQUwsR0FBVUEsRUFBVjs7QUFFQSxVQUFJQyxlQUFKLEVBQXFCO0FBRW5CLGFBQUtFLGVBQUwsR0FBdUIsSUFBdkI7QUFFQSxhQUFLQyxhQUFMO0FBRUQsT0FORCxNQU9LO0FBRUhiLFFBQUFBLE1BQU0sQ0FBQ0MscUJBQVAsQ0FBNkIsVUFBQ2EsSUFBRDtBQUFBLGlCQUFVLEtBQUksQ0FBQ0MsU0FBTCxDQUFlRCxJQUFmLENBQVY7QUFBQSxTQUE3QjtBQUVEO0FBRUY7QUFFRDs7Ozs7Ozs7Ozs7OEJBUVVFLFMsRUFBbUI7QUFBQTs7QUFFM0IsV0FBS0wsT0FBTCxHQUFlLElBQWY7QUFFQSxXQUFLRixFQUFMLENBQVFPLFNBQVI7QUFFQSxXQUFLUixFQUFMLEdBQVVSLE1BQU0sQ0FBQ0MscUJBQVAsQ0FBNkIsVUFBQ2EsSUFBRDtBQUFBLGVBQVUsTUFBSSxDQUFDQyxTQUFMLENBQWVELElBQWYsQ0FBVjtBQUFBLE9BQTdCLENBQVY7QUFFRDtBQUVEOzs7Ozs7Ozs7b0NBTWdCO0FBQUE7O0FBRWQsVUFBSUUsU0FBUyxHQUFHaEIsTUFBTSxDQUFDaUIsV0FBUCxDQUFtQkMsR0FBbkIsRUFBaEI7QUFFQSxXQUFLVCxFQUFMLENBQVFPLFNBQVI7QUFFQSxXQUFLUixFQUFMLEdBQVVSLE1BQU0sQ0FBQ0ksVUFBUCxDQUFrQjtBQUFBLGVBQU0sTUFBSSxDQUFDUyxhQUFMLEVBQU47QUFBQSxPQUFsQixFQUE4QyxPQUFPLEVBQXJELENBQVY7QUFFRDtBQUVEOzs7Ozs7Ozs4QkFLVTtBQUFBOztBQUVSLFVBQUksS0FBS0QsZUFBVCxFQUEwQlosTUFBTSxDQUFDTyxZQUFQLENBQW9CLEtBQUtDLEVBQXpCLEVBQTFCLEtBRUtSLE1BQU0sQ0FBQ0ssb0JBQVAsQ0FBNEIsS0FBS0csRUFBakM7QUFFTCxXQUFLQSxFQUFMLEdBQVUsQ0FBVjtBQUVBLFdBQUtHLE9BQUwsR0FBZSxLQUFmO0FBRUEsVUFBSSxLQUFLQyxlQUFULEVBQTBCLEtBQUtDLGFBQUwsR0FBMUIsS0FFS2IsTUFBTSxDQUFDQyxxQkFBUCxDQUE2QixVQUFDYSxJQUFEO0FBQUEsZUFBVSxNQUFJLENBQUNDLFNBQUwsQ0FBZUQsSUFBZixDQUFWO0FBQUEsT0FBN0I7QUFFTCxXQUFLSCxPQUFMLEdBQWUsSUFBZjtBQUVEO0FBRUQ7Ozs7Ozs7OzJCQUtPO0FBRUwsVUFBSSxLQUFLQyxlQUFULEVBQTBCWixNQUFNLENBQUNPLFlBQVAsQ0FBb0IsS0FBS0MsRUFBekIsRUFBMUIsS0FFS1IsTUFBTSxDQUFDSyxvQkFBUCxDQUE0QixLQUFLRyxFQUFqQztBQUVMLFdBQUtBLEVBQUwsR0FBVSxDQUFWO0FBRUEsV0FBS0csT0FBTCxHQUFlLEtBQWY7O0FBRUEsV0FBS0YsRUFBTCxHQUFVLFlBQU0sQ0FBRyxDQUFuQjs7QUFFQTtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgdGhlIHVzZSBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYW5kIHNldFRpbWVvdXQgdW5kZXIgb25lIG5hbWUgc28gdGhhdCBEZWx0YWZyYW1lIGl0c2VsZiBkb2VzIFxyXG4gKiBub3QgaGF2ZSB0byB3b3JyeSBhYm91dCB3aGljaCBvbmUgdG8gdXNlLlxyXG4gKiBcclxuICogVGhpcyBhbHNvIHVzZXMgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSBhbmQgY2FuY2VsQW5pbWF0aW9uRnJhbWUgdGhhdCBhcmUgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3NlciBcclxuICogYW5kIGZvcmNlcyBzZXRUaW1lb3V0IGlmIGRlc2lyZWQuXHJcbiAqIFxyXG4gKiBAc2luY2UgMC4xLjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3RBbmltYXRpb25GcmFtZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBpZCByZXR1cm5lZCBieSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgb3Igc2V0VGltZW91dCBzbyBcclxuICAgKiB0aGF0IHdlIGNhbiBjYW5jZWwgdGhlaXIgb3BlcmF0aW9uIHdoZW4gbmVlZGVkLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGlkOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBLZWVwcyB0cmFjayBvZiB3aGV0aGVyIHRoZSBsb29wIGlzIGFscmVhZHkgcnVubmluZyBvciBub3Qgc28gaXQncyBub3QgYWNjaWRlbnRseSBcclxuICAgKiByZXN0YXJ0ZWQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICovXHJcbiAgcnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgcnVuIG9uIGV2ZXJ5IHVwZGF0ZSBvZiB0aGUgbG9vcC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0ICgpPT57fVxyXG4gICAqL1xyXG4gIGZuOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgc2V0VEltZW91dCBpcyBiZWluZyB1c2VkIGluc3RlYWQgb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXNpbmdTZXRUaW1lb3V0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlIHRoZSB2ZXJzaW9uIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0aGF0IGlzIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIgYW5kIGlmIG5vbmUgYXJlIFxyXG4gICAgICogc3VwcG9ydGVkLCB1c2Ugc2V0VGltZW91dCBpbnN0ZWFkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge1JlcXVlc3RBbmltYXRpb25GcmFtZXxzZXRUaW1lb3V0fVxyXG4gICAgICovXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uIChmKSB7IHJldHVybiBzZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZSB0aGUgdmVyc2lvbiBvZiBjYW5jZWxBbmltYXRpb25GcmFtZSB0aGF0IGlzIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIgYW5kIGlmIG5vbmUgYXJlIHN1cHBvcnRlZCwgXHJcbiAgICAgKiB0aGVuIHNldFRpbWVvdXQgd2FzIHVzZWQgYW5kIHNvIHdlIHVzZSBjbGVhclRpbWVvdXQgaW5zdGVhZC5cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtjYW5jZWxBbmltYXRpb25GcmFtZX1cclxuICAgICAqL1xyXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbiAodGhpczogUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7IGNsZWFyVGltZW91dCh0aGlzLmlkKSB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgdGhlIG9wZXJhdGlvbiBvZiB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9yIHNldFRpbWVvdXQgbG9vcC5cclxuICAgKiBcclxuICAgKiBAc2luY2UgMC4xLjBcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIGV2ZXJ5IHVwZGF0ZSBvZiB0aGUgbG9vcC5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlU2V0VGltZW91dCBJbmRpY2F0ZXMgd2hldGhlciBzZXRUaW1lb3V0IHNob3VsZCBiZSB1c2VkIGV2ZW4gaWYgdGhlIHVzZXIncyBicm93c2VyIHN1cHBvcnRzIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgKi9cclxuICBzdGFydChmbjogRnVuY3Rpb24sIGZvcmNlU2V0VGltZW91dDogYm9vbGVhbikge1xyXG5cclxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZm4gPSBmbjtcclxuXHJcbiAgICBpZiAoZm9yY2VTZXRUaW1lb3V0KSB7XHJcblxyXG4gICAgICB0aGlzLnVzaW5nU2V0VGltZW91dCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLnVwZGF0ZVRpbWVvdXQoKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMudXBkYXRlUkFGKHRpbWUpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcmVjdXJzaXZlbHkgc28gdGhhdCB0aGUgbG9vcCBrZWVwcyBnb2luZyBhbmRcclxuICAgKiBhbHNvIHNlbmQgdGhlIHRpbWVzdGFtcHMgb3ZlciB0byBEZWx0YWZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBzaW5jZSAwLjEuMFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXAgVGhlIHRpbWVzdGFtcCBmcm9tIHRoZSBtb3N0IHJlY2VudCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcmVxdWVzdC5cclxuICAgKi9cclxuICB1cGRhdGVSQUYodGltZXN0YW1wOiBudW1iZXIpIHtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZm4odGltZXN0YW1wKTtcclxuXHJcbiAgICB0aGlzLmlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy51cGRhdGVSQUYodGltZSkpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGwgc2V0VGltZW91dCByZWN1cnNpdmVseSBzbyB0aGF0IHRoZSBsb29wIGtlZXBzIGdvaW5nIGFuZCBhbHNvIHNlbmRcclxuICAgKiB0aGUgdGltZXN0YW1wcyBvdmVyIHRvIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgdXBkYXRlVGltZW91dCgpIHtcclxuXHJcbiAgICBsZXQgdGltZXN0YW1wID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuZm4odGltZXN0YW1wKTtcclxuXHJcbiAgICB0aGlzLmlkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVUaW1lb3V0KCksIDEwMDAgLyA2MCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdGFydCB0aGUgcmVxdWVzdEFuaW1hdGlvbiBvciBzZXRUaW1lb3V0IGxvb3AuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgcmVzdGFydCgpIHtcclxuXHJcbiAgICBpZiAodGhpcy51c2luZ1NldFRpbWVvdXQpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5pZCk7XHJcblxyXG4gICAgZWxzZSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5pZCk7XHJcblxyXG4gICAgdGhpcy5pZCA9IDA7XHJcblxyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMudXNpbmdTZXRUaW1lb3V0KSB0aGlzLnVwZGF0ZVRpbWVvdXQoKTtcclxuXHJcbiAgICBlbHNlIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMudXBkYXRlUkFGKHRpbWUpKTtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgdGhlIGxvb3AgYnkgY2FsbGluZyBjYW5jZWxBbmltYXRpb25GcmFtZSBvciBjbGVhclRpbWVvdXQuXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuXHJcbiAgICBpZiAodGhpcy51c2luZ1NldFRpbWVvdXQpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5pZCk7XHJcblxyXG4gICAgZWxzZSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5pZCk7XHJcblxyXG4gICAgdGhpcy5pZCA9IDA7XHJcblxyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5mbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgICByZXR1cm47XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=