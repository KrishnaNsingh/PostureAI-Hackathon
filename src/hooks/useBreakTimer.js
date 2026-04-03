/**
 * useBreakTimer — Configurable break reminder hook
 */

import { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_INTERVAL = 0.5 * 60 * 1000; // 30 minutes

export function useBreakTimer(intervalMs = DEFAULT_INTERVAL) {
  const [timeLeft, setTimeLeft] = useState(intervalMs);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPaused || isBreakTime) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          setIsBreakTime(true);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, isBreakTime]);

  // Update interval if setting changes
  useEffect(() => {
    if (!isBreakTime) {
      setTimeLeft(intervalMs);
    }
  }, [intervalMs]);

  const snooze = useCallback((minutes = 5) => {
    setIsBreakTime(false);
    setTimeLeft(minutes * 60 * 1000);
  }, []);

  const reset = useCallback(() => {
    setIsBreakTime(false);
    setTimeLeft(intervalMs);
  }, [intervalMs]);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return {
    timeLeft,
    timeFormatted: formatTime(timeLeft),
    isBreakTime,
    isPaused,
    snooze,
    reset,
    togglePause,
  };
}
