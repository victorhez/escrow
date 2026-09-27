"use client";

import type { Job, Milestone } from "@/lib/agent/types";
import { StatusPill } from "./StatusPill";

export function JobList({
  jobs,
  selectedId,
  onSelect,
}: {
  jobs: Job[];
  selectedId: string | null;
  onSelect: (milestoneId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {jobs.map((job) => (
        <div key={job.id} className="card p-5">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h3 className="font-display text-base text-foreground">{job.title}</h3>
            <span className="whitespace-nowrap text-xs text-muted">
              {job.client} → {job.freelancer}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {job.milestones.map((m: Milestone) => (
              <button
                key={m.id}
                onClick={() => onSelect(m.id)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                  selectedId === m.id
                    ? "border-accent-dim bg-accent-soft"
                    : "border-border bg-surface hover:border-accent-dim/60"
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-foreground">{m.title}</div>
                  <div className="mt-0.5 font-mono text-xs text-muted">${m.amountUsdc.toLocaleString()} USDC</div>
                </div>
                <StatusPill status={m.status} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
