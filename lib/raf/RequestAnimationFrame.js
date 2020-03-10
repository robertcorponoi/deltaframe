'use strict';
/**
 * Abstract the use of requestAnimationFrame and setTimeout under one name so that Deltaframe itself does  not have to worry 
 * about which one to use.
 * 
 * This also uses the requestAnimationFrame and cancelAnimationFrame that are supported by the user's browser  and forces 
 * setTimeout if desired.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RequestAnimationFrame = /*#__PURE__*/function () {
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

exports["default"] = RequestAnimationFrame;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yYWYvUmVxdWVzdEFuaW1hdGlvbkZyYW1lLnRzIl0sIm5hbWVzIjpbIlJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImYiLCJzZXRUaW1lb3V0IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImNsZWFyVGltZW91dCIsImlkIiwiZm4iLCJmb3JjZVNldFRpbWVvdXQiLCJydW5uaW5nIiwidXNpbmdTZXRUaW1lb3V0IiwidXBkYXRlVGltZW91dCIsInRpbWUiLCJ1cGRhdGVSQUYiLCJ0aW1lc3RhbXAiLCJwZXJmb3JtYW5jZSIsIm5vdyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT3FCQSxxQjtBQUNuQjs7Ozs7O0FBT0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFTQSxtQ0FBYztBQUFBOztBQUFBLGdDQTdCRCxDQTZCQzs7QUFBQSxxQ0FwQkssS0FvQkw7O0FBQUEsZ0NBWEMsWUFBTSxDQUFHLENBV1Y7O0FBQUEsNkNBRnFCLEtBRXJCOztBQUNaOzs7OztBQUtBQyxJQUFBQSxNQUFNLENBQUNDLHFCQUFQLEdBQStCRCxNQUFNLENBQUNDLHFCQUFQLElBQWdDRCxNQUFNLENBQUNFLDJCQUF2QyxJQUFzRSxVQUFVQyxDQUFWLEVBQWE7QUFBRSxhQUFPQyxVQUFVLENBQUNELENBQUQsRUFBSSxPQUFPLEVBQVgsQ0FBakI7QUFBaUMsS0FBcko7QUFFQTs7Ozs7Ozs7QUFNQUgsSUFBQUEsTUFBTSxDQUFDSyxvQkFBUCxHQUE4QkwsTUFBTSxDQUFDSyxvQkFBUCxJQUErQkwsTUFBTSxDQUFDTSwwQkFBdEMsSUFBb0UsWUFBdUM7QUFBRUMsTUFBQUEsWUFBWSxDQUFDLEtBQUtDLEVBQU4sQ0FBWjtBQUF1QixLQUFsSztBQUNEO0FBRUQ7Ozs7Ozs7Ozs7MEJBTU1DLEUsRUFBY0MsZSxFQUEwQjtBQUFBOztBQUM1QyxVQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFFbEIsV0FBS0EsT0FBTCxHQUFlLElBQWY7QUFFQSxXQUFLRixFQUFMLEdBQVVBLEVBQVY7O0FBRUEsVUFBSUMsZUFBSixFQUFxQjtBQUNuQixhQUFLRSxlQUFMLEdBQXVCLElBQXZCO0FBRUEsYUFBS0MsYUFBTDtBQUNELE9BSkQsTUFLSztBQUNIYixRQUFBQSxNQUFNLENBQUNDLHFCQUFQLENBQTZCLFVBQUNhLElBQUQ7QUFBQSxpQkFBVSxLQUFJLENBQUNDLFNBQUwsQ0FBZUQsSUFBZixDQUFWO0FBQUEsU0FBN0I7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7OzhCQUtVRSxTLEVBQW1CO0FBQUE7O0FBQzNCLFdBQUtMLE9BQUwsR0FBZSxJQUFmO0FBRUEsV0FBS0YsRUFBTCxDQUFRTyxTQUFSO0FBRUEsV0FBS1IsRUFBTCxHQUFVUixNQUFNLENBQUNDLHFCQUFQLENBQTZCLFVBQUNhLElBQUQ7QUFBQSxlQUFVLE1BQUksQ0FBQ0MsU0FBTCxDQUFlRCxJQUFmLENBQVY7QUFBQSxPQUE3QixDQUFWO0FBQ0Q7QUFFRDs7Ozs7O29DQUdnQjtBQUFBOztBQUNkLFVBQUlFLFNBQVMsR0FBR2hCLE1BQU0sQ0FBQ2lCLFdBQVAsQ0FBbUJDLEdBQW5CLEVBQWhCO0FBRUEsV0FBS1QsRUFBTCxDQUFRTyxTQUFSO0FBRUEsV0FBS1IsRUFBTCxHQUFVUixNQUFNLENBQUNJLFVBQVAsQ0FBa0I7QUFBQSxlQUFNLE1BQUksQ0FBQ1MsYUFBTCxFQUFOO0FBQUEsT0FBbEIsRUFBOEMsT0FBTyxFQUFyRCxDQUFWO0FBQ0Q7QUFFRDs7Ozs7OzhCQUdVO0FBQUE7O0FBQ1IsVUFBSSxLQUFLRCxlQUFULEVBQTBCWixNQUFNLENBQUNPLFlBQVAsQ0FBb0IsS0FBS0MsRUFBekIsRUFBMUIsS0FDS1IsTUFBTSxDQUFDSyxvQkFBUCxDQUE0QixLQUFLRyxFQUFqQztBQUVMLFdBQUtBLEVBQUwsR0FBVSxDQUFWO0FBRUEsV0FBS0csT0FBTCxHQUFlLEtBQWY7QUFFQSxVQUFJLEtBQUtDLGVBQVQsRUFBMEIsS0FBS0MsYUFBTCxHQUExQixLQUNLYixNQUFNLENBQUNDLHFCQUFQLENBQTZCLFVBQUNhLElBQUQ7QUFBQSxlQUFVLE1BQUksQ0FBQ0MsU0FBTCxDQUFlRCxJQUFmLENBQVY7QUFBQSxPQUE3QjtBQUVMLFdBQUtILE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUFFRDs7Ozs7OzJCQUdPO0FBQ0wsVUFBSSxLQUFLQyxlQUFULEVBQTBCWixNQUFNLENBQUNPLFlBQVAsQ0FBb0IsS0FBS0MsRUFBekIsRUFBMUIsS0FDS1IsTUFBTSxDQUFDSyxvQkFBUCxDQUE0QixLQUFLRyxFQUFqQztBQUVMLFdBQUtBLEVBQUwsR0FBVSxDQUFWO0FBRUEsV0FBS0csT0FBTCxHQUFlLEtBQWY7O0FBRUEsV0FBS0YsRUFBTCxHQUFVLFlBQU0sQ0FBRyxDQUFuQjs7QUFFQTtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogQWJzdHJhY3QgdGhlIHVzZSBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYW5kIHNldFRpbWVvdXQgdW5kZXIgb25lIG5hbWUgc28gdGhhdCBEZWx0YWZyYW1lIGl0c2VsZiBkb2VzICBub3QgaGF2ZSB0byB3b3JyeSBcclxuICogYWJvdXQgd2hpY2ggb25lIHRvIHVzZS5cclxuICogXHJcbiAqIFRoaXMgYWxzbyB1c2VzIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYW5kIGNhbmNlbEFuaW1hdGlvbkZyYW1lIHRoYXQgYXJlIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIgIGFuZCBmb3JjZXMgXHJcbiAqIHNldFRpbWVvdXQgaWYgZGVzaXJlZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3RBbmltYXRpb25GcmFtZSB7XHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGlkIHJldHVybmVkIGJ5IHJlcXVlc3RBbmltYXRpb25GcmFtZSBvciBzZXRUaW1lb3V0IHNvICB0aGF0IHdlIGNhbiBjYW5jZWwgdGhlaXIgb3BlcmF0aW9uIHdoZW4gbmVlZGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGlkOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBLZWVwcyB0cmFjayBvZiB3aGV0aGVyIHRoZSBsb29wIGlzIGFscmVhZHkgcnVubmluZyBvciBub3Qgc28gaXQncyBub3QgYWNjaWRlbnRseSByZXN0YXJ0ZWQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICovXHJcbiAgcnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgcnVuIG9uIGV2ZXJ5IHVwZGF0ZSBvZiB0aGUgbG9vcC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0ICgpPT57fVxyXG4gICAqL1xyXG4gIGZuOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgc2V0VEltZW91dCBpcyBiZWluZyB1c2VkIGluc3RlYWQgb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXNpbmdTZXRUaW1lb3V0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdGhlIHZlcnNpb24gb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRoYXQgaXMgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3NlciBhbmQgaWYgbm9uZSBhcmUgIHN1cHBvcnRlZCwgdXNlIHNldFRpbWVvdXQgaW5zdGVhZC5cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHtSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8c2V0VGltZW91dH1cclxuICAgICAqL1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbiAoZikgeyByZXR1cm4gc2V0VGltZW91dChmLCAxMDAwIC8gNjApIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdGhlIHZlcnNpb24gb2YgY2FuY2VsQW5pbWF0aW9uRnJhbWUgdGhhdCBpcyBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyIGFuZCBpZiBub25lIGFyZSBzdXBwb3J0ZWQsICB0aGVuIHNldFRpbWVvdXQgd2FzIHVzZWQgXHJcbiAgICAgKiBhbmQgc28gd2UgdXNlIGNsZWFyVGltZW91dCBpbnN0ZWFkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge2NhbmNlbEFuaW1hdGlvbkZyYW1lfVxyXG4gICAgICovXHJcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uICh0aGlzOiBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHsgY2xlYXJUaW1lb3V0KHRoaXMuaWQpIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHRoZSBvcGVyYXRpb24gb2YgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSBvciBzZXRUaW1lb3V0IGxvb3AuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJ1biBldmVyeSB1cGRhdGUgb2YgdGhlIGxvb3AuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZVNldFRpbWVvdXQgSW5kaWNhdGVzIHdoZXRoZXIgc2V0VGltZW91dCBzaG91bGQgYmUgdXNlZCBldmVuIGlmIHRoZSB1c2VyJ3MgYnJvd3NlciBzdXBwb3J0cyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICovXHJcbiAgc3RhcnQoZm46IEZ1bmN0aW9uLCBmb3JjZVNldFRpbWVvdXQ6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZm4gPSBmbjtcclxuXHJcbiAgICBpZiAoZm9yY2VTZXRUaW1lb3V0KSB7XHJcbiAgICAgIHRoaXMudXNpbmdTZXRUaW1lb3V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMudXBkYXRlVGltZW91dCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMudXBkYXRlUkFGKHRpbWUpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHJlY3Vyc2l2ZWx5IHNvIHRoYXQgdGhlIGxvb3Aga2VlcHMgZ29pbmcgYW5kIGFsc28gc2VuZCB0aGUgdGltZXN0YW1wcyBvdmVyIHRvIERlbHRhZnJhbWUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIGZyb20gdGhlIG1vc3QgcmVjZW50IHJlcXVlc3RBbmltYXRpb25GcmFtZSByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHVwZGF0ZVJBRih0aW1lc3RhbXA6IG51bWJlcikge1xyXG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmZuKHRpbWVzdGFtcCk7XHJcblxyXG4gICAgdGhpcy5pZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMudXBkYXRlUkFGKHRpbWUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGwgc2V0VGltZW91dCByZWN1cnNpdmVseSBzbyB0aGF0IHRoZSBsb29wIGtlZXBzIGdvaW5nIGFuZCBhbHNvIHNlbmQgdGhlIHRpbWVzdGFtcHMgb3ZlciB0byBEZWx0YWZyYW1lLlxyXG4gICAqL1xyXG4gIHVwZGF0ZVRpbWVvdXQoKSB7XHJcbiAgICBsZXQgdGltZXN0YW1wID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIHRoaXMuZm4odGltZXN0YW1wKTtcclxuXHJcbiAgICB0aGlzLmlkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVUaW1lb3V0KCksIDEwMDAgLyA2MCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0YXJ0IHRoZSByZXF1ZXN0QW5pbWF0aW9uIG9yIHNldFRpbWVvdXQgbG9vcC5cclxuICAgKi9cclxuICByZXN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMudXNpbmdTZXRUaW1lb3V0KSB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuaWQpO1xyXG4gICAgZWxzZSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5pZCk7XHJcblxyXG4gICAgdGhpcy5pZCA9IDA7XHJcblxyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMudXNpbmdTZXRUaW1lb3V0KSB0aGlzLnVwZGF0ZVRpbWVvdXQoKTtcclxuICAgIGVsc2Ugd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy51cGRhdGVSQUYodGltZSkpO1xyXG5cclxuICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIHRoZSBsb29wIGJ5IGNhbGxpbmcgY2FuY2VsQW5pbWF0aW9uRnJhbWUgb3IgY2xlYXJUaW1lb3V0LlxyXG4gICAqL1xyXG4gIHN0b3AoKSB7XHJcbiAgICBpZiAodGhpcy51c2luZ1NldFRpbWVvdXQpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5pZCk7XHJcbiAgICBlbHNlIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmlkKTtcclxuXHJcbiAgICB0aGlzLmlkID0gMDtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmZuID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcbn0iXX0=