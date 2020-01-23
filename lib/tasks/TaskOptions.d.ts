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
    interval: number;
    /**
     * A delay before running the task for the first time.
     *
     * @property {number}
     *
     * @default 0
     */
    delay: number;
    /**
     * Specify this to have the task be destroyed after being run the specified amount of times.
     *
     * @property {number}
     *
     * @default Infinity
     */
    timesToRun: number;
    /**
     * @param {Object} options The options passed when creating a new task.
     */
    constructor(options: Object);
}
