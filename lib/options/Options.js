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

var Options =
/*#__PURE__*/
function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJJbmZpbml0eSIsIk9iamVjdCIsImFzc2lnbiIsIk1hdGgiLCJmbG9vciIsIm1pbkZwcyIsInRhcmdldEZwcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87OztBQUVwQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7O0FBR0MscUJBQWtDO0FBQUEsUUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsb0NBekNqQixFQXlDaUI7O0FBQUEsdUNBaENkLEVBZ0NjOztBQUFBLGdEQXZCTEMsUUF1Qks7O0FBQUEscUNBZGhCQSxRQWNnQjs7QUFBQSw2Q0FMUCxLQUtPOztBQUNoQ0MsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxFQUFvQkgsT0FBcEI7QUFDRDtBQUVGOzs7Ozs7Ozs7d0JBSzBCO0FBQUUsYUFBT0ksSUFBSSxDQUFDQyxLQUFMLENBQVcsT0FBTyxLQUFLQyxNQUF2QixDQUFQO0FBQXdDO0FBRXBFOzs7Ozs7Ozt3QkFLNkI7QUFBRSxhQUFPRixJQUFJLENBQUNDLEtBQUwsQ0FBVyxPQUFPLEtBQUtFLFNBQXZCLENBQVA7QUFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBvcHRpb25zIGF2YWlsYWJsZSBmb3IgYW4gaW5zdGFuY2Ugb2YgRGVsdGFmcmFtZSBhbG9uZyB3aXRoIHRoZWlyIGRlZmF1bHQgdmFsdWVzIGlmIGFueSBleGlzdC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbG93ZXN0IHRoZSBmcHMgY2FuIGRyb3AgdG8gYmVmb3JlIHRoZSBEZWx0YWZyYW1lIHJlc3RhcnRzIHRvIGF0dGVtcHQgdG8gZml4IHRoZSBwcm9ibGVtLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDE1XHJcblx0ICovXHJcbiAgbWluRnBzOiBudW1iZXIgPSAxNTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGZwcyB0aGF0IHRoZSBnYW1lIGxvb3Agc2hvdWxkIGFpbSB0byAgYWNoaWV2ZS5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCA2MFxyXG5cdCAqL1xyXG4gIHRhcmdldEZwczogbnVtYmVyID0gNjA7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gdGhlIGZwcyBnb2VzIGJlbG93IHRoZSBtaW5GcHMgRGVsdGFmcmFtZSB3aWxsIHJlc3RhcnQuIFRoaXMgaW5kaWNhdGVzIGhvdyBtYW55IHRpbWVzIGl0IHdpbGwgIHJlc3RhcnQgYmVmb3JlIHN0b3BwaW5nIHBlcm1hbmVudGx5LlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IEluZmluaXR5XHJcblx0ICovXHJcbiAgbWF4UmVzdGFydEF0dGVtcHRzOiBudW1iZXIgPSBJbmZpbml0eTtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmeSB0aGUgYW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0aGF0IERlbHRhZnJhbWUgc2hvdWxkIHJ1biBmb3IuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgSW5maW5pdHlcclxuXHQgKi9cclxuICBydW5UaW1lOiBudW1iZXIgPSBJbmZpbml0eTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgc2V0VGltZW91dCBzaG91bGQgYmUgdXNlZCBldmVuIGlmIHJlcXVlc3RBbmltYXRpb25GcmFtZSBpcyBzdXBwb3J0ZWQgYnkgdGhlIHVzZXIncyBicm93c2VyLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IGZhbHNlXHJcblx0ICovXHJcbiAgZm9yY2VTZXRUaW1lb3V0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBpbml0aWFsaXphdGlvbiBvcHRpb25zIHBhc3NlZCB0byBEZWx0YWZyYW1lLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCA9IHt9KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJuIHRoZSBtaW5GcHMgYXMgYSBkZWNpbWFsIHJlcHJlc2VudGluZyB0aGUgYW1vdW50IG9mIHRpbWUgYmVmb3JlIGEgZnJhbWUgc2hvdWxkIG9jY3VyLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcbiAgZ2V0IG1pbkZwc0NhbGMoKTogbnVtYmVyIHsgcmV0dXJuIE1hdGguZmxvb3IoMTAwMCAvIHRoaXMubWluRnBzKTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm4gdGhlIHRhcmdldEZwcyBhcyBhIGRlY2ltYWwgcmVwcmVzZW50aW5nIHRoZSBhbW91bnQgb2YgdGltZSBiZWZvcmUgYSBmcmFtZSBzaG91bGQgb2NjdXIuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKi9cclxuICBnZXQgdGFyZ2V0RnBzQ2FsYygpOiBudW1iZXIgeyByZXR1cm4gTWF0aC5mbG9vcigxMDAwIC8gdGhpcy50YXJnZXRGcHMpOyB9XHJcbn0iXX0=