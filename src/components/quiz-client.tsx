"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowLeft,
  Loader2,
  RotateCcw,
  Home,
} from "lucide-react";
import Link from "next/link";

type MCQ = {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

type QuizResultItem = {
  mcqId: string;
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  explanation: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

type QuizResult = {
  score: number;
  total: number;
  results: QuizResultItem[];
  attemptId: string;
};

interface QuizClientProps {
  mcqs: MCQ[];
  chapterId: string;
  chapterTitle: string;
  subjectId: string;
}

const optionLabels = ["A", "B", "C", "D"] as const;

function getOptionText(item: QuizResultItem | MCQ, key: string): string {
  const map: Record<string, string> = {
    A: item.optionA,
    B: item.optionB,
    C: item.optionC,
    D: item.optionD,
  };
  return map[key] || key;
}

export function QuizClient({
  mcqs,
  chapterId,
  chapterTitle,
  subjectId,
}: QuizClientProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const allAnswered = mcqs.every((mcq) => answers[mcq.id]);

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setLoading(true);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterId, answers }),
      });
      const data = await res.json();
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Results View ──
  if (result) {
    const percentage = Math.round((result.score / result.total) * 100);
    const isGreat = percentage >= 80;
    const isGood = percentage >= 60;

    return (
      <div className="space-y-6">
        {/* Score Card */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 text-center ${
            isGreat
              ? "border-green-500/20 bg-green-500/5"
              : isGood
              ? "border-yellow-500/20 bg-yellow-500/5"
              : "border-red-500/20 bg-red-500/5"
          }`}
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background/50 mb-4">
            <Trophy
              className={`h-8 w-8 ${
                isGreat
                  ? "text-green-400"
                  : isGood
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {isGreat
              ? "Excellent! 🎉"
              : isGood
              ? "Good Job! 👍"
              : "Keep Practicing! 💪"}
          </h2>
          <p className="text-muted-foreground mb-4">
            You scored {result.score} out of {result.total}
          </p>
          <div className="inline-flex items-center gap-2 text-4xl font-extrabold">
            <span
              className={
                isGreat
                  ? "text-green-400"
                  : isGood
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              {percentage}%
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => {
              setResult(null);
              setAnswers({});
            }}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Retake Quiz
          </Button>
          <Link href={`/chapters/${chapterId}`}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Chapter
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" /> Dashboard
            </Button>
          </Link>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Detailed Results
          </h3>
          {result.results.map((item, index) => (
            <div
              key={item.mcqId}
              className={`rounded-xl border p-5 ${
                item.isCorrect
                  ? "border-green-500/20 bg-green-500/5"
                  : "border-red-500/20 bg-red-500/5"
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {item.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium text-white">
                    Q{index + 1}. {item.question}
                  </p>
                </div>
              </div>

              <div className="ml-8 space-y-2 mb-3">
                {optionLabels.map((key) => {
                  const text = getOptionText(item, key);
                  const isSelected = item.selected === key;
                  const isCorrect = item.correct === key;

                  return (
                    <div
                      key={key}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                        isCorrect
                          ? "bg-green-500/10 text-green-300 border border-green-500/20"
                          : isSelected && !isCorrect
                          ? "bg-red-500/10 text-red-300 border border-red-500/20"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="font-semibold w-5">{key}.</span>
                      <span>{text}</span>
                      {isCorrect && (
                        <CheckCircle2 className="h-4 w-4 ml-auto text-green-400" />
                      )}
                      {isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 ml-auto text-red-400" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="ml-8 rounded-lg bg-background/50 border border-border px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-indigo-400">
                    Explanation:
                  </span>{" "}
                  {item.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Quiz View ──
  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {Object.keys(answers).length} of {mcqs.length} answered
        </p>
        <Badge variant="outline">
          {Object.keys(answers).length}/{mcqs.length}
        </Badge>
      </div>

      {/* Questions */}
      {mcqs.map((mcq, index) => (
        <div
          key={mcq.id}
          className={`rounded-xl border p-5 transition-colors ${
            answers[mcq.id]
              ? "border-indigo-500/20 bg-indigo-500/5"
              : "border-border bg-card"
          }`}
        >
          <p className="font-medium text-white mb-4">
            <span className="text-indigo-400 mr-2">Q{index + 1}.</span>
            {mcq.question}
          </p>
          <RadioGroup
            value={answers[mcq.id] || ""}
            onValueChange={(value) =>
              setAnswers((prev) => ({ ...prev, [mcq.id]: value }))
            }
          >
            {optionLabels.map((key) => {
              const text = getOptionText(mcq, key);
              return (
                <div
                  key={key}
                  className={`flex items-center space-x-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                    answers[mcq.id] === key
                      ? "border-indigo-500/40 bg-indigo-500/10"
                      : "border-border hover:border-border/80 hover:bg-white/[0.02]"
                  }`}
                >
                  <RadioGroupItem
                    value={key}
                    id={`${mcq.id}-${key}`}
                  />
                  <Label
                    htmlFor={`${mcq.id}-${key}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    <span className="font-semibold text-muted-foreground mr-2">
                      {key}.
                    </span>
                    {text}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}

      {/* Submit Button */}
      <div className="sticky bottom-4 pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!allAnswered || loading}
          className="w-full h-12 text-base bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg shadow-indigo-500/20"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            `Submit Quiz (${Object.keys(answers).length}/${mcqs.length})`
          )}
        </Button>
      </div>
    </div>
  );
}
