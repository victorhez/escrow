export function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 900 360"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: client funds the escrow agent's wallet, the agent runs an AI review on the freelancer's submission, then releases funds on Base"
    >
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="var(--muted)" />
        </marker>
        <linearGradient id="agentGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Client node */}
      <g>
        <rect x="20" y="130" width="180" height="100" rx="16" fill="var(--surface)" stroke="var(--border)" />
        <text x="110" y="172" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontFamily="var(--font-sans)" fontWeight="600">
          Client
        </text>
        <text x="110" y="196" textAnchor="middle" fill="var(--muted)" fontSize="12" fontFamily="var(--font-sans)">
          Funds milestone in USDC
        </text>
      </g>

      {/* Agent node (center, glowing) */}
      <g>
        <circle cx="450" cy="180" r="150" fill="url(#agentGlow)" />
        <rect x="350" y="105" width="200" height="150" rx="20" fill="var(--surface-2)" stroke="var(--accent-dim)" strokeWidth="1.5" />
        <text x="450" y="140" textAnchor="middle" fill="var(--accent)" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="1">
          AGENTKIT WALLET
        </text>
        <text x="450" y="166" textAnchor="middle" fill="var(--foreground)" fontSize="17" fontFamily="var(--font-sans)" fontWeight="600">
          Escrow Agent
        </text>
        <text x="450" y="188" textAnchor="middle" fill="var(--muted)" fontSize="12" fontFamily="var(--font-sans)">
          Holds funds in custody
        </text>

        {/* AI review sub-box */}
        <rect x="375" y="205" width="150" height="36" rx="10" fill="var(--accent-soft)" stroke="var(--accent-dim)" />
        <text x="450" y="228" textAnchor="middle" fill="var(--accent)" fontSize="11.5" fontFamily="var(--font-sans)" fontWeight="600">
          AI review step
        </text>
      </g>

      {/* Freelancer node */}
      <g>
        <rect x="700" y="130" width="180" height="100" rx="16" fill="var(--surface)" stroke="var(--border)" />
        <text x="790" y="172" textAnchor="middle" fill="var(--foreground)" fontSize="16" fontFamily="var(--font-sans)" fontWeight="600">
          Freelancer
        </text>
        <text x="790" y="196" textAnchor="middle" fill="var(--muted)" fontSize="12" fontFamily="var(--font-sans)">
          Submits deliverable
        </text>
      </g>

      {/* Arrows: client -> agent (fund) */}
      <line x1="202" y1="155" x2="346" y2="155" stroke="var(--muted)" strokeWidth="1.4" markerEnd="url(#arrow)" />
      <text x="274" y="145" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
        fund
      </text>

      {/* Arrows: freelancer -> agent (submit) */}
      <line x1="698" y1="155" x2="554" y2="155" stroke="var(--muted)" strokeWidth="1.4" markerEnd="url(#arrow)" />
      <text x="626" y="145" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-mono)">
        submit
      </text>

      {/* Arrows: agent -> freelancer (release) */}
      <line x1="554" y1="210" x2="698" y2="210" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#arrow)" />
      <text x="626" y="200" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
        release − fee
      </text>

      {/* Arrows: agent -> client (revision request, dashed) */}
      <path d="M346,205 C300,225 250,225 202,205" fill="none" stroke="var(--warn)" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#arrow)" />
      <text x="274" y="245" textAnchor="middle" fill="var(--warn)" fontSize="11" fontFamily="var(--font-mono)">
        revision requested
      </text>

      {/* Base network label */}
      <text x="450" y="300" textAnchor="middle" fill="var(--muted)" fontSize="12" fontFamily="var(--font-sans)">
        settled on Base Sepolia · USDC
      </text>
    </svg>
  );
}
