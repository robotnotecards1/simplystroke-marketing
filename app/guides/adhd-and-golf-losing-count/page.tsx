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
  teamNode,
  websiteNode,
  type Faq,
} from "@/lib/schema";

/* This guide is the PRACTICAL one: why each of the usual fixes fails an ADHD
   golfer, and what a fix has to look like to survive a round.
   The WHY — prospective memory, the research, is-golf-good-for-ADHD — lives on
   /adhd-golf/. Keep it that way. When two pages argue the same case for the
   same query, Google picks one and buries the other, and it may not pick the
   one you want. This page links up; it does not re-argue. */

const TITLE = "How to Stop Losing Count Mid-Round When You Have ADHD";
const DESCRIPTION =
  "Pencils, clickers, playing partners, big golf apps: every standard fix for losing count fails ADHD golfers in the same specific way. Here's why, and what a fix has to look like to survive an actual round.";
const PATH = "/guides/adhd-and-golf-losing-count/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH, "article"),
};

const faqs: Faq[] = [
  {
    q: "How do you keep score in golf with ADHD?",
    a: "Stop holding the number and start recording it. Every method that survives an ADHD round has the same shape: it captures the stroke at the moment you take it, in a single action, without asking you to remember to do anything later. That rules out the pencil scorecard, which only records the number after the hole is already over. It leaves counting out loud on the swing, a bead counter advanced immediately, a playing partner who keeps your card, or a one-tap stroke counter app.",
  },
  {
    q: "Why doesn't a pencil scorecard work for ADHD golfers?",
    a: "Because a scorecard is not the counting mechanism, it is only where the answer gets filed. You still have to carry the running count in working memory for the entire hole in order to have something to write down at the end of it. The hole is exactly where the number goes missing, so the scorecard arrives too late to help.",
  },
  {
    q: "Do bead counters and clickers work for ADHD?",
    a: "Better than a pencil, because they move the count out of your head and into an object. But advancing the counter is itself a thing you have to remember to do, unprompted, after every swing. That is the same hold-an-intention-across-time task that was already failing, now with a small metal object attached to it. Clickers work well for some golfers and quietly fail for others.",
  },
  {
    q: "Why are most golf apps bad for ADHD?",
    a: "Because the scorecard is not what they are for. In a GPS or analytics app, entering a score means opening a grid, finding the right hole and incrementing a cell, all while overlays, upsells and notifications compete for the attention you were already short of. That is several taps and a decision per stroke. Most people abandon it by the fourth hole and put the phone back in the bag.",
  },
  {
    q: "Is there a golf app made for ADHD?",
    a: "Yes. SimplyStroke is a golf stroke counter built for ADHD golfers: one giant tap-the-ball button, an undo, no account before your first round, no ads, and nothing else on screen. It is free, works fully offline, and launches in 2026 on iPhone, Android and Apple Watch.",
  },
];

