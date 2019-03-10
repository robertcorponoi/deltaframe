'use strict'

import Deltaframe from '../deltaframe.js';

// Used to initialize a new instance of Deltaframe
// to each time a new test is run.
let deltaframe;

// Used to create and restore sinon fake timers.
let clock;

// Used to create sinon spies to let us know when functions
// are being called.
let spy;

// Time and deltaAverage are populated by the animation's draw
// function which itself gets these values from Deltaframe.
let animTime;
let animDeltaAverage;

// During some tests this keeps track of how many times the
// the animation function has been called.
let timesCalled;

/**
 * Test creating a new instance of Deltaframe using various options.
 * 
 * @since 1.0.0
 */
describe('Creating a new instance', () => {

  /**
   * Make sure that if the user does not specify any initialization
   * options that all of the defaults will be used.
   * 
   * @since 1.0.0
   */
  it('should initialize Deltaframe with all default values', () => {

    deltaframe = new Deltaframe();

    chai.expect(deltaframe._options.minFps).to.equal(15)

      && chai.expect(deltaframe._options.targetFps).to.equal(60)

      && chai.expect(deltaframe._options.maxRestartAttempts).to.equal(Infinity)

      && chai.expect(deltaframe._options.runTime).to.equal(Infinity)

      && chai.expect(deltaframe._options.forceSetTimeout).to.equal(false);

  });

  /**
   * Make sure that the minFps options gets successfully converted
   * to a decimal value.
   * 
   * @since 1.0.0
   */
  it('should return the decimal equivalent of 25 fps', () => {

    const options = { minFps: 25 };

    deltaframe = new Deltaframe(options);

    chai.expect(deltaframe._options.minFpsCalc).to.equal(40);

  });

  /**
   * Make sure that the targetFps option gets successfully converted
   * to a decimal value.
   * 
   * @since 1.0.0
   */
  it('should return the decimal equivalent of 45 fps', () => {

    const options = { targetFps: 45 };

    deltaframe = new Deltaframe(options);

    chai.expect(deltaframe._options.targetFpsCalc).to.equal(22);

  });

});

/**
 * Test running an animation.
 * 
 * Before each test we setup a sinon fake timer and after each test
 * we restore it so it's ready for the next test.
 * 
 * @since 0.1.0
 */
describe('Running an animation', () => {

  beforeEach(() => {

    clock = sinon.useFakeTimers();

  });

  afterEach(() => {

    clock.restore();

  });

  /**
   * Make sure that the animation is called on a frame by frame
   * basis.
   * 
   * @since 0.1.0
   */
  it('should call the animation function continuously', () => {

    deltaframe = new Deltaframe();

    spy = sinon.spy(draw);

    deltaframe.start(spy);

    clock.tick(1000);

    chai.expect(spy.called).to.be.true;

  });

  /**
   * Make sure that after 10 seconds has passed, the `time` value
   * passed to the animating function is correct.
   * 
   * @since 0.1.0
   */
  it('should run for ten seconds and _time should be equal to 10000', () => {

    deltaframe = new Deltaframe();

    deltaframe.start(draw);

    clock.tick(10000);

    chai.expect(animTime).to.equal(10000);

  });

  /**
   * Make sure that the average time between frames is between a
   * reasonable amount of 15 to 18 milliseconds.
   * 
   * @since 0.1.0
   */
  it('should have delta averages between 15 and 18 milliseconds', () => {

    deltaframe = new Deltaframe();

    deltaframe.start(draw);

    clock.tick(10000);

    chai.expect(animDeltaAverage).to.be.within(15, 18);

  });

  /**
   * Make sure that if the animation is only set to run for a certain
   * amount of time, it only runs for that period of time.
   * 
   * @since 1.0.0
   */
  it('should only run the animation for the specified amount of time', () => {

    const options = { runTime: 5000 };

    deltaframe = new Deltaframe(options);

    deltaframe.start(draw);

    clock.tick(20000);

    chai.expect(animTime).to.equal(4992);

  });

});

/**
 * Test pausing an animation.
 * 
 * Before each test we setup a sinon fake timer and setup a new instance
 * of Deltaframe and after each test we reset both.
 * 
 * @since 0.1.0
 */
