import Task from './Task';
/**
 * The task manager is used to add and manage tasks that are supposed to run at specific times, on repeat, or a
 * predetermined number of times.
 */
export default class TaskManager {
    /**
     * A reference to the tasks that have been created and are currently active.
     *
     * @private
     *
     * @property {Array<Task>}
     */
    private _active;
    /**
     * Returns all of the active tasks.
     *
     * @returns {Array<Tas>}
     */
    get active(): Array<Task>;
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
    addTask(name: string, fn: Function, options?: Object): void;
    /**
     * Removes a task by its name.
     *
     * @param {string} name The name of the task to remove.
     */
    removeTask(name: string): void;
    /**
     * Checks to see if any tasks need to be run and runs them if so.
     *
     * This will also remove tasks if they are no longer needed.
     *
     * @param {number} time The current timestamp.
     */
    update(time: number): void;
}
