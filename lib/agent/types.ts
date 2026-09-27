/**
 * Core domain types for the Escrow agent.
 *
 * These types are shared between the demo (in-memory) ledger in `mockLedger.ts`
 * and the production wiring sketched in `liveWallet.ts`. Keeping one shared
 * shape means swapping the storage/wallet layer never touches the UI.
 */

export type MilestoneStatus =
  | "awaiting_funding"
  | "funded"
  | "submitted"
  | "in_review"
  | "revision_requested"
  | "released";

export type JobStatus = "active" | "completed";

export interface AcceptanceCriterion {
  id: string;
  label: string;
}

export interface ReviewCheck {
  criterionId: string;
  label: string;
  passed: boolean;
  detail: string;
}

export interface Review {
  id: string;
  createdAt: string;
  score: number; // 0-100
  passed: boolean;
  checks: ReviewCheck[];
  summary: string;
}

export interface Submission {
  id: string;
  submittedAt: string;
  note: string;
  link?: string;
  revisionOf?: string;
}

export interface OnChainTx {
  hash: string;
  kind: "fund" | "release" | "refund";
  amountUsdc: number;
  feeUsdc: number;
  timestamp: string;
  explorerUrl: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: AcceptanceCriterion[];
  amountUsdc: number;
  status: MilestoneStatus;
  submissions: Submission[];
  reviews: Review[];
  fundedTx?: OnChainTx;
  releasedTx?: OnChainTx;
}

export interface Job {
  id: string;
  title: string;
  client: string;
  freelancer: string;
  createdAt: string;
  status: JobStatus;
  milestones: Milestone[];
}

export interface WalletState {
  address: string;
  network: "base-sepolia";
  usdcBalance: number;
  totalEscrowed: number;
  totalReleased: number;
  totalFeesEarned: number;
  feeBps: number;
}
