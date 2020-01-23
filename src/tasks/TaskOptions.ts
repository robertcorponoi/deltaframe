'use strict'

/**
 * Describes the structure of the options that can be passed to a task when creating it.
 */
export default class TaskOptions {
  /**
   * Specifies the time in between runs.
   * 
   * @property {number}
   * 
   * @default 1000
   */
  interval: number = 1000;

  /**
   * A delay before running the task for the first time.
   * 
   * @property {number}
   * 
   * @default 0
   */
  delay: number = 0;

  /**
   * Specify this to have the task be destroyed after being run the specified amount of times.
   * 
   * @property {number}
   * 
   * @default Infinity
   */
  timesToRun: number = Infinity;

  /**
   * @param {Object} options The options passed when creating a new task.
   */
  constructor(options: Object) {
    Object.assign(this, options);
  }
}