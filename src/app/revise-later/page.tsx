import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";
import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookmarkPlus,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default async function ReviseLaterPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getOrCreateUser(userId);
  if (!user.selectedClass) redirect("/onboarding");

  // Get all "revise_later" topics for the user, grouped by chapter/subject
  const reviseLaterTopics = await prisma.topicStatus.findMany({
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
    include: {
      topic: {
        include: {
          chapter: {
            include: {
              subject: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Group by subject -> chapter
  const grouped = new Map<
    string,
    {
      subject: { id: string; title: string; icon: string };
      chapters: Map<
        string,
        {
          chapter: { id: string; title: string };
          topics: { id: string; title: string; summary: string }[];
        }
      >;
    }
  >();

  for (const item of reviseLaterTopics) {
    const subject = item.topic.chapter.subject;
    const chapter = item.topic.chapter;

    if (!grouped.has(subject.id)) {
      grouped.set(subject.id, {
        subject: { id: subject.id, title: subject.title, icon: subject.icon },
        chapters: new Map(),
      });
    }

    const subjectGroup = grouped.get(subject.id)!;
    if (!subjectGroup.chapters.has(chapter.id)) {
      subjectGroup.chapters.set(chapter.id, {
        chapter: { id: chapter.id, title: chapter.title },
        topics: [],
      });
    }

    subjectGroup.chapters.get(chapter.id)!.topics.push({
      id: item.topic.id,
      title: item.topic.title,
      summary: item.topic.summary,
    });
  }

  const totalTopics = reviseLaterTopics.length;

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

        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
            <BookmarkPlus className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Revise Later
            </h1>
            <p className="text-muted-foreground">
              {totalTopics} {totalTopics === 1 ? "topic" : "topics"} bookmarked
              for revision
            </p>
          </div>
        </div>

        {totalTopics === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 sm:p-12 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mb-4">
              <BookOpen className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No topics bookmarked yet
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              While going through topic cards in any chapter, tap &quot;Revise
              Later&quot; on topics you want to come back to. They&apos;ll show
              up here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Array.from(grouped.values()).map(({ subject, chapters }) => (
              <div key={subject.id}>
                {/* Subject header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{subject.icon}</span>
                  <h2 className="text-lg font-semibold text-white">
                    {subject.title}
                  </h2>
                </div>

                <div className="space-y-3">
                  {Array.from(chapters.values()).map(({ chapter, topics }) => (
                    <Link
                      key={chapter.id}
                      href={`/chapters/${chapter.id}`}
                      className="group block rounded-xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                          {chapter.title}
                        </h3>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-amber-400 transition-colors flex-shrink-0" />
                      </div>
                      <div className="space-y-2">
                        {topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs mt-0.5 flex-shrink-0">
                              Revise
                            </Badge>
                            <span className="text-muted-foreground">
                              {topic.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
