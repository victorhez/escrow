/**
 * Minimal ambient types for @coinbase/agentkit.
 *
 * liveWallet.ts is documentation of the production integration path and is
 * never imported by the runnable demo (see mockLedger.ts). Declaring the
 * shape we use here keeps the build fast and dependency-free for reviewers
 * — install the real `@coinbase/agentkit` package when wiring this up to a
 * live CDP wallet.
 */
declare module "@coinbase/agentkit" {
  export interface AgentKitConfig {
    cdpApiKeyName: string;
    cdpApiKeyPrivateKey: string;
    actionProviders: unknown[];
  }

  export class AgentKit {
    static from(config: AgentKitConfig): Promise<AgentKit>;
  }

  export function walletActionProvider(): unknown;
  export function erc20ActionProvider(): unknown;
}
