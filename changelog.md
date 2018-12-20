## 0.1.0

* Initial Release

## 0.2.0

* Added pseudo-privacy to Deltaframe properties and added the getters `timesRestarted`, `isRunning`, `isPaused`, `frame`, `time`, and `delta` to properties that can be read but should not be modified.
* Changed the visiblity event to use `addEventListener` instead of `onVisibilityChange`.
* Added a new initialization parameter `runTime` which can used to run Deltaframe for only a certain amount of time and stop automatically when that time is reached.
* Expanded the test cases to account for changes.