import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  PlayCircle,
  Trophy,
  RotateCcw,
} from "lucide-react";

export default async function ChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const chapter = await prisma.chapter.findUnique({
    where: { id: params.chapterId },
    include: {
      subject: true,
      topics: { orderBy: { order: "asc" } },
      _count: { select: { mcqs: true } },
      quizAttempts: {
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!chapter) notFound();

  const hasQuiz = chapter._count.mcqs > 0;
  const latestAttempt = chapter.quizAttempts[0];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          href={`/subjects/${chapter.subjectId}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {chapter.subject.title}
        </Link>

        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {chapter.subject.title}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Class {chapter.subject.class}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {chapter.title}
          </h1>
          <p className="text-muted-foreground">
            {chapter.topics.length} topics • {chapter._count.mcqs} quiz
            questions
          </p>
        </div>

        {/* Quiz CTA */}
        {hasQuiz && (
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white text-lg mb-1">
                  {latestAttempt ? "Retake the Quiz" : "Ready to Test Yourself?"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {latestAttempt
                    ? `Last score: ${latestAttempt.score}/${latestAttempt.total} — Try to beat it!`
                    : `${chapter._count.mcqs} questions to test your understanding`}
                </p>
              </div>
              <Link href={`/quiz/${chapter.id}`}>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg shadow-indigo-500/20 gap-2">
                  {latestAttempt ? (
                    <>
                      <RotateCcw className="h-4 w-4" /> Retake Quiz
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" /> Start Quiz
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Topics */}
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          Topics & Summaries
        </h2>
        <div className="space-y-4 mb-10">
          {chapter.topics.map((topic, index) => (
            <div
              key={topic.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-bold">
                  {index + 1}
                </span>
                {topic.title}
              </h3>
              <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {topic.summary}
              </div>
            </div>
          ))}
        </div>

        {/* Previous Attempts */}
        {chapter.quizAttempts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-indigo-400" />
              Your Quiz History
            </h2>
            <div className="space-y-2">
              {chapter.quizAttempts.map((attempt, i) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div className="text-sm">
                    <span className="text-white font-medium">
                      Attempt {chapter.quizAttempts.length - i}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {new Date(attempt.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Badge
                    className={
                      attempt.score / attempt.total >= 0.7
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }
                  >
                    {attempt.score}/{attempt.total} (
                    {Math.round((attempt.score / attempt.total) * 100)}%)
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