const jsonLd = graph(
  organizationNode,
  teamNode,
  websiteNode,
  articleNode({
    type: "BlogPosting",
    headline: TITLE,
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-07-08",
    dateModified: "2026-07-11",
  }),
  faqNode(faqs),
  breadcrumbNode([
    { name: "Guides", path: "/guides/" },
    { name: "Losing count with ADHD", path: PATH },
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
          <div className="pill">ADHD &amp; golf</div>
          <h1>How to stop losing count mid-round when you have ADHD</h1>
          <div className="post-meta">
            <span>The SimplyStroke Team</span>
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
          { name: "Losing count with ADHD", path: PATH },
        ]}
      />

      <article className="prose">
        <AnswerBlock
          updated="July 2026"
          answer={
            <>
              To stop losing count of your strokes with ADHD,{" "}
              <strong>stop holding the number and start recording it</strong>.
              Every method that survives a real round captures the stroke at the
              moment you take it, in one action, without asking you to remember
              to do anything later. That rules out the pencil scorecard, which
              only records the number after the hole is already over.
            </>
          }
          facts={[
            <>
              <strong>The pencil isn&apos;t the counter. You are.</strong> A
              scorecard files the number after the hole; your working memory
              carried it through the hole
            </>,
            <>
              A fix has to be{" "}
              <strong>
                one action, taken immediately, with nothing to remember
              </strong>{" "}
              — anything else fails at the same point
            </>,
            <>
              Counting out loud on the swing costs nothing and works this
              weekend
            </>,
          ]}
        />

        <p>
          Every golfer who loses count has been handed the same four fixes.
          Every one of them fails an ADHD golfer, and — this is the useful part
          — they all fail in exactly the same place.
        </p>
        <p>
          Finding that place tells you what a fix actually has to do. If you
          want the underlying reason the count disappears at all, that is a
          separate and genuinely interesting question, covered here:{" "}
          <Link href="/adhd-golf/">
            ADHD and golf: why the count disappears, and what helps
          </Link>
          . This page is about what to do on Saturday.
        </p>

        <h2>Fix 1: &ldquo;Just use the scorecard.&rdquo;</h2>
        <p>
          A pencil scorecard is not a counting device. It is a <em>filing</em>{" "}
          device. It records the number{" "}
          <strong>after the hole is already over</strong>, which means something
          still had to carry that number through the hole to give the pencil
          anything to write.
        </p>
        <p>
          That something was your working memory. Across ten to fifteen minutes
          of club selection, ball-watching, walking, conversation and searching
          the fescue.
        </p>
        <div className="callout">
          <p>
            <strong>
              The scorecard isn&apos;t the bug and neither are you. The hand-off
              between them is the bug.
            </strong>{" "}
            The pencil turns up ten minutes late and asks for an answer it did
            nothing to help you keep.
          </p>
        </div>
        <p>
          There is a second problem underneath the first: remembering to write
          it down is itself a thing to remember. And it is a{" "}
          <em>boring</em> thing, which is the category of thing that gets
          dropped first.
        </p>

        <h2>Fix 2: A clicker or bead counter</h2>
        <p>
          Closer, and worth trying, because the instinct is right — it moves the
          count out of your head and into an object.
        </p>
        <p>
          But look at what it still asks. After every swing, unprompted, with no
          reminder, you have to remember to advance it. That is the same
          hold-an-intention-across-time task that was already failing. The task
          has not been removed. A small metal object has been attached to it.
        </p>
        <p>
          Which is why clickers work beautifully for some golfers and quietly
          fail for others. If you have ever finished a hole staring at a bead
          counter wondering whether you clicked it after that chip, you know
          which group you are in.
        </p>

        <h2>Fix 3: Let your playing partner keep score</h2>
        <p>
          This one genuinely works and it is badly underused. Your group watches
          your ball — that is half of what playing partners are for — and they
          usually know exactly how many times you swung.
        </p>
        <p>Two rules make it reliable:</p>
        <ul>
          <li>
            <strong>Settle the number before anyone putts</strong>, not on the
            next tee. Once you have walked off the green, the hole stops being a
            memory and becomes a story, and stories round themselves off.
          </li>
          <li>
            <strong>Ask out loud, early, without apologising for it.</strong>{" "}
            Nobody thinks less of you for asking. The embarrassment is the only
            thing stopping this from working.
          </li>
        </ul>
        <p>
          The limit is obvious: it needs a partner who is paying attention, and
          it makes your score somebody else&apos;s job.
        </p>

        <h2>Fix 4: A full-featured golf app</h2>
        <p>
          This is the one that fails hardest, because it looks like it ought to
          work.
        </p>
        <p>
          In a GPS or analytics app, entering a stroke means opening a scorecard
          grid, finding the right hole and incrementing a cell — several taps and
          a decision — while yardage overlays, upsells, notifications and a
          social feed compete for exactly the attention you were already short
          of.
        </p>
        <p>
          For a brain struggling to hold one number, an app with forty buttons
          is not a solution. It is a second, better-designed distraction. By the
          fourth hole the phone is back in the bag and the guessing has resumed,
          except now it costs $80 a year.
        </p>

        <h2>The pattern, and what it tells you</h2>
        <p>
          All four fail at the same point:{" "}
          <strong>each one adds a step, a screen, or a thing to remember.</strong>{" "}
          And anything that adds a step, a screen, or a thing to remember will
          eventually lose to the hawk, the hazard, and whether you closed the
          garage door.
        </p>
        <p>So a fix that survives a real round has to be:</p>
        <ul>
          <li>
            <strong>One action per swing</strong>, not one per hole. The hole is
            where the number goes missing, so recording at the end of it is
            already too late.
          </li>
          <li>
            <strong>Taken immediately</strong>, while the swing is still the
            thing you are thinking about. The window is about three seconds
            wide.
          </li>
          <li>
            <strong>Impossible to forget</strong>, because it happens at the
            moment of the swing rather than being scheduled for later.
          </li>
          <li>
            <strong>Reversible.</strong> You will mis-tap, and a count you
            cannot trust is worse than no count at all.
          </li>
          <li>
            <strong>Surrounded by nothing.</strong> No feed, no upsell, no
            second screen, no reason to still be holding the phone.
          </li>
        </ul>

        <h2>What to do this weekend</h2>
        <p>Two of these cost nothing and work immediately.</p>
        <ul>
          <li>
            <strong>Count out loud, on the swing.</strong> Say
            &ldquo;three&rdquo; as you hit it, not afterwards. Externalising
            beats rehearsing: saying it is a physical act, while holding it is a
            task competing with everything else on a golf course.
          </li>
          <li>
            <strong>Settle the number before anyone putts.</strong> Every hole.
            Make it a habit rather than an admission.
          </li>
        </ul>
        <p>
          And if you would rather the number were recorded than remembered, that
          is what a stroke counter is for: one tap per swing, an undo, nothing
          else on screen. If you are weighing one up, start here:{" "}
          <Link href="/golf-stroke-counter/">
            what a golf stroke counter is, and how to pick one
          </Link>
          . It is also, not coincidentally, the entire design brief behind{" "}
          <Link href="/">SimplyStroke</Link>.
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

        <h2>Keep reading</h2>
        <ul>
          <li>
            <Link href="/adhd-golf/">
              ADHD and golf: why the count disappears
            </Link>{" "}
            — the research behind all of this, and an honest account of what
            golf can and can&apos;t do for you.
          </li>
          <li>
            <Link href="/guides/lost-count-of-strokes-what-to-do/">
              You lost count of your strokes. Now what?
            </Link>{" "}
            — the triage version, including what the Rules of Golf require when
            you genuinely do not know.
          </li>
        </ul>


        <div className="author-box">
          <div>
            <div className="author-box-name">The SimplyStroke Team</div>
            <p>
              We built SimplyStroke after one too many rounds spent
              reconstructing our own scores on the walk to the next tee.{" "}
              <Link href="/about/">More about why it exists</Link>.
            </p>
          </div>
        </div>
      </article>

      <WaitlistSection
        source="guide-adhd"
        heading="Your brain has better things to hold."
      />
    </main>
  );
}
