1.1.0 / 2019-07-29
==================
* [FEATURE] Added the visibility change functionality fully so that the timer pauses and resumes depending on whether or not the page is in focus.
* [FEATURE] Cleaned up tests of unnecessary comments.

1.0.5 / 2019-07-29
==================
* [FEATURE] Updated all dev dependencies to their latest versions.

1.0.4 / 2019-07-17
==================
* [HOTFIX] Updated all dev dependencies to their latest versions and fixed any security vulnerabilities found in them.

1.0.3 / 2019-05-12
==================
* Made the initialization options optional.
* Updated Typescript definitions.

1.0.2 / 2019-05-12
==================
* Cleaned up unused options from tsconfig
* Updated all dev dependencies to the latest versions.
* Updated documentation.

1.0.1 / 2019-03-10
==================
* Added missing `typings` key in `package.json`.
* Moved the location of the bundled file from `dist/deltaframe.js` to the root directory.
* Updated all dev dependencies.

1.0.0 / 2018-01-26
==================

* Added Typescript definitions with Babel transpiling.
* Added rollup as the module bundler which exports to `src/deltaframe.js`.
* Changed the initialization options into their own Object for greater flexibility.
* The `minFps` and `targetFps` are now automatically converted to decimals in the new `Options` object.
* Deltaframe is now exported as a default module so instead of using `import { Deltaframe } from './path/to/deltaframe.js` you can now use `import Deltaframe from './path/to/deltaframe.js'`.

0.2.0 / 2018-12-20
==================

* Added getters for various properties:
	- `timesRestarted`: Returns the number of times Deltaframe has had to restart due to the average fps dipping below the minimum fps.
	- `isRunning`: Returns `true` if the animation loop is currently running.
	- `isPaused`: Returns `true` if Deltaframe is paused.
	- `frame`: Returns the current frame number that animation is on.
	- `time`: Returns the current time of the animation.
	- `delta`: Returns the average time between frames at that moment.
* Changed the visibility change event to use `addEventListener` instead of `onVisibilityChange`.
* Added a new initialization option called `runTime` which can be used to specify a time, in milliseconds, that Deltaframe should run the animation for.
* Expanded test cases to account for the new `runTime` option being added.

0.1.0 / 2018-08-26
==================

* Initial Release