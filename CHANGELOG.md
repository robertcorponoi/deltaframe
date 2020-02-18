## 2.0.1 / 2020-02-18
- [DOCS] Updated documentation to reflect new changes.

## 2.0.0 / 2020-02-18
- [FEATURE] Separated extra 'bulky' features to deltaframe-extra. This package will be dedicated to just being a lightweight game loop runner while deltaframe-extra will consist of other feature such as tasks.
- [FEATURE] Removed tasks from this and moved them to deltaframe-extra.
- [MISC] Updated dependencies to their latest versions.
- [MISC] Removed mocha and chai dependencies as they're referenced by script tags in the test index.html.
- [MISC] Changed CHANGELOG format.

## 1.3.0 / 2020-01-23
- [FEATURE] Added ability to add tasks that can run one or more times on an interval with an optional delay.
- [DOCS] Added documentation about tasks.
- [TEST] Added global to mocha setup to prevent an irrelevant error from displaying.

## 1.2.0 / 2020-01-14
- [FEATURE] Added `time` as a getter.
- [MISC] Removed unnecessary jsdoc comments.
- [MISC] Removed `public` from methods as its redundant.

## 1.1.7 / 2020-01-14
- [MISC] Updated dev dependencies to their latest versions.
- [MISC] Updated license year to reflect new year.
- [MISC] Moved logo to graphics repo and updated reference in the README.

## 1.1.6 / 2019-12-26
- [MISC] Updated dev dependencies to their latest versions.
- [MISC] Added testing section in README.
- [MISC] Cleaned up spacinig in code blocks in README.

## 1.1.4 / 2019-12-08
- [MISC] Updated dev dependencies to their latest versions.

## 1.1.3 / 2019-11-03
- [FEATURE] Removed testing dependencies and replaced them with unpkg scripts.
- [MISC] Added more badges to README.

## 1.1.1 / 2019-11-03
- [FEATURE] Updated all dependencies to their latest versions.

## 1.1.0 / 2019-07-29
- [FEATURE] Added the visibility change functionality fully so that the timer pauses and resumes depending on whether or not the page is in focus.
- [FEATURE] Cleaned up tests of unnecessary comments.

## 1.0.5 / 2019-07-29
- [FEATURE] Updated all dev dependencies to their latest versions.

## 1.0.4 / 2019-07-17
- [HOTFIX] Updated all dev dependencies to their latest versions and fixed any security vulnerabilities found in them.

## 1.0.3 / 2019-05-12
- Made the initialization options optional.
- Updated Typescript definitions.

## 1.0.2 / 2019-05-12
- Cleaned up unused options from tsconfig
- Updated all dev dependencies to the latest versions.
- Updated documentation.

## 1.0.1 / 2019-03-10
- Added missing `typings` key in `package.json`.
- Moved the location of the bundled file from `dist/deltaframe.js` to the root directory.
- Updated all dev dependencies.

## 1.0.0 / 2018-01-26
- Added Typescript definitions with Babel transpiling.
- Added rollup as the module bundler which exports to `src/deltaframe.js`.
- Changed the initialization options into their own Object for greater flexibility.
- The `minFps` and `targetFps` are now automatically converted to decimals in the new `Options` object.
- Deltaframe is now exported as a default module so instead of using `import { Deltaframe } from './path/to/deltaframe.js` you can now use `import Deltaframe from './path/to/deltaframe.js'`.

## 0.2.0 / 2018-12-20
- Added getters for various properties:
	- `timesRestarted`: Returns the number of times Deltaframe has had to restart due to the average fps dipping below the minimum fps.
	- `isRunning`: Returns `true` if the animation loop is currently running.
	- `isPaused`: Returns `true` if Deltaframe is paused.
	- `frame`: Returns the current frame number that animation is on.
	- `time`: Returns the current time of the animation.
	- `delta`: Returns the average time between frames at that moment.
- Changed the visibility change event to use `addEventListener` instead of `onVisibilityChange`.
- Added a new initialization option called `runTime` which can be used to specify a time, in milliseconds, that Deltaframe should run the animation for.
- Expanded test cases to account for the new `runTime` option being added.

## 0.1.0 / 2018-08-26
- Initial Release