'use strict';
/**
 * The Options Object is used to define a set of options that will merge 
 * with the user provided options and fill in default values for options 
 * not specified.
 * 
 * @since 1.0.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/*#__PURE__*/
function () {
  /**
   * The lowest the game loop's frames per second can drop to 
   * before the loop panics.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * The frames per second that the game loop should aim to 
   * achieve.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * When the game loop goes below the minFps it will restart. 
   * This indicates how many times it will restart before stopping 
   * permanently.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * Specify the amount of milliseconds that Deltaframe should run 
   * for.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

  /**
   * Indicates whether setTimeout should be used even if requestAnimationFrame
   * is supported by the user's browser.
   * 
   * @since 1.0.0
   * 
   * @property {number}
   * @readonly
   */

  /**
    * @param {Object} [options]
    * @param {number} [options.minFps=15] The lowest the game loop's frames per second can drop to before the loop panics.
    * @param {number} [options.targetFps=60] The frames per second that the game loop should aim to achieve.
    * @param {number} [options.maxRestartAttempts=Infinity] When the game loop goes below the minFps it will restart. This indicates how many times it will restart before stopping permanently.
   * @param {number} [options.runTime=Infinity] Specify the amount of milliseconds that Deltaframe should run for.
    * @param {boolean} [options.forceSetTimeout=false] Indicates whether setTimeout should be used even if requestAnimationFrame is supported by the user's browser.
    */
  function Options(options) {
    _classCallCheck(this, Options);

    _defineProperty(this, "minFps", void 0);

    _defineProperty(this, "targetFps", void 0);

    _defineProperty(this, "maxRestartAttempts", void 0);

    _defineProperty(this, "runTime", void 0);

    _defineProperty(this, "forceSetTimeout", void 0);

    this.minFps = 15;
    this.targetFps = 60;
    this.maxRestartAttempts = Infinity;
    this.runTime = Infinity;
    this.forceSetTimeout = false;
    /**
     * Replace the default values with the user specified values, if they exist.
     * 
     * @since 1.0.0
     */

    Object.assign(this, this, options);
  }
  /**
   * Return the minFps as a decimal representing the amount of
   * time before a frame should occur.
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
     * Return the targetFps as a decimal representing the amount of
     * time before a frame should occur.
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

exports.default = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJtaW5GcHMiLCJ0YXJnZXRGcHMiLCJtYXhSZXN0YXJ0QXR0ZW1wdHMiLCJJbmZpbml0eSIsInJ1blRpbWUiLCJmb3JjZVNldFRpbWVvdXQiLCJPYmplY3QiLCJhc3NpZ24iLCJNYXRoIiwiZmxvb3IiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU9xQkEsTzs7O0FBRXBCOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0FBUUEsbUJBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFFNUIsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFFQSxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBRUEsU0FBS0Msa0JBQUwsR0FBMEJDLFFBQTFCO0FBRUEsU0FBS0MsT0FBTCxHQUFlRCxRQUFmO0FBRUEsU0FBS0UsZUFBTCxHQUF1QixLQUF2QjtBQUVBOzs7Ozs7QUFLQUMsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxFQUFvQixJQUFwQixFQUEwQlIsT0FBMUI7QUFFQTtBQUVEOzs7Ozs7Ozs7Ozs7d0JBUWdDO0FBRS9CLGFBQU9TLElBQUksQ0FBQ0MsS0FBTCxDQUFXLE9BQU8sS0FBS1QsTUFBdkIsQ0FBUDtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7O3dCQVFtQztBQUVsQyxhQUFPUSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxPQUFPLEtBQUtSLFNBQXZCLENBQVA7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIFRoZSBPcHRpb25zIE9iamVjdCBpcyB1c2VkIHRvIGRlZmluZSBhIHNldCBvZiBvcHRpb25zIHRoYXQgd2lsbCBtZXJnZSBcclxuICogd2l0aCB0aGUgdXNlciBwcm92aWRlZCBvcHRpb25zIGFuZCBmaWxsIGluIGRlZmF1bHQgdmFsdWVzIGZvciBvcHRpb25zIFxyXG4gKiBub3Qgc3BlY2lmaWVkLlxyXG4gKiBcclxuICogQHNpbmNlIDEuMC4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGxvd2VzdCB0aGUgZ2FtZSBsb29wJ3MgZnJhbWVzIHBlciBzZWNvbmQgY2FuIGRyb3AgdG8gXHJcblx0ICogYmVmb3JlIHRoZSBsb29wIHBhbmljcy5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKi9cclxuXHRwcml2YXRlIG1pbkZwczogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZnJhbWVzIHBlciBzZWNvbmQgdGhhdCB0aGUgZ2FtZSBsb29wIHNob3VsZCBhaW0gdG8gXHJcblx0ICogYWNoaWV2ZS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKi9cclxuXHRwcml2YXRlIHRhcmdldEZwczogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIHRoZSBnYW1lIGxvb3AgZ29lcyBiZWxvdyB0aGUgbWluRnBzIGl0IHdpbGwgcmVzdGFydC4gXHJcblx0ICogVGhpcyBpbmRpY2F0ZXMgaG93IG1hbnkgdGltZXMgaXQgd2lsbCByZXN0YXJ0IGJlZm9yZSBzdG9wcGluZyBcclxuXHQgKiBwZXJtYW5lbnRseS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4UmVzdGFydEF0dGVtcHRzOiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZnkgdGhlIGFtb3VudCBvZiBtaWxsaXNlY29uZHMgdGhhdCBEZWx0YWZyYW1lIHNob3VsZCBydW4gXHJcblx0ICogZm9yLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAxLjAuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBydW5UaW1lOiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHNldFRpbWVvdXQgc2hvdWxkIGJlIHVzZWQgZXZlbiBpZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuXHQgKiBpcyBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAxLjAuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBmb3JjZVNldFRpbWVvdXQ6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluRnBzPTE1XSBUaGUgbG93ZXN0IHRoZSBnYW1lIGxvb3AncyBmcmFtZXMgcGVyIHNlY29uZCBjYW4gZHJvcCB0byBiZWZvcmUgdGhlIGxvb3AgcGFuaWNzLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy50YXJnZXRGcHM9NjBdIFRoZSBmcmFtZXMgcGVyIHNlY29uZCB0aGF0IHRoZSBnYW1lIGxvb3Agc2hvdWxkIGFpbSB0byBhY2hpZXZlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhSZXN0YXJ0QXR0ZW1wdHM9SW5maW5pdHldIFdoZW4gdGhlIGdhbWUgbG9vcCBnb2VzIGJlbG93IHRoZSBtaW5GcHMgaXQgd2lsbCByZXN0YXJ0LiBUaGlzIGluZGljYXRlcyBob3cgbWFueSB0aW1lcyBpdCB3aWxsIHJlc3RhcnQgYmVmb3JlIHN0b3BwaW5nIHBlcm1hbmVudGx5LlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5ydW5UaW1lPUluZmluaXR5XSBTcGVjaWZ5IHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRoYXQgRGVsdGFmcmFtZSBzaG91bGQgcnVuIGZvci5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZvcmNlU2V0VGltZW91dD1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgc2V0VGltZW91dCBzaG91bGQgYmUgdXNlZCBldmVuIGlmIHJlcXVlc3RBbmltYXRpb25GcmFtZSBpcyBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyLlxyXG4gICAqL1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCkge1xyXG5cclxuXHRcdHRoaXMubWluRnBzID0gMTU7XHJcblxyXG5cdFx0dGhpcy50YXJnZXRGcHMgPSA2MDtcclxuXHJcblx0XHR0aGlzLm1heFJlc3RhcnRBdHRlbXB0cyA9IEluZmluaXR5O1xyXG5cclxuXHRcdHRoaXMucnVuVGltZSA9IEluZmluaXR5O1xyXG5cclxuXHRcdHRoaXMuZm9yY2VTZXRUaW1lb3V0ID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXBsYWNlIHRoZSBkZWZhdWx0IHZhbHVlcyB3aXRoIHRoZSB1c2VyIHNwZWNpZmllZCB2YWx1ZXMsIGlmIHRoZXkgZXhpc3QuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBzaW5jZSAxLjAuMFxyXG5cdFx0ICovXHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybiB0aGUgbWluRnBzIGFzIGEgZGVjaW1hbCByZXByZXNlbnRpbmcgdGhlIGFtb3VudCBvZlxyXG5cdCAqIHRpbWUgYmVmb3JlIGEgZnJhbWUgc2hvdWxkIG9jY3VyLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAxLjAuMFxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcblx0cHVibGljIGdldCBtaW5GcHNDYWxjKCk6IG51bWJlciB7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoMTAwMCAvIHRoaXMubWluRnBzKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm4gdGhlIHRhcmdldEZwcyBhcyBhIGRlY2ltYWwgcmVwcmVzZW50aW5nIHRoZSBhbW91bnQgb2ZcclxuXHQgKiB0aW1lIGJlZm9yZSBhIGZyYW1lIHNob3VsZCBvY2N1ci5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdGFyZ2V0RnBzQ2FsYygpOiBudW1iZXIge1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmZsb29yKDEwMDAgLyB0aGlzLnRhcmdldEZwcyk7XHJcblxyXG5cdH1cclxuXHJcbn0iXX0=