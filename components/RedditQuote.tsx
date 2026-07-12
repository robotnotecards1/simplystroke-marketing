/**
 * A single verbatim, attributed Reddit comment. Every prop here must trace
 * to a real row in research/data/*.csv — see REDDIT-RESOURCE-PAGE-BRIEF.md.
 * Permalinks are dofollow and open in a new tab: sending traffic back to
 * the source is the whole point.
 */
export default function RedditQuote({
  quote,
  upvotes,
  permalink,
  app,
}: {
  quote: string;
  upvotes: number;
  permalink: string;
  app?: string;
}) {
  return (
    <figure className="reddit-quote">
      <blockquote>
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption>
        <span className="rq-upvotes">+{upvotes}</span>
        {app && <span className="rq-app">{app}</span>}
        <a href={permalink} target="_blank" rel="noopener">
          Read on r/golf →
        </a>
      </figcaption>
    </figure>
  );
}
