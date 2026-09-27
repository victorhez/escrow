"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Built with Coinbase AgentKit on Base
        </div>
        <h1 className="font-display text-4xl leading-tight text-foreground sm:text-6xl">
          Payments that don&apos;t{" "}
          <span className="text-gradient">ghost you.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Escrow is an autonomous agent that holds freelance milestone funds, reviews
          the work against the criteria you agreed on, and releases payment the
          instant it's earned — no invoices, no chasing, no disputes.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#04120c] transition hover:brightness-110 sm:w-auto"
          >
            Launch the demo
          </Link>
          <a
            href="#how-it-works"
            className="w-full rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent-dim sm:w-auto"
          >
            See how it works
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="mx-auto mt-16 max-w-4xl"
      >
        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Escrow agent wallet
            </div>
            <div className="mt-2 font-display text-2xl text-foreground">
              $4,750.00 <span className="text-base font-sans text-muted">USDC held</span>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <div className="text-muted">Network</div>
              <div className="mt-1 font-mono">Base Sepolia</div>
            </div>
            <div>
              <div className="text-muted">Fee earned</div>
              <div className="mt-1 font-mono text-accent">$66.00</div>
            </div>
            <div>
              <div className="text-muted">Status</div>
              <div className="mt-1 font-mono text-accent">● active</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
