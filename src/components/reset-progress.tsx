"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { RotateCcw, Loader2, AlertTriangle } from "lucide-react";

export function ResetProgress() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/progress/reset", {
        method: "DELETE",
      });
      if (res.ok) {
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to reset progress:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2 text-muted-foreground hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset Progress
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogHeader>
          <div className="flex justify-center mb-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <AlertDialogTitle>Reset All Progress?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all your quiz attempts and scores.
            Your subjects, chapters, and topics will remain, but your progress
            will be reset to zero. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReset}
            disabled={loading}
            className="gap-2 bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4" />
                Yes, Reset Everything
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
}
