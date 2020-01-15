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

var RequestAnimationFrame =
/*#__PURE__*/
function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yYWYvUmVxdWVzdEFuaW1hdGlvbkZyYW1lLnRzIl0sIm5hbWVzIjpbIlJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImYiLCJzZXRUaW1lb3V0IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImNsZWFyVGltZW91dCIsImlkIiwiZm4iLCJmb3JjZVNldFRpbWVvdXQiLCJydW5uaW5nIiwidXNpbmdTZXRUaW1lb3V0IiwidXBkYXRlVGltZW91dCIsInRpbWUiLCJ1cGRhdGVSQUYiLCJ0aW1lc3RhbXAiLCJwZXJmb3JtYW5jZSIsIm5vdyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT3FCQSxxQjs7O0FBQ25COzs7Ozs7QUFPQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQVNBLG1DQUFjO0FBQUE7O0FBQUEsZ0NBN0JELENBNkJDOztBQUFBLHFDQXBCSyxLQW9CTDs7QUFBQSxnQ0FYQyxZQUFNLENBQUcsQ0FXVjs7QUFBQSw2Q0FGcUIsS0FFckI7O0FBQ1o7Ozs7O0FBS0FDLElBQUFBLE1BQU0sQ0FBQ0MscUJBQVAsR0FBK0JELE1BQU0sQ0FBQ0MscUJBQVAsSUFBZ0NELE1BQU0sQ0FBQ0UsMkJBQXZDLElBQXNFLFVBQVVDLENBQVYsRUFBYTtBQUFFLGFBQU9DLFVBQVUsQ0FBQ0QsQ0FBRCxFQUFJLE9BQU8sRUFBWCxDQUFqQjtBQUFpQyxLQUFySjtBQUVBOzs7Ozs7OztBQU1BSCxJQUFBQSxNQUFNLENBQUNLLG9CQUFQLEdBQThCTCxNQUFNLENBQUNLLG9CQUFQLElBQStCTCxNQUFNLENBQUNNLDBCQUF0QyxJQUFvRSxZQUF1QztBQUFFQyxNQUFBQSxZQUFZLENBQUMsS0FBS0MsRUFBTixDQUFaO0FBQXVCLEtBQWxLO0FBQ0Q7QUFFRDs7Ozs7Ozs7OzswQkFNTUMsRSxFQUFjQyxlLEVBQTBCO0FBQUE7O0FBQzVDLFVBQUksS0FBS0MsT0FBVCxFQUFrQjtBQUVsQixXQUFLQSxPQUFMLEdBQWUsSUFBZjtBQUVBLFdBQUtGLEVBQUwsR0FBVUEsRUFBVjs7QUFFQSxVQUFJQyxlQUFKLEVBQXFCO0FBQ25CLGFBQUtFLGVBQUwsR0FBdUIsSUFBdkI7QUFFQSxhQUFLQyxhQUFMO0FBQ0QsT0FKRCxNQUtLO0FBQ0hiLFFBQUFBLE1BQU0sQ0FBQ0MscUJBQVAsQ0FBNkIsVUFBQ2EsSUFBRDtBQUFBLGlCQUFVLEtBQUksQ0FBQ0MsU0FBTCxDQUFlRCxJQUFmLENBQVY7QUFBQSxTQUE3QjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7Ozs7OEJBS1VFLFMsRUFBbUI7QUFBQTs7QUFDM0IsV0FBS0wsT0FBTCxHQUFlLElBQWY7QUFFQSxXQUFLRixFQUFMLENBQVFPLFNBQVI7QUFFQSxXQUFLUixFQUFMLEdBQVVSLE1BQU0sQ0FBQ0MscUJBQVAsQ0FBNkIsVUFBQ2EsSUFBRDtBQUFBLGVBQVUsTUFBSSxDQUFDQyxTQUFMLENBQWVELElBQWYsQ0FBVjtBQUFBLE9BQTdCLENBQVY7QUFDRDtBQUVEOzs7Ozs7b0NBR2dCO0FBQUE7O0FBQ2QsVUFBSUUsU0FBUyxHQUFHaEIsTUFBTSxDQUFDaUIsV0FBUCxDQUFtQkMsR0FBbkIsRUFBaEI7QUFFQSxXQUFLVCxFQUFMLENBQVFPLFNBQVI7QUFFQSxXQUFLUixFQUFMLEdBQVVSLE1BQU0sQ0FBQ0ksVUFBUCxDQUFrQjtBQUFBLGVBQU0sTUFBSSxDQUFDUyxhQUFMLEVBQU47QUFBQSxPQUFsQixFQUE4QyxPQUFPLEVBQXJELENBQVY7QUFDRDtBQUVEOzs7Ozs7OEJBR1U7QUFBQTs7QUFDUixVQUFJLEtBQUtELGVBQVQsRUFBMEJaLE1BQU0sQ0FBQ08sWUFBUCxDQUFvQixLQUFLQyxFQUF6QixFQUExQixLQUNLUixNQUFNLENBQUNLLG9CQUFQLENBQTRCLEtBQUtHLEVBQWpDO0FBRUwsV0FBS0EsRUFBTCxHQUFVLENBQVY7QUFFQSxXQUFLRyxPQUFMLEdBQWUsS0FBZjtBQUVBLFVBQUksS0FBS0MsZUFBVCxFQUEwQixLQUFLQyxhQUFMLEdBQTFCLEtBQ0tiLE1BQU0sQ0FBQ0MscUJBQVAsQ0FBNkIsVUFBQ2EsSUFBRDtBQUFBLGVBQVUsTUFBSSxDQUFDQyxTQUFMLENBQWVELElBQWYsQ0FBVjtBQUFBLE9BQTdCO0FBRUwsV0FBS0gsT0FBTCxHQUFlLElBQWY7QUFDRDtBQUVEOzs7Ozs7MkJBR087QUFDTCxVQUFJLEtBQUtDLGVBQVQsRUFBMEJaLE1BQU0sQ0FBQ08sWUFBUCxDQUFvQixLQUFLQyxFQUF6QixFQUExQixLQUNLUixNQUFNLENBQUNLLG9CQUFQLENBQTRCLEtBQUtHLEVBQWpDO0FBRUwsV0FBS0EsRUFBTCxHQUFVLENBQVY7QUFFQSxXQUFLRyxPQUFMLEdBQWUsS0FBZjs7QUFFQSxXQUFLRixFQUFMLEdBQVUsWUFBTSxDQUFHLENBQW5COztBQUVBO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBBYnN0cmFjdCB0aGUgdXNlIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSBhbmQgc2V0VGltZW91dCB1bmRlciBvbmUgbmFtZSBzbyB0aGF0IERlbHRhZnJhbWUgaXRzZWxmIGRvZXMgIG5vdCBoYXZlIHRvIHdvcnJ5IFxyXG4gKiBhYm91dCB3aGljaCBvbmUgdG8gdXNlLlxyXG4gKiBcclxuICogVGhpcyBhbHNvIHVzZXMgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSBhbmQgY2FuY2VsQW5pbWF0aW9uRnJhbWUgdGhhdCBhcmUgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3NlciAgYW5kIGZvcmNlcyBcclxuICogc2V0VGltZW91dCBpZiBkZXNpcmVkLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHtcclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgaWQgcmV0dXJuZWQgYnkgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9yIHNldFRpbWVvdXQgc28gIHRoYXQgd2UgY2FuIGNhbmNlbCB0aGVpciBvcGVyYXRpb24gd2hlbiBuZWVkZWQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgaWQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgdGhlIGxvb3AgaXMgYWxyZWFkeSBydW5uaW5nIG9yIG5vdCBzbyBpdCdzIG5vdCBhY2NpZGVudGx5IHJlc3RhcnRlZC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgKi9cclxuICBydW5uaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBydW4gb24gZXZlcnkgdXBkYXRlIG9mIHRoZSBsb29wLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgKCk9Pnt9XHJcbiAgICovXHJcbiAgZm46IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBzZXRUSW1lb3V0IGlzIGJlaW5nIHVzZWQgaW5zdGVhZCBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1c2luZ1NldFRpbWVvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKipcclxuICAgICAqIFVzZSB0aGUgdmVyc2lvbiBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdGhhdCBpcyBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyIGFuZCBpZiBub25lIGFyZSAgc3VwcG9ydGVkLCB1c2Ugc2V0VGltZW91dCBpbnN0ZWFkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge1JlcXVlc3RBbmltYXRpb25GcmFtZXxzZXRUaW1lb3V0fVxyXG4gICAgICovXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uIChmKSB7IHJldHVybiBzZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVzZSB0aGUgdmVyc2lvbiBvZiBjYW5jZWxBbmltYXRpb25GcmFtZSB0aGF0IGlzIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIgYW5kIGlmIG5vbmUgYXJlIHN1cHBvcnRlZCwgIHRoZW4gc2V0VGltZW91dCB3YXMgdXNlZCBcclxuICAgICAqIGFuZCBzbyB3ZSB1c2UgY2xlYXJUaW1lb3V0IGluc3RlYWQuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7Y2FuY2VsQW5pbWF0aW9uRnJhbWV9XHJcbiAgICAgKi9cclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24gKHRoaXM6IFJlcXVlc3RBbmltYXRpb25GcmFtZSkgeyBjbGVhclRpbWVvdXQodGhpcy5pZCkgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgdGhlIG9wZXJhdGlvbiBvZiB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9yIHNldFRpbWVvdXQgbG9vcC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIGV2ZXJ5IHVwZGF0ZSBvZiB0aGUgbG9vcC5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlU2V0VGltZW91dCBJbmRpY2F0ZXMgd2hldGhlciBzZXRUaW1lb3V0IHNob3VsZCBiZSB1c2VkIGV2ZW4gaWYgdGhlIHVzZXIncyBicm93c2VyIHN1cHBvcnRzIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgKi9cclxuICBzdGFydChmbjogRnVuY3Rpb24sIGZvcmNlU2V0VGltZW91dDogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMucnVubmluZykgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5mbiA9IGZuO1xyXG5cclxuICAgIGlmIChmb3JjZVNldFRpbWVvdXQpIHtcclxuICAgICAgdGhpcy51c2luZ1NldFRpbWVvdXQgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy51cGRhdGVUaW1lb3V0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy51cGRhdGVSQUYodGltZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcmVjdXJzaXZlbHkgc28gdGhhdCB0aGUgbG9vcCBrZWVwcyBnb2luZyBhbmQgYWxzbyBzZW5kIHRoZSB0aW1lc3RhbXBzIG92ZXIgdG8gRGVsdGFmcmFtZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZXN0YW1wIFRoZSB0aW1lc3RhbXAgZnJvbSB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHJlcXVlc3QuXHJcbiAgICovXHJcbiAgdXBkYXRlUkFGKHRpbWVzdGFtcDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZm4odGltZXN0YW1wKTtcclxuXHJcbiAgICB0aGlzLmlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy51cGRhdGVSQUYodGltZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbCBzZXRUaW1lb3V0IHJlY3Vyc2l2ZWx5IHNvIHRoYXQgdGhlIGxvb3Aga2VlcHMgZ29pbmcgYW5kIGFsc28gc2VuZCB0aGUgdGltZXN0YW1wcyBvdmVyIHRvIERlbHRhZnJhbWUuXHJcbiAgICovXHJcbiAgdXBkYXRlVGltZW91dCgpIHtcclxuICAgIGxldCB0aW1lc3RhbXAgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgdGhpcy5mbih0aW1lc3RhbXApO1xyXG5cclxuICAgIHRoaXMuaWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRpbWVvdXQoKSwgMTAwMCAvIDYwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3RhcnQgdGhlIHJlcXVlc3RBbmltYXRpb24gb3Igc2V0VGltZW91dCBsb29wLlxyXG4gICAqL1xyXG4gIHJlc3RhcnQoKSB7XHJcbiAgICBpZiAodGhpcy51c2luZ1NldFRpbWVvdXQpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5pZCk7XHJcbiAgICBlbHNlIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmlkKTtcclxuXHJcbiAgICB0aGlzLmlkID0gMDtcclxuXHJcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy51c2luZ1NldFRpbWVvdXQpIHRoaXMudXBkYXRlVGltZW91dCgpO1xyXG4gICAgZWxzZSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lKSA9PiB0aGlzLnVwZGF0ZVJBRih0aW1lKSk7XHJcblxyXG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgdGhlIGxvb3AgYnkgY2FsbGluZyBjYW5jZWxBbmltYXRpb25GcmFtZSBvciBjbGVhclRpbWVvdXQuXHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuICAgIGlmICh0aGlzLnVzaW5nU2V0VGltZW91dCkgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmlkKTtcclxuICAgIGVsc2Ugd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuaWQpO1xyXG5cclxuICAgIHRoaXMuaWQgPSAwO1xyXG5cclxuICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZm4gPSAoKSA9PiB7IH07XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufSJdfQ==