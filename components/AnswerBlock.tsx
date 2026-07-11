import type { ReactNode } from "react";

/**
 * The AI-first answer block. Sits directly under the H1 on every pillar page
 * and blog post, above everything else.
 *
 * Rules for whatever you pass as `answer` (see CONTENT-STRATEGY-2026-07.md §5):
 *  - 40-60 words, one self-contained paragraph.
 *  - It must fully answer the page's title question with ZERO surrounding
 *    context. LLMs extract the passage, not the page.
 *  - No backward-pointing pronouns in the first sentence. "It" and "this" are
 *    banned openers. Name the entity: "A golf stroke counter is...".
 *  - If a number exists, use it. Stats measurably raise citation rates.
 */
export default function AnswerBlock({
  answer,
  facts,
  updated,
}: {
  answer: ReactNode;
  facts: ReactNode[];
  updated: string;
}) {
  return (
    <aside className="answer-block" aria-label="The short answer">
      <div className="answer-block-head">The short answer</div>
      <p className="answer-block-body">{answer}</p>
      <ul className="answer-block-facts">
        {facts.map((fact, i) => (
          <li key={i}>{fact}</li>
        ))}
      </ul>
      <div className="answer-block-updated">Last updated: {updated}</div>
    </aside>
  );
}
