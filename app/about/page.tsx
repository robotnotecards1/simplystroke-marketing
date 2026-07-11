import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import WaitlistSection from "@/components/WaitlistSection";
import { og } from "@/lib/site";
import {
  appNode,
  breadcrumbNode,
  graph,
  organizationNode,
  personNode,
} from "@/lib/schema";

const TITLE = "About SimplyStroke: Who Built It, and Why";
const DESCRIPTION =
  "SimplyStroke is a one-tap golf stroke counter built by Jared Moore, who kept losing count of his own score. Here's the whole story and the whole company.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about/" },
  openGraph: og(TITLE, DESCRIPTION, "/about/"),
};

const jsonLd = graph(
  organizationNode,
  personNode,
  appNode,
  breadcrumbNode([{ name: "About", path: "/about/" }])
);

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">About</div>
          <h1>Somebody had to build the boring one.</h1>
        </div>
      </header>

      <Breadcrumbs crumbs={[{ name: "About", path: "/about/" }]} />

      <article className="prose">
        <p>
          SimplyStroke is made by <strong>Jared Moore</strong>, a golfer who
          spent years arriving at the green with no idea whether he was lying
          three or four, and doing the arithmetic backwards on the walk to the
          next tee.
        </p>
        <p>
          Every golf app he tried wanted to solve a bigger problem than the one
          he had. They offered yardages, strokes gained, green slope maps,
          swing analysis, side games, social feeds and a subscription. None of
          them offered the thing he actually needed, which was for the number to
          still be there when he got to the green.
        </p>
        <p>
          So SimplyStroke does one job. One giant button. One tap per swing. An
          undo, because fingers slip. A finished scorecard with the math already
          done. No account before your first round, no ads, no signal required,
          no monthly fee.
        </p>

        <h2>Why the ADHD angle isn&apos;t a marketing angle</h2>
        <p>
          Losing count is not a discipline problem. Golf quietly asks you to
          hold a running number in working memory for ten-plus minutes per hole
          while planning shots, walking, talking and hunting for a ball in the
          fescue. That is a{" "}
          <Link href="/adhd-golf/">known and studied cognitive load</Link>, and
          it is measurably harder if you have ADHD. Roughly 15.5 million
          American adults have a current ADHD diagnosis, and more than half of
          them were diagnosed as adults.
        </p>
        <p>
          SimplyStroke does not treat anything. It is not a medical product and
          it never will be. It removes one arbitrary memory task from a game
          that never needed it. That&apos;s a small claim, and it&apos;s a true
          one, and we&apos;d rather make a small true claim than a big one you
          can&apos;t check.
        </p>

        <h2>What we&apos;ll never do</h2>
        <ul>
          <li>Sell your round data. There&apos;s nothing to sell it to.</li>
          <li>Put an ad between you and your score.</li>
          <li>
            Add a feature because a competitor has it. The whole product is the
            things we left out.
          </li>
          <li>
            Charge you a subscription to count to five. SimplyStroke is free.
          </li>
        </ul>

        <div className="callout">
          <p>
            Questions, bug reports, or a story about the worst count you ever
            lost:{" "}
            <a href="mailto:hello@simplystroke.app">hello@simplystroke.app</a>.
            Every email gets read.
          </p>
        </div>

        <h2>Start here</h2>
        <ul>
          <li>
            <Link href="/golf-stroke-counter/">
              What a golf stroke counter is, and how to pick one
            </Link>
          </li>
          <li>
            <Link href="/adhd-golf/">ADHD and golf: why the count vanishes</Link>
          </li>
          <li>
            <Link href="/features/">Everything SimplyStroke does</Link>
          </li>
        </ul>
      </article>

      <WaitlistSection source="about" />
    </main>
  );
}
