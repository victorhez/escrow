import type { Job, Milestone, OnChainTx, Submission, WalletState } from "./types";
import { runAiReview } from "./review";

/**
 * In-memory demo ledger.
 *
 * Everything in this file is intentionally fake: wallet addresses, tx
 * hashes, and balances are generated locally so `npm run dev` works with
 * zero credentials and zero network calls. See `liveWallet.ts` for the
 * production counterpart backed by a real CDP-managed wallet on Base
 * Sepolia via `@coinbase/agentkit`.
 */

export const FEE_BPS = 150; // 1.5% fee on released funds
export const AGENT_ADDRESS = "0xE5c0A1f9b7Dd3c9e2F1a8B4d6C7e9F0a1B2c3D4e";

function fakeTxHash(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hex = h.toString(16).padStart(8, "0");
  return `0x${hex}${hex}${hex}${hex}`.slice(0, 66);
}

export function makeTx(kind: OnChainTx["kind"], amountUsdc: number, seed: string): OnChainTx {
  const hash = fakeTxHash(seed);
  const feeUsdc = kind === "release" ? Math.round(amountUsdc * (FEE_BPS / 10000) * 100) / 100 : 0;
  return {
    hash,
    kind,
    amountUsdc,
    feeUsdc,
    timestamp: new Date().toISOString(),
    explorerUrl: `https://sepolia.basescan.org/tx/${hash}`,
  };
}

