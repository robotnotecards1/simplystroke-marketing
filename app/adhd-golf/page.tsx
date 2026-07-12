import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import WaitlistSection from "@/components/WaitlistSection";
import {
  BallOnGreenIcon,
  BallPinIcon,
  ScorecardIcon,
} from "@/components/icons";
import { og } from "@/lib/site";
import {
  APP_ID,
  appNode,
  articleNode,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  teamNode,
  websiteNode,
  type Citation,
  type Faq,
} from "@/lib/schema";

const TITLE = "ADHD and Golf: Why the Count Disappears, and What Helps";
const DESCRIPTION =
  "Golf asks you to hold a number across ten minutes of distraction. That's a prospective memory task, and it's measurably harder with ADHD. What the research says, what actually helps on the course, and where the line is.";
const PATH = "/adhd-golf/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH),
};

/* Sources. Every clinical claim on this page traces to one of these, and any
   claim that can't is cut. SimplyStroke is not a medical product and must
   never read like one — see CONTENT-STRATEGY-2026-07.md §6. */
const citations: Citation[] = [
  {
    name: "Complex Prospective Memory in Adults with Attention Deficit Hyperactivity Disorder",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3590133/",
  },
  {
    name: "Prospective memory (partially) mediates the link between ADHD symptoms and procrastination",
    url: "https://link.springer.com/article/10.1007/s12402-018-0273-x",
    doi: "10.1007/s12402-018-0273-x",
  },
  {
    name: "Assessment of goal-directed behavior and prospective memory in adult ADHD with an online 3D videogame simulating everyday tasks",
    url: "https://www.nature.com/articles/s41598-023-36351-6",
    doi: "10.1038/s41598-023-36351-6",
  },
  {
    name: "Effects of Physical Activity, Exercise and Sport on Executive Function in Young People with Attention Deficit Hyperactivity Disorder: A Systematic Review",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8774533/",
  },
  {
    name: "Effects of Physical Activity, Exercise and Sport on Executive Function in Adults Diagnosed with Attention Deficit Hyperactivity Disorder: A Systematic Review",
    url: "https://www.mdpi.com/2673-5318/6/4/120",
  },
  {
    name: "Comparative effects of open-skill and closed-skill sports on executive function in university students: a 16-week quasi-experimental study",
    url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1457449/full",
    doi: "10.3389/fpsyg.2024.1457449",
  },
  {
    name: "The effect of quiet eye training on golf putting performance in pressure situations",
    url: "https://www.nature.com/articles/s41598-024-55716-z",
    doi: "10.1038/s41598-024-55716-z",
  },
  {
    name: "ADHD Diagnosis, Treatment, and Telehealth Use in Adults, CDC MMWR (2024)",
    url: "https://www.cdc.gov/mmwr/volumes/73/wr/mm7340a1.htm",
  },
];

