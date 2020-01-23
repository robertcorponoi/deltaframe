'use strict'

import TaskOptions from './TaskOptions';

/**
 * Defines a task that can be created and added to the task manager.
 */
export default class Task {
  /**
   * The name of this task.
   * 
   * @property {string}
   */
  name: string;

  /**
   * A reference to the function to call when this task is run.
   * 
   * @property {Function}
   */
  fn: Function;

  /**
   * A reference to the options for this task.
   * 
   * @property {TaskOptions}
   */
  options: TaskOptions;

  /**
   * The number of times that this task has been run.
   * 
   * @property {number}
   */
  timesRun: number = 0;

  /**
   * The time this task was last run at.
   * 
   * @property {number}
   */
  lastRunAt: number = 0;

  /**
   * @param {string} name The name of this task.
   * @param {Function} fn The function to call when this task is run.
   * @param {Object} options The options for this task.
   */
  constructor(name: string, fn: Function, options: Object) {
    this.name = name;
    this.fn = fn;
    this.options = new TaskOptions(options);
  }

  /**
   * Runs the function associated with this task.
   */
  run() {
    this.fn();

    this.timesRun++;
  }
}