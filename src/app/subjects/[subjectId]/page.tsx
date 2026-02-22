import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
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

  // Find the most recently read chapter in this subject
  const lastProgress = await prisma.chapterProgress.findFirst({
    where: {
      userId,
      chapter: { subjectId: params.subjectId },
    },
    orderBy: { updatedAt: "desc" },
    select: { chapterId: true },
  });

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
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Subject Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl">{subject.icon}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
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
            const isLastRead = lastProgress?.chapterId === chapter.id;

            return (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className={`group flex items-center gap-3 rounded-xl border bg-card p-4 sm:p-5 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 ${
                  isLastRead
                    ? "border-indigo-500/30 bg-indigo-500/[0.03]"
                    : "border-border"
                }`}
              >
                {/* Chapter Number */}
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    isCompleted
                      ? "bg-green-500/10 text-green-400"
                      : isLastRead
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : isLastRead ? (
                    <PlayCircle className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-indigo-300 transition-colors truncate">
                        {chapter.title}
                      </h3>
                      {isLastRead && (
                        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px] px-1.5 py-0 flex-shrink-0">
                          Resume
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {lastAttempt && (
                        <Badge
                          className={`text-xs ${
                            lastAttempt.score / lastAttempt.total >= 0.7
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}
                        >
                          {lastAttempt.score}/{lastAttempt.total}
                        </Badge>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {chapter._count.topics} topics{hasQuiz ? ` · ${chapter._count.mcqs} questions` : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
