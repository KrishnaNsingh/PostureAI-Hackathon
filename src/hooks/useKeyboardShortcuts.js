/**
 * useKeyboardShortcuts
 * ────────────────────
 * Registers global keyboard shortcuts.
 * 
 * Shortcuts:
 *   M → Toggle mute
 *   Space → Pause/resume detection
 *   F → Toggle fullscreen camera
 *   Escape → Close any open panel
 */

import { useEffect } from "react";

export function useKeyboardShortcuts(handlers) {
  useEffect(() => {
    const onKeyDown = (e) => {
      // Don't trigger in input fields
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key.toLowerCase()) {
        case "m":
          handlers.onToggleMute?.();
          break;
        case " ":
          e.preventDefault();
          handlers.onTogglePause?.();
          break;
        case "f":
          handlers.onToggleFullscreen?.();
          break;
        case "escape":
          handlers.onEscape?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlers]);
}
