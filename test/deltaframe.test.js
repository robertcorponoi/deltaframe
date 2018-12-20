'use strict'

import { Deltaframe } from '../deltaframe.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let deltaframe;
let clock;
let spy;

let _time;
let _deltaAverage;

let timesRun;

describe('Running the draw function with Deltaframe', () => {

  beforeEach(() => {

    deltaframe = new Deltaframe();

    clock = sinon.useFakeTimers();

  });

  afterEach(() => {

    deltaframe = null;

    clock.restore();

  });

  it('should call the draw function continuously', () => {

    spy = sinon.spy(draw);

    deltaframe.start(spy);

    clock.tick(1000);

    chai.expect(spy.called).to.be.true &&

      chai.expect(deltaframe.isRunning).to.be.true &&

      chai.expect(deltaframe.isPaused).to.be.false;

  });

  it('should run for ten seconds and _time should be equal to 10000', () => {

    deltaframe.start(draw);

    clock.tick(10000);

    chai.expect(_time).to.equal(10000);

  });

  it('should have delta averages between 15 and 18 milliseconds', () => {

    deltaframe.start(draw);

    clock.tick(10000);

    chai.expect(_deltaAverage).to.be.within(15, 18);

  });

});

describe('Pausing Deltaframe', () => {

  beforeEach(() => {

    deltaframe = new Deltaframe();

    clock = sinon.useFakeTimers();

    timesRun = 0;

  });

  afterEach(() => {

    deltaframe = null;

    clock.restore();

    timesRun = 0;

  });

  it('should not run the draw function anymore when paused', () => {

    deltaframe.start(draw);

    clock.tick(2000);

    deltaframe.pause();

    clock.tick(10000);

    chai.expect(timesRun).to.be.within(120, 122) &&

      chai.expect(deltaframe.isRunning).to.be.false &&

      chai.expect(deltaframe.isPaused).to.be.true;

  });

  it('should not update the time property while paused', () => {

    deltaframe.start(draw);

    clock.tick(20000);

    deltaframe.pause();

    clock.tick(2000);

    chai.expect(_time).to.equal(20000);

  });

});

describe('Resuming Deltaframe after being paused', () => {

  beforeEach(() => {

    deltaframe = new Deltaframe();

    clock = sinon.useFakeTimers();

    timesRun = 0;

  });

  afterEach(() => {

    deltaframe = null;

    clock.restore();

    timesRun = 0;

  });

  it('should continue running the draw function after being resuming Deltaframe', () => {

    deltaframe.start(draw);

    clock.tick(2000);

    deltaframe.pause();

    deltaframe.resume();

    clock.tick(10000);

    chai.expect(timesRun).to.be.within(745, 747) &&

      chai.expect(deltaframe.isRunning).to.be.true &&

      chai.expect(deltaframe.isPaused).to.be.false;

  });

  it('should continue updating the time after being resumed', () => {

    deltaframe.start(draw);

    clock.tick(20000);

    deltaframe.pause();

    deltaframe.resume();

    clock.tick(2000);

    chai.expect(_time).to.equal(22000);

  });

});

describe('Stopping Deltaframe', () => {

  beforeEach(() => {

    deltaframe = new Deltaframe();

    clock = sinon.useFakeTimers();

    timesRun = 0;

  });

  afterEach(() => {

    deltaframe = null;

    clock.restore();

    timesRun = 0;

  });

  it('should reset all properties when Deltaframe is stopped', () => {

    let testFn = () => { };

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

describe('Running Deltaframe for a specified amount of time', () => {

  beforeEach(() => {

    deltaframe = new Deltaframe({ runTime: 5000 });

    clock = sinon.useFakeTimers();

    timesRun = 0;

  });

  afterEach(() => {

    deltaframe = null;

    clock.restore();

    timesRun = 0;

  });

  it('should stop operation when the time is reached', () => {

    deltaframe.start(draw);

    clock.tick(20000);

    console.log(deltaframe);

  });

});

function drawCircle() {

  ctx.beginPath();
  ctx.arc(x, y - 30, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();

}

function draw(time, delta, deltaAverage) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCircle();

  x += 2;
  y += -2;

  _time = time;

  _deltaAverage = deltaAverage;

  timesRun++;

}