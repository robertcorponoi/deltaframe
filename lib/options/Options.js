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
  function Options(options) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJJbmZpbml0eSIsIk9iamVjdCIsImFzc2lnbiIsIk1hdGgiLCJmbG9vciIsIm1pbkZwcyIsInRhcmdldEZwcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNcUJBLE87OztBQUVwQjs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7OztBQVlBOzs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFXQTs7O0FBR0MsbUJBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQSxvQ0FsRFosRUFrRFk7O0FBQUEsdUNBdkNULEVBdUNTOztBQUFBLGdEQTNCQUMsUUEyQkE7O0FBQUEscUNBaEJYQSxRQWdCVzs7QUFBQSw2Q0FMRixLQUtFOztBQUUzQkMsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxFQUFvQkgsT0FBcEI7QUFFRDtBQUVGOzs7Ozs7Ozs7Ozt3QkFPMEI7QUFFdkIsYUFBT0ksSUFBSSxDQUFDQyxLQUFMLENBQVcsT0FBTyxLQUFLQyxNQUF2QixDQUFQO0FBRUQ7QUFFRjs7Ozs7Ozs7Ozt3QkFPNkI7QUFFMUIsYUFBT0YsSUFBSSxDQUFDQyxLQUFMLENBQVcsT0FBTyxLQUFLRSxTQUF2QixDQUFQO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBvcHRpb25zIGF2YWlsYWJsZSBmb3IgYW4gaW5zdGFuY2Ugb2YgRGVsdGFmcmFtZSBhbG9uZyB3aXRoIHRoZWlyIGRlZmF1bHRcclxuICogdmFsdWVzIGlmIGFueSBleGlzdC5cclxuICogXHJcbiAqIEBzaW5jZSAxLjAuMFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsb3dlc3QgdGhlIGZwcyBjYW4gZHJvcCB0byBiZWZvcmUgdGhlIERlbHRhZnJhbWUgcmVzdGFydHMgdG8gYXR0ZW1wdCB0byBmaXggdGhlXHJcbiAgICogcHJvYmxlbS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCAxNVxyXG5cdCAqL1xyXG4gIG1pbkZwczogbnVtYmVyID0gMTU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBmcHMgdGhhdCB0aGUgZ2FtZSBsb29wIHNob3VsZCBhaW0gdG8gIGFjaGlldmUuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDEuMC4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgNjBcclxuXHQgKi9cclxuICB0YXJnZXRGcHM6IG51bWJlciA9IDYwO1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIHRoZSBmcHMgZ29lcyBiZWxvdyB0aGUgbWluRnBzIERlbHRhZnJhbWUgd2lsbCByZXN0YXJ0LiBUaGlzIGluZGljYXRlcyBob3cgbWFueSB0aW1lcyBpdCB3aWxsIFxyXG4gICAqIHJlc3RhcnQgYmVmb3JlIHN0b3BwaW5nIHBlcm1hbmVudGx5LlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAxLjAuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IEluZmluaXR5XHJcblx0ICovXHJcbiAgbWF4UmVzdGFydEF0dGVtcHRzOiBudW1iZXIgPSBJbmZpbml0eTtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmeSB0aGUgYW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0aGF0IERlbHRhZnJhbWUgc2hvdWxkIHJ1biBmb3IuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDEuMC4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgSW5maW5pdHlcclxuXHQgKi9cclxuICBydW5UaW1lOiBudW1iZXIgPSBJbmZpbml0eTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgc2V0VGltZW91dCBzaG91bGQgYmUgdXNlZCBldmVuIGlmIHJlcXVlc3RBbmltYXRpb25GcmFtZSBpcyBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAxLjAuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcbiAgZm9yY2VTZXRUaW1lb3V0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBpbml0aWFsaXphdGlvbiBvcHRpb25zIHBhc3NlZCB0byBEZWx0YWZyYW1lLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCkge1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJuIHRoZSBtaW5GcHMgYXMgYSBkZWNpbWFsIHJlcHJlc2VudGluZyB0aGUgYW1vdW50IG9mIHRpbWUgYmVmb3JlIGEgZnJhbWUgc2hvdWxkIG9jY3VyLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAxLjAuMFxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcbiAgZ2V0IG1pbkZwc0NhbGMoKTogbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcigxMDAwIC8gdGhpcy5taW5GcHMpO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybiB0aGUgdGFyZ2V0RnBzIGFzIGEgZGVjaW1hbCByZXByZXNlbnRpbmcgdGhlIGFtb3VudCBvZiB0aW1lIGJlZm9yZSBhIGZyYW1lIHNob3VsZCBvY2N1ci5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMS4wLjBcclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG4gIGdldCB0YXJnZXRGcHNDYWxjKCk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoMTAwMCAvIHRoaXMudGFyZ2V0RnBzKTtcclxuXHJcbiAgfVxyXG5cclxufSJdfQ==