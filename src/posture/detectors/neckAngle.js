/**
 * Neck Angle Detector
 * ───────────────────
 * Detects: Slouching, Forward Head
 *
 * Measures the angle from the midpoint of both shoulders
 * to the nose. An upright neck produces ~-80° (straight up).
 *
 *   -95° to -65° → Good
 *   > -65°       → Forward Head (leaning toward screen)
 *   < -95°       → Slouching (head dropped down)
 */

import { POSTURE_TYPES } from "../types";
import { getAngle, getMidpoint } from "../../utils/geometry";

/** @param {Object} kp — keypoint map { name: { x, y, score } } */
export function detectNeckAngle(kp) {
  const nose = kp["nose"];
  const leftShoulder = kp["left_shoulder"];
  const rightShoulder = kp["right_shoulder"];

  // Need all three to calculate
  if (!nose || !leftShoulder || !rightShoulder) {
    return { issue: null, neckAngle: 0 };
  }

  const midShoulder = getMidpoint(leftShoulder, rightShoulder);
  const neckAngle = getAngle(midShoulder, nose);

  if (neckAngle >= -95 && neckAngle <= -65) {
    return { issue: null, neckAngle };
  }

  // Head too far forward (angle closer to 0°)
  if (neckAngle > -65) {
    return { issue: POSTURE_TYPES.FORWARD_HEAD, neckAngle };
  }

  // Head dropped too much (angle < -95°)
  return { issue: POSTURE_TYPES.SLOUCHING, neckAngle };
}
