import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { TopicCards } from "@/components/topic-cards";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, BookmarkPlus } from "lucide-react";

// Always fetch fresh data - progress changes on every visit
export const dynamic = "force-dynamic";

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: { chapterId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const isReviseMode = searchParams?.mode === "revise";

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
          pyqs: {
            orderBy: { year: "desc" },
            select: { year: true, marks: true, question: true },
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

  // Fetch user's reading progress for this chapter
  const chapterProgress = await prisma.chapterProgress.findUnique({
    where: { userId_chapterId: { userId, chapterId: params.chapterId } },
  });

  // Prepare topics with their status and PYQ data for the client component
  const allTopics = chapter.topics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    summary: topic.summary,
    order: topic.order,
    status: topic.statuses[0]?.status ?? null,
    pyqs: topic.pyqs.map((p) => ({
      year: p.year,
      marks: p.marks,
      question: p.question,
    })),
  }));

  // In revise mode, only show topics marked as "revise_later"
  const topicsToShow = isReviseMode
    ? allTopics.filter((t) => t.status === "revise_later")
    : allTopics;

  // If revise mode but no topics to revise, redirect to full chapter
  if (isReviseMode && topicsToShow.length === 0) {
    redirect(`/chapters/${params.chapterId}`);
  }

  // Calculate resume index and timestamp from DB
  let resumeIndex = 0;
  let resumeTimestamp = 0; // unix ms - when the DB progress was last updated
  if (!isReviseMode && chapterProgress) {
    const savedOrder = chapterProgress.lastViewedTopicOrder;
    const savedIndex = topicsToShow.findIndex((t) => t.order === savedOrder);
    if (savedIndex !== -1) {
      resumeIndex = savedIndex;
      resumeTimestamp = chapterProgress.updatedAt.getTime();
    }
  }

  const backHref = isReviseMode ? "/revise-later" : `/subjects/${chapter.subjectId}`;
  const backLabel = isReviseMode ? "Back to Revise Later" : `Back to ${chapter.subject.title}`;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="relative z-0 max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
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
            {isReviseMode && (
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
                <BookmarkPlus className="h-3 w-3 mr-1" />
                Revision Mode
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {chapter.title}
          </h1>
          <p className="text-muted-foreground">
            {isReviseMode
              ? `${topicsToShow.length} topics to revise`
              : `${chapter.topics.length} topics · ${chapter._count.mcqs} quiz questions`}
          </p>
        </div>

        {/* Swipeable Topic Cards */}
        {topicsToShow.length > 0 && (
          <div className="mb-10">
            <TopicCards
              topics={topicsToShow}
              chapterId={chapter.id}
              chapterTitle={chapter.title}
              hasQuiz={!isReviseMode && hasQuiz}
              mcqCount={chapter._count.mcqs}
              reviseMode={isReviseMode}
              resumeIndex={resumeIndex}
              resumeTimestamp={resumeTimestamp}
              userId={userId}
            />
          </div>
        )}

        {/* Previous Attempts - hide in revise mode */}
        {!isReviseMode && chapter.quizAttempts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
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
                    <span className="text-foreground font-medium">
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
