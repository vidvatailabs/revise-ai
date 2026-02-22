"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Forces dark theme while this component is mounted.
 * Used on unauthenticated pages (landing, sign-in, sign-up)
 * so they always appear in dark mode regardless of the user's saved preference.
 *
 * When user navigates to an authenticated page, AppHeader syncs their
 * real theme preference from the DB.
 */
export function ForceDarkTheme() {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "dark") {
      setTheme("dark");
    }
  }, [resolvedTheme, setTheme]);

  return null;
}
