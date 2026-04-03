/**
 * Shoulder Shrug Detector
 * ───────────────────────
 * Detects: Stress shrug (shoulders raised toward ears)
 *
 * Measures the vertical distance between ears and shoulders.
 * When stressed, people unconsciously raise their shoulders,
 * decreasing this distance.
 */

import { POSTURE_TYPES } from "../types";
import { getDistance } from "../../utils/geometry";

export function detectShoulderShrug(kp) {
  const leftEar = kp["left_ear"];
  const rightEar = kp["right_ear"];
  const leftShoulder = kp["left_shoulder"];
  const rightShoulder = kp["right_shoulder"];

  if (!leftShoulder || !rightShoulder) {
    return { issue: null };
  }

  const shoulderWidth = getDistance(leftShoulder, rightShoulder);
  let shrugScore = 0;
  let count = 0;

  // Check left side
  if (leftEar && leftShoulder) {
    const leftDist = Math.abs(leftEar.y - leftShoulder.y);
    // Normal ear-to-shoulder distance is roughly 30-50% of shoulder width
    if (leftDist < shoulderWidth * 0.2) {
      shrugScore += 1;
    }
    count += 1;
  }

  // Check right side
  if (rightEar && rightShoulder) {
    const rightDist = Math.abs(rightEar.y - rightShoulder.y);
    if (rightDist < shoulderWidth * 0.2) {
      shrugScore += 1;
    }
    count += 1;
  }

  // At least one side shrugging
  if (count > 0 && shrugScore > 0) {
    return { issue: POSTURE_TYPES.SHOULDER_SHRUG };
  }

  return { issue: null };
}
