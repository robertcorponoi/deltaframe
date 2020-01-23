'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The task manager is used to add and manage tasks that are supposed to run at specific times, on repeat, or a 
 * predetermined number of times.
 */
var TaskManager =
/*#__PURE__*/
function () {
  function TaskManager() {
    _classCallCheck(this, TaskManager);

    _defineProperty(this, "_active", []);
  }

  _createClass(TaskManager, [{
    key: "addTask",

    /**
     * Adds a task to the task manager.
     * 
     * @param {string} name The name of the task to add.
     * @param {string} fn The function to call when this task is run.
     * @param {Object} [options]
     * @param {number} [options.interval=1000] Specifies the time in between runs.
     * @param {number} [options.delay=0] A delay before running the task for the first time.
     * @param {number} [options.timesToRun=Infinity] Specify this to have the task be destroyed after being run the specified amount of times.
     */
    value: function addTask(name, fn) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var task = new _Task["default"](name, fn, options);

      this._active.push(task);
    }
    /**
     * Removes a task by its name.
     * 
     * @param {string} name The name of the task to remove.
     */

  }, {
    key: "removeTask",
    value: function removeTask(name) {
      this._active = this._active.filter(function (task) {
        return task.name !== name;
      });
    }
    /**
     * Checks to see if any tasks need to be run and runs them if so.
     * 
     * This will also remove tasks if they are no longer needed.
     * 
     * @param {number} time The current timestamp.
     */

  }, {
    key: "update",
    value: function update(time) {
      var _this = this;

      this.active.map(function (task) {
        if (time > task.options.delay && time - task.lastRunAt >= task.options.interval) {
          task.run();
          task.lastRunAt = time;
          if (task.timesRun > task.options.timesToRun) _this.removeTask(task.name);
        }
      });
    }
  }, {
    key: "active",

    /**
     * Returns all of the active tasks.
     * 
     * @returns {Array<Tas>}
     */
    get: function get() {
      return this._active;
    }
  }]);

  return TaskManager;
}();

