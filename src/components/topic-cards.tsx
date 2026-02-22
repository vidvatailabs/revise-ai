"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle2,
  BookmarkPlus,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share2,
  Loader2,
  Sparkles,
  PlayCircle,
  RotateCcw,
  FileText,
} from "lucide-react";
import Link from "next/link";

type TopicPYQ = {
  year: number;
  marks: number | null;
  question: string | null;
};

type TopicWithStatus = {
  id: string;
  title: string;
  summary: string;
  order: number;
  status?: string | null; // "got_it" | "revise_later" | null
  pyqs?: TopicPYQ[];
};

interface TopicCardsProps {
  topics: TopicWithStatus[];
  chapterId: string;
  chapterTitle: string;
  hasQuiz: boolean;
  mcqCount: number;
  reviseMode?: boolean;
  resumeIndex?: number;
  userId?: string;
}

type SwipeDirection = "left" | "right" | null;

export function TopicCards({
  topics,
  chapterId,
  chapterTitle,
  hasQuiz,
  mcqCount,
  reviseMode = false,
  resumeIndex = 0,
  userId = "",
}: TopicCardsProps) {
  const [statuses, setStatuses] = useState<Record<string, string | null>>(
    () => {
      const initial: Record<string, string | null> = {};
      topics.forEach((t) => {
        initial[t.id] = t.status ?? null;
      });
      return initial;
    }
  );
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [pyqExpanded, setPyqExpanded] = useState(false);
  const pyqRef = useRef<HTMLDivElement>(null);

  // Animation state
  const [animating, setAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<SwipeDirection>(null);
  const [enterDirection, setEnterDirection] = useState<SwipeDirection>(null);

  // Swipe tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const isDragging = useRef(false);
  const isVerticalScroll = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const storageKey = userId ? `chapter-progress-${userId}-${chapterId}` : "";
  const currentIndexRef = useRef(resumeIndex);

  // Determine initial index:
  // - Server resumeIndex (from DB) is the source of truth
  // - localStorage is only used if server has no data (resumeIndex === 0)
  //   to handle quick back-and-forth navigation within the same session
  const [initialIndex] = useState(() => {
    if (reviseMode || !storageKey) return resumeIndex;

    // If server already has a saved position, use it (cross-device accurate)
    if (resumeIndex > 0) return resumeIndex;

    // Otherwise, check localStorage (same-session quick resume)
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const savedIndex = parseInt(saved, 10);
        if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < topics.length) {
          return savedIndex;
        }
      }
    } catch {}
    return resumeIndex;
  });

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Keep ref in sync + reset PYQ expanded state on card change
  useEffect(() => {
    currentIndexRef.current = currentIndex;
    setPyqExpanded(false);
  }, [currentIndex]);

  // Save progress on every card change
  useEffect(() => {
    if (reviseMode) return;

    const topicOrder = topics[currentIndex]?.order;
    if (topicOrder === undefined) return;

    // Save to localStorage instantly (for same-session quick resume)
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, String(currentIndex));
      } catch {}
    }

    // Save to DB via fetch (for cross-device persistence, fire-and-forget)
    fetch("/api/chapters/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId, lastViewedTopicOrder: topicOrder }),
      keepalive: true,
    }).catch(() => {});
  }, [currentIndex, chapterId, topics, reviseMode]);

  const currentTopic = topics[currentIndex];
  const totalTopics = topics.length;
  const progress = ((currentIndex + 1) / totalTopics) * 100;

  const gotItCount = Object.values(statuses).filter(
    (s) => s === "got_it"
  ).length;
  const reviseLaterCount = Object.values(statuses).filter(
    (s) => s === "revise_later"
  ).length;
  const unmarkedCount = totalTopics - gotItCount - reviseLaterCount;

  const animateTransition = useCallback(
    (direction: "left" | "right", nextIndex: number | "summary") => {
      if (animating) return;
      setAnimating(true);

      // Exit current card
      setExitDirection(direction);

      setTimeout(() => {
        // After exit, update index and enter new card
        if (nextIndex === "summary") {
          setShowSummary(true);
        } else {
          setCurrentIndex(nextIndex);
        }
        setExitDirection(null);
        setEnterDirection(direction === "left" ? "right" : "left");

        // Clear enter animation
        setTimeout(() => {
          setEnterDirection(null);
          setAnimating(false);
        }, 300);
      }, 250);
    },
    [animating]
  );

  const goNext = useCallback(() => {
    if (animating) return;
    if (currentIndex < totalTopics - 1) {
      animateTransition("left", currentIndex + 1);
    } else {
      animateTransition("left", "summary");
    }
  }, [currentIndex, totalTopics, animating, animateTransition]);

  const goPrev = useCallback(() => {
    if (animating || currentIndex === 0) return;
    animateTransition("right", currentIndex - 1);
  }, [currentIndex, animating, animateTransition]);

  // Touch/swipe handlers - only on the swipe area, not buttons
  const handleTouchStart = (e: React.TouchEvent) => {
    if (animating) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentX.current = e.touches[0].clientX;
    isDragging.current = true;
    isVerticalScroll.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || animating) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Determine if this is a vertical scroll (first significant movement)
    if (!isVerticalScroll.current && Math.abs(diffY) > 10 && Math.abs(diffY) > Math.abs(diffX)) {
      isVerticalScroll.current = true;
      isDragging.current = false;
      setDragOffset(0);
      return;
    }

    // Only track horizontal drags
    if (!isVerticalScroll.current && Math.abs(diffX) > 5) {
      touchCurrentX.current = currentX;
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || animating) {
      isDragging.current = false;
      setDragOffset(0);
      return;
    }

    isDragging.current = false;
    const diff = touchStartX.current - touchCurrentX.current;
    const threshold = 60;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    setDragOffset(0);
  };

  const setTopicStatus = async (topicId: string, status: string) => {
    const currentStatus = statuses[topicId];

    // If tapping the same status, remove it (toggle)
    if (currentStatus === status) {
      setLoadingAction(`${topicId}-${status}`);
      setStatuses((prev) => ({ ...prev, [topicId]: null }));
      try {
        await fetch("/api/topics/status", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topicId }),
        });
      } catch {
        setStatuses((prev) => ({ ...prev, [topicId]: currentStatus }));
      } finally {
        setLoadingAction(null);
      }
      return;
    }

    setLoadingAction(`${topicId}-${status}`);
    setStatuses((prev) => ({ ...prev, [topicId]: status }));
    try {
      await fetch("/api/topics/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, status }),
      });
    } catch {
      setStatuses((prev) => ({ ...prev, [topicId]: currentStatus }));
    } finally {
      setLoadingAction(null);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentTopic.title,
          text: `Check out "${currentTopic.title}" from ${chapterTitle} on Revise AI!`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  // Compute card transform style
  const getCardStyle = (): React.CSSProperties => {
    // During drag - follow finger with slight rotation
    if (dragOffset !== 0) {
      const rotation = (dragOffset / 400) * 8; // Max ~8deg rotation
      const opacity = 1 - Math.abs(dragOffset) / 600;
      return {
        transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
        opacity: Math.max(opacity, 0.5),
        transition: "none",
      };
    }

    // Exit animation
    if (exitDirection === "left") {
      return {
        transform: "translateX(-120%) rotate(-12deg)",
        opacity: 0,
        transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
      };
    }
    if (exitDirection === "right") {
      return {
        transform: "translateX(120%) rotate(12deg)",
        opacity: 0,
        transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
      };
    }

    // Enter animation
    if (enterDirection === "right") {
      return {
        transform: "translateX(0) rotate(0deg)",
        opacity: 1,
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
        animation: "cardEnterFromRight 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      };
    }
    if (enterDirection === "left") {
      return {
        transform: "translateX(0) rotate(0deg)",
        opacity: 1,
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
        animation: "cardEnterFromLeft 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      };
    }

    return {
      transform: "translateX(0) rotate(0deg)",
      opacity: 1,
      transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
    };
  };

  // Summary view after all cards
  if (showSummary) {
    return (
      <div className="space-y-6">
        <style jsx>{`
          @keyframes summaryPop {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        <div
          className={`rounded-2xl border p-6 sm:p-8 text-center ${
            reviseMode
              ? "border-amber-500/20 bg-amber-500/5"
              : "border-indigo-500/20 bg-indigo-500/5"
          }`}
          style={{ animation: "summaryPop 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <div className={`inline-flex h-14 w-14 items-center justify-center rounded-full mb-4 ${
            reviseMode ? "bg-amber-500/10" : "bg-indigo-500/10"
          }`}>
            <Sparkles className={`h-7 w-7 ${reviseMode ? "text-amber-400" : "text-indigo-400"}`} />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {reviseMode ? "Revision Complete!" : "Chapter Review Complete!"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {reviseMode
              ? `You've revised all ${totalTopics} bookmarked ${totalTopics === 1 ? "topic" : "topics"}.`
              : `You've gone through all ${totalTopics} topics in this chapter.`}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
              <div className="text-2xl font-bold text-green-400">
                {gotItCount}
              </div>
              <div className="text-xs text-green-400/70">Got It</div>
            </div>
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
              <div className="text-2xl font-bold text-amber-400">
                {reviseLaterCount}
              </div>
              <div className="text-xs text-amber-400/70">Revise Later</div>
            </div>
            <div className="rounded-lg bg-slate-500/10 border border-slate-500/20 p-3">
              <div className="text-2xl font-bold text-slate-400">
                {unmarkedCount}
              </div>
              <div className="text-xs text-slate-400/70">Unmarked</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentIndex(0);
                setShowSummary(false);
              }}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Review Again
            </Button>
            {reviseMode && (
              <Link href="/revise-later">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Revise Later
                </Button>
              </Link>
            )}
            {hasQuiz && (
              <Link href={`/quiz/${chapterId}`}>
                <Button className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0">
                  <PlayCircle className="h-4 w-4" /> Start Quiz ({mcqCount} Qs)
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const topicStatus = statuses[currentTopic.id];

  return (
    <div className="space-y-4">
      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes cardEnterFromRight {
          0% {
            transform: translateX(80%) rotate(6deg);
            opacity: 0;
          }
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes cardEnterFromLeft {
          0% {
            transform: translateX(-80%) rotate(-6deg);
            opacity: 0;
          }
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
          {currentIndex + 1} / {totalTopics}
        </span>
      </div>

      {/* Card with overflow hidden wrapper for exit animations */}
      <div className="relative overflow-x-clip rounded-2xl" style={{ zIndex: 1 }}>
        <div
          ref={swipeAreaRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={getCardStyle()}
          className="rounded-2xl border border-border bg-card overflow-hidden select-none will-change-transform"
        >
          {/* Card header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-bold">
                {currentIndex + 1}
              </span>
              <h3 className="font-semibold text-foreground text-lg leading-snug">
                {currentTopic.title}
              </h3>
            </div>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors flex-shrink-0"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Status badge */}
          {topicStatus && (
            <div className="px-5 pb-2">
              <Badge
                className={
                  topicStatus === "got_it"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }
              >
                {topicStatus === "got_it" ? "Got It" : "Revise Later"}
              </Badge>
            </div>
          )}

          {/* Card content - scrollable */}
          <div className="px-5 pb-4 max-h-[50vh] overflow-y-auto">
            <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {currentTopic.summary}
            </div>

            {/* PYQ Section - inline expand/collapse */}
            {currentTopic.pyqs && currentTopic.pyqs.length > 0 && (
              <div ref={pyqRef} className="mt-4" onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
                <button
                  onClick={() => {
                    const willExpand = !pyqExpanded;
                    setPyqExpanded(willExpand);
                    if (willExpand) {
                      // Scroll PYQ button to the top of the card's scrollable area
                      setTimeout(() => {
                        const el = pyqRef.current;
                        const scrollParent = el?.closest(".overflow-y-auto") as HTMLElement | null;
                        if (el && scrollParent) {
                          const elTop = el.getBoundingClientRect().top;
                          const parentTop = scrollParent.getBoundingClientRect().top;
                          scrollParent.scrollBy({
                            top: elTop - parentTop,
                            behavior: "smooth",
                          });
                        }
                      }, 100);
                    }
                  }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-violet-500/8 border border-violet-500/15 hover:bg-violet-500/12 transition-colors group"
                >
                  <FileText className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-violet-600 dark:text-violet-400 flex-1">
                    Asked in {currentTopic.pyqs.length} {currentTopic.pyqs.length === 1 ? "paper" : "papers"}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-violet-400 transition-transform duration-200 ${
                      pyqExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded PYQ details */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    pyqExpanded ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="rounded-lg border border-border bg-secondary/40 divide-y divide-border">
                    {currentTopic.pyqs.map((pyq, idx) => (
                      <div key={idx} className="px-3 py-2.5 sm:px-4 sm:py-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold">
                            {pyq.year}
                          </span>
                          {pyq.marks && (
                            <span className="text-[11px] sm:text-xs text-muted-foreground">
                              {pyq.marks} {pyq.marks === 1 ? "mark" : "marks"}
                            </span>
                          )}
                        </div>
                        {pyq.question && (
                          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mt-1">
                            {pyq.question}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons - stop propagation to prevent swipe interference */}
          <div
            className="border-t border-border px-5 py-4 flex items-center justify-center gap-3"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTopicStatus(currentTopic.id, "got_it")}
              disabled={loadingAction !== null}
              className={`gap-2 ${
                topicStatus === "got_it"
                  ? "border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/10 hover:text-green-400"
                  : "hover:bg-background hover:text-foreground active:border-green-500/30 active:text-green-400"
              }`}
            >
              {loadingAction === `${currentTopic.id}-got_it` ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              Got It
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTopicStatus(currentTopic.id, "revise_later")}
              disabled={loadingAction !== null}
              className={`gap-2 ${
                topicStatus === "revise_later"
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/10 hover:text-amber-400"
                  : "hover:bg-background hover:text-foreground active:border-amber-500/30 active:text-amber-400"
              }`}
            >
              {loadingAction === `${currentTopic.id}-revise_later` ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : topicStatus === "revise_later" ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <BookmarkPlus className="h-4 w-4" />
              )}
              Revise Later
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={goPrev}
          disabled={currentIndex === 0 || animating}
          className="gap-1.5 text-muted-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {/* Dot indicators */}
        <div className="flex gap-1.5 max-w-[200px] overflow-hidden justify-center">
          {topics.map((t, i) => (
            <button
              key={t.id}
              onClick={() => {
                if (animating || i === currentIndex) return;
                animateTransition(
                  i > currentIndex ? "left" : "right",
                  i
                );
              }}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "w-6 bg-indigo-500"
                  : statuses[t.id] === "got_it"
                  ? "w-2 bg-green-500/50"
                  : statuses[t.id] === "revise_later"
                  ? "w-2 bg-amber-500/50"
                  : "w-2 bg-secondary"
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={goNext}
          disabled={animating}
          className="gap-1.5 text-muted-foreground"
        >
          {currentIndex === totalTopics - 1 ? "Finish" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Swipe hint - only show on first card, or resume hint */}
      {currentIndex === 0 && resumeIndex === 0 && (
        <p className="text-center text-xs text-muted-foreground/60">
          Swipe left or right to navigate cards
        </p>
      )}
      {currentIndex === resumeIndex && resumeIndex > 0 && !reviseMode && (
        <p className="text-center text-xs text-indigo-400/70">
          ▶ Resumed from where you left off
        </p>
      )}
    </div>
  );
}
