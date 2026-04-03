/**
 * Posture Detectors — Barrel Export
 *
 * Each detector follows the same interface:
 *   detectXxx(keypointMap) → { issue: PostureType | null, ...metrics }
 *
 * To add a new posture detector:
 *   1. Create a new file in this folder
 *   2. Export a function matching the interface above
 *   3. Import and re-export it here
 *   4. Register it in ../analyzer.js
 */

export { detectNeckAngle } from "./neckAngle";
export { detectHeadTilt } from "./headTilt";
export { detectShoulderLevel } from "./shoulderLevel";
export { detectLean } from "./leanDetector";
export { detectChinTuck } from "./chinTuck";
export { detectShoulderShrug } from "./shoulderShrug";
export { detectScreenDistance } from "./screenDistance";
