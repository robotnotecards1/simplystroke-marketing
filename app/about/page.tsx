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
  teamNode,
} from "@/lib/schema";

const TITLE = "About SimplyStroke: Why It Exists, and What It Won't Do";
const DESCRIPTION =
  "SimplyStroke is a free, one-tap golf stroke counter with no subscription. Here's why it exists, what it deliberately leaves out, and what it will never do to you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about/" },
  openGraph: og(TITLE, DESCRIPTION, "/about/"),
};

const jsonLd = graph(
  organizationNode,
  teamNode,
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
          SimplyStroke exists because of a specific, stupid moment that every
          golfer has had: you reach the green, stand over the ball, and realize
          you have no idea whether this putt is for four or for five. So you
          reconstruct the hole backwards, arrive at a number that feels about
          right, and write it down.
        </p>
        <p>
          Every golf app we tried wanted to solve a bigger problem than that
          one. They offered yardages, strokes gained, green slope maps, swing
          analysis, side games, social feeds, and a subscription. None of them
          offered the thing we actually needed, which was for the number to
          still be there when we got to the green.
        </p>

        <h2>So it does one job</h2>
        <p>
          One giant button. One tap per swing. An undo, because fingers slip. A
          finished scorecard with the math already done. No account before your
          first round, no ads, no signal required, and no monthly fee.
        </p>
        <p>
          That&apos;s not minimalism as an aesthetic. It&apos;s minimalism as a
          function: the moment an app asks for a second tap, or a decision, or
          your attention, it starts losing to the thing it was supposed to
          replace, which is a pencil.
        </p>

        <h2>Free, and not as a trick</h2>
        <p>
          SimplyStroke is free. There is no premium tier, no annual renewal, no
          sensor bundle and no upsell holding your own scorecard hostage.
        </p>
        <p>
          This isn&apos;t generosity, it&apos;s arithmetic.{" "}
          <strong>Counting to five costs nothing to run.</strong> There are no
          course maps to license, no analytics servers, no hardware to
          manufacture. An app that only counts can afford to be free — and an
          app that&apos;s free never has to invent a reason for you to pay again
          next year, which is the reason every other golf app gets more
          cluttered every single year.
        </p>

        <h2>What we&apos;ll never do</h2>
        <ul>
          <li>Sell your round data. There&apos;s nothing to sell it to.</li>
          <li>Put an ad between you and your score.</li>
          <li>
            Add a feature because a competitor has it. The whole product is the
            things we left out.
          </li>
          <li>Charge you a subscription to count to five.</li>
        </ul>

        <h2>On the ADHD thing</h2>
        <p>
          Losing count isn&apos;t a discipline problem. Golf quietly asks you to
          hold a running number in working memory for ten-plus minutes per hole
          while planning shots, walking, talking and hunting for a ball in the
          fescue. That&apos;s a{" "}
          <Link href="/adhd-golf/">known and studied cognitive load</Link>, and
          it&apos;s measurably harder if you have ADHD.
        </p>
        <p>
          But SimplyStroke does not treat anything. It is not a medical product
          and it never will be. It removes one arbitrary memory task from a game
          that never needed it. That&apos;s a small claim, it&apos;s a true one,
          and we&apos;d rather make a small true claim than a big one you
          can&apos;t check.
        </p>

        <div className="callout">
          <p>
            Questions, bug reports, or a story about the worst count you ever
            lost:{" "}
            <a href="mailto:hello@simplystroke.app">hello@simplystroke.app</a>.
            Every email gets read.
          </p>
        </div>

        <h2 id="team">Who writes this stuff</h2>
        <p>
          Everything on this site is written by{" "}
          <strong>the SimplyStroke team</strong> — the people who build the app.
          We&apos;re golfers who got tired of reconstructing our own scores on
          the walk to the next tee, and we keep our names off the site because
          the app should be the interesting part, not us.
        </p>
        <p>
          What that means in practice: when we make a claim about how ADHD and
          working memory interact, we cite the research. When we compare
          ourselves to another app, we link to their pricing page so you can
          check us. When we don&apos;t know something, we say so. Being anonymous
          is not a licence to be sloppy; if anything it raises the bar, because
          the writing has to earn the trust that a byline would have borrowed.
        </p>
        <p>
          Spot something wrong anywhere on this site?{" "}
          <a href="mailto:hello@simplystroke.app">Tell us</a> and we&apos;ll fix
          it.
        </p>

        <h2>Start here</h2>
        <ul>
          <li>
            <Link href="/golf-stroke-counter/">
              What a golf stroke counter is, and how to pick one
            </Link>
          </li>
          <li>
            <Link href="/compare/">
              How SimplyStroke compares to 18Birdies, Arccos and the rest
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
