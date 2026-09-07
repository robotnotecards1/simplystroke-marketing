import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FinalCta from "@/components/FinalCta";
import { og } from "@/lib/site";
import {
  breadcrumbNode,
  graph,
  organizationNode,
  personNode,
  websiteNode,
} from "@/lib/schema";

const TITLE = "Mike Anderson — Editor at SimplyStroke";
const DESCRIPTION =
  "Mike Anderson is SimplyStroke's editor. He covers the Rules of Golf, scoring technology, and the intersection of ADHD and sport.";
const PATH = "/about/mike-anderson/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH),
};

const jsonLd = graph(
  organizationNode,
  personNode,
  websiteNode,
  breadcrumbNode([
    { name: "About", path: "/about/" },
    { name: "Mike Anderson", path: PATH },
  ])
);

export default function MikeAndersonPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">About</div>
          <h1>Mike Anderson</h1>
          <div className="post-meta">
            <span>Editor, SimplyStroke</span>
          </div>
        </div>
      </header>

      <Breadcrumbs
        crumbs={[
          { name: "About", path: "/about/" },
          { name: "Mike Anderson", path: PATH },
        ]}
      />

      <article className="prose">
        <p>
          Mike writes and edits everything on the SimplyStroke site. His beat is
          narrow on purpose: the Rules of Golf as they apply to scoring, the
          technology people use to keep count, and the growing research on ADHD
          and working memory in sport.
        </p>
        <p>
          Before SimplyStroke he spent ten years writing about golf equipment and
          course design for regional golf publications across the southeast. He
          is a 14-handicap who loses balls more often than he loses count, though
          the count goes missing often enough that he is sympathetic to the
          problem.
        </p>

        <h2>What Mike does here</h2>
        <p>
          Every clinical claim on this site traces to a published, peer-reviewed
          study, and Mike checks each one before it goes live. When a paper is
          behind a paywall, the link goes to the freely available version
          (PubMed Central, preprint repository, or the journal&apos;s own open-access
          copy). When a study has been retracted or superseded, the citation
          comes down.
        </p>
        <p>
          He also writes the comparison pages and the guide content, with one
          rule: if we compare SimplyStroke to another app, we link to that
          app&apos;s own pricing page so you can check us. Writing about
          competitors you do not name or link to is marketing. Writing about
          competitors you do name and link to is journalism.
        </p>

        <h2>Articles by Mike</h2>
        <ul>
          <li>
            <Link href="/adhd-golf/">
              ADHD and golf: why the count disappears, and what helps
            </Link>
          </li>
          <li>
            <Link href="/guides/adhd-and-golf-losing-count/">
              How to stop losing count mid-round when you have ADHD
            </Link>
          </li>
          <li>
            <Link href="/guides/lost-count-of-strokes-what-to-do/">
              You lost count of your strokes. Now what?
            </Link>
          </li>
          <li>
            <Link href="/golf-stroke-counter/">
              Golf stroke counter apps: how they work and which to use
            </Link>
          </li>
        </ul>

        <div className="callout">
          <p>
            Found something wrong? Every factual claim, citation and comparison
            on this site is fair game.{" "}
            <a href="mailto:hello@simplystroke.app">hello@simplystroke.app</a>.
          </p>
        </div>
      </article>

      <FinalCta source="mike-bio" />
    </main>
  );
}
