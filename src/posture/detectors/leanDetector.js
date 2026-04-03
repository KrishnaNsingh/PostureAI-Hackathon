/**
 * Lean Detector
 * ─────────────
 * Detects: Leaning Sideways
 *
 * Measures the angle between the hip midpoint and shoulder
 * midpoint. A perfectly upright torso produces ~-90°.
 * A deviation > 12° means the user is leaning.
 */

import { POSTURE_TYPES } from "../types";
import { getAngle, getMidpoint } from "../../utils/geometry";

/** @param {Object} kp — keypoint map { name: { x, y, score } } */
export function detectLean(kp) {
  const leftShoulder = kp["left_shoulder"];
  const rightShoulder = kp["right_shoulder"];
  const leftHip = kp["left_hip"];
  const rightHip = kp["right_hip"];

  if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
    return { issue: null };
  }

  const midShoulder = getMidpoint(leftShoulder, rightShoulder);
  const midHip = getMidpoint(leftHip, rightHip);

  const torsoAngle = getAngle(midHip, midShoulder);
  // Perfect upright is ~-90°. Deviation > 12° = leaning
  const deviation = Math.abs(torsoAngle + 90);

  if (deviation > 12) {
    return { issue: POSTURE_TYPES.LEANING };
  }

  return { issue: null };
}
