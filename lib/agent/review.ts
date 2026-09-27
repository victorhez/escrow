import type { AcceptanceCriterion, Review, ReviewCheck, Submission } from "./types";

/**
 * Deterministic "AI review" scoring for the demo.
 *
 * In production this function is replaced by an LLM call (see the note in
 * `liveWallet.ts`) that reads the milestone's acceptance criteria and the
 * freelancer's submission, then returns structured pass/fail judgments per
 * criterion. Swapping in a real model means changing this one function's
 * body — the rest of the app only depends on the `Review` shape below.
 *
 * The mock keeps the demo self-contained and reproducible: it hashes the
 * submission text against each criterion's keywords so different inputs
 * produce different, legible outcomes without calling out to any API.
 */

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function keywordsFor(label: string): string[] {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 4);
}

export function runAiReview(
  criteria: AcceptanceCriterion[],
  submission: Submission
): Review {
  const text = `${submission.note} ${submission.link ?? ""}`.toLowerCase();
  const checks: ReviewCheck[] = criteria.map((criterion) => {
    const words = keywordsFor(criterion.label);
    const matched = words.filter((w) => text.includes(w));
    const coverage = words.length === 0 ? 1 : matched.length / words.length;

    // Deterministic pseudo-signal so the same submission always scores the
    // same way, but different submissions plausibly differ.
    const noise = (hash(text + criterion.id) % 100) / 100;
    const signal = coverage * 0.7 + noise * 0.3;
    const passed = signal >= 0.45;

    const detail = passed
      ? `Found clear evidence addressing "${criterion.label.toLowerCase()}" in the submission.`
      : `Submission doesn't clearly demonstrate "${criterion.label.toLowerCase()}" — no matching detail, link, or explanation found.`;

    return { criterionId: criterion.id, label: criterion.label, passed, detail };
  });

  const passedCount = checks.filter((c) => c.passed).length;
  const score = criteria.length === 0 ? 100 : Math.round((passedCount / criteria.length) * 100);
  const passed = criteria.length === 0 ? true : passedCount === criteria.length;

  const summary = passed
    ? `All ${criteria.length} acceptance criteria satisfied. Recommending release of funds.`
    : `${passedCount}/${criteria.length} criteria satisfied. Requesting revision before funds are released.`;

  return {
    id: `rev_${hash(text + submission.id).toString(36)}`,
    createdAt: new Date().toISOString(),
    score,
    passed,
    checks,
    summary,
  };
}
