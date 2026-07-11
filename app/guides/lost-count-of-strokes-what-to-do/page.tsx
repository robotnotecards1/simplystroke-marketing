import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import WaitlistSection from "@/components/WaitlistSection";
import { og } from "@/lib/site";
import {
  articleNode,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  personNode,
  websiteNode,
  type Faq,
} from "@/lib/schema";

const TITLE = "You Lost Count of Your Strokes. Now What?";
const DESCRIPTION =
  "What the Rules of Golf actually say when you don't know your score, how to reconstruct a hole honestly, and how to make sure it doesn't happen again.";
const PATH = "/guides/lost-count-of-strokes-what-to-do/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH, "article"),
};

const faqs: Faq[] = [
  {
    q: "What do you do if you lose count of your strokes in golf?",
    a: "Reconstruct the hole out loud, shot by shot, from the tee. Name each shot and where it finished, and count the penalty strokes separately. If you still cannot be certain, the Rules of Golf require you to record the higher number: in stroke play you must not knowingly return a score lower than you actually took. Ask your playing partners, since somebody almost always watched your ball.",
  },
  {
    q: "What happens if you write down the wrong score in golf?",
    a: "In stroke play, returning a score lower than you actually took on a hole means disqualification. Returning a score higher than you took stands, and you are stuck with it. That asymmetry is the whole reason to round up when you are unsure. An honest four written down as a five costs you one shot; a genuine five written down as a four can cost you the round.",
  },
  {
    q: "Do you have to count air shots and whiffs in golf?",
    a: "Yes. A stroke is the forward movement of the club made to strike the ball. If you swung at it and intended to hit it, that counts, whether or not you made contact. A practice swing does not count, because there was no intent to strike the ball.",
  },
  {
    q: "How do you keep track of golf strokes without forgetting?",
    a: "Stop trying to remember. The reliable methods all move the count out of your head: a bead or clicker counter you advance after every swing, a playing partner who keeps your card, or a one-tap stroke counter app that records the shot as it happens. Writing the number down after the hole does not help, because you still had to carry it through the hole to have something to write.",
  },
  {
    q: "Why do I keep losing count of my golf strokes?",
    a: "Because golf asks you to hold a running number in working memory for ten-plus minutes per hole while planning shots, walking, talking and searching for a ball. Holding an intention across a long, interrupted interval is a prospective memory task, and prospective memory failures account for the majority of everyday memory failures. It is measurably harder for golfers with ADHD, which is why some people lose the count every single hole.",
  },
];

const jsonLd = graph(
  organizationNode,
  websiteNode,
  personNode,
  articleNode({
    type: "BlogPosting",
    headline: TITLE,
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-07-11",
    dateModified: "2026-07-11",
  }),
  faqNode(faqs),
  breadcrumbNode([
    { name: "Guides", path: "/guides/" },
    { name: "You lost count of your strokes. Now what?", path: PATH },
  ])
);