function iso(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

export function seedJobs(): Job[] {
  const jobs: Job[] = [
    {
      id: "job_atlas",
      title: "Atlas Design System — Component Library",
      client: "Northwind Robotics",
      freelancer: "Priya Nair",
      createdAt: iso(14),
      status: "active",
      milestones: [
        {
          id: "ms_atlas_1",
          title: "Design tokens & Figma library",
          description:
            "Deliver a Figma library covering color, type, spacing, and elevation tokens, exported as JSON for engineering handoff.",
          acceptanceCriteria: [
            { id: "c1", label: "Figma library link included" },
            { id: "c2", label: "Token export in JSON format" },
            { id: "c3", label: "Covers color, typography and spacing" },
          ],
          amountUsdc: 1800,
          status: "released",
          submissions: [
            {
              id: "sub_1",
              submittedAt: iso(10),
              note:
                "Figma library is live with full color, typography, spacing and elevation tokens, plus a JSON export in /tokens/export.json for the engineering team.",
              link: "https://figma.com/file/atlas-tokens",
            },
          ],
          reviews: [],
          fundedTx: makeTx("fund", 1800, "atlas1fund"),
          releasedTx: makeTx("release", 1800, "atlas1release"),
        },
        {
          id: "ms_atlas_2",
          title: "Core components (Button, Input, Modal, Table)",
          description:
            "Build and document four core components with variants, states, and accessibility notes, linked from a live Storybook.",
          acceptanceCriteria: [
            { id: "c1", label: "Storybook link included" },
            { id: "c2", label: "Covers all four components" },
            { id: "c3", label: "Accessibility notes documented" },
          ],
          amountUsdc: 2600,
          status: "in_review",
          submissions: [
            {
              id: "sub_2",
              submittedAt: iso(1),
              note:
                "Storybook is deployed with Button, Input and Modal fully documented including variants and states.",
              link: "https://atlas-storybook.vercel.app",
            },
          ],
          reviews: [],
          fundedTx: makeTx("fund", 2600, "atlas2fund"),
        },
      ],
    },
    {
      id: "job_lumen",
      title: "Lumen Marketing Site Rebuild",
      client: "Cedar & Finch",
      freelancer: "Marcus Webb",
      createdAt: iso(9),
      status: "active",
      milestones: [
        {
          id: "ms_lumen_1",
          title: "Homepage + pricing page rebuild",
          description:
            "Rebuild homepage and pricing page in Next.js matching the approved Figma, including responsive breakpoints and copy from the brief.",
          acceptanceCriteria: [
            { id: "c1", label: "Deployed preview link included" },
            { id: "c2", label: "Responsive on mobile and desktop" },
            { id: "c3", label: "Matches approved Figma design" },
          ],
          amountUsdc: 1400,
          status: "revision_requested",
          submissions: [
            {
              id: "sub_3",
              submittedAt: iso(3),
              note: "Homepage is done, here's the repo. Pricing page still needs the FAQ section.",
              link: "https://github.com/mwebb/lumen-site",
            },
          ],
          reviews: [
            runAiReview(
              [
                { id: "c1", label: "Deployed preview link included" },
                { id: "c2", label: "Responsive on mobile and desktop" },
                { id: "c3", label: "Matches approved Figma design" },
              ],
              {
                id: "sub_3",
                submittedAt: iso(3),
                note: "Homepage is done, here's the repo. Pricing page still needs the FAQ section.",
                link: "https://github.com/mwebb/lumen-site",
              }
            ),
          ],
          fundedTx: makeTx("fund", 1400, "lumen1fund"),
        },
      ],
    },
    {
      id: "job_forge",
      title: "Forge API — Payments Integration",
      client: "Silverline Logistics",
      freelancer: "Ada Kwon",
      createdAt: iso(4),
      status: "active",
      milestones: [
        {
          id: "ms_forge_1",
          title: "Stripe webhook handling + retries",
          description:
            "Implement Stripe webhook ingestion with signature verification, idempotency, and retry-safe processing, with tests.",
          acceptanceCriteria: [
            { id: "c1", label: "Signature verification implemented" },
            { id: "c2", label: "Idempotency handling described" },
            { id: "c3", label: "Automated tests included" },
          ],
          amountUsdc: 2200,
          status: "funded",
          submissions: [],
          reviews: [],
          fundedTx: makeTx("fund", 2200, "forge1fund"),
        },
      ],
    },
    {
      id: "job_pixel",
      title: "Pixel Studio — Explainer Video",
      client: "Northwind Robotics",
      freelancer: "Jonah Reyes",
      createdAt: iso(1),
      status: "active",
      milestones: [
        {
          id: "ms_pixel_1",
          title: "60-second product explainer, final cut",
          description:
            "Deliver the final 60-second explainer video in 1080p with captions burned in, matching the approved storyboard.",
          acceptanceCriteria: [
            { id: "c1", label: "Video link or file included" },
            { id: "c2", label: "Captions included" },
            { id: "c3", label: "Matches approved storyboard" },
          ],
          amountUsdc: 950,
          status: "awaiting_funding",
          submissions: [],
          reviews: [],
        },
      ],
    },
  ];

  return jobs;
}

export function computeWallet(jobs: Job[]): WalletState {
  let totalEscrowed = 0;
  let totalReleased = 0;
  let totalFeesEarned = 0;

  for (const job of jobs) {
    for (const m of job.milestones) {
      if (m.status === "funded" || m.status === "submitted" || m.status === "in_review" || m.status === "revision_requested") {
        totalEscrowed += m.amountUsdc;
      }
      if (m.status === "released" && m.releasedTx) {
        totalReleased += m.releasedTx.amountUsdc - m.releasedTx.feeUsdc;
        totalFeesEarned += m.releasedTx.feeUsdc;
      }
    }
  }

  return {
    address: AGENT_ADDRESS,
    network: "base-sepolia",
    usdcBalance: Math.round((totalEscrowed + totalFeesEarned) * 100) / 100,
    totalEscrowed: Math.round(totalEscrowed * 100) / 100,
    totalReleased: Math.round(totalReleased * 100) / 100,
    totalFeesEarned: Math.round(totalFeesEarned * 100) / 100,
    feeBps: FEE_BPS,
  };
}

export function fundMilestone(milestone: Milestone): Milestone {
  return {
    ...milestone,
    status: "funded",
    fundedTx: makeTx("fund", milestone.amountUsdc, milestone.id + Date.now()),
  };
}

export function submitDeliverable(milestone: Milestone, note: string, link: string): Milestone {
  const submission: Submission = {
    id: `sub_${Date.now()}`,
    submittedAt: new Date().toISOString(),
    note,
    link: link || undefined,
  };
  return {
    ...milestone,
    status: "submitted",
    submissions: [...milestone.submissions, submission],
  };
}

export function reviewMilestone(milestone: Milestone): Milestone {
  const latest = milestone.submissions[milestone.submissions.length - 1];
  if (!latest) return milestone;
  const review = runAiReview(milestone.acceptanceCriteria, latest);
  const updated = { ...milestone, reviews: [...milestone.reviews, review] };

  if (review.passed) {
    return {
      ...updated,
      status: "released",
      releasedTx: makeTx("release", milestone.amountUsdc, milestone.id + Date.now()),
    };
  }
  return { ...updated, status: "revision_requested" };
}
