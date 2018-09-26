'use strict'

/**
 * Abstract the use of requestAnimationFrame and setTimeout under one name so that Deltaframe
 * itself does not have to worry about which one to use.
 * 
 * This also uses the requestAnimationFrame and cancelAnimationFrame that are supported by the
 * user's browser and forces setTimeout if desired.
 * 
 * @since 0.1.0
 */
export class RequestAnimationFrame {

  constructor() {

    /**
     * Keep track of the id returned from requestAnimationFrame or setTimeout so we can
     * use it to cancel them later on.
     * 
     * @property {number}
     * @readonly
     */
    this.id = null;

    /**
     * Keep track of whether the loop is already running or not so we don't accidently
     * restart it.
     * 
     * @property {boolean}
     * @readonly
     */
    this.running = false;

    /**
     * The function, as sent from Deltaframe, that will be run every update of the loop.
     * 
     * @property {Function}
     * @readonly
     */
    this.fn = () => { };

    /**
     * Indicates whether setTimeout is being used instead of requestAnimationFrame, either by force or
     * by user's browser support.
     * 
     * @property {boolean}
     * @readonly
     */
    this.usingSetTimeout = false;

    /**
     * Use the version of requestAnimationFrame that is supported by the user's browser and if none
     * are supported, use setTimeout instead.
     * 
     * @property {RequestAnimationFrame}
     * @readonly
     */
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (f) { return setTimeout(f, 1000 / 60) };

    /**
     * Use the version of cancelAnimationFrame that is supported by the user's browser and if none are
     * supported, then setTimeout was used and so we use clearTimeout instead.
     * 
     * @property {cancelAnimationFrame}
     * @readonly
     */
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || function () { clearTimeout(this.id) }

  }

  /**
   * Start the operation of the requestAnimationFrame or setTimeout loop.
   * 
   * @since 0.1.0
   * 
   * @param {Function} fn The function to run every update of the loop.
   * @param {boolean} forceSetTimeout Indicates whether setTimeout should be used even if the user's browser supports requestAnimationFrame.
   */
  start(fn, forceSetTimeout) {

    if (this.running) return;

    this.running = true;

    this.fn = fn;

    if (forceSetTimeout) {

      this.usingSetTimeout = true;

      this.updateTimeout();

    }

    else {

      window.requestAnimationFrame((time) => this.updateRAF(time));

    }

  }

  /**
   * Call requestAnimationFrame recursively so that the loop keeps going and
   * also send the timestamps over to Deltaframe.
   * 
   * @since 0.1.0
   */
  updateRAF(timestamp) {

    this.running = true;

    this.fn(timestamp);

    this.id = window.requestAnimationFrame((time) => this.updateRAF(time));

  }

  /**
   * Call setTimeout recursively so that the loop keeps going and also send
   * the timestamps over to Deltaframe.
   * 
   * @since 0.1.0
   */
  updateTimeout() {

    let timestamp = window.performance.now();

    this.fn(timestamp);

    this.id = window.setTimeout(() => this.updateTimeout(), 1000 / 60);

  }

  /**
   * Restart the requestAnimation or setTimeout loop.
   * 
   * @since 0.1.0
   */
  restart() {

    if (this.usingSetTimeout) window.clearTimeout(this.id);

    else window.cancelAnimationFrame(this.id);

    this.id = null;

    this.running = false;

    if (this.usingSetTimeout) this.updateTimeout();

    else window.requestAnimationFrame((time) => this.updateRAF(time));

    this.running = true;

  }

  /**
   * Stop the loop by calling cancelAnimationFrame or clearTimeout.
   * 
   * @since 0.1.0
   */
  stop() {

    if (this.usingSetTimeout) window.clearTimeout(this.id);

    else window.cancelAnimationFrame(this.id);

    this.id = null;

    this.running = false;

    this.fn = () => { };

    return;

  }

}