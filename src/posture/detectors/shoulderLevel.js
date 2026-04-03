/**
 * Shoulder Level Detector
 * ───────────────────────
 * Detects: Uneven Shoulders
 *
 * Compares left shoulder Y vs right shoulder Y.
 * If the difference exceeds 15% of shoulder width,
 * the shoulders are unevenly raised.
 */

import { POSTURE_TYPES } from "../types";
import { getDistance } from "../../utils/geometry";

/** @param {Object} kp — keypoint map { name: { x, y, score } } */
export function detectShoulderLevel(kp) {
  const leftShoulder = kp["left_shoulder"];
  const rightShoulder = kp["right_shoulder"];

  if (!leftShoulder || !rightShoulder) {
    return { issue: null, shoulderTilt: 0 };
  }

  const shoulderWidth = getDistance(leftShoulder, rightShoulder);
  const shoulderTilt = Math.abs(leftShoulder.y - rightShoulder.y);
  const threshold = shoulderWidth * 0.15;

  if (shoulderTilt > threshold) {
    return { issue: POSTURE_TYPES.SHOULDERS_UNEVEN, shoulderTilt };
  }

  return { issue: null, shoulderTilt };
}
