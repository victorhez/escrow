import type { MilestoneStatus } from "@/lib/agent/types";

const STYLES: Record<MilestoneStatus, { label: string; className: string }> = {
  awaiting_funding: { label: "Awaiting funding", className: "bg-surface-2 text-muted border-border" },
  funded: { label: "Funded", className: "bg-accent-soft text-accent border-accent-dim" },
  submitted: { label: "Submitted", className: "bg-warn/10 text-warn border-warn/40" },
  in_review: { label: "AI reviewing…", className: "bg-warn/10 text-warn border-warn/40" },
  revision_requested: { label: "Revision requested", className: "bg-danger/10 text-danger border-danger/40" },
  released: { label: "Released", className: "bg-accent-soft text-accent border-accent-dim" },
};

export function StatusPill({ status }: { status: MilestoneStatus }) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${s.className}`}
    >
      {status === "in_review" && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warn" />
      )}
      {s.label}
    </span>
  );
}
