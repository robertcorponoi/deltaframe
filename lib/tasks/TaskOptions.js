'use strict';
/**
 * Describes the structure of the options that can be passed to a task when creating it.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TaskOptions =
/**
 * Specifies the time in between runs.
 * 
 * @property {number}
 * 
 * @default 1000
 */

/**
 * A delay before running the task for the first time.
 * 
 * @property {number}
 * 
 * @default 0
 */

/**
 * Specify this to have the task be destroyed after being run the specified amount of times.
 * 
 * @property {number}
 * 
 * @default Infinity
 */

/**
 * @param {Object} options The options passed when creating a new task.
 */
function TaskOptions(options) {
  _classCallCheck(this, TaskOptions);

  _defineProperty(this, "interval", 1000);

  _defineProperty(this, "delay", 0);

  _defineProperty(this, "timesToRun", Infinity);

  Object.assign(this, options);
};

exports["default"] = TaskOptions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9UYXNrT3B0aW9ucy50cyJdLCJuYW1lcyI6WyJUYXNrT3B0aW9ucyIsIm9wdGlvbnMiLCJJbmZpbml0eSIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7OztJQUdxQkEsVztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7O0FBR0EscUJBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQSxvQ0F2QlYsSUF1QlU7O0FBQUEsaUNBZGIsQ0FjYTs7QUFBQSxzQ0FMUkMsUUFLUTs7QUFDM0JDLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JILE9BQXBCO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIERlc2NyaWJlcyB0aGUgc3RydWN0dXJlIG9mIHRoZSBvcHRpb25zIHRoYXQgY2FuIGJlIHBhc3NlZCB0byBhIHRhc2sgd2hlbiBjcmVhdGluZyBpdC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBTcGVjaWZpZXMgdGhlIHRpbWUgaW4gYmV0d2VlbiBydW5zLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IDEwMDBcclxuICAgKi9cclxuICBpbnRlcnZhbDogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBkZWxheSBiZWZvcmUgcnVubmluZyB0aGUgdGFzayBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgMFxyXG4gICAqL1xyXG4gIGRlbGF5OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoaXMgdG8gaGF2ZSB0aGUgdGFzayBiZSBkZXN0cm95ZWQgYWZ0ZXIgYmVpbmcgcnVuIHRoZSBzcGVjaWZpZWQgYW1vdW50IG9mIHRpbWVzLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IEluZmluaXR5XHJcbiAgICovXHJcbiAgdGltZXNUb1J1bjogbnVtYmVyID0gSW5maW5pdHk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb25zIHBhc3NlZCB3aGVuIGNyZWF0aW5nIGEgbmV3IHRhc2suXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH1cclxufSJdfQ==