exports["default"] = TaskManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9UYXNrTWFuYWdlci50cyJdLCJuYW1lcyI6WyJUYXNrTWFuYWdlciIsIm5hbWUiLCJmbiIsIm9wdGlvbnMiLCJ0YXNrIiwiVGFzayIsIl9hY3RpdmUiLCJwdXNoIiwiZmlsdGVyIiwidGltZSIsImFjdGl2ZSIsIm1hcCIsImRlbGF5IiwibGFzdFJ1bkF0IiwiaW50ZXJ2YWwiLCJydW4iLCJ0aW1lc1J1biIsInRpbWVzVG9SdW4iLCJyZW1vdmVUYXNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlxQkEsVzs7Ozs7O3FDQVFZLEU7Ozs7OztBQVMvQjs7Ozs7Ozs7Ozs0QkFVUUMsSSxFQUFjQyxFLEVBQW9DO0FBQUEsVUFBdEJDLE9BQXNCLHVFQUFKLEVBQUk7QUFDeEQsVUFBTUMsSUFBVSxHQUFHLElBQUlDLGdCQUFKLENBQVNKLElBQVQsRUFBZUMsRUFBZixFQUFtQkMsT0FBbkIsQ0FBbkI7O0FBRUEsV0FBS0csT0FBTCxDQUFhQyxJQUFiLENBQWtCSCxJQUFsQjtBQUNEO0FBRUQ7Ozs7Ozs7OytCQUtXSCxJLEVBQWM7QUFDdkIsV0FBS0ssT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYUUsTUFBYixDQUFvQixVQUFDSixJQUFEO0FBQUEsZUFBZ0JBLElBQUksQ0FBQ0gsSUFBTCxLQUFjQSxJQUE5QjtBQUFBLE9BQXBCLENBQWY7QUFDRDtBQUVEOzs7Ozs7Ozs7OzJCQU9PUSxJLEVBQWM7QUFBQTs7QUFDbkIsV0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCLFVBQUNQLElBQUQsRUFBZ0I7QUFDOUIsWUFBSUssSUFBSSxHQUFHTCxJQUFJLENBQUNELE9BQUwsQ0FBYVMsS0FBcEIsSUFBNkJILElBQUksR0FBR0wsSUFBSSxDQUFDUyxTQUFaLElBQXlCVCxJQUFJLENBQUNELE9BQUwsQ0FBYVcsUUFBdkUsRUFBaUY7QUFDL0VWLFVBQUFBLElBQUksQ0FBQ1csR0FBTDtBQUVBWCxVQUFBQSxJQUFJLENBQUNTLFNBQUwsR0FBaUJKLElBQWpCO0FBRUEsY0FBSUwsSUFBSSxDQUFDWSxRQUFMLEdBQWdCWixJQUFJLENBQUNELE9BQUwsQ0FBYWMsVUFBakMsRUFBNkMsS0FBSSxDQUFDQyxVQUFMLENBQWdCZCxJQUFJLENBQUNILElBQXJCO0FBQzlDO0FBQ0YsT0FSRDtBQVNEOzs7O0FBakREOzs7Ozt3QkFLMEI7QUFBRSxhQUFPLEtBQUtLLE9BQVo7QUFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XHJcblxyXG4vKipcclxuICogVGhlIHRhc2sgbWFuYWdlciBpcyB1c2VkIHRvIGFkZCBhbmQgbWFuYWdlIHRhc2tzIHRoYXQgYXJlIHN1cHBvc2VkIHRvIHJ1biBhdCBzcGVjaWZpYyB0aW1lcywgb24gcmVwZWF0LCBvciBhIFxyXG4gKiBwcmVkZXRlcm1pbmVkIG51bWJlciBvZiB0aW1lcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tNYW5hZ2VyIHtcclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgdGFza3MgdGhhdCBoYXZlIGJlZW4gY3JlYXRlZCBhbmQgYXJlIGN1cnJlbnRseSBhY3RpdmUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PFRhc2s+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FjdGl2ZTogQXJyYXk8VGFzaz4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhbGwgb2YgdGhlIGFjdGl2ZSB0YXNrcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8VGFzPn1cclxuICAgKi9cclxuICBnZXQgYWN0aXZlKCk6IEFycmF5PFRhc2s+IHsgcmV0dXJuIHRoaXMuX2FjdGl2ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgdGFzayB0byB0aGUgdGFzayBtYW5hZ2VyLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXNrIHRvIGFkZC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGlzIHRhc2sgaXMgcnVuLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuaW50ZXJ2YWw9MTAwMF0gU3BlY2lmaWVzIHRoZSB0aW1lIGluIGJldHdlZW4gcnVucy5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZGVsYXk9MF0gQSBkZWxheSBiZWZvcmUgcnVubmluZyB0aGUgdGFzayBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRpbWVzVG9SdW49SW5maW5pdHldIFNwZWNpZnkgdGhpcyB0byBoYXZlIHRoZSB0YXNrIGJlIGRlc3Ryb3llZCBhZnRlciBiZWluZyBydW4gdGhlIHNwZWNpZmllZCBhbW91bnQgb2YgdGltZXMuXHJcbiAgICovXHJcbiAgYWRkVGFzayhuYW1lOiBzdHJpbmcsIGZuOiBGdW5jdGlvbiwgb3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuICAgIGNvbnN0IHRhc2s6IFRhc2sgPSBuZXcgVGFzayhuYW1lLCBmbiwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5fYWN0aXZlLnB1c2godGFzayk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgdGFzayBieSBpdHMgbmFtZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFzayB0byByZW1vdmUuXHJcbiAgICovXHJcbiAgcmVtb3ZlVGFzayhuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2FjdGl2ZSA9IHRoaXMuX2FjdGl2ZS5maWx0ZXIoKHRhc2s6IFRhc2spID0+IHRhc2submFtZSAhPT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgdG8gc2VlIGlmIGFueSB0YXNrcyBuZWVkIHRvIGJlIHJ1biBhbmQgcnVucyB0aGVtIGlmIHNvLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgd2lsbCBhbHNvIHJlbW92ZSB0YXNrcyBpZiB0aGV5IGFyZSBubyBsb25nZXIgbmVlZGVkLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIFRoZSBjdXJyZW50IHRpbWVzdGFtcC5cclxuICAgKi9cclxuICB1cGRhdGUodGltZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmFjdGl2ZS5tYXAoKHRhc2s6IFRhc2spID0+IHtcclxuICAgICAgaWYgKHRpbWUgPiB0YXNrLm9wdGlvbnMuZGVsYXkgJiYgdGltZSAtIHRhc2subGFzdFJ1bkF0ID49IHRhc2sub3B0aW9ucy5pbnRlcnZhbCkge1xyXG4gICAgICAgIHRhc2sucnVuKCk7XHJcblxyXG4gICAgICAgIHRhc2subGFzdFJ1bkF0ID0gdGltZTtcclxuXHJcbiAgICAgICAgaWYgKHRhc2sudGltZXNSdW4gPiB0YXNrLm9wdGlvbnMudGltZXNUb1J1bikgdGhpcy5yZW1vdmVUYXNrKHRhc2submFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==