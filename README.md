# Escrow

**Payments that don't ghost you.**

Escrow is an autonomous payments agent for freelance and agency work. It holds
milestone funds in its own wallet, reviews submitted deliverables against
the acceptance criteria the client and freelancer agreed on, and releases
payment the instant the work is actually done — or explains precisely what's
missing if it isn't. No invoices chasing a client's inbox, no "is this good
enough" back-and-forth, no chargebacks.

## The problem

Freelance and agency payments run on trust that doesn't scale. Clients don't
want to pay upfront with no recourse; freelancers don't want to deliver work
and then wait weeks — or chase forever — for payment. The result is a market
full of disputes, ghosting, and money sitting in limbo while both sides wait
on the other to move first.

## The product

Escrow puts a neutral, always-on agent in the middle, and gives it a wallet:

1. **Agree on milestones.** Client and freelancer define the job as fixed
   milestones, each with a dollar amount and written acceptance criteria.
2. **Client funds escrow.** The milestone amount moves into the agent's own
   AgentKit-managed wallet in USDC on Base — visible to both sides before any
   work starts.
3. **Freelancer submits.** A link, a file, or a written description — proof
   the criteria were met.
4. **The agent reviews.** It checks the submission against each acceptance
   criterion individually and shows its reasoning, not a black-box verdict.
5. **Release or revise.** If every criterion passes, funds release instantly.
   If not, the agent names exactly what's missing and reopens the milestone.
6. **The agent earns a fee.** 1.5% on funds released — never on funds held,
   never on a job that stalls.

## How it works

```
   Client                    Escrow Agent                  Freelancer
     |                     (AgentKit wallet)                    |
     |-------- fund milestone (USDC) ------------------------->|(agent)
     |                          |                                |
     |                          |<----- submit deliverable ------|
     |                          |
     |                    [ AI review step ]
     |                    checks submission
     |                    against criteria
     |                          |
     |<--- revision requested --|                                |
     |                          |----- release, minus fee ------>|
```

The agent is the only party that ever holds funds. Everything settles in
USDC on Base.

## Tech stack

- **Next.js 16** (App Router) + TypeScript (strict) + Tailwind CSS 4
- **Framer Motion** for the landing page's motion
- **Coinbase AgentKit** (`@coinbase/agentkit`) as the wallet/agent layer
- Inline SVG for the architecture diagram — no external image assets

## What's real vs. simulated

The demo is designed to run in thirty seconds with zero external
credentials, so anyone reviewing it can click through the full flow without
setting up a CDP account or funding a testnet wallet first. Concretely:

- `lib/agent/mockLedger.ts` is an in-memory ledger: seeded jobs, deterministic
  fake transaction hashes, and the state machine that moves a milestone from
  `funded` → `submitted` → `in_review` → `released` / `revision_requested`.
  This is what the dashboard actually runs on.
- `lib/agent/review.ts` scores a submission against acceptance criteria with
  a deterministic keyword/heuristic function instead of a live LLM call, so
  the review step is reproducible and doesn't require an API key. The
  function signature (criteria + submission in, a structured `Review` out)
  is exactly what a real model call would return, so swapping it out is a
  one-function change.
- `lib/agent/liveWallet.ts` is the production integration point: it shows
  how the same `Job` / `Milestone` / `WalletState` types map onto a real
  CDP-managed wallet on Base Sepolia via AgentKit — `AgentKit.from(...)`,
  the wallet and ERC-20 action providers, and where a real fund/release
  transaction would be signed and broadcast. It's not imported by the demo
  path; it exists so the integration is legible to anyone reading the code,
  not just described in prose.

Going live means setting CDP credentials, pointing `mockLedger`'s fund and
release calls at `liveWallet.ts`'s functions, and swapping the review
heuristic for a real model call. Nothing else in the app changes.

## Running it

```
npm install
npm run dev
```

That's it — no environment variables required for the demo path.

## Revenue

The fee is 1.5% of funds released, never funds held — so the agent only
earns when a job actually resolves cleanly, which keeps its incentives
aligned with both the client and the freelancer. The freelance and agency
market is enormous and almost entirely unprotected by anything like this;
capturing a fraction of a percent of it at this take rate is a real business,
not a demo gimmick.
