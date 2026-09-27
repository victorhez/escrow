"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Job } from "@/lib/agent/types";
import { seedJobs, computeWallet, fundMilestone, submitDeliverable, reviewMilestone } from "@/lib/agent/mockLedger";
import { WalletCard } from "./WalletCard";
import { JobList } from "./JobList";
import { MilestoneDetail } from "./MilestoneDetail";
import { NewJobForm, type NewJobInput } from "./NewJobForm";

export function DashboardApp() {
  const [jobs, setJobs] = useState<Job[]>(() => seedJobs());
  const [selectedId, setSelectedId] = useState<string | null>("ms_atlas_2");
  const [showNewJob, setShowNewJob] = useState(false);

  const wallet = useMemo(() => computeWallet(jobs), [jobs]);

  const selected = useMemo(() => {
    for (const job of jobs) {
      const m = job.milestones.find((x) => x.id === selectedId);
      if (m) return { job, milestone: m };
    }
    return null;
  }, [jobs, selectedId]);

  function updateMilestone(milestoneId: string, updater: (j: Job) => Job) {
    setJobs((prev) =>
      prev.map((job) => (job.milestones.some((m) => m.id === milestoneId) ? updater(job) : job))
    );
  }

  function handleFund(milestoneId: string) {
    updateMilestone(milestoneId, (job) => ({
      ...job,
      milestones: job.milestones.map((m) => (m.id === milestoneId ? fundMilestone(m) : m)),
    }));
  }

  function handleSubmit(milestoneId: string, note: string, link: string) {
    updateMilestone(milestoneId, (job) => ({
      ...job,
      milestones: job.milestones.map((m) => (m.id === milestoneId ? submitDeliverable(m, note, link) : m)),
    }));

    // Move into a visible "in_review" state, then resolve after a short
    // delay so the review feels like it's actually happening.
    setTimeout(() => {
      updateMilestone(milestoneId, (job) => ({
        ...job,
        milestones: job.milestones.map((m) => (m.id === milestoneId ? { ...m, status: "in_review" } : m)),
      }));
    }, 300);

    setTimeout(() => {
      updateMilestone(milestoneId, (job) => ({
        ...job,
        milestones: job.milestones.map((m) => (m.id === milestoneId ? reviewMilestone(m) : m)),
      }));
    }, 2200);
  }

  function handleCreateJob(input: NewJobInput) {
    const id = `job_${Date.now()}`;
    const msId = `ms_${Date.now()}`;
    const newJob: Job = {
      id,
      title: input.title,
      client: input.client,
      freelancer: input.freelancer,
      createdAt: new Date().toISOString(),
      status: "active",
      milestones: [
        {
          id: msId,
          title: input.milestoneTitle,
          description: input.description,
          acceptanceCriteria: input.criteria.length
            ? input.criteria.map((label, i) => ({ id: `c${i}`, label }))
            : [{ id: "c0", label: "Deliverable matches the agreed scope" }],
          amountUsdc: input.amountUsdc,
          status: "awaiting_funding",
          submissions: [],
          reviews: [],
        },
      ],
    };
    setJobs((prev) => [newJob, ...prev]);
    setSelectedId(msId);
    setShowNewJob(false);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent font-display text-sm font-semibold">
              E
            </span>
            <span className="font-display text-lg tracking-tight">Escrow</span>
          </Link>
          <button
            onClick={() => setShowNewJob(true)}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#04120c] transition hover:brightness-110"
          >
            + New escrow job
          </button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[340px_1fr]">
        <div className="flex flex-col gap-6">
          <WalletCard wallet={wallet} />
          <JobList jobs={jobs} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div>
          {selected ? (
            <MilestoneDetail
              job={selected.job}
              milestone={selected.milestone}
              onFund={() => handleFund(selected.milestone.id)}
              onSubmit={(note, link) => handleSubmit(selected.milestone.id, note, link)}
            />
          ) : (
            <div className="card flex h-full min-h-[300px] items-center justify-center p-8 text-muted">
              Select a milestone to see its detail and AI review trace.
            </div>
          )}
        </div>
      </main>

      {showNewJob && <NewJobForm onCreate={handleCreateJob} onClose={() => setShowNewJob(false)} />}
    </div>
  );
}
