'use strict';
/**
 * Defines the options available for an instance of Deltaframe along with their default values if any exist.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options = /*#__PURE__*/function () {
  /**
   * The lowest the fps can drop to before the Deltaframe restarts to attempt to fix the problem.
   * 
   * @property {number}
    * 
    * @default 15
   */

  /**
   * The fps that the game loop should aim to  achieve.
   * 
   * @property {number}
    * 
    * @default 60
   */

  /**
   * When the fps goes below the minFps Deltaframe will restart. This indicates how many times it will  restart before stopping permanently.
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Specify the amount of milliseconds that Deltaframe should run for.
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
   * 
   * @property {number}
    * 
    * @default false
   */

  /**
    * @param {Object} options The initialization options passed to Deltaframe.
    */
  function Options() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Options);

    _defineProperty(this, "minFps", 15);

    _defineProperty(this, "targetFps", 60);

    _defineProperty(this, "maxRestartAttempts", Infinity);

    _defineProperty(this, "runTime", Infinity);

    _defineProperty(this, "forceSetTimeout", false);

    Object.assign(this, options);
  }
  /**
   * Return the minFps as a decimal representing the amount of time before a frame should occur.
   * 
   * @returns {number}
   */


  _createClass(Options, [{
    key: "minFpsCalc",
    get: function get() {
      return Math.floor(1000 / this.minFps);
    }
    /**
     * Return the targetFps as a decimal representing the amount of time before a frame should occur.
     * 
     * @returns {number}
     */

  }, {
    key: "targetFpsCalc",
    get: function get() {
      return Math.floor(1000 / this.targetFps);
    }
  }]);

  return Options;
}();

exports["default"] = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJJbmZpbml0eSIsIk9iamVjdCIsImFzc2lnbiIsIk1hdGgiLCJmbG9vciIsIm1pbkZwcyIsInRhcmdldEZwcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87QUFFcEI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7OztBQUdDLHFCQUFrQztBQUFBLFFBQXRCQyxPQUFzQix1RUFBSixFQUFJOztBQUFBOztBQUFBLG9DQXpDakIsRUF5Q2lCOztBQUFBLHVDQWhDZCxFQWdDYzs7QUFBQSxnREF2QkxDLFFBdUJLOztBQUFBLHFDQWRoQkEsUUFjZ0I7O0FBQUEsNkNBTFAsS0FLTzs7QUFDaENDLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JILE9BQXBCO0FBQ0Q7QUFFRjs7Ozs7Ozs7O3dCQUswQjtBQUFFLGFBQU9JLElBQUksQ0FBQ0MsS0FBTCxDQUFXLE9BQU8sS0FBS0MsTUFBdkIsQ0FBUDtBQUF3QztBQUVwRTs7Ozs7Ozs7d0JBSzZCO0FBQUUsYUFBT0YsSUFBSSxDQUFDQyxLQUFMLENBQVcsT0FBTyxLQUFLRSxTQUF2QixDQUFQO0FBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgb3B0aW9ucyBhdmFpbGFibGUgZm9yIGFuIGluc3RhbmNlIG9mIERlbHRhZnJhbWUgYWxvbmcgd2l0aCB0aGVpciBkZWZhdWx0IHZhbHVlcyBpZiBhbnkgZXhpc3QuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGxvd2VzdCB0aGUgZnBzIGNhbiBkcm9wIHRvIGJlZm9yZSB0aGUgRGVsdGFmcmFtZSByZXN0YXJ0cyB0byBhdHRlbXB0IHRvIGZpeCB0aGUgcHJvYmxlbS5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAxNVxyXG5cdCAqL1xyXG4gIG1pbkZwczogbnVtYmVyID0gMTU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBmcHMgdGhhdCB0aGUgZ2FtZSBsb29wIHNob3VsZCBhaW0gdG8gIGFjaGlldmUuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgNjBcclxuXHQgKi9cclxuICB0YXJnZXRGcHM6IG51bWJlciA9IDYwO1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIHRoZSBmcHMgZ29lcyBiZWxvdyB0aGUgbWluRnBzIERlbHRhZnJhbWUgd2lsbCByZXN0YXJ0LiBUaGlzIGluZGljYXRlcyBob3cgbWFueSB0aW1lcyBpdCB3aWxsICByZXN0YXJ0IGJlZm9yZSBzdG9wcGluZyBwZXJtYW5lbnRseS5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCBJbmZpbml0eVxyXG5cdCAqL1xyXG4gIG1heFJlc3RhcnRBdHRlbXB0czogbnVtYmVyID0gSW5maW5pdHk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZnkgdGhlIGFtb3VudCBvZiBtaWxsaXNlY29uZHMgdGhhdCBEZWx0YWZyYW1lIHNob3VsZCBydW4gZm9yLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IEluZmluaXR5XHJcblx0ICovXHJcbiAgcnVuVGltZTogbnVtYmVyID0gSW5maW5pdHk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHNldFRpbWVvdXQgc2hvdWxkIGJlIHVzZWQgZXZlbiBpZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgaXMgc3VwcG9ydGVkIGJ5IHRoZSB1c2VyJ3MgYnJvd3Nlci5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCBmYWxzZVxyXG5cdCAqL1xyXG4gIGZvcmNlU2V0VGltZW91dDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHQvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgaW5pdGlhbGl6YXRpb24gb3B0aW9ucyBwYXNzZWQgdG8gRGVsdGFmcmFtZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QgPSB7fSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybiB0aGUgbWluRnBzIGFzIGEgZGVjaW1hbCByZXByZXNlbnRpbmcgdGhlIGFtb3VudCBvZiB0aW1lIGJlZm9yZSBhIGZyYW1lIHNob3VsZCBvY2N1ci5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG4gIGdldCBtaW5GcHNDYWxjKCk6IG51bWJlciB7IHJldHVybiBNYXRoLmZsb29yKDEwMDAgLyB0aGlzLm1pbkZwcyk7IH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJuIHRoZSB0YXJnZXRGcHMgYXMgYSBkZWNpbWFsIHJlcHJlc2VudGluZyB0aGUgYW1vdW50IG9mIHRpbWUgYmVmb3JlIGEgZnJhbWUgc2hvdWxkIG9jY3VyLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcbiAgZ2V0IHRhcmdldEZwc0NhbGMoKTogbnVtYmVyIHsgcmV0dXJuIE1hdGguZmxvb3IoMTAwMCAvIHRoaXMudGFyZ2V0RnBzKTsgfVxyXG59Il19