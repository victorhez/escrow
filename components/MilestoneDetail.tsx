"use client";

import { useState } from "react";
import type { Job, Milestone } from "@/lib/agent/types";
import { StatusPill } from "./StatusPill";
import { FEE_BPS } from "@/lib/agent/mockLedger";

export function MilestoneDetail({
  job,
  milestone,
  onFund,
  onSubmit,
}: {
  job: Job;
  milestone: Milestone;
  onFund: () => void;
  onSubmit: (note: string, link: string) => void;
}) {
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");
  const latestReview = milestone.reviews[milestone.reviews.length - 1];
  const fee = Math.round(milestone.amountUsdc * (FEE_BPS / 10000) * 100) / 100;

  return (
    <div className="card flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs text-muted">
            {job.title} · {job.client} → {job.freelancer}
          </div>
          <h2 className="mt-1 font-display text-2xl text-foreground">{milestone.title}</h2>
        </div>
        <StatusPill status={milestone.status} />
      </div>

      <p className="text-sm leading-relaxed text-muted">{milestone.description}</p>

      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
          Acceptance criteria
        </div>
        <ul className="flex flex-col gap-2">
          {milestone.acceptanceCriteria.map((c) => (
            <li key={c.id} className="flex items-center gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface-2 p-4 text-sm sm:grid-cols-4">
        <div>
          <div className="text-xs text-muted">Amount</div>
          <div className="font-mono">${milestone.amountUsdc.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-muted">Fee on release</div>
          <div className="font-mono text-accent">${fee.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-muted">Freelancer nets</div>
          <div className="font-mono">${(milestone.amountUsdc - fee).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-muted">Submissions</div>
          <div className="font-mono">{milestone.submissions.length}</div>
        </div>
      </div>

      {milestone.status === "awaiting_funding" && (
        <button
          onClick={onFund}
          className="self-start rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#04120c] transition hover:brightness-110"
        >
          Fund milestone (${milestone.amountUsdc.toLocaleString()} USDC)
        </button>
      )}

      {(milestone.status === "funded" || milestone.status === "revision_requested") && (
        <div className="rounded-xl border border-border p-4">
          <div className="mb-3 text-sm font-medium text-foreground">
            {milestone.status === "revision_requested" ? "Submit a revision" : "Submit deliverable"}
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe what you delivered and how it meets each criterion…"
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent-dim focus:outline-none"
          />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link (optional) — repo, Figma, deployed preview…"
            className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent-dim focus:outline-none"
          />
          <button
            disabled={!note.trim()}
            onClick={() => {
              onSubmit(note.trim(), link.trim());
              setNote("");
              setLink("");
            }}
            className="mt-3 rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#04120c] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit for review
          </button>
        </div>
      )}

      {milestone.status === "in_review" && (
        <div className="flex items-center gap-3 rounded-xl border border-warn/40 bg-warn/10 px-4 py-3 text-sm text-warn">
          <span className="h-2 w-2 animate-ping rounded-full bg-warn" />
          Agent is reviewing the submission against acceptance criteria…
        </div>
      )}

      {milestone.submissions.length > 0 && (
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
            Submission history
          </div>
          <div className="flex flex-col gap-3">
            {milestone.submissions.map((s) => (
              <div key={s.id} className="rounded-xl border border-border bg-surface-2 p-4 text-sm">
                <div className="mb-1 flex items-center justify-between text-xs text-muted">
                  <span>{new Date(s.submittedAt).toLocaleString()}</span>
                </div>
                <p className="text-foreground">{s.note}</p>
                {s.link && (
                  <a href={s.link} className="mt-1 inline-block break-all font-mono text-xs text-accent underline-offset-2 hover:underline">
                    {s.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {latestReview && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              AI review reasoning
            </span>
            <span
              className={`font-mono text-xs ${latestReview.passed ? "text-accent" : "text-danger"}`}
            >
              score {latestReview.score}/100
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {latestReview.checks.map((c) => (
              <div
                key={c.criterionId}
                className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-sm ${
                  c.passed ? "border-accent-dim/60 bg-accent-soft/40" : "border-danger/40 bg-danger/5"
                }`}
              >
                <span className={`mt-0.5 font-mono text-xs ${c.passed ? "text-accent" : "text-danger"}`}>
                  {c.passed ? "PASS" : "FAIL"}
                </span>
                <div>
                  <div className="font-medium text-foreground">{c.label}</div>
                  <div className="mt-0.5 text-xs text-muted">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p
            className={`mt-3 rounded-lg px-3 py-2.5 text-sm ${
              latestReview.passed ? "bg-accent-soft text-accent" : "bg-danger/10 text-danger"
            }`}
          >
            {latestReview.summary}
          </p>
        </div>
      )}

      {milestone.status === "released" && milestone.releasedTx && (
        <div className="rounded-xl border border-accent-dim bg-accent-soft p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium text-accent">Funds released</span>
            <span className="font-mono text-xs text-accent/80">
              ${(milestone.releasedTx.amountUsdc - milestone.releasedTx.feeUsdc).toLocaleString()} to {job.freelancer}
            </span>
          </div>
          <a
            href={milestone.releasedTx.explorerUrl}
            className="mt-2 inline-block break-all font-mono text-xs text-accent/80 underline-offset-2 hover:underline"
          >
            {milestone.releasedTx.hash}
          </a>
        </div>
      )}
    </div>
  );
}