export default function Post() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Scoring</div>
          <h1>You lost count of your strokes. Now what?</h1>
          <div className="post-meta">
            <span>Jared Moore</span>
            <span>·</span>
            <span>July 2026</span>
            <span>·</span>
            <span>6 min read</span>
          </div>
        </div>
      </header>

      <Breadcrumbs
        crumbs={[
          { name: "Guides", path: "/guides/" },
          { name: "You lost count of your strokes", path: PATH },
        ]}
      />

      <article className="prose">
        <AnswerBlock
          updated="July 2026"
          answer={
            <>
              If you lose count of your strokes, reconstruct the hole out loud
              from the tee, shot by shot, and count penalty strokes separately.
              Ask your playing partners, because someone almost always watched
              your ball. If you still are not certain,{" "}
              <strong>the Rules of Golf require you to take the higher number</strong>{" "}
              — returning a score lower than you actually took means
              disqualification in stroke play.
            </>
          }
          facts={[
            <>
              A score written <strong>too high</strong> stands. A score written{" "}
              <strong>too low</strong> is a disqualification. Always round up
              when unsure
            </>,
            <>
              <strong>Whiffs count.</strong> A stroke is the forward movement of
              the club made to strike the ball, contact or not
            </>,
            <>
              The fix is not concentrating harder. It is{" "}
              <strong>moving the count out of your head</strong>
            </>,
          ]}
        />

        <p>
          You are standing on the green with a putt in front of you and no idea
          what it is for. Four? Five? You start doing the forensics. Driver.
          Then the layup. Was there a chunked wedge in there, or are you
          thinking of the last hole?
        </p>
        <p>
          Here is what to actually do, in order, and then what to do so that it
          stops happening.
        </p>

        <h2>1. Rebuild the hole out loud, from the tee</h2>
        <p>
          Not silently. Out loud, or at least under your breath. Say each shot
          and where it finished:{" "}
          <em>
            driver, right rough. Seven iron, short of the bunker. Wedge on.
          </em>{" "}
          Naming the position of each shot gives you a chain of physical
          locations to walk back through, and locations are far easier to
          retrieve than an abstract number.
        </p>
        <p>
          Count penalty strokes <strong>separately</strong>, at the end, not as
          you go. Mixing penalties into the running count is where most
          reconstructions break: you end up unsure whether the shot from the
          drop zone was stroke three or stroke four.
        </p>

        <h2>2. Ask. Somebody watched your ball.</h2>
        <p>
          Golfers watch each other&apos;s balls, because that is half of what
          playing partners are for. Your group very likely knows exactly how
          many times you swung, and nobody thinks less of you for asking. This
          is the single highest-yield step and the one people skip out of
          embarrassment.
        </p>

        <h2>3. If you still don&apos;t know, round up</h2>
        <p>
          This is not etiquette advice, it is the Rules. In stroke play, if you
          return a score for a hole lower than you actually took, you are
          disqualified. If you return one higher than you took, the score
          stands, and you eat the extra shot.
        </p>
        <div className="callout">
          <p>
            <strong>The asymmetry is the whole point.</strong> Guessing high
            costs you one stroke. Guessing low can cost you the entire round. So
            when it is genuinely a coin flip between four and five, it was a
            five.
          </p>
        </div>
        <p>
          Two things people miss when counting back:{" "}
          <strong>whiffs count</strong> — a stroke is the forward movement of
          the club made to strike the ball, whether or not you touched it — and{" "}
          <strong>practice swings don&apos;t</strong>, because there was no
          intent to strike. If you swung at it and meant it, write it down.
        </p>

        <h2>Now the part that matters: making it stop</h2>
        <p>
          Everything above is triage. It is what you do after the count is
          already gone. The interesting question is why a person who can
          remember a phone number, a golf swing and the exact lie of a ball they
          hit twenty minutes ago cannot hang on to a number between one and
          seven.
        </p>
        <p>
          The answer is that counting your strokes is not a memory task in the
          way it looks. It is a{" "}
          <strong>prospective memory task</strong>: hold an intention (increment
          this number, every time, without being reminded) across a ten to
          fifteen minute interval that is deliberately full of competing
          demands. Pick a club. Read the wind. Watch the ball. Walk. Talk. Find
          the ball. Plan again.
        </p>
        <p>
          Prospective memory failures account for the majority of everyday
          memory failures in general, and prospective memory is one of the
          things that is measurably harder if you have ADHD. That is not a
          personality assessment, it is a research finding, and it means a
          meaningful number of golfers have spent years quietly blaming
          themselves for something that has a name. If the count vanishes every
          hole of every round, that is worth reading about:{" "}
          <Link href="/adhd-golf/">ADHD and golf: why the count vanishes</Link>.
        </p>

        <h2>The three fixes that actually work</h2>
        <p>
          What they have in common: none of them ask you to try harder. They all
          move the number somewhere that cannot get distracted.
        </p>
        <ul>
          <li>
            <strong>A bead or clicker counter.</strong> Cheap, no battery,
            genuinely effective. Its flaw is that advancing it is itself a thing
            you have to remember to do, so it fails in exactly the moments the
            count fails.
          </li>
          <li>
            <strong>Hand your card to someone else.</strong> Works well and
            costs nothing. Depends entirely on having a playing partner who is
            paying attention, which is not a given.
          </li>
          <li>
            <strong>A one-tap stroke counter app.</strong> Tap once per swing,
            immediately, while the swing is still the thing you are thinking
            about. The number is recorded before there is any opportunity to
            forget it. That is the whole mechanism, and it is why it works when
            &ldquo;concentrate harder&rdquo; does not.
          </li>
        </ul>
        <p>
          Note what is <em>not</em> on that list: the paper scorecard. A
          scorecard is where the number gets filed after the hole is over, which
          means your working memory still had to carry it the whole way. The
          scorecard is not the counting mechanism. You are. That is the bug.
        </p>
        <p>
          If you want the longer version of how to choose one of these, we wrote
          it up here:{" "}
          <Link href="/golf-stroke-counter/">
            golf stroke counter apps, and what separates a good one from a bad
            one
          </Link>
          .
        </p>

        <h2>Common questions</h2>
        <div className="faq-list">
          {faqs.map(({ q, a }) => (
            <div className="faq-item" key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>

        <div className="author-box">
          <div>
            <div className="author-box-name">Jared Moore</div>
            <p>
              Built <Link href="/">SimplyStroke</Link>, a one-tap golf stroke
              counter, after one too many rounds spent reconstructing his own
              score on the walk to the next tee.
            </p>
          </div>
        </div>
      </article>

      <WaitlistSection
        source="guide-lost-count"
        heading="Never reconstruct a hole again."
      />
    </main>
  );
}
