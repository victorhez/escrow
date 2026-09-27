"use client";

import { useState } from "react";

export interface NewJobInput {
  title: string;
  client: string;
  freelancer: string;
  milestoneTitle: string;
  description: string;
  criteria: string[];
  amountUsdc: number;
}

export function NewJobForm({
  onCreate,
  onClose,
}: {
  onCreate: (input: NewJobInput) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [freelancer, setFreelancer] = useState("");
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [description, setDescription] = useState("");
  const [criteria, setCriteria] = useState("");
  const [amount, setAmount] = useState("1000");

  const canCreate =
    title.trim() && client.trim() && freelancer.trim() && milestoneTitle.trim() && Number(amount) > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="card w-full max-w-lg p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-xl text-foreground">New escrow job</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            ✕
          </button>
        </div>

        <div className="flex max-h-[65vh] flex-col gap-3 overflow-y-auto scrollbar-thin pr-1">
          <Field label="Job title" value={title} onChange={setTitle} placeholder="Onboarding flow redesign" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Client" value={client} onChange={setClient} placeholder="Acme Inc." />
            <Field label="Freelancer" value={freelancer} onChange={setFreelancer} placeholder="Jane Doe" />
          </div>
          <Field
            label="First milestone"
            value={milestoneTitle}
            onChange={setMilestoneTitle}
            placeholder="Wireframes & user flows"
          />
          <div>
            <label className="mb-1 block text-xs text-muted">Milestone description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="What does 'done' look like?"
              className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent-dim focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">
              Acceptance criteria (one per line)
            </label>
            <textarea
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              rows={3}
              placeholder={"Figma link included\nCovers desktop and mobile flows"}
              className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent-dim focus:outline-none"
            />
          </div>
          <Field
            label="Amount (USDC)"
            value={amount}
            onChange={setAmount}
            placeholder="1000"
            type="number"
          />
        </div>

        <button
          disabled={!canCreate}
          onClick={() =>
            onCreate({
              title: title.trim(),
              client: client.trim(),
              freelancer: freelancer.trim(),
              milestoneTitle: milestoneTitle.trim(),
              description: description.trim() || "No description provided.",
              criteria: criteria
                .split("\n")
                .map((c) => c.trim())
                .filter(Boolean),
              amountUsdc: Number(amount) || 0,
            })
          }
          className="mt-5 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#04120c] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Create job
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent-dim focus:outline-none"
      />
    </div>
  );
}