describe('Pausing an animation', () => {

  beforeEach(() => {

    deltaframe = new Deltaframe();

    clock = sinon.useFakeTimers();

    timesCalled = 0;

  });

  afterEach(() => {

    deltaframe = null;

    clock.restore();

    timesCalled = 0;

  });

  /**
   * Make sure that when the animation is paused the correct properties
   * are updated and returned.
   * 
   * @since 0.1.0
   */
  it('should not run the draw function anymore when paused', () => {

    deltaframe.start(draw);

    clock.tick(2000);

    deltaframe.pause();

    clock.tick(10000);

    chai.expect(timesCalled).to.be.within(120, 122) && chai.expect(deltaframe.isRunning).to.be.false && chai.expect(deltaframe.isPaused).to.be.true;

  });

  /**
   * Make sure that when the animation is paused, the draw function is
   * not called during that time.
   * 
   * @since 0.1.0
   */
  it('should not update the time property while paused', () => {

    deltaframe.start(draw);

    clock.tick(20000);

    deltaframe.pause();

    clock.tick(2000);

    chai.expect(animTime).to.equal(20000);

  });

});

/**
 * Test resuming an animation.
 * 
 * Before each test we setup a sinon fake timer and setup a new instance
 * of Deltaframe and after each test we reset both.
 * 
 * @since 0.1.0
 */
describe('Resuming an animation', () => {

  beforeEach(() => {

    deltaframe = new Deltaframe();

    clock = sinon.useFakeTimers();

    timesCalled = 0;

  });

  afterEach(() => {

    deltaframe = null;

    clock.restore();

    timesCalled = 0;

  });

  /**
   * Make sure that after the animation is resumed from a paused state, the
   * correct properties update.
   * 
   * @since 0.1.0
   */
  it('should continue running the draw function after being resuming Deltaframe', () => {

    deltaframe.start(draw);

    clock.tick(2000);

    deltaframe.pause();

    deltaframe.resume();

    clock.tick(10000);

    chai.expect(timesCalled).to.be.within(745, 747) && chai.expect(deltaframe.isRunning).to.be.true && chai.expect(deltaframe.isPaused).to.be.false;

  });

  /**
   * Make sure that the after the animation is resumed from a paused state, it
   * continues running.
   * 
   * @since 0.1.0
   */
  it('should continue updating the time after being resumed', () => {

    deltaframe.start(draw);

    clock.tick(20000);

    deltaframe.pause();

    deltaframe.resume();

    clock.tick(2000);

    chai.expect(animTime).to.equal(22000);

  });

});

/**
 * Test stopping an animation.
 * 
 * Before each test we setup a sinon fake timer and setup a new instance
 * of Deltaframe and after each test we reset both.
 * 
 * @since 0.1.0
 */
describe('Stopping an animation', () => {

  beforeEach(() => {

    deltaframe = new Deltaframe();

    clock = sinon.useFakeTimers();

    timesCalled = 0;

  });

  afterEach(() => {

    deltaframe = null;

    clock.restore();

    timesCalled = 0;

  });

  /**
   * Make sure that when an animation is stopped that all properties of
   * Deltaframe are reset to their original values.
   * 
   * @since 0.1.0
   */
  it('should reset all properties when Deltaframe is stopped', () => {

    let testFn = function () {};

    testFn = testFn.toString();

    deltaframe.start(draw);

    clock.tick(20000);

    deltaframe.stop();

    chai.expect(deltaframe._restartAttempts).to.equal(0) &&

      chai.expect(deltaframe._running).to.be.false &&

      chai.expect(deltaframe._paused).to.be.false &&

      chai.expect(deltaframe._fn.toString()).to.deep.equal(testFn) &&

      chai.expect(deltaframe._frame).to.equal(0) &&

      chai.expect(deltaframe._time).to.equal(0) &&

      chai.expect(deltaframe._prevTime).to.equal(0) &&

      chai.expect(deltaframe._delta).to.equal(0) &&

      chai.expect(deltaframe._deltaHistory).to.deep.equal([]) &&

      chai.expect(deltaframe._deltaIndex).to.equal(0) &&

      chai.expect(deltaframe.isRunning).to.be.false &&

      chai.expect(deltaframe.isPaused).to.be.false;

  });

});

/**
 * ====================================================================
 * 
 * No tests below!
 * 
 * These set up the canvas and drawing function that is used throughout 
 * the tests to set values that can be checked since it is not easy to 
 * test the canvas itself.
 * 
 * ====================================================================
 */

// Used to reference the canvas in the HTML test document.
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Used to specify the position of the ball which allows for
// animation of the ball's movement.
let x = canvas.width / 2;
let y = canvas.height - 30;

/**
 * Updates the canvas animation.
 * 
 * The time, delta, and deltaAverage parameters are passed in from 
 * Deltaframe and the function populates our global versions defined
 * at the top of the file.
 * 
 * @since 0.1.0
 */
function draw(time, delta, deltaAverage) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(x, y - 30, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();

  x += 2;
  y += -2;

  animTime = time;

  animDeltaAverage = deltaAverage;

  timesCalled++;

}