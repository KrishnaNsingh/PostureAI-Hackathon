/* ═══════════════════════════════════════════
   POSTURE TYPES — Classification Config
   ═══════════════════════════════════════════
   Each posture type defines:
     label  — Human-readable name
     emoji  — Status icon
     level  — Severity: "good" | "warning" | "bad"
     voice  — Text-to-speech alert (null = silent)
═══════════════════════════════════════════ */

export const POSTURE_TYPES = {
  GOOD: {
    label: "Good Posture",
    emoji: "✅",
    level: "good",
    voice: null,
  },
  SLOUCHING: {
    label: "Slouching",
    emoji: "❌",
    level: "bad",
    voice: "Sit up straight, you're slouching",
  },
  FORWARD_HEAD: {
    label: "Forward Head",
    emoji: "⚠️",
    level: "bad",
    voice: "Pull your head back, it's too far forward",
  },
  HEAD_TILTED: {
    label: "Head Tilted",
    emoji: "↗️",
    level: "warning",
    voice: "Straighten your head, it's tilted",
  },
  LEANING: {
    label: "Leaning Sideways",
    emoji: "↔️",
    level: "warning",
    voice: "You're leaning to one side",
  },
  SHOULDERS_UNEVEN: {
    label: "Uneven Shoulders",
    emoji: "⬆️",
    level: "warning",
    voice: "Level your shoulders, one is higher",
  },
  CHIN_TUCK: {
    label: "Chin Tucked",
    emoji: "😣",
    level: "warning",
    voice: "Relax your chin, it's tucked too far in",
  },
  SHOULDER_SHRUG: {
    label: "Shoulders Raised",
    emoji: "🤷",
    level: "warning",
    voice: "Drop your shoulders, they're raised from stress",
  },
  TOO_CLOSE: {
    label: "Too Close to Screen",
    emoji: "📏",
    level: "warning",
    voice: "You're too close to the screen, lean back",
  },
  DETECTING: {
    label: "Detecting…",
    emoji: "🔍",
    level: "good",
    voice: null,
  },
};

/** Default result returned when detection hasn't started */
export const DEFAULT_RESULT = {
  primary: POSTURE_TYPES.DETECTING,
  issues: [],
  neckAngle: 0,
  shoulderTilt: 0,
  headTilt: 0,
};
