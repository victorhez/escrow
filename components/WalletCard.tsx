import type { WalletState } from "@/lib/agent/types";

export function WalletCard({ wallet }: { wallet: WalletState }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          Agent wallet
        </span>
        <span className="font-mono text-[11px] text-muted">{wallet.network}</span>
      </div>
      <div className="mt-3 truncate font-mono text-xs text-muted" title={wallet.address}>
        {wallet.address}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-muted">Held in escrow</div>
          <div className="mt-1 font-display text-2xl text-foreground">
            ${wallet.totalEscrowed.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted">Released to date</div>
          <div className="mt-1 font-display text-2xl text-foreground">
            ${wallet.totalReleased.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-accent-dim bg-accent-soft px-4 py-3">
        <div>
          <div className="text-xs text-accent/80">Revenue earned ({wallet.feeBps / 100}% fee)</div>
          <div className="font-display text-xl text-accent">
            ${wallet.totalFeesEarned.toLocaleString()}
          </div>
        </div>
        <div className="font-mono text-[11px] text-accent/70">live counter</div>
      </div>
    </div>
  );
}
