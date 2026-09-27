# Escrow

**An AI agent that holds the money, checks the work, and pays the moment it's actually done.**

Freelance and agency work runs on trust that doesn't scale: clients pay upfront and hope, or freelancers deliver and wait — sometimes weeks, sometimes never. Every "net 30," every ghosted invoice, every dispute over whether a deliverable actually meets spec is the same underlying failure: there's no neutral party holding both sides accountable in real time.

Escrow is that neutral party, except it's an agent, not a person. Give it a wallet.

## How it works

```
   Client                    Escrow Agent                  Freelancer
     │                    (AgentKit wallet)                    │
     │──── funds milestone ───▶│                                │
     │                         │◀──── submits deliverable ──────│
     │                         │
     │                    ┌────┴─────┐
     │                    │ AI review │  checks the submission against
     │                    │  against  │  the milestone's written
     │                    │ criteria  │  acceptance criteria
     │                    └────┬─────┘
     │                         │
     │              ┌──────────┴──────────┐
     │              ▼                     ▼
     │         criteria met          criteria not met
     │              │                     │
     │   releases funds, minus      requests a specific
     │   a small platform fee       revision — no ghosting,
     │              │               no ambiguity
     │              ▼
     │──────────────────────▶ paid instantly
```

1. Client and freelancer agree on a job broken into milestones, each with explicit acceptance criteria.
2. The client funds a milestone into the agent's escrow wallet.
3. The freelancer submits their deliverable directly to the agent.
4. The agent reviews the submission against the milestone's criteria and either releases payment on the spot or sends back exactly what's missing.
5. Funds move the instant the bar is cleared — no invoicing, no chasing, no "let me check with accounting."

The agent takes a small basis-point fee on funds it releases. That's the whole business model: it only makes money when it successfully gets both sides paid and unblocked, so its incentives point the same direction as its users'.

## What's real, what's simulated

The demo runs entirely in memory (`lib/agent/mockLedger.ts`) so it boots in seconds with `npm install && npm run dev` — no CDP credentials, no testnet faucet, nothing to configure. Every state transition (funding, submission, review, release) is modeled with the same shapes a production deployment would use.

`lib/agent/liveWallet.ts` documents the production integration: a real [AgentKit](https://github.com/coinbase/agentkit)-managed wallet on Base Sepolia holds the actual USDC, and the two on-chain actions — funding the escrow and releasing it — are single, agent-signed transactions. Wiring it up is a matter of swapping the calls in `mockLedger.ts` for the ones in `liveWallet.ts` and pointing `review.ts` at a real model call instead of the heuristic used in the demo. The domain types (`lib/agent/types.ts`) don't change either way.

## Stack

- Next.js (App Router) + TypeScript, strict mode
- Tailwind CSS for the design system
- Framer Motion for interaction and transition detail
- Coinbase AgentKit for the production wallet layer

## Running it

```bash
npm install
npm run dev
```

Open `localhost:3000` for the landing page, or jump straight to `/dashboard` for the working demo — create a job, fund a milestone, submit a deliverable, and watch the agent review and release it.

Deploys to Vercel with no required environment variables.
