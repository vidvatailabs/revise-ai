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
} from "lucide-react";

interface ProModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ORIGINAL_PRICE = 2999;
const DISCOUNT_PERCENT = 70;
const DISCOUNTED_PRICE = Math.round(ORIGINAL_PRICE * (1 - DISCOUNT_PERCENT / 100));

const PRO_FEATURES = [
  { icon: Brain, text: "All subjects & chapters unlocked" },
  { icon: Zap, text: "Unlimited quiz attempts with explanations" },
  { icon: Sparkles, text: "AI-powered revision suggestions" },
  { icon: Shield, text: "Priority support & early access" },
  { icon: Star, text: "Ad-free learning experience" },
];

export function ProModal({ open, onOpenChange }: ProModalProps) {
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
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="relative z-50 w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-background/50 hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Gradient header — compact on mobile */}
          <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 px-5 pt-6 pb-4 sm:px-6 sm:pt-8 sm:pb-6 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="relative">
              <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm mb-3 sm:mb-4">
                <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                Upgrade to Pro
              </h2>
              <p className="text-white/80 text-xs sm:text-sm">
                Unlock the full power of Revise AI
              </p>
            </div>
          </div>

          {/* Pricing — tighter on mobile */}
          <div className="px-5 sm:px-6 pt-4 sm:pt-6 pb-1 sm:pb-2 text-center">
            <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-3">
              <Sparkles className="h-3 w-3" />
              LIMITED TIME — {DISCOUNT_PERCENT}% OFF
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-base sm:text-lg text-muted-foreground line-through">
                ₹{ORIGINAL_PRICE.toLocaleString("en-IN")}
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-foreground">
                ₹{DISCOUNTED_PRICE}
              </span>
              <span className="text-muted-foreground text-xs sm:text-sm">/year</span>
            </div>
            <p className="text-muted-foreground text-[10px] sm:text-xs mt-0.5 sm:mt-1">
              That&apos;s just ₹{Math.round(DISCOUNTED_PRICE / 12)}/month
            </p>
          </div>

          {/* Features — compact rows on mobile */}
          <div className="px-5 sm:px-6 py-3 sm:py-4">
            <div className="space-y-2 sm:space-y-3">
              {PRO_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                    <feature.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-foreground">{feature.text}</span>
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 ml-auto shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 sm:pt-2">
            <button
              onClick={handleUpgrade}
              className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-[0.98]"
            >
              🚀 Upgrade to Pro — ₹{DISCOUNTED_PRICE}/yr
            </button>
            <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
              Cancel anytime • Secure payment • Instant access
            </p>
          </div>

          {/* Coming soon toast */}
          {showToast && (
            <div className="absolute bottom-4 left-4 right-4 bg-foreground text-background text-xs sm:text-sm font-medium text-center py-2.5 sm:py-3 px-4 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 fade-in-0">
              🎉 Payment integration coming soon! Stay tuned.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
