export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
      <div className="h-4 w-3/4 rounded bg-[var(--surface-2)]" />
      <div className="mt-2 h-3 w-1/2 rounded bg-[var(--surface-2)]" />
      <div className="mt-2 space-y-1">
        <div className="h-3 w-full rounded bg-[var(--surface-2)]" />
        <div className="h-3 w-4/5 rounded bg-[var(--surface-2)]" />
      </div>
      <div className="mt-2 flex gap-1">
        <div className="h-5 w-12 rounded bg-[var(--surface-2)]" />
        <div className="h-5 w-16 rounded bg-[var(--surface-2)]" />
        <div className="h-5 w-14 rounded bg-[var(--surface-2)]" />
      </div>
    </div>
  )
}
