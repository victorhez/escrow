export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <div>Escrow — built on Base with Coinbase AgentKit.</div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs">Base Sepolia · USDC</span>
          <span className="font-mono text-xs">1.5% take rate</span>
        </div>
      </div>
    </footer>
  );
}
