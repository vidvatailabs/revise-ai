"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GraduationCap, Loader2, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

const classes = [
  {
    value: 8,
    label: "Class 8",
    description: "CBSE Class 8",
    emoji: "📗",
  },
  {
    value: 9,
    label: "Class 9",
    description: "CBSE Class 9",
    emoji: "📘",
  },
  {
    value: 10,
    label: "Class 10",
    description: "CBSE Class 10 - Board Exam",
    emoji: "📕",
    recommended: true,
  },
];

interface OnboardingFormProps {
  currentClass?: number | null;
  isChanging?: boolean;
}

export function OnboardingForm({ currentClass, isChanging }: OnboardingFormProps) {
  const [selectedClass, setSelectedClass] = useState<number | null>(currentClass ?? null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isSameClass = isChanging && selectedClass === currentClass;

  const handleSubmit = async () => {
    if (!selectedClass) return;

    // Don't submit if user selected the same class they already have
    if (isSameClass) {
      router.push("/dashboard");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedClass }),
      });
      if (res.ok) {
        // Hard navigation to ensure dashboard fetches fresh data for the new class
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Failed to save class:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {isChanging && (
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4">
          <GraduationCap className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isChanging ? "Change Your Class" : "Welcome to Revise AI!"}
        </h1>
        <p className="text-muted-foreground text-lg">
          {isChanging
            ? "Select a different class to update your subjects"
            : "Select your class to get started with personalised revision"}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {classes.map((cls) => {
          const isCurrent = isChanging && currentClass === cls.value;
          return (
            <button
              key={cls.value}
              onClick={() => setSelectedClass(cls.value)}
              className={`w-full p-5 rounded-xl border text-left transition-all relative ${
                selectedClass === cls.value
                  ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                  : "border-border hover:border-indigo-500/40 bg-card hover:bg-card/80"
              }`}
            >
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    <Check className="h-3 w-3" />
                    Current
                  </span>
                )}
                {cls.recommended && (
                  <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cls.emoji}</span>
                <div>
                  <div className="font-semibold text-foreground text-lg">
                    {cls.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {cls.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!selectedClass || loading}
        className="w-full h-12 text-base bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg shadow-indigo-500/20"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Updating...
          </>
        ) : isChanging ? (
          isSameClass ? "Back to Dashboard →" : "Update Class →"
        ) : (
          "Continue →"
        )}
      </Button>
    </div>
  );
}
