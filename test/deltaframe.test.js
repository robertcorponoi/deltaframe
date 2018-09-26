'use strict'

import { Deltaframe } from '../deltaframe.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

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

}

// Test all of the functionality of Deltaframe to ensure it works consistently.
describe('Deltaframe', () => {

  // Make sure that the loop runs correctly.
  describe('#_update()', () => {

    let clock;
    let deltaframe;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
      deltaframe = null;
    });

    // Make sure the timestamp and time updates properly.
    it('should have a current time of 10000', () => {

      deltaframe = new Deltaframe();

      deltaframe.start(draw);

      clock.tick(10000);

      chai.expect(deltaframe.time).to.equal(10000);

    });

    // The delta should be between 15 - 18.
    it('should have deltas between 15 and 18', () => {

      deltaframe = new Deltaframe();

      deltaframe.start(draw);

      clock.tick(10000);

      chai.expect(deltaframe.delta).to.be.within(15, 18);

    });

  });

  // Make sure that the loop pauses correctly.
  describe('#pause()', () => {

    let clock;
    let deltaframe;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
      deltaframe = null;
    });

    // The time shouldn't progress after being paused.
    it('should have the same time after being paused as at the time it was paused', () => {

      deltaframe = new Deltaframe();

      deltaframe.start(draw);

      clock.tick(20000);

      deltaframe.pause();

      clock.tick(20000);

      chai.expect(deltaframe.time).to.equal(20000);

    });

  });

  // Make sure that the loop resumes correctly after being paused.
  describe('#resume()', () => {

    let clock;
    let deltaframe;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
      deltaframe = null;
    });
    
    it('should have deltas between 15 and 18', () => {

      deltaframe = new Deltaframe();

      deltaframe.start(draw);

      clock.tick(20000);

      deltaframe.pause();

      clock.tick(20000);

      deltaframe.resume();

      clock.tick(8000);

      chai.expect(deltaframe.frame).to.equal(1747);

    });

  });

  // Make sure that the loop stops correctly.
  describe('#stop()', () => {

    let clock;
    let deltaframe;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
      deltaframe = null;
    });
    
    it('should reset time property to 0', () => {

      deltaframe = new Deltaframe();

      deltaframe.start(draw);

      clock.tick(20000);

      deltaframe.stop();

      chai.expect(deltaframe.time).to.equal(0);

    });

  });

});