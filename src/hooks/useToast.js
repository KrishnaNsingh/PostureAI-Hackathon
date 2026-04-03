/**
 * useToast — Toast notification hook
 * ───────────────────────────────────
 * Provides a simple API for showing auto-dismissing
 * toast notifications. Max 3 visible at once.
 *
 * Usage:
 *   const { toasts, showToast, dismissToast } = useToast();
 *   showToast("Something happened!", "warning");
 */

import { useState, useCallback, useRef } from "react";

export function useToast({ maxToasts = 3, duration = 4000 } = {}) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const showToast = useCallback(
    (message, type = "warning") => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev.slice(-(maxToasts - 1)), { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [maxToasts, duration],
  );

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}
