"use client";

import { useState } from "react";
import {
  Crown,
  X,
  Check,
  Sparkles,
  Brain,
  Zap,
  Shield,
  Star,
  Palette,
  BookOpen,
  Bot,
  FileCheck,
  ClipboardList,
  Share2,
  Lock,
  Rocket,
} from "lucide-react";

interface ProModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ── Pricing ── */
const PRO_ORIGINAL = 2999;
const PRO_DISCOUNT = 70;
const PRO_PRICE = Math.round(PRO_ORIGINAL * (1 - PRO_DISCOUNT / 100));

const MAX_ORIGINAL = 4999;
const MAX_DISCOUNT = 60;
const MAX_PRICE = Math.round(MAX_ORIGINAL * (1 - MAX_DISCOUNT / 100));

/* ── Features per plan ── */
const FREE_FEATURES = [
  { icon: BookOpen, text: "Limited chapters per subject" },
  { icon: Share2, text: "Share to unlock more chapters" },
  { icon: Palette, text: "Dark & Light themes" },
  { icon: Zap, text: "3 quiz attempts per chapter" },
];

const PRO_FEATURES = [
  { icon: BookOpen, text: "All subjects & chapters unlocked for 1 year" },
  { icon: Zap, text: "Unlimited quiz attempts with explanations" },
  { icon: Palette, text: "Additional premium colour themes" },
  { icon: Shield, text: "Ad-free learning experience" },
  { icon: Star, text: "Customisable flashcard colour profiles" },
];

const MAX_FEATURES = [
  { icon: Sparkles, text: "Everything in Pro, plus:" },
  { icon: Brain, text: "AI-powered revision suggestions" },
  { icon: Bot, text: "AI assistant for doubt resolution" },
  { icon: FileCheck, text: "Question paper evaluation" },
  { icon: ClipboardList, text: "Practice papers & mock tests" },
];

type PlanTab = "pro" | "max";

export function ProModal({ open, onOpenChange }: ProModalProps) {
  const [activeTab, setActiveTab] = useState<PlanTab>("pro");
  const [showToast, setShowToast] = useState(false);

  if (!open) return null;

  const handleUpgrade = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative z-50 w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 z-10 h-7 w-7 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white/80 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-5 pt-6 pb-5 sm:px-6 sm:pt-7 sm:pb-6 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_70%)]" />
            <div className="relative">
              <div className="inline-flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm mb-2.5 sm:mb-3">
                <Rocket className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white mb-0.5">
                Choose Your Plan
              </h2>
              <p className="text-white/75 text-xs sm:text-sm">
                Supercharge your exam preparation
              </p>
            </div>
          </div>

          {/* Plan Toggle */}
          <div className="px-5 sm:px-6 pt-4 sm:pt-5">
            <div className="flex bg-secondary rounded-xl p-1 gap-1">
              <button
                onClick={() => setActiveTab("pro")}
                className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "pro"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Crown className="h-3.5 w-3.5" /> Pro
                </span>
              </button>
              <button
                onClick={() => setActiveTab("max")}
                className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "max"
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Pro Max
                </span>
              </button>
            </div>
          </div>

          {/* ── PRO Tab ── */}
          {activeTab === "pro" && (
            <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-2">
              {/* Pricing */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                  <Sparkles className="h-3 w-3" />
                  {PRO_DISCOUNT}% OFF - LIMITED TIME
                </div>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-sm sm:text-base text-muted-foreground line-through">
                    ₹{PRO_ORIGINAL.toLocaleString("en-IN")}
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">
                    ₹{PRO_PRICE}
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm">/year</span>
                </div>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-0.5">
                  That&apos;s just ₹{Math.round(PRO_PRICE / 12)}/month
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 sm:space-y-2.5">
                {PRO_FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                      <f.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
                    </div>
                    <span className="text-xs sm:text-sm text-foreground flex-1">{f.text}</span>
                    <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={handleUpgrade}
                className="w-full mt-4 sm:mt-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 active:scale-[0.98]"
              >
                🚀 Upgrade to Pro - ₹{PRO_PRICE}/yr
              </button>
            </div>
          )}

          {/* ── PRO MAX Tab ── */}
          {activeTab === "max" && (
            <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-2">
              {/* Pricing */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                  <Sparkles className="h-3 w-3" />
                  {MAX_DISCOUNT}% OFF - LIMITED TIME
                </div>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-sm sm:text-base text-muted-foreground line-through">
                    ₹{MAX_ORIGINAL.toLocaleString("en-IN")}
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">
                    ₹{MAX_PRICE.toLocaleString("en-IN")}
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm">/year</span>
                </div>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-0.5">
                  That&apos;s just ₹{Math.round(MAX_PRICE / 12)}/month
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 sm:space-y-2.5">
                {MAX_FEATURES.map((f, i) => (
                  <div key={i} className={`flex items-center gap-2.5 ${i === 0 ? "" : ""}`}>
                    <div className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg ${
                      i === 0 ? "bg-amber-500/10" : "bg-violet-500/10"
                    }`}>
                      <f.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                        i === 0 ? "text-amber-500" : "text-violet-500"
                      }`} />
                    </div>
                    <span className={`text-xs sm:text-sm flex-1 ${
                      i === 0 ? "font-semibold text-amber-600 dark:text-amber-400" : "text-foreground"
                    }`}>{f.text}</span>
                    {i > 0 && <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={handleUpgrade}
                className="w-full mt-4 sm:mt-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 active:scale-[0.98]"
              >
                ⚡ Upgrade to Pro Max - ₹{MAX_PRICE.toLocaleString("en-IN")}/yr
              </button>
            </div>
          )}

          {/* Free Plan Note */}
          <div className="px-5 sm:px-6 pt-3 pb-5 sm:pb-6">
            <div className="rounded-xl border border-border bg-secondary/50 p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  Free Plan
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {FREE_FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <f.icon className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="text-[11px] sm:text-xs text-muted-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-3">
              Cancel anytime · Secure payment · Instant access
            </p>
          </div>

          {/* Coming soon toast */}
          {showToast && (
            <div className="absolute bottom-4 left-4 right-4 bg-foreground text-background text-xs sm:text-sm font-medium text-center py-2.5 px-4 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 fade-in-0 z-50">
              🎉 Payment integration coming soon! Stay tuned.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
