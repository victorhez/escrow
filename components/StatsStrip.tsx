const stats = [
  { label: "Escrowed to date", value: "$6,950", sub: "USDC held across active jobs" },
  { label: "Disputes prevented", value: "94%", sub: "milestones released without a chargeback fight" },
  { label: "Avg. time to payment", value: "11 min", sub: "from acceptance to funds landing" },
  { label: "Take rate", value: "1.5%", sub: "on funds released, not funds held" },
];

export function StatsStrip() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface px-5 py-6">
          <div className="font-display text-2xl text-foreground sm:text-3xl">{s.value}</div>
          <div className="mt-1 text-sm font-medium text-muted">{s.label}</div>
          <div className="mt-0.5 text-xs text-muted/70">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
