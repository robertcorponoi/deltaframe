import sinon from "sinon";
import { createCanvas } from "canvas";

import Deltaframe from "../src/index";

let deltaframe: Deltaframe | null;

let clock: sinon.SinonFakeTimers;
let spy: sinon.SinonSpy;

let animTime: number;
let animDeltaAverage: number;
let timesCalled: number;

describe("Creating a new instance", () => {
    it("should initialize Deltaframe with all default values", () => {
        deltaframe = new Deltaframe();

        expect(deltaframe.options.minFps).toBe(15);
        expect(deltaframe.options.targetFps).toBe(60);
        expect(deltaframe.options.maxRestartAttempts).toBe(Infinity);
        expect(deltaframe.options.runTime).toBe(Infinity);
        expect(deltaframe.options.forceSetTimeout).toBe(false);
    });

    it("should return the decimal equivalent of 25 fps", () => {
        deltaframe = new Deltaframe({ minFps: 25 });

        expect(deltaframe.minFpsCalc).toBe(40);
    });

    it("should return the decimal equivalent of 45 fps", () => {
        deltaframe = new Deltaframe({ targetFps: 45 });

        expect(deltaframe.targetFpsCalc).toBe(22);
    });
});

describe("Running an animation", () => {
    beforeEach(() => (clock = sinon.useFakeTimers()));
    afterEach(() => clock.restore());

    it("should call the animation function continuously", () => {
        deltaframe = new Deltaframe();
        spy = sinon.spy(draw);

        deltaframe.start(spy);
        clock.tick(1000);

        expect(spy.called).toBe(true);
    });

    it("should run for ten seconds and _time should be equal to 10000", () => {
        deltaframe = new Deltaframe();
        deltaframe.start(draw);

        clock.tick(10000);

        expect(animTime).toBe(10000);
    });

    it("should have delta averages between 15 and 18 milliseconds", () => {
        deltaframe = new Deltaframe();
        deltaframe.start(draw);

        clock.tick(10000);

        expect(animDeltaAverage).toBeGreaterThanOrEqual(15);
        expect(animDeltaAverage).toBeLessThanOrEqual(18);
    });

    it("should only run the animation for the specified amount of time", () => {
        deltaframe = new Deltaframe({ runTime: 5000 });
        deltaframe.start(draw);

        clock.tick(20000);

        expect(animTime).toBe(4992);
    });
});

describe("Pausing an animation", () => {
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

    it("should not run the draw function anymore when paused", () => {
        if (!deltaframe) fail();

        deltaframe.start(draw);
        clock.tick(2000);

        deltaframe.pause();
        clock.tick(10000);

        expect(timesCalled).toBeGreaterThanOrEqual(120);
        expect(timesCalled).toBeLessThanOrEqual(122);
        expect(deltaframe.running).toBe(false);
        expect(deltaframe.paused).toBe(true);
    });

    it("should not update the time property while paused", () => {
        if (!deltaframe) fail();
        deltaframe.start(draw);

        clock.tick(20000);

        deltaframe.pause();

        clock.tick(2000);

        expect(animTime).toBe(20000);
    });
});

describe("Resuming an animation", () => {
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

    it("should continue running the draw function after being resuming Deltaframe", () => {
        if (!deltaframe) fail();
        deltaframe.start(draw);

        clock.tick(2000);

        deltaframe.pause();
        deltaframe.resume();

        clock.tick(10000);

        expect(timesCalled).toBeGreaterThanOrEqual(745);
        expect(timesCalled).toBeLessThanOrEqual(747);
        expect(deltaframe.running).toBe(true);
        expect(deltaframe.paused).toBe(false);
    });

    it("should continue updating the time after being resumed", () => {
        if (!deltaframe) fail();
        deltaframe.start(draw);

        clock.tick(20000);

        deltaframe.pause();
        deltaframe.resume();

        clock.tick(2000);

        expect(animTime).toBe(22000);
    });
});

describe("Stopping an animation", () => {
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

    it("should reset all properties when Deltaframe is stopped", () => {
        if (!deltaframe) fail();

        const testFn = () => null;
        const testFnStr = testFn.toString();

        deltaframe.start(draw);

        clock.tick(20000);

        deltaframe.stop();

        expect(deltaframe.restartAttempts).toBe(0);
        expect(deltaframe.running).toBe(false);
        expect(deltaframe.paused).toBe(false);
        expect(deltaframe.fn.toString()).toEqual(testFnStr);
        expect(deltaframe.frame).toBe(0);
        expect(deltaframe.time).toBe(0);
        expect(deltaframe.prevTime).toBe(0);
        expect(deltaframe.delta).toBe(0);
        expect(deltaframe.deltaHistory).toEqual([]);
        expect(deltaframe.deltaIndex).toBe(0);
        expect(deltaframe.running).toBe(false);
        expect(deltaframe.paused).toBe(false);
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
const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

const draw = (time: number, delta: number, deltaAverage: number) => {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(x, y - 30, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    x += 2;
    y += -2;

    animTime = time;
    animDeltaAverage = deltaAverage;
    timesCalled++;
};
