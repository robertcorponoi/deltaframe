'use strict';
/**
 * Defines the options available for an instance of Deltaframe along with their default
 * values if any exist.
 * 
 * @since 1.0.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/*#__PURE__*/
function () {
  /**
   * The lowest the fps can drop to before the Deltaframe restarts to attempt to fix the
    * problem.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default 15
   */

  /**
   * The fps that the game loop should aim to  achieve.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default 60
   */

  /**
   * When the fps goes below the minFps Deltaframe will restart. This indicates how many times it will 
    * restart before stopping permanently.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Specify the amount of milliseconds that Deltaframe should run for.
   * 
   * @since 1.0.0
   * 
   * @property {number}
    * 
    * @default Infinity
   */

  /**
   * Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
   * 
   * @since 1.0.0
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
   * @since 1.0.0
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
     * @since 1.0.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJJbmZpbml0eSIsIk9iamVjdCIsImFzc2lnbiIsIk1hdGgiLCJmbG9vciIsIm1pbkZwcyIsInRhcmdldEZwcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNcUJBLE87OztBQUVwQjs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7OztBQVlBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7O0FBR0MscUJBQWtDO0FBQUEsUUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsb0NBbERqQixFQWtEaUI7O0FBQUEsdUNBdkNkLEVBdUNjOztBQUFBLGdEQTNCTEMsUUEyQks7O0FBQUEscUNBaEJoQkEsUUFnQmdCOztBQUFBLDZDQUxQLEtBS087O0FBRWhDQyxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CSCxPQUFwQjtBQUVEO0FBRUY7Ozs7Ozs7Ozs7O3dCQU8wQjtBQUV2QixhQUFPSSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxPQUFPLEtBQUtDLE1BQXZCLENBQVA7QUFFRDtBQUVGOzs7Ozs7Ozs7O3dCQU82QjtBQUUxQixhQUFPRixJQUFJLENBQUNDLEtBQUwsQ0FBVyxPQUFPLEtBQUtFLFNBQXZCLENBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIG9wdGlvbnMgYXZhaWxhYmxlIGZvciBhbiBpbnN0YW5jZSBvZiBEZWx0YWZyYW1lIGFsb25nIHdpdGggdGhlaXIgZGVmYXVsdFxyXG4gKiB2YWx1ZXMgaWYgYW55IGV4aXN0LlxyXG4gKiBcclxuICogQHNpbmNlIDEuMC4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGxvd2VzdCB0aGUgZnBzIGNhbiBkcm9wIHRvIGJlZm9yZSB0aGUgRGVsdGFmcmFtZSByZXN0YXJ0cyB0byBhdHRlbXB0IHRvIGZpeCB0aGVcclxuICAgKiBwcm9ibGVtLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAxLjAuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDE1XHJcblx0ICovXHJcbiAgbWluRnBzOiBudW1iZXIgPSAxNTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGZwcyB0aGF0IHRoZSBnYW1lIGxvb3Agc2hvdWxkIGFpbSB0byAgYWNoaWV2ZS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCA2MFxyXG5cdCAqL1xyXG4gIHRhcmdldEZwczogbnVtYmVyID0gNjA7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gdGhlIGZwcyBnb2VzIGJlbG93IHRoZSBtaW5GcHMgRGVsdGFmcmFtZSB3aWxsIHJlc3RhcnQuIFRoaXMgaW5kaWNhdGVzIGhvdyBtYW55IHRpbWVzIGl0IHdpbGwgXHJcbiAgICogcmVzdGFydCBiZWZvcmUgc3RvcHBpbmcgcGVybWFuZW50bHkuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDEuMC4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgSW5maW5pdHlcclxuXHQgKi9cclxuICBtYXhSZXN0YXJ0QXR0ZW1wdHM6IG51bWJlciA9IEluZmluaXR5O1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZ5IHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRoYXQgRGVsdGFmcmFtZSBzaG91bGQgcnVuIGZvci5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCBJbmZpbml0eVxyXG5cdCAqL1xyXG4gIHJ1blRpbWU6IG51bWJlciA9IEluZmluaXR5O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBzZXRUaW1lb3V0IHNob3VsZCBiZSB1c2VkIGV2ZW4gaWYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGlzIHN1cHBvcnRlZCBieSB0aGUgdXNlcidzIGJyb3dzZXIuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDEuMC4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgZmFsc2VcclxuXHQgKi9cclxuICBmb3JjZVNldFRpbWVvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0LyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIGluaXRpYWxpemF0aW9uIG9wdGlvbnMgcGFzc2VkIHRvIERlbHRhZnJhbWUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybiB0aGUgbWluRnBzIGFzIGEgZGVjaW1hbCByZXByZXNlbnRpbmcgdGhlIGFtb3VudCBvZiB0aW1lIGJlZm9yZSBhIGZyYW1lIHNob3VsZCBvY2N1ci5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG4gIGdldCBtaW5GcHNDYWxjKCk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoMTAwMCAvIHRoaXMubWluRnBzKTtcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm4gdGhlIHRhcmdldEZwcyBhcyBhIGRlY2ltYWwgcmVwcmVzZW50aW5nIHRoZSBhbW91bnQgb2YgdGltZSBiZWZvcmUgYSBmcmFtZSBzaG91bGQgb2NjdXIuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDEuMC4wXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKi9cclxuICBnZXQgdGFyZ2V0RnBzQ2FsYygpOiBudW1iZXIge1xyXG5cclxuICAgIHJldHVybiBNYXRoLmZsb29yKDEwMDAgLyB0aGlzLnRhcmdldEZwcyk7XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=