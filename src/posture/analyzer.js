/**
 * Posture Analyzer — Orchestrator
 * ────────────────────────────────
 * Runs all registered detectors against a pose and
 * returns a unified result with the primary issue,
 * all detected issues, and measurement data.
 */

import { POSTURE_TYPES, DEFAULT_RESULT } from "./types";
import {
  detectNeckAngle,
  detectHeadTilt,
  detectShoulderLevel,
  detectLean,
  detectChinTuck,
  detectShoulderShrug,
  detectScreenDistance,
} from "./detectors";

const MIN_CONFIDENCE = 0.3;

function buildKeypointMap(pose) {
  const kp = {};
  pose.keypoints.forEach((k) => {
    if (k.score > MIN_CONFIDENCE) {
      kp[k.name] = k;
    }
  });
  return kp;
}

/**
 * Analyze a single pose and return posture classification.
 */
export function analyzePosture(pose) {
  const kp = buildKeypointMap(pose);

  if (!kp["nose"] || !kp["left_shoulder"] || !kp["right_shoulder"]) {
    return DEFAULT_RESULT;
  }

  // ── Run all detectors ──
  const neck = detectNeckAngle(kp);
  const head = detectHeadTilt(kp);
  const shoulders = detectShoulderLevel(kp);
  const lean = detectLean(kp);
  const chin = detectChinTuck(kp);
  const shrug = detectShoulderShrug(kp);
  const distance = detectScreenDistance(kp);

  // ── Collect all issues ──
  const issues = [
    neck.issue,
    head.issue,
    shoulders.issue,
    lean.issue,
    chin.issue,
    shrug.issue,
    distance.issue,
  ].filter(Boolean);

  // ── Determine primary (worst) issue ──
  let primary = POSTURE_TYPES.GOOD;
  if (issues.length > 0) {
    const badIssues = issues.filter((i) => i.level === "bad");
    primary = badIssues.length > 0 ? badIssues[0] : issues[0];
  }

  return {
    primary,
    issues,
    neckAngle: neck.neckAngle || 0,
    shoulderTilt: shoulders.shoulderTilt || 0,
    headTilt: head.headTilt || 0,
  };
}
