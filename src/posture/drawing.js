/**
 * Pose Drawing — Canvas Rendering
 * ────────────────────────────────
 * Draws skeleton lines, keypoint dots, and the
 * neck-angle guide line onto the video overlay canvas.
 */

/** Skeleton connections to draw */
const SKELETON_PAIRS = [
  // Body
  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_elbow"],
  ["right_shoulder", "right_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_elbow", "right_wrist"],
  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_hip", "right_hip"],
  // Face
  ["nose", "left_eye"],
  ["nose", "right_eye"],
  ["left_eye", "left_ear"],
  ["right_eye", "right_ear"],
];

/** Colors for each severity level */
const COLOR_MAP = {
  good:    { line: "rgba(34, 211, 165, 0.4)",  dot: "#22d3a5", guide: "rgba(34, 211, 165, 0.6)" },
  warning: { line: "rgba(251, 191, 36, 0.4)",  dot: "#fbbf24", guide: "rgba(251, 191, 36, 0.6)" },
  bad:     { line: "rgba(248, 113, 113, 0.4)", dot: "#f87171", guide: "rgba(248, 113, 113, 0.6)" },
};

const MIN_CONFIDENCE = 0.3;

/**
 * Draw a full pose visualization onto a canvas.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} pose — MoveNet pose result
 * @param {string} level — "good" | "warning" | "bad"
 */
export function drawPose(ctx, pose, level) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const colors = COLOR_MAP[level] || COLOR_MAP.good;

  // Build keypoint lookup
  const kpMap = {};
  pose.keypoints.forEach((kp) => {
    if (kp.score > MIN_CONFIDENCE) kpMap[kp.name] = kp;
  });

  // ── Skeleton lines ──
  ctx.strokeStyle = colors.line;
  ctx.lineWidth = 2;
  SKELETON_PAIRS.forEach(([a, b]) => {
    if (kpMap[a] && kpMap[b]) {
      ctx.beginPath();
      ctx.moveTo(kpMap[a].x, kpMap[a].y);
      ctx.lineTo(kpMap[b].x, kpMap[b].y);
      ctx.stroke();
    }
  });

  // ── Keypoint dots ──
  pose.keypoints.forEach((kp) => {
    if (kp.score > MIN_CONFIDENCE) {
      ctx.beginPath();
      ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = colors.dot;
      ctx.shadowColor = colors.dot;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  });

  // ── Neck angle guide (dashed line: midShoulder → nose) ──
  drawNeckGuide(ctx, kpMap, colors.guide);
}

/**
 * Draw a dashed guide line from shoulder midpoint to nose.
 */
function drawNeckGuide(ctx, kpMap, color) {
  if (!kpMap["nose"] || !kpMap["left_shoulder"] || !kpMap["right_shoulder"]) {
    return;
  }

  const mid = {
    x: (kpMap["left_shoulder"].x + kpMap["right_shoulder"].x) / 2,
    y: (kpMap["left_shoulder"].y + kpMap["right_shoulder"].y) / 2,
  };

  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(mid.x, mid.y);
  ctx.lineTo(kpMap["nose"].x, kpMap["nose"].y);
  ctx.stroke();
  ctx.setLineDash([]);
}
