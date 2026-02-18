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
  { icon: Shield, text: "Priority support & early access to new features" },
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
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative z-50 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-background/50 hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Gradient header */}
          <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 px-6 pt-8 pb-6 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="relative">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Upgrade to Pro
              </h2>
              <p className="text-white/80 text-sm">
                Unlock the full power of Revise AI
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="px-6 pt-6 pb-2 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <Sparkles className="h-3 w-3" />
              LIMITED TIME — {DISCOUNT_PERCENT}% OFF
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-lg text-muted-foreground line-through">
                ₹{ORIGINAL_PRICE.toLocaleString("en-IN")}
              </span>
              <span className="text-4xl font-bold text-foreground">
                ₹{DISCOUNTED_PRICE}
              </span>
              <span className="text-muted-foreground text-sm">/year</span>
            </div>
            <p className="text-muted-foreground text-xs mt-1">
              That&apos;s just ₹{Math.round(DISCOUNTED_PRICE / 12)}/month
            </p>
          </div>

          {/* Features */}
          <div className="px-6 py-4">
            <div className="space-y-3">
              {PRO_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                    <feature.icon className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span className="text-sm text-foreground">{feature.text}</span>
                  <Check className="h-4 w-4 text-green-500 ml-auto shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6 pt-2">
            <button
              onClick={handleUpgrade}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white font-semibold text-base transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-[0.98]"
            >
              🚀 Upgrade to Pro — ₹{DISCOUNTED_PRICE}/yr
            </button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Cancel anytime • Secure payment • Instant access
            </p>
          </div>

          {/* Coming soon toast */}
          {showToast && (
            <div className="absolute bottom-4 left-4 right-4 bg-foreground text-background text-sm font-medium text-center py-3 px-4 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 fade-in-0">
              🎉 Payment integration coming soon! Stay tuned.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
