"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false during server render / before hydration, true once React is running.
 * Used to keep submit buttons disabled until the form's JavaScript is ready,
 * so a fast tap on a slow connection can't trigger a native form submission.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
