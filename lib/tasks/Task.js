'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TaskOptions = _interopRequireDefault(require("./TaskOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Defines a task that can be created and added to the task manager.
 */
var Task =
/*#__PURE__*/
function () {
  /**
   * The name of this task.
   * 
   * @property {string}
   */

  /**
   * A reference to the function to call when this task is run.
   * 
   * @property {Function}
   */

  /**
   * A reference to the options for this task.
   * 
   * @property {TaskOptions}
   */

  /**
   * The number of times that this task has been run.
   * 
   * @property {number}
   */

  /**
   * The time this task was last run at.
   * 
   * @property {number}
   */

  /**
   * @param {string} name The name of this task.
   * @param {Function} fn The function to call when this task is run.
   * @param {Object} options The options for this task.
   */
  function Task(name, fn, options) {
    _classCallCheck(this, Task);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "fn", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "timesRun", 0);

    _defineProperty(this, "lastRunAt", 0);

    this.name = name;
    this.fn = fn;
    this.options = new _TaskOptions["default"](options);
  }
  /**
   * Runs the function associated with this task.
   */


  _createClass(Task, [{
    key: "run",
    value: function run() {
      this.fn();
      this.timesRun++;
    }
  }]);

  return Task;
}();

exports["default"] = Task;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9UYXNrLnRzIl0sIm5hbWVzIjpbIlRhc2siLCJuYW1lIiwiZm4iLCJvcHRpb25zIiwiVGFza09wdGlvbnMiLCJ0aW1lc1J1biJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdxQkEsSTs7O0FBQ25COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7O0FBS0EsZ0JBQVlDLElBQVosRUFBMEJDLEVBQTFCLEVBQXdDQyxPQUF4QyxFQUF5RDtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHNDQWR0QyxDQWNzQzs7QUFBQSx1Q0FQckMsQ0FPcUM7O0FBQ3ZELFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyx1QkFBSixDQUFnQkQsT0FBaEIsQ0FBZjtBQUNEO0FBRUQ7Ozs7Ozs7MEJBR007QUFDSixXQUFLRCxFQUFMO0FBRUEsV0FBS0csUUFBTDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgVGFza09wdGlvbnMgZnJvbSAnLi9UYXNrT3B0aW9ucyc7XHJcblxyXG4vKipcclxuICogRGVmaW5lcyBhIHRhc2sgdGhhdCBjYW4gYmUgY3JlYXRlZCBhbmQgYWRkZWQgdG8gdGhlIHRhc2sgbWFuYWdlci5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoaXMgdGFzay5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgKi9cclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhpcyB0YXNrIGlzIHJ1bi5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG4gICAqL1xyXG4gIGZuOiBGdW5jdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgdGFzay5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1Rhc2tPcHRpb25zfVxyXG4gICAqL1xyXG4gIG9wdGlvbnM6IFRhc2tPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoYXQgdGhpcyB0YXNrIGhhcyBiZWVuIHJ1bi5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICB0aW1lc1J1bjogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWUgdGhpcyB0YXNrIHdhcyBsYXN0IHJ1biBhdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBsYXN0UnVuQXQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoaXMgdGFzay5cclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoaXMgdGFzayBpcyBydW4uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIHRoaXMgdGFzay5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGZuOiBGdW5jdGlvbiwgb3B0aW9uczogT2JqZWN0KSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5mbiA9IGZuO1xyXG4gICAgdGhpcy5vcHRpb25zID0gbmV3IFRhc2tPcHRpb25zKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUnVucyB0aGUgZnVuY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoaXMgdGFzay5cclxuICAgKi9cclxuICBydW4oKSB7XHJcbiAgICB0aGlzLmZuKCk7XHJcblxyXG4gICAgdGhpcy50aW1lc1J1bisrO1xyXG4gIH1cclxufSJdfQ==