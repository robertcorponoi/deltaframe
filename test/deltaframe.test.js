'use strict'

import Deltaframe from './deltaframe.js';

let deltaframe;

let clock;
let spy;

let animTime;
let animDeltaAverage;

let timesCalled;

mocha.setup({ globals: ['__VUE_DEVTOOLS_TOAST__'] })

describe('Creating a new instance', () => {
  it('should initialize Deltaframe with all default values', () => {
    deltaframe = new Deltaframe();

    chai.expect(deltaframe._options.minFps).to.equal(15)

    chai.expect(deltaframe._options.targetFps).to.equal(60)

    chai.expect(deltaframe._options.maxRestartAttempts).to.equal(Infinity)

    chai.expect(deltaframe._options.runTime).to.equal(Infinity)

    chai.expect(deltaframe._options.forceSetTimeout).to.equal(false);
  });

  it('should return the decimal equivalent of 25 fps', () => {
    const options = { minFps: 25 };

    deltaframe = new Deltaframe(options);

    chai.expect(deltaframe._options.minFpsCalc).to.equal(40);
  });

  it('should return the decimal equivalent of 45 fps', () => {
    const options = { targetFps: 45 };

    deltaframe = new Deltaframe(options);

    chai.expect(deltaframe._options.targetFpsCalc).to.equal(22);
  });
});

describe('Running an animation', () => {
  beforeEach(() => clock = sinon.useFakeTimers());

  afterEach(() => clock.restore());

  it('should call the animation function continuously', () => {
    deltaframe = new Deltaframe();

    spy = sinon.spy(draw);

    deltaframe.start(spy);

    clock.tick(1000);

    chai.expect(spy.called).to.be.true;
  });

  it('should run for ten seconds and _time should be equal to 10000', () => {
    deltaframe = new Deltaframe();

    deltaframe.start(draw);

    clock.tick(10000);

    chai.expect(animTime).to.equal(10000);
  });

  it('should have delta averages between 15 and 18 milliseconds', () => {
    deltaframe = new Deltaframe();

    deltaframe.start(draw);

    clock.tick(10000);

    chai.expect(animDeltaAverage).to.be.within(15, 18);
  });

  it('should only run the animation for the specified amount of time', () => {
    const options = { runTime: 5000 };

    deltaframe = new Deltaframe(options);

    deltaframe.start(draw);

    clock.tick(20000);

    chai.expect(animTime).to.equal(4992);
  });
});

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

  it('should not run the draw function anymore when paused', () => {
    deltaframe.start(draw);

    clock.tick(2000);

    deltaframe.pause();

    clock.tick(10000);

    chai.expect(timesCalled).to.be.within(120, 122) && chai.expect(deltaframe.isRunning).to.be.false && chai.expect(deltaframe.isPaused).to.be.true;
  });

  it('should not update the time property while paused', () => {
    deltaframe.start(draw);

    clock.tick(20000);

    deltaframe.pause();

    clock.tick(2000);

    chai.expect(animTime).to.equal(20000);
  });

});

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

  it('should continue running the draw function after being resuming Deltaframe', () => {
    deltaframe.start(draw);

    clock.tick(2000);

    deltaframe.pause();

    deltaframe.resume();

    clock.tick(10000);

    chai.expect(timesCalled).to.be.within(745, 747) && chai.expect(deltaframe.isRunning).to.be.true && chai.expect(deltaframe.isPaused).to.be.false;
  });

  it('should continue updating the time after being resumed', () => {
    deltaframe.start(draw);

    clock.tick(20000);

    deltaframe.pause();

    deltaframe.resume();

    clock.tick(2000);

    chai.expect(animTime).to.equal(22000);
  });
});

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
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

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