import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StatsStrip } from "@/components/StatsStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <StatsStrip />
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              How it works
            </span>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Six steps, no ghosting.
            </h2>
            <p className="mt-3 text-muted">
              Every job runs through the same trustable sequence — the agent never
              skips a step and never goes quiet.
            </p>
          </div>
          <HowItWorks />
        </section>

        <section id="architecture" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Architecture
            </span>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              One wallet, three parties, zero ambiguity.
            </h2>
            <p className="mt-3 text-muted">
              The escrow agent is the only party that ever holds funds. It is built
              on Coinbase AgentKit and settles in USDC on Base.
            </p>
          </div>
          <div className="card p-6 sm:p-10">
            <ArchitectureDiagram />
          </div>
        </section>

        <section id="revenue" className="mx-auto max-w-6xl px-6 py-20">
          <div className="card grid gap-8 p-8 sm:grid-cols-2 sm:p-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Revenue
              </span>
              <h2 className="mt-3 font-display text-3xl text-foreground">
                We only make money when work gets paid for.
              </h2>
              <p className="mt-4 text-muted">
                Escrow takes a 1.5% fee on funds released — never on funds held,
                never on a job that stalls. That aligns the agent&apos;s incentives with
                both sides: it only earns by resolving jobs cleanly and quickly.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-sm text-muted">Freelance & agency market (US)</span>
                <span className="font-display text-xl">$1.3T+</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-sm text-muted">At 1.5% take rate on 1% of volume</span>
                <span className="font-display text-xl">~$195M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Cost to run per resolved milestone</span>
                <span className="font-display text-xl">cents</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="card flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="max-w-xl font-display text-3xl text-foreground sm:text-4xl">
              See the agent hold, review, and release funds.
            </h2>
            <p className="max-w-md text-muted">
              The dashboard is a live walkthrough — funded jobs, an AI review in
              progress, and a running fee counter.
            </p>
            <Link
              href="/dashboard"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#04120c] transition hover:brightness-110"
            >
              Open the dashboard
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
