/**
 * Screen Distance Detector
 * ────────────────────────
 * Detects: Too close to screen
 *
 * Uses the inter-shoulder pixel width as a proxy for
 * distance from the camera. When the user leans in,
 * shoulders appear wider in the frame.
 *
 * Calibrates on the first ~60 frames to establish
 * a baseline, then alerts if shoulderWidth exceeds
 * 130% of the baseline.
 */

import { POSTURE_TYPES } from "../types";
import { getDistance } from "../../utils/geometry";

// Module-level calibration state
let baselineWidth = null;
let calibrationSamples = [];
const CALIBRATION_FRAMES = 60;

/** Reset calibration (call when session restarts) */
export function resetScreenDistanceCalibration() {
  baselineWidth = null;
  calibrationSamples = [];
}

export function detectScreenDistance(kp) {
  const leftShoulder = kp["left_shoulder"];
  const rightShoulder = kp["right_shoulder"];

  if (!leftShoulder || !rightShoulder) {
    return { issue: null };
  }

  const shoulderWidth = getDistance(leftShoulder, rightShoulder);

  // ── Calibration phase ──
  if (calibrationSamples.length < CALIBRATION_FRAMES) {
    calibrationSamples.push(shoulderWidth);

    if (calibrationSamples.length === CALIBRATION_FRAMES) {
      // Use median for robustness
      const sorted = [...calibrationSamples].sort((a, b) => a - b);
      baselineWidth = sorted[Math.floor(sorted.length / 2)];
    }

    return { issue: null }; // Still calibrating
  }

  // ── Detection phase ──
  if (baselineWidth && shoulderWidth > baselineWidth * 1.3) {
    return { issue: POSTURE_TYPES.TOO_CLOSE };
  }

  return { issue: null };
}
