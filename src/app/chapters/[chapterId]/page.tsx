import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { TopicCards } from "@/components/topic-cards";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy } from "lucide-react";

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
      topics: {
        orderBy: { order: "asc" },
        include: {
          statuses: {
            where: { userId },
            select: { status: true },
          },
        },
      },
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

  // Prepare topics with their status for the client component
  const topicsWithStatus = chapter.topics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    summary: topic.summary,
    order: topic.order,
    status: topic.statuses[0]?.status ?? null,
  }));

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="relative z-0 max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          href={`/subjects/${chapter.subjectId}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {chapter.subject.title}
        </Link>

        {/* Chapter Header */}
        <div className="mb-6">
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

        {/* Swipeable Topic Cards */}
        {chapter.topics.length > 0 && (
          <div className="mb-10">
            <TopicCards
              topics={topicsWithStatus}
              chapterId={chapter.id}
              chapterTitle={chapter.title}
              hasQuiz={hasQuiz}
              mcqCount={chapter._count.mcqs}
            />
          </div>
        )}

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
