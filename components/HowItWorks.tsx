const steps = [
  {
    n: "01",
    title: "Agree on milestones",
    body: "Client and freelancer define the job as milestones, each with a fixed amount and written acceptance criteria — no vague scope, no verbal promises.",
  },
  {
    n: "02",
    title: "Client funds escrow",
    body: "The milestone amount moves in USDC on Base into the agent's own AgentKit-managed wallet. The freelancer can see it's funded before starting work.",
  },
  {
    n: "03",
    title: "Freelancer submits",
    body: "Work is submitted against the milestone as a link, file, or written description — whatever proves the criteria were met.",
  },
  {
    n: "04",
    title: "Agent reviews the submission",
    body: "The agent checks the deliverable against each acceptance criterion individually and shows its reasoning — not a black-box yes or no.",
  },
  {
    n: "05",
    title: "Release or revise",
    body: "If every criterion is met, funds release instantly. If not, the agent names exactly what's missing and reopens the milestone for revision.",
  },
  {
    n: "06",
    title: "Escrow earns its fee",
    body: "A 1.5% fee on released funds is the only thing the agent ever takes — it never holds a cut of money that isn't paid out.",
  },
];

export function HowItWorks() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s) => (
        <div key={s.n} className="card p-6">
          <div className="font-mono text-xs text-accent">{s.n}</div>
          <h3 className="mt-3 font-display text-lg text-foreground">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
        </div>
      ))}
    </div>
  );
}
