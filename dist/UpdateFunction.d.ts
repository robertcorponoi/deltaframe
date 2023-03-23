/** The structure of the function that is used by the RAF loop. */
export type RAFUpdateFunction = (timestamp: number) => void;
/**
 * The structure of the function that should be called every time the loop
 * updates.
 */
export type UpdateFunction = (delta: number, deltaAverage: number, timestamp: number) => void;
