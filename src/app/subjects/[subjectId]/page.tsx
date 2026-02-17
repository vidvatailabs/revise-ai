import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default async function SubjectPage({
  params,
}: {
  params: { subjectId: string };
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const subject = await prisma.subject.findUnique({
    where: { id: params.subjectId },
    include: {
      chapters: {
        include: {
          _count: { select: { topics: true, mcqs: true } },
          quizAttempts: {
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { score: true, total: true },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!subject) notFound();

  const completedChapters = subject.chapters.filter(
    (c) => c.quizAttempts.length > 0
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Subject Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl">{subject.icon}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {subject.title}
            </h1>
            <p className="text-muted-foreground">
              Class {subject.class} • {subject.chapters.length} chapters •{" "}
              {completedChapters} completed
            </p>
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-3">
          {subject.chapters.map((chapter, index) => {
            const lastAttempt = chapter.quizAttempts[0];
            const hasQuiz = chapter._count.mcqs > 0;
            const isCompleted = !!lastAttempt;

            return (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                {/* Chapter Number */}
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    isCompleted
                      ? "bg-green-500/10 text-green-400"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {chapter.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {chapter._count.topics} topics
                    </span>
                    {hasQuiz && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {chapter._count.mcqs} questions
                      </span>
                    )}
                  </div>
                </div>

                {/* Score Badge */}
                {lastAttempt && (
                  <Badge
                    className={
                      lastAttempt.score / lastAttempt.total >= 0.7
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }
                  >
                    {lastAttempt.score}/{lastAttempt.total}
                  </Badge>
                )}

                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-indigo-400 transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
