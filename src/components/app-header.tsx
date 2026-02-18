"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, GraduationCap, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function AppHeader() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
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
              label={theme === "dark" ? "Light Mode" : "Dark Mode"}
              labelIcon={
                theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              }
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <UserButton.Action
              label="Change Class"
              labelIcon={<GraduationCap className="h-4 w-4" />}
              onClick={() => router.push("/onboarding?change=true")}
            />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    </header>
  );
}