const faqs: Faq[] = [
  {
    q: "Why do I keep losing count of my strokes?",
    a: "Because keeping count is a prospective memory task, not a simple memory task. Golf asks you to hold an intention (increment this number, every swing, without ever being reminded) across a ten to fifteen minute interval deliberately filled with competing demands: club selection, the swing itself, the walk, the conversation, the search for the ball. Prospective memory is measurably harder in adults with ADHD, which is why the count evaporates somewhere between the approach shot and the green. It is a design problem, not a discipline problem.",
  },
  {
    q: "Is golf good for ADHD?",
    a: "There is real evidence that exercise and sport improve executive function in people with ADHD, particularly inhibitory control. A 2024 study also found that 16 weeks of golf training significantly improved inhibitory control in university students, where football did not. But that study was not run on a diagnosed ADHD population and the effect size was small, so it cannot be read as evidence that golf treats ADHD. What can be said honestly: golf is exercise, exercise appears to help executive function in ADHD, and golf is a closed-skill sport that turned out to be better for inhibitory control than researchers expected.",
  },
  {
    q: "Is there a golf app made for ADHD?",
    a: "Yes. SimplyStroke is a golf stroke counter built for ADHD golfers. The whole app is one giant tap-the-ball button that counts your strokes, so working memory never has to hold the number. It is free, works fully offline, needs no account to start a round, and is live now, with dedicated iPhone, Android and Apple Watch apps coming soon.",
  },
  {
    q: "Are there neurodivergent-friendly golf apps?",
    a: "Very few golf apps are designed with cognitive load in mind. Most are GPS or analytics platforms where the scorecard is one screen among fifty, competing with overlays, upsells and social feeds. A neurodivergent-friendly scoring app looks like the opposite: one action per swing, one enormous tap target, an undo, no account before your first round, no ads, and nothing else on screen. That is the design brief SimplyStroke was built to.",
  },
  {
    q: "How is SimplyStroke different from other golf scorecard apps?",
    a: "Most scoring apps bury the score behind menus, GPS overlays, handicaps and ads. SimplyStroke keeps exactly one job on screen: count this stroke. One tap per swing, an undo for fat fingers, and a finished scorecard with the math already done. No GPS, no handicap posting, no strokes gained, no subscription.",
  },
  {
    q: "Does SimplyStroke work without signal on the course?",
    a: "Yes. SimplyStroke works fully offline, so a dead zone on the back nine never costs you your round. A stroke counter needs no map data and no server, so there is no honest reason for one to fail.",
  },
  {
    q: "What is the hardest part of golf when you have ADHD?",
    a: "Ask golfers with ADHD directly and they do not say the maths. They say losing the ball, especially after helping a playing partner find theirs; pace of play and the loss of focus during dead time when the course backs up; and losing clubs and rangefinders. Keeping count is a real and annoying problem, but it is a piece of admin golf handed you, not the defining difficulty. Most golfers with ADHD describe golf itself in glowing terms: for many it is the most calmly focused they feel all week.",
  },
  {
    q: "Does SimplyStroke treat ADHD?",
    a: "No. SimplyStroke is not a medical product, makes no therapeutic claims, and does nothing to ADHD itself. It removes one arbitrary memory task from a game that never needed it. That is the whole claim.",
  },
  {
    q: "Is SimplyStroke available yet?",
    a: "Yes. SimplyStroke is live now — get started at app.simplystroke.app. Dedicated iPhone, Android and Apple Watch apps are on the way to the App Store and Google Play.",
  },
];

const jsonLd = graph(
  organizationNode,
  teamNode,
  websiteNode,
  appNode,
  articleNode({
    headline: TITLE,
    description: DESCRIPTION,
    path: PATH,
    datePublished: "2026-07-08",
    dateModified: "2026-07-11",
    about: APP_ID,
    citations,
  }),
  faqNode(faqs),
  breadcrumbNode([{ name: "ADHD & golf", path: PATH }])
);

