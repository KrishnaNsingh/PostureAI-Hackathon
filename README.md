<div align="center">

# 🧠 PostureCoach - (Hack Matrix 26' Hackathon Winner) 

### Real-Time AI-Powered Posture Analysis

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Powered by TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-MoveNet-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![Built with Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-22d3a5.svg)](LICENSE)

**PostureCoach** uses your webcam and on-device machine learning to detect **7 posture issues** in real-time — no server, no data leaves your browser. Designed as a **calm, supportive digital coach**, it features a warm, human-centered interface, gamified health tracking, gentle break reminders, and a fully customizable settings panel.

[Getting Started](#-getting-started) · [Features](#-features) · [Architecture](#-architecture) · [Adding Detectors](#-adding-a-new-detector) · [Keyboard Shortcuts](#-keyboard-shortcuts)

</div>

---

## ✨ Features

### 🎯 Multi-Posture Detection Engine

PostureCoach classifies **7 distinct posture issues** across a 3-tier severity system:

| Issue | Severity | Detection Method |
|:------|:--------:|:-----------------|
| ✅ Good Posture | 🟢 Good | Neck angle within -95° to -65° range |
| ❌ Slouching | 🔴 Bad | Head dropped too far (angle < -95°) |
| ⚠️ Forward Head | 🔴 Bad | Head jutting forward (angle > -65°) |
| ↗️ Head Tilted | 🟡 Warning | Left/right ear Y-position asymmetry |
| ↔️ Leaning Sideways | 🟡 Warning | Shoulder-hip midpoint torso angle deviation |
| ⬆️ Uneven Shoulders | 🟡 Warning | Left/right shoulder height difference |
| 😣 Chin Tucked | 🟡 Warning | Nose too close to shoulder midpoint |
| 🤷 Shoulders Raised | 🟡 Warning | Ear-to-shoulder distance decreased (stress shrug) |
| 📏 Too Close to Screen | 🟡 Warning | Self-calibrating shoulder-width proximity estimate |

### 📊 Session Analytics
- **Per-frame recording** of posture data, scores, and detected issues
- **Session summary modal** with accuracy breakdown, timeline heatmap, and top issues
- **CSV export** — download raw session data for external analysis
- **Session history** — last 30 sessions persisted to localStorage

### ⏰ Break & Stretch Reminders
- Configurable countdown timer (default: 30 minutes)
- Fullscreen overlay with **randomized stretch routines** (neck rolls, shoulder shrugs, seated twist, wrist circles, standing stretch, 20-20-20 eye rule)
- Snooze option (5 minutes)

### 🏆 Gamification
- **8 achievements** to unlock: *First Steps*, *Iron Spine*, *Streak King*, *Dedicated*, *Habit Formed*, *Perfection*, *Marathon*, *Clean Sheet*
- Animated achievement toast with glowing border on unlock
- Progress persisted across sessions via localStorage

### ⚙️ Settings Panel
- **Detection sensitivity** — adjust neck angle range, head tilt threshold, lean detection angle
- **Voice alerts** — toggle on/off, control speed, pitch, and cooldown between alerts
- **Break timer** — enable/disable, set interval (10–60 minutes)
- **Display** — toggle skeleton lines and neck guide overlay
- All settings auto-saved to localStorage

### 💊 Health Intelligence Module
- Gamified health tips with XP progression and level tracking
- 6 science-backed posture benefit cards with unlock mechanics
- Interactive posture quiz with instant feedback
- Embedded video resources and daily habit checklist

### 🎨 Premium Calm UI/UX
- **Warm, human-centered design** with soft shadows, organic easing, and an ambient slow-drift gradient background
- **Calming Mode** — low-contrast, dimmed UI toggle for deep focus sessions
- 🧘‍♂️ **Supportive, non-judgmental status indicators** and gentle breathing animations instead of clinical "alarms"
- Toast notifications, immersive break overlays, and responsive design
- Google Fonts (DM Sans, DM Mono) for a friendly, approachable feel

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- A device with a **webcam**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/posture-ai.git
cd posture-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser. Grant camera permission when prompted.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗 Architecture

PostureCoach follows a **modular, single-responsibility architecture**. Each concern is isolated into its own file or directory.

```
src/
│
├── posture/                         # Posture detection engine
│   ├── types.js                        Classification config (labels, severity, voice)
│   ├── analyzer.js                     Orchestrator — runs all detectors
│   ├── drawing.js                      Canvas rendering (skeleton, dots, guides)
│   └── detectors/                      One file per posture check
│       ├── index.js                       Barrel export
│       ├── neckAngle.js                   Slouching & Forward Head
│       ├── headTilt.js                    Head Tilted
│       ├── shoulderLevel.js               Uneven Shoulders
│       ├── leanDetector.js                Leaning Sideways
│       ├── chinTuck.js                    Chin Tucked
│       ├── shoulderShrug.js               Shoulders Raised (stress)
│       └── screenDistance.js              Too Close to Screen
│
├── analytics/                       # Session tracking & persistence
│   ├── sessionTracker.js               Per-frame posture recording
│   └── storage.js                      localStorage read/write
│
├── features/                        # Feature modules
│   ├── breakReminder/                  Break timer overlay
│   │   ├── BreakOverlay.jsx
│   │   └── BreakOverlay.css
│   ├── gamification/                   Achievement system
│   │   ├── achievements.js
│   │   ├── AchievementToast.jsx
│   │   └── AchievementToast.css
│   ├── sessionSummary/                 End-of-session report
│   │   ├── SessionSummary.jsx
│   │   └── SessionSummary.css
│   └── settings/                       App configuration
│       ├── SettingsContext.jsx
│       ├── SettingsPanel.jsx
│       └── SettingsPanel.css
│
├── hooks/                           # Reusable React hooks
│   ├── useToast.js                     Toast notification system
│   ├── useBreakTimer.js                Configurable break countdown
│   └── useKeyboardShortcuts.js         Global keyboard shortcuts
│
├── utils/                           # Pure utility functions
│   ├── geometry.js                     getAngle, getDistance, getMidpoint
│   ├── insights.js                     AI insight message generator
│   └── exportReport.js                CSV export utility
│
├── component/                       # UI components
│   ├── PostureCamera.jsx               Main camera + detection component
│   ├── PostureCamera.css
│   ├── Navbar.jsx
│   ├── Navbar.css
│   └── ScrollToTop.tsx
│
└── pages/                           # Route pages
    ├── Dashboard.jsx                   Main posture analysis view
    ├── HealthTips.jsx                  Gamified health module
    └── HealthTips.css
```

---

## 🔌 Adding a New Detector

The plugin-style architecture makes extending detection trivial:

**1. Define the posture type** in `src/posture/types.js`:

```js
NECK_CRANE: {
  label: "Neck Crane",
  emoji: "🦒",
  level: "warning",
  voice: "Your neck is craning forward",
},
```

**2. Create the detector** in `src/posture/detectors/neckCrane.js`:

```js
import { POSTURE_TYPES } from "../types";

export function detectNeckCrane(kp) {
  // Your detection logic using keypoints
  // Return { issue: POSTURE_TYPES.NECK_CRANE } or { issue: null }
}
```

**3. Export it** from `src/posture/detectors/index.js`:

```js
export { detectNeckCrane } from "./neckCrane";
```

**4. Register it** in `src/posture/analyzer.js`:

```js
const crane = detectNeckCrane(kp);
// Add crane.issue to the issues array
```

That's it — the UI, voice alerts, scoring, and analytics automatically pick up the new detector.

---

## ⌨ Keyboard Shortcuts

| Key | Action |
|:---:|:-------|
| `Space` | Pause / resume detection |
| `F` | Toggle fullscreen camera |
| `M` | Toggle mute |
| `Esc` | Close settings panel or exit fullscreen |

---

## 🛠 Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Framework** | React 19 |
| **Bundler** | Vite 8 |
| **AI Model** | TensorFlow.js + MoveNet (SinglePose Lightning) |
| **Routing** | React Router 7 |
| **Styling** | Vanilla CSS with CSS custom properties |
| **Fonts** | Google Fonts (DM Sans, DM Mono) |
| **Persistence** | localStorage (settings, sessions, achievements) |
| **Voice** | Web Speech API (SpeechSynthesisUtterance) |

---

## 🔒 Privacy

PostureCoach runs **100% on-device**. Your webcam feed is processed locally by TensorFlow.js inside your browser. No video, keypoints, or posture data is ever sent to any external server. Session data is stored only in your browser's localStorage.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built using TensorFlow.js + MoveNet**

*PostureCoach — Sit tall. Live well.*

</div>
