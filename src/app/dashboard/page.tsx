import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getOrCreateUser } from "@/lib/user";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { ResetProgress } from "@/components/reset-progress";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  BookmarkPlus,
  ChevronRight,
  Trophy,
  Flame,
  GraduationCap,
  Clock,
  Rocket,
  PlayCircle,
} from "lucide-react";

// Always fetch fresh data - stats, continue reading, etc.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getOrCreateUser(userId);
  if (!user.selectedClass) redirect("/onboarding");

  // Fetch subjects for user's class with chapter + quiz data
  const subjects = await prisma.subject.findMany({
    where: { class: user.selectedClass },
    include: {
      chapters: {
        select: {
          id: true,
          quizAttempts: {
            where: { userId },
            select: { id: true, score: true, total: true },
            take: 1,
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
    orderBy: { order: "asc" },
  });

  // Fetch recent quiz attempts - filtered to current class only
  const subjectIds = subjects.map((s) => s.id);
  const recentAttempts = await prisma.quizAttempt.findMany({
    where: {
      userId,
      chapter: { subjectId: { in: subjectIds } },
    },
    include: {
      chapter: {
        include: { subject: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Count total quiz attempts for the current class
  const totalQuizzesTaken = await prisma.quizAttempt.count({
    where: {
      userId,
      chapter: { subjectId: { in: subjectIds } },
    },
  });

  // Count "revise later" topics for the current class
  const reviseLaterCount = await prisma.topicStatus.count({
    where: {
      userId,
      status: "revise_later",
      topic: {
        chapter: {
          subject: {
            class: user.selectedClass,
          },
        },
      },
    },
  });

  // Fetch the most recently read chapter (for "Continue Reading")
  const lastProgress = await prisma.chapterProgress.findFirst({
    where: {
      userId,
      chapter: { subjectId: { in: subjectIds } },
    },
    orderBy: { updatedAt: "desc" },
    include: {
      chapter: {
        include: {
          subject: { select: { title: true, icon: true } },
          _count: { select: { topics: true } },
          topics: { orderBy: { order: "desc" }, take: 1, select: { order: true } },
        },
      },
    },
  });

  // Calculate stats
  const totalChapters = subjects.reduce(
    (sum, s) => sum + s.chapters.length,
    0
  );
  const completedChapters = subjects.reduce(
    (sum, s) =>
      sum + s.chapters.filter((c) => c.quizAttempts.length > 0).length,
    0
  );

  // Time-based greeting
  const hour = new Date().getHours();
  const isReturningUser = totalQuizzesTaken > 0 || completedChapters > 0 || !!lastProgress;
  let greeting: string;
  if (!isReturningUser) {
    greeting = "Welcome!";
  } else if (hour >= 5 && hour < 12) {
    greeting = "Good morning!";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon!";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good evening!";
  } else {
    greeting = "Midnight hustle!";
  }

  // Continue Reading data - only show if user hasn't finished all topics
  const lastTopicOrder = lastProgress?.chapter.topics[0]?.order ?? 0;
  const hasFinishedChapter = lastProgress
    ? lastProgress.lastViewedTopicOrder >= lastTopicOrder
    : false;

  const continueReading = lastProgress && !hasFinishedChapter
    ? {
        chapterId: lastProgress.chapterId,
        chapterTitle: lastProgress.chapter.title,
        subjectTitle: lastProgress.chapter.subject.title,
        subjectIcon: lastProgress.chapter.subject.icon,
        topicsCurrent: lastProgress.lastViewedTopicOrder,
        topicsTotal: lastProgress.chapter._count.topics,
        updatedAt: lastProgress.updatedAt,
      }
    : null;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Section */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {greeting} {greeting === "Midnight hustle!" ? "🌙" : "👋"}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>Class {user.selectedClass} | CBSE</span>
            </div>
          </div>
          {completedChapters > 0 && <ResetProgress />}
        </div>

        {/* Continue Reading - only for users who have browsed chapters */}
        {continueReading && (
          <Link
            href={`/chapters/${continueReading.chapterId}`}
            className="group flex items-center gap-4 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 p-4 sm:p-5 mb-8 transition-all hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
              {continueReading.subjectIcon || "📖"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wide mb-0.5">
                Continue Reading
              </p>
              <h3 className="font-semibold text-foreground truncate group-hover:text-indigo-300 transition-colors">
                {continueReading.chapterTitle}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {continueReading.subjectTitle} - Topic {continueReading.topicsCurrent} of {continueReading.topicsTotal}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white group-hover:bg-indigo-600 transition-colors">
                <PlayCircle className="h-5 w-5" />
              </div>
            </div>
          </Link>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <a href="#subjects" className="rounded-xl border border-border bg-card p-4 hover:border-indigo-500/30 transition-all cursor-pointer">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <BookOpen className="h-4 w-4" />
              Subjects
            </div>
            <div className="text-2xl font-bold text-foreground">
              {subjects.length}
            </div>
          </a>
          <a href="#recent-activity" className="rounded-xl border border-border bg-card p-4 hover:border-indigo-500/30 transition-all cursor-pointer">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Flame className="h-4 w-4" />
              Progress
            </div>
            <div className="text-2xl font-bold text-foreground">
              {completedChapters}/{totalChapters}
            </div>
          </a>
          <a href="#recent-activity" className="rounded-xl border border-border bg-card p-4 hover:border-indigo-500/30 transition-all cursor-pointer">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Trophy className="h-4 w-4" />
              Quizzes Taken
            </div>
            <div className="text-2xl font-bold text-foreground">
              {totalQuizzesTaken}
            </div>
          </a>
          <Link
            href="/revise-later"
            className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 hover:bg-amber-500/10 transition-all group"
          >
            <div className="flex items-center gap-2 text-amber-400/70 text-sm mb-1">
              <BookmarkPlus className="h-4 w-4" />
              Revise Later
            </div>
            <div className="text-2xl font-bold text-amber-400 group-hover:text-amber-300">
              {reviseLaterCount}
            </div>
          </Link>
        </div>

        {/* Subjects Grid */}
        <h2 id="subjects" className="text-xl font-semibold text-foreground mb-4 scroll-mt-24">
          Your Subjects
        </h2>

        {subjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-indigo-500/30 bg-indigo-500/5 p-8 sm:p-12 text-center mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 mb-4">
              <Rocket className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Coming Soon! 🚀
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Class {user.selectedClass} content is being prepared by our team.
              We&apos;re working hard to bring you revision material, topic summaries, and quizzes.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4" />
              Check back soon - or try Class 10 which is live now!
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {subjects.map((subject) => {
              const total = subject.chapters.length;
              const completed = subject.chapters.filter(
                (c) => c.quizAttempts.length > 0
              ).length;
              const progress = total > 0 ? (completed / total) * 100 : 0;

              return (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.id}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg group-hover:text-indigo-300 transition-colors">
                          {subject.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {total} chapters
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-indigo-400 transition-colors mt-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {completed}/{total} completed
                      </span>
                      <span className="text-indigo-400 font-medium">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Recent Activity */}
        {recentAttempts.length > 0 && (
          <div>
            <h2 id="recent-activity" className="text-xl font-semibold text-foreground mb-4 scroll-mt-24">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                      <Trophy className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {attempt.chapter.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attempt.chapter.subject.title}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      attempt.score / attempt.total >= 0.7
                        ? "default"
                        : "secondary"
                    }
                    className={
                      attempt.score / attempt.total >= 0.7
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }
                  >
                    {attempt.score}/{attempt.total}
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
