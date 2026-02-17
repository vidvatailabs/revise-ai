export default function ReviseLaterLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="h-8 w-28 rounded-lg bg-muted animate-pulse" />
          <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="h-4 w-36 bg-muted rounded animate-pulse mb-6" />

        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-muted animate-pulse" />
          <div>
            <div className="h-7 w-36 bg-muted rounded-lg animate-pulse mb-1" />
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="h-5 w-40 bg-muted rounded animate-pulse mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-56 bg-muted rounded animate-pulse" />
                <div className="h-4 w-48 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
