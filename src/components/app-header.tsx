"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, GraduationCap, Sun, Moon, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ProModal } from "@/components/pro-modal";

export function AppHeader() {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);

  // On mount: mark mounted + sync theme from DB (runs once)
  useEffect(() => {
    setMounted(true);
    // Fetch user's saved theme from DB and apply if different
    fetch("/api/user/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data.theme && data.theme !== theme) {
          setTheme(data.theme);
        }
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Toggle theme and persist to DB
  const handleThemeToggle = useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // Save to DB in the background (fire-and-forget)
    fetch("/api/user/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: newTheme }),
      keepalive: true,
    }).catch(() => {});
  }, [resolvedTheme, setTheme]);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-lg text-foreground"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            Revise AI
          </Link>

          <div className="flex items-center gap-2">
            {/* Upgrade button */}
            <button
              onClick={() => setProModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 hover:from-indigo-500/20 hover:to-purple-500/20 hover:border-indigo-500/30 transition-all group"
            >
              <Crown className="h-3.5 w-3.5 text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                Upgrade
              </span>
            </button>

            {/* Theme toggle button */}
            {mounted && (
              <button
                onClick={handleThemeToggle}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-card hover:bg-secondary transition-colors"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-indigo-500" />
                )}
              </button>
            )}

            {/* Profile menu */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Change Class"
                  labelIcon={<GraduationCap className="h-4 w-4" />}
                  onClick={() => router.push("/onboarding?change=true")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </div>
      </header>

      {/* Pro Modal */}
      <ProModal open={proModalOpen} onOpenChange={setProModalOpen} />
    </>
  );
}
