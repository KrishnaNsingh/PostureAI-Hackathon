/**
 * Head Tilt Detector
 * ──────────────────
 * Detects: Head Tilted
 *
 * Compares left ear Y vs right ear Y.
 * If the difference exceeds 12% of shoulder width,
 * the head is tilted sideways.
 */

import { POSTURE_TYPES } from "../types";
import { getDistance } from "../../utils/geometry";

/** @param {Object} kp — keypoint map { name: { x, y, score } } */
export function detectHeadTilt(kp) {
  const leftEar = kp["left_ear"];
  const rightEar = kp["right_ear"];
  const leftShoulder = kp["left_shoulder"];
  const rightShoulder = kp["right_shoulder"];

  if (!leftEar || !rightEar || !leftShoulder || !rightShoulder) {
    return { issue: null, headTilt: 0 };
  }

  const shoulderWidth = getDistance(leftShoulder, rightShoulder);
  const headTilt = Math.abs(leftEar.y - rightEar.y);
  const threshold = shoulderWidth * 0.12;

  if (headTilt > threshold) {
    return { issue: POSTURE_TYPES.HEAD_TILTED, headTilt };
  }

  return { issue: null, headTilt };
}
