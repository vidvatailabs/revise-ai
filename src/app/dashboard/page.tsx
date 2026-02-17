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
  ChevronRight,
  Trophy,
  Flame,
  GraduationCap,
  Clock,
  Rocket,
} from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Section */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back! 👋
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>Class {user.selectedClass} | CBSE</span>
            </div>
          </div>
          {completedChapters > 0 && <ResetProgress />}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <BookOpen className="h-4 w-4" />
              Subjects
            </div>
            <div className="text-2xl font-bold text-white">
              {subjects.length}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Flame className="h-4 w-4" />
              Progress
            </div>
            <div className="text-2xl font-bold text-white">
              {completedChapters}/{totalChapters}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Trophy className="h-4 w-4" />
              Quizzes Taken
            </div>
            <div className="text-2xl font-bold text-white">
              {recentAttempts.length}
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <h2 className="text-xl font-semibold text-white mb-4">
          Your Subjects
        </h2>

        {subjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-indigo-500/30 bg-indigo-500/5 p-8 sm:p-12 text-center mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 mb-4">
              <Rocket className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
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
                        <h3 className="font-semibold text-white text-lg group-hover:text-indigo-300 transition-colors">
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
            <h2 className="text-xl font-semibold text-white mb-4">
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
                      <p className="font-medium text-white text-sm">
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
