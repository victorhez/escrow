import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent font-display text-sm font-semibold">
            E
          </span>
          <span className="font-display text-lg tracking-tight">Escrow</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <a href="#how-it-works" className="transition hover:text-foreground">
            How it works
          </a>
          <a href="#architecture" className="transition hover:text-foreground">
            Architecture
          </a>
          <a href="#revenue" className="transition hover:text-foreground">
            Revenue
          </a>
        </nav>
        <Link
          href="/dashboard"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#04120c] transition hover:brightness-110"
        >
          Open dashboard
        </Link>
      </div>
    </header>
  );
}