export default function AdhdGolfPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="page-hero with-photo">
        <div className="page-hero-inner">
          <div className="pill">The ADHD golf app · Live now</div>
          <h1>
            Golf asks you to remember one number.
            <br />
            <span className="accent">Your brain has other plans.</span>
          </h1>
          <p className="lede">
            SimplyStroke is the golf app for ADHD: one giant button counts every
            stroke, holds the number, and hands you a finished scorecard, so
            your head is free to wander and your score still adds up.
          </p>
          <div className="cta-row">
            <a href="https://app.simplystroke.app" className="btn btn-hero">
              Get Started →
            </a>
            <span className="ss-hero-launch">Live now</span>
          </div>
        </div>
      </header>

      <Breadcrumbs crumbs={[{ name: "ADHD & golf", path: PATH }]} />

      <article className="prose">
        <AnswerBlock
          updated="July 2026"
          answer={
            <>
              Golfers with ADHD lose count of their strokes because golf is a{" "}
              <strong>prospective memory task</strong>: it asks you to hold a
              running number across ten-plus minutes while planning shots,
              walking, talking and searching for a ball. Prospective memory is
              measurably harder with ADHD, which is why the count disappears.
              The fix is not more discipline. It is moving the number out of
              working memory.
            </>
          }
          facts={[
            <>
              About <strong>15.5 million US adults (6.0%)</strong> have a
              current ADHD diagnosis, and more than half were diagnosed as
              adults (CDC, 2024)
            </>,
            <>
              Prospective memory failures account for the{" "}
              <strong>majority of everyday memory failures</strong>, and are
              impaired in adult ADHD
            </>,
            <>
              One 2024 trial found 16 weeks of golf improved inhibitory control,{" "}
              <strong>though not in a diagnosed ADHD group</strong>
            </>,
          ]}
        />

        <p>
          You hit a good drive. You spend the walk replaying it, then wondering
          whether your partner saw it, then wondering whether you closed the
          garage door. You chip on, two-putt, pick the ball out of the cup, and
          realize you have no idea what you just shot.
        </p>
        <p>
          If that is you occasionally, you are a golfer. If that is you on every
          hole of every round, and you have spent years being told to
          concentrate harder, then this page is about something that has a name.
        </p>

        <h2>Why the count vanishes</h2>
        <p>
          Strip a hole of golf down to its cognitive parts and it is a strange
          assignment. Over ten to fifteen minutes you have to judge distance and
          wind, pick a club, execute a swing, track a small ball across a large
          sky, walk several hundred yards holding a conversation, find the ball,
          replan and swing again. And underneath all of it, golf adds one quiet
          background job:{" "}
          <strong>
            hold a number in your head and increment it, without ever being
            reminded to.
          </strong>
        </p>
        <p>
          That background job is not really a memory task. It is a{" "}
          <strong>prospective memory</strong> task: holding an intention across
          a long, interrupted interval and acting on it at the right moment,
          unprompted. Prospective memory is the thing that fails when you walk
          into a room and forget why, and it accounts for the majority of
          everyday memory failures in general.
        </p>
        <p>
          It is also one of the things that is measurably harder if you have
          ADHD. Adults with ADHD show impairment on complex prospective memory
          tasks <a href="#refs">[1]</a>. Everyday prospective memory failures
          are common enough in ADHD to partly explain the link between ADHD
          symptoms and procrastination <a href="#refs">[2]</a>. And when
          researchers built a naturalistic test — a 3D environment where adults
          carry out ordinary household chores from memory — adult ADHD showed
          clear deficits in exactly that kind of hold-it-while-you-do-other-things
          behaviour <a href="#refs">[3]</a>.
        </p>
        <p>
          A golf hole is that test, outdoors, with a hawk overhead and someone
          telling you about their new driver.
        </p>
        <div className="callout">
          <p>
            <strong>So the number is not forgotten. It is overwritten.</strong>{" "}
            It was never going to survive the walk to the green, and no amount of
            resolving to pay more attention on the next tee is going to change
            that. Which you already know, because you have tried it every round
            for years.
          </p>
        </div>
        <p>
          Roughly 15.5 million American adults have a current ADHD diagnosis, and
          more than half of them were diagnosed in adulthood{" "}
          <a href="#refs">[8]</a>. A great many golfers have spent a long time
          blaming their character for something that has a research literature.
        </p>

        <h2>Is golf good for ADHD?</h2>
        <p>
          This is the question people actually search for, so here is the honest
          answer, including the parts that are inconvenient for us.
        </p>
        <p>
          <strong>What the evidence supports:</strong> physical activity,
          exercise and sport improve executive function in people with ADHD. A
          systematic review of young people with ADHD found that even a single
          twenty-minute bout of activity improves executive function{" "}
          <a href="#refs">[4]</a>. A systematic review of adults with diagnosed
          ADHD found that across ten studies, nine reported improved inhibitory
          control, six improved selective attention, and three improved
          cognitive flexibility <a href="#refs">[5]</a>. That is a reasonably
          consistent picture.
        </p>
        <p>
          <strong>What the evidence says about golf specifically:</strong> a 2024
          study in <em>Frontiers in Psychology</em> put 63 university students
          into three groups — golf, football, and a sedentary control — and
          trained the first two for sixteen weeks. The golf group significantly
          improved inhibitory control (p = 0.02). The football group did not. The
          control group did not <a href="#refs">[6]</a>. That was a surprise,
          because golf is a <em>closed-skill</em> sport, and closed-skill sports
          were assumed to be worse for executive function than open-skill ones.
          The assumption did not hold.
        </p>

        <div className="verdict">
          <div className="verdict-head">Where the line is</div>
          <p>
            <strong>That golf study was not run on people with ADHD.</strong> It
            was university students, the effect was small (d = 0.26), and a
            single 63-person quasi-experiment is a starting point, not something
            you build a health claim on.
          </p>
          <p>
            So: <strong>golf does not treat ADHD.</strong> SimplyStroke does not
            treat ADHD. Anyone selling you either of those is selling you
            something. What can be said honestly is that golf is exercise,
            exercise appears to help executive function in ADHD, and golf turned
            out to be better for inhibitory control than the researchers
            expected. That is a smaller claim. It is also a true one.
          </p>
        </div>

        <h2>What ADHD golfers actually say the hard part is</h2>
        <p>
          Here is a check worth doing on anything written about ADHD and golf,
          including this page: go and read what ADHD golfers say when somebody
          asks them directly.
        </p>
        <p>
          The r/golf threads on this are large, honest and heavily upvoted, and
          the answers are consistent. The hard part, as they describe it, is not
          arithmetic. It&apos;s <strong>object permanence and dead time</strong>:
        </p>
        <ul>
          <li>
            <strong>&ldquo;Anyone see where that landed?&rdquo;</strong> Losing
            the ball is the number one complaint, by a distance. One golfer put
            it perfectly: they watch the ball land, think{" "}
            <em>it&apos;s over there by the two trees</em>, help a partner find
            theirs, and then have no idea where their own ball went.
          </li>
          <li>
            <strong>Pace of play.</strong> Ready golf is the only rhythm that
            works; anything slower falls apart.
          </li>
          <li>
            <strong>Waiting.</strong> When the course backs up, focus goes, and
            the tee shot that follows the wait is the one that gets ruined.
          </li>
          <li>
            <strong>Losing clubs and rangefinders.</strong> Expensive, and
            constant.
          </li>
        </ul>
        <p>
          And the other thing those threads are full of, which matters more than
          any of it:{" "}
          <strong>golfers with ADHD overwhelmingly love golf.</strong> The most
          upvoted sentiment in the whole conversation is a man saying a round of
          golf is often the most calmly focused he&apos;ll be all week. Golf is
          described as the zen, not the affliction. Nobody in those threads wants
          to be told their brain is a problem to be solved, and we&apos;re not
          going to be the ones to tell them.
        </p>
        <p>
          So take the count for what it is: a small, annoying, genuinely
          solvable piece of admin that golf never needed to hand you. Not a
          diagnosis, not a deficit, and not the most interesting thing about how
          your brain plays this game.
        </p>

        <h2>What actually helps on the course</h2>
        <p>
          None of this is treatment. It is just what works when the thing going
          wrong is a golf course, not a brain.
        </p>
        <ul>
          <li>
            <strong>Count out loud, on the swing, not after it.</strong>{" "}
            Externalizing beats rehearsing. Saying &ldquo;three&rdquo; as you hit
            is a physical act. Holding &ldquo;three&rdquo; in your head is a task
            competing with a hawk.
          </li>
          <li>
            <strong>Settle the number before anyone putts.</strong> Not on the
            next tee, when the hole has already turned from a memory into a
            story. Your playing partners are an underused external hard drive and
            they do not mind being asked.
          </li>
          <li>
            <strong>
              Pick one pre-shot routine and never vary it.
            </strong>{" "}
            A fixed routine is a scaffold. It is the least interesting part of
            golf, which is exactly why it works.
          </li>
          <li>
            <strong>Look at the ball for longer than feels necessary.</strong>{" "}
            This one has real evidence behind it. &ldquo;Quiet eye&rdquo; — a
            prolonged, stable gaze on the ball before the stroke — improves
            putting under pressure and lowers state anxiety{" "}
            <a href="#refs">[7]</a>. It is concrete, trainable, and has nothing
            to do with our app.
          </li>
          <li>
            <strong>Say where the ball went, out loud, before you move.</strong>{" "}
            The single most-cited ADHD golf problem is losing your own ball
            after helping someone find theirs. Naming the landing spot out loud
            — &ldquo;left of the second bunker, past the cart path&rdquo; —
            makes it a spoken fact instead of a mental note, and spoken facts
            survive a detour.
          </li>
          <li>
            <strong>Pick a landmark, not a spot.</strong> &ldquo;Somewhere over
            there&rdquo; evaporates. &ldquo;In line with the tallest tree&rdquo;
            does not.
          </li>
          <li>
            <strong>Play ready golf, and say so on the first tee.</strong> Dead
            time is where the round comes apart. A group that knows you&apos;d
            rather keep moving will usually just keep moving.
          </li>
          <li>
            <strong>Count your clubs at every green. Every one.</strong> Make it
            a ritual attached to an event you can&apos;t skip, rather than a
            thing you intend to remember. Rangefinders are expensive.
          </li>
          <li>
            <strong>Stop being the scorekeeper.</strong> Not because you are bad
            at it. Because it is a job nobody should have been handed in the
            first place.
          </li>
        </ul>

        <h2>Offloading the count</h2>
        <p>
          Every fix that reliably works has the same shape:{" "}
          <strong>
            move the task out of your head, and make the capture so small that it
            survives being uninteresting.
          </strong>{" "}
          One action per swing, not per hole. A target you can hit without
          looking. Instant feedback that it registered. An undo for honest
          mistakes. And nothing else on screen competing for attention you were
          already short of.
        </p>
        <p>
          That is the design brief SimplyStroke was built to. The whole screen is
          one golf ball. Swing, tap, forget, move on.
        </p>
      </article>

      <section className="section alt-section">
        <div className="section-narrow">
          <div className="eyebrow">The fix</div>
          <h2 className="h2-display">One tap. The app remembers.</h2>
          <p className="section-lede">
            SimplyStroke turns your whole phone screen into a golf ball. Swing,
            tap, done. The app holds your stroke count, your running total and
            your vs-par, and builds the scorecard as you play. Nothing to
            navigate, nothing to poke, nothing else to wander off into.
          </p>
          <div className="ss-fold-cards" style={{ marginTop: 40 }}>
            <div className="ss-fold-card">
              <div className="icon-tile">
                <BallOnGreenIcon />
              </div>
              <span>
                One giant tap target you can hit without looking, or from your
                wrist on Apple Watch.
              </span>
            </div>
            <div className="ss-fold-card">
              <div className="icon-tile">
                <ScorecardIcon />
              </div>
              <span>
                The scorecard fills itself in. Totals, vs-par, color-coded holes,
                math already done.
              </span>
            </div>
            <div className="ss-fold-card">
              <div className="icon-tile">
                <BallPinIcon />
              </div>
              <span>
                Tapped twice by accident? Undo. Fully offline, no ads, no feeds,
                no menus mid-round.
              </span>
            </div>
          </div>
          <Link
            href="/features/"
            className="btn btn-fold"
            style={{ marginTop: 40 }}
          >
            See every feature →
          </Link>
        </div>
      </section>

      <article className="prose">
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
            <Link href="/guides/adhd-and-golf-losing-count/">
              How to stop losing count mid-round when you have ADHD
            </Link>{" "}
            — the practical version: why the pencil, the clicker and the big
            golf apps all fail in the same place.
          </li>
          <li>
            <Link href="/guides/lost-count-of-strokes-what-to-do/">
              You lost count of your strokes. Now what?
            </Link>{" "}
            — what the Rules of Golf actually require, and the three fixes that
            work.
          </li>
          <li>
            <Link href="/golf-stroke-counter/">
              What a golf stroke counter is, and how to pick one
            </Link>{" "}
            — the category explained, if you are shopping rather than reading.
          </li>
        </ul>

        <div className="refs" id="refs">
          <h2>References</h2>
          <ol>
            {citations.map(({ name, url }) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener">
                  {name}
                </a>
              </li>
            ))}
          </ol>
          <p style={{ fontSize: 14, marginTop: 20 }}>
            SimplyStroke is not a medical product and makes no therapeutic
            claims. Nothing on this page is medical advice. If you think you may
            have ADHD, the person to talk to is a clinician, not a golf app.
          </p>
        </div>


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
        source="adhd-golf"
        heading="Your brain has better things to hold."
      />
    </main>
  );
}
