/**
 * Production wiring sketch — NOT used by the runnable demo.
 *
 * Everything in `mockLedger.ts` and `review.ts` runs entirely in memory so
 * the app boots with `npm install && npm run dev` and no external
 * credentials. This file shows how the same `Job` / `Milestone` /
 * `WalletState` shapes from `types.ts` would be backed by a real
 * CDP-managed wallet on Base Sepolia (and eventually Base mainnet) via
 * Coinbase's AgentKit.
 *
 * To go live:
 *   1. Set CDP_API_KEY_NAME / CDP_API_KEY_PRIVATE_KEY (or an AgentKit
 *      wallet provider config) in the environment.
 *   2. Replace the calls in `mockLedger.ts` (`fundMilestone`,
 *      `reviewMilestone`'s release branch) with calls into the functions
 *      below.
 *   3. Point `runAiReview` in `review.ts` at a real model call instead of
 *      the deterministic keyword-matching heuristic — the function
 *      signature (criteria + submission in, `Review` out) does not change.
 *
 * None of this file is imported by the app today — it exists so a reader
 * can see exactly where the mock ends and the real integration begins.
 */

import { AgentKit, walletActionProvider, erc20ActionProvider } from "@coinbase/agentkit";

export interface LiveWalletConfig {
  cdpApiKeyId: string;
  cdpApiKeySecret: string;
  cdpWalletSecret: string;
  networkId: "base-sepolia" | "base-mainnet";
  /** USDC contract address on the target network. */
  usdcAddress: string;
}

/**
 * Boots an AgentKit instance backed by a CDP-managed smart wallet. This
 * wallet *is* the escrow account: the agent holds custody of client funds
 * between "funded" and "released" and executes the release transaction
 * itself once a milestone passes review, with no manual signing step.
 */
export async function createEscrowAgent(config: LiveWalletConfig) {
  const agentKit = await AgentKit.from({
    cdpApiKeyId: config.cdpApiKeyId,
    cdpApiKeySecret: config.cdpApiKeySecret,
    cdpWalletSecret: config.cdpWalletSecret,
    actionProviders: [walletActionProvider(), erc20ActionProvider()],
  });

  return agentKit;
}

/**
 * Moves USDC from the client's wallet into the agent's escrow wallet.
 * In the demo this is simulated instantly by `makeTx()` in mockLedger.ts;
 * in production this is a real ERC-20 transfer the client signs, whose
 * confirmation the agent listens for before marking the milestone "funded".
 */
export async function fundEscrowOnChain(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  agentKit: Awaited<ReturnType<typeof createEscrowAgent>>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: { fromAddress: string; amountUsdc: number }
): Promise<{ txHash: string }> {
  throw new Error(
    "fundEscrowOnChain is a production stub — the demo uses mockLedger.fundMilestone instead."
  );
}

/**
 * Releases escrowed USDC to the freelancer, net of the platform fee, once
 * the AI review passes. This is the single action that makes the "trust"
 * story real: the agent — not a person — holds the keys and executes the
 * payout the instant acceptance criteria are met.
 */
export async function releaseEscrowOnChain(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  agentKit: Awaited<ReturnType<typeof createEscrowAgent>>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: { toAddress: string; amountUsdc: number; feeBps: number }
): Promise<{ txHash: string; feeUsdc: number }> {
  throw new Error(
    "releaseEscrowOnChain is a production stub — the demo uses mockLedger.reviewMilestone instead."
  );
}
