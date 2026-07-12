import type { Metadata } from "next";
import Link from "next/link";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import RedditQuote from "@/components/RedditQuote";
import WaitlistSection from "@/components/WaitlistSection";
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
  type Faq,
} from "@/lib/schema";

const TITLE = "What Reddit Really Thinks About Golf Apps: 238,854 Comments Analysed";
const DESCRIPTION =
  "We read 238,854 r/golf comments to find out what golfers really think about Arccos, 18Birdies, TheGrint, Garmin and the rest. The complaints, the praise, and the upvote counts.";
const PATH = "/reddit/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og(TITLE, DESCRIPTION, PATH, "article"),
};

const faqs: Faq[] = [
  {
    q: "Do golfers need a subscription for a golf scorecard app?",
    a: "No. The loudest complaint across 238,854 r/golf comments is recurring subscription cost — golfers regularly abandon $150-$200/year tools for cheaper, one-time-purchase hardware or free apps just to escape the renewal. SimplyStroke is free, with no subscription.",
  },
  {
    q: "What do golfers on Reddit say is the biggest problem with golf apps?",
    a: "Cost, by a wide margin. The single highest-upvoted competitor comment in our 238,854-comment corpus (+493) describes switching away from a subscription app over price. Bloat, data-entry friction, battery drain, and reluctance to carry a phone on the course all follow behind it.",
  },
  {
    q: "Is 18Birdies bloated?",
    a: "That's the word Reddit uses for it. \"18 birdies is a bloated mess these days\" is a real, upvoted r/golf comment, and we found several similar ones independently. Its free tier is still genuinely well-liked, though — golfers say it covers everything they need.",
  },
  {
    q: "Do golf apps drain your phone or watch battery?",
    a: "According to Reddit, often. Golfers report TheGrint, 18Birdies and Golfshot all draining a watch or phone battery over a round, and Garmin Golf's reputation for battery life comes up specifically as a reason golfers choose it over more feature-rich competitors.",
  },
  {
    q: "Is there a connection between ADHD and losing count of golf strokes?",
    a: "Barely, based on what golfers actually write. Across 238,854 comments, roughly 197 mention ADHD and 84 describe losing count of strokes, and almost none do both. Golfers with ADHD mostly complain about losing the ball, pace of play, and losing equipment, not arithmetic.",
  },
  {
    q: "Which golf app gets the most subscription complaints on Reddit?",
    a: "Arccos, by a wide margin. It's the most-discussed golf app in our corpus (2,126 mentions) and the source of most of the highest-upvoted subscription complaints, including the single highest-upvoted one in the whole dataset.",
  },
  {
    q: "Where does this data come from?",
    a: "238,854 comments across 2,437 r/golf threads, gathered via the Arctic Shift archive (the Pushshift successor) covering r/golf's history back to April 2010. Every quote on this page links to its original Reddit comment.",
  },
  {
    q: "Do golfers actually keep an accurate score?",
    a: "Not consistently. Some of the largest threads in the corpus are golfers discussing not keeping score, or reusing scorecards, at the same time as other huge threads argue heatedly over implausible or dishonest scorecards. Golfers care about the score being right and routinely fail to record it accurately — that gap is what a stroke counter exists to close.",
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
    datePublished: "2026-07-12",
    dateModified: "2026-07-12",
    about: APP_ID,
  }),
  faqNode(faqs),
  breadcrumbNode([{ name: "What Reddit thinks about golf apps", path: PATH }])
);

export default function RedditPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="post-header">
        <div className="post-header-inner">
          <div className="pill">Reddit research</div>
          <h1>What Reddit really thinks about golf apps</h1>
          <div className="post-meta">
            <span>The SimplyStroke Team</span>
            <span>·</span>
            <span>July 2026</span>
            <span>·</span>
            <span>14 min read</span>
          </div>
        </div>
      </header>

      <Breadcrumbs
        crumbs={[{ name: "What Reddit thinks about golf apps", path: PATH }]}
      />

      <article className="prose">
        <AnswerBlock
          updated="July 2026"
          answer={
            <>
              Reddit has been arguing about golf apps since 2010, so we read{" "}
              <strong>238,854 comments across 2,437 r/golf threads</strong>{" "}
              and counted what people actually say.
            </>
          }
          facts={[
            <>
              238,854 comments across 2,437 threads, gathered from r/golf&apos;s
              full history via the Arctic Shift archive
            </>,
            <>
              The single highest-upvoted competitor comment in the entire
              corpus (<strong>+493</strong>) is someone leaving Arccos over
              its subscription price
            </>,
            <>
              Arccos is the most-discussed app by far (
              <strong>2,126 mentions</strong>) — and the most-resented
            </>,
          ]}
        />

        <p>
          We&apos;re the team behind SimplyStroke, a golf scorecard app. We
          ran this analysis to work out what golfers actually want, and it
          changed our minds about several things, including how we&apos;d
          been marketing our own app. Everything we found is below, including
          the parts that don&apos;t flatter us.
        </p>

        <h2>How we did this</h2>
        <p>
          We scanned 1,789,082 posts across r/golf, r/golftips, r/ADHD,
          r/ADD, r/neurodiversity, r/Neurodivergent and r/adhd_anxiety, from
          each subreddit&apos;s inception (r/golf back to April 2010) through
          July 2026. 36,218 threads matched a relevance filter, and 2,437 of
          those were hydrated to full comment trees, yielding{" "}
          <strong>238,854 comments</strong>. We gathered all of it through
          the Arctic Shift archive, the successor to Pushshift, since
          Reddit&apos;s own search can&apos;t reliably page back this far.
        </p>
        <p>
          A word on what this does and doesn&apos;t prove: comment frequency
          measures what golfers say to each other on Reddit, not what they
          type into Google. Those are related but not identical, and we try
          not to conflate them below. Every quote on this page is verbatim,
          credited with its real upvote count, and linked to its permalink so
          you can read it in its original context rather than take our word
          for it.
        </p>

        <h2>Who gets talked about, and how much</h2>
        <div className="cmp-wrap">
          <table className="cmp">
            <caption>
              Mention counts across the 238,854-comment corpus. As of July
              2026.
            </caption>
            <thead>
              <tr>
                <th scope="col">App</th>
                <th scope="col">Mentions</th>
                <th scope="col">The read</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Arccos</th>
                <td data-label="Mentions">2,126</td>
                <td data-label="The read">
                  The most-discussed and the most-resented. Price is the
                  whole story.
                </td>
              </tr>
              <tr>
                <th scope="row">GHIN</th>
                <td data-label="Mentions">1,765</td>
                <td data-label="The read">
                  Nobody says they like it. Golfers use it because the USGA
                  requires it for an official handicap.
                </td>
              </tr>
              <tr>
                <th scope="row">TheGrint</th>
                <td data-label="Mentions">1,364</td>
                <td data-label="The read">
                  The value pick, with a loyal following on its free tier.
                </td>
              </tr>
              <tr>
                <th scope="row">18Birdies</th>
                <td data-label="Mentions">1,294</td>
                <td data-label="The read">
                  Was the category default. Now frequently described as
                  bloated.
                </td>
              </tr>
              <tr>
                <th scope="row">Garmin Golf</th>
                <td data-label="Mentions">1,262</td>
                <td data-label="The read">
                  Wins on battery life and no subscription. Loses on
                  software polish.
                </td>
              </tr>
              <tr>
                <th scope="row">Shot Scope</th>
                <td data-label="Mentions">614</td>
                <td data-label="The read">
                  The escape hatch. Where subscription refugees go.
                </td>
              </tr>
              <tr>
                <th scope="row">Golfshot</th>
                <td data-label="Mentions">511</td>
                <td data-label="The read">
                  Feature-rich, and golfers say the battery drain shows it.
                </td>
              </tr>
              <tr>
                <th scope="row">Golf Pad</th>
                <td data-label="Mentions">446</td>
                <td data-label="The read">
                  Quiet, no-subscription option with a small but steady
                  following.
                </td>
              </tr>
              <tr>
                <th scope="row">Hole19</th>
                <td data-label="Mentions">224</td>
                <td data-label="The read">
                  Small presence. Its staff post promo offers directly in
                  r/golf threads.
                </td>
              </tr>
              <tr>
                <th scope="row">SwingU</th>
                <td data-label="Mentions">158</td>
                <td data-label="The read">Barely present in the conversation.</td>
              </tr>
              <tr>
                <th scope="row">GolfLogix</th>
                <td data-label="Mentions">76</td>
                <td data-label="The read">
                  Effectively absent from the conversation.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Two things stand out in that table before you even get to a single
          quote. First, the gap between Arccos and everything else isn&apos;t
          close — it&apos;s the app people can&apos;t stop talking about,
          for better and worse. Second, GHIN sits at 1,765 mentions despite
          nobody in the corpus describing it with any affection at all; it
          survives on mandate, not merit, because the USGA requires it for
          an official handicap. That&apos;s a very different kind of
          &ldquo;popular&rdquo; than Arccos&apos;s, and it&apos;s worth
          keeping the two apart.
        </p>

        <h2>The five loudest complaints</h2>
        <p>
          Ranked by how loudly, and how consistently, r/golf agrees on them.
        </p>

        <h3>1. Subscription fatigue</h3>
        <p>
          This is not close. It&apos;s the single loudest, most-upvoted
          agreement anywhere in the corpus, and it keeps going for as long as
          you keep reading:
        </p>
        <RedditQuote
          quote="They're pretty good, but when I saw the price for a full year subscription, I just replaced the whole thing with shot scope instead."
          upvotes={493}
          app="on Shot Scope, re: Arccos"
          permalink="https://www.reddit.com/r/golf/comments/1kpii4f/does_anyone_have_arccos_are_they_worth_it/msxzrfk/"
        />
        <RedditQuote
          quote="I had arccos for 3 years but now at the $200 annual cost I cancelled."
          upvotes={160}
          app="on Arccos"
          permalink="https://www.reddit.com/r/golf/comments/1kpii4f/does_anyone_have_arccos_are_they_worth_it/msydtzf/"
        />
        <RedditQuote
          quote="For a one time $150 price I now use Shot Scope, get most of the same data and it's not a subscription based service to get it."
          upvotes={120}
          app="on Shot Scope, re: Arccos"
          permalink="https://www.reddit.com/r/golf/comments/1neot0f/arccos_renewal_experience_would_not_recommend/ndqllpv/"
        />
        <RedditQuote
          quote="You think I'm just going to pocket that money from cancelling the Arccos subscription?"
          upvotes={107}
          app="on Arccos"
          permalink="https://www.reddit.com/r/golf/comments/1kpii4f/does_anyone_have_arccos_are_they_worth_it/msy1zpb/"
        />
        <RedditQuote
          quote="No subscription is why I went with a ShotScope watch and trackers."
          upvotes={84}
          app="on Shot Scope"
          permalink="https://www.reddit.com/r/golf/comments/1m0oj9y/arccos_releases_new_laser_it_requires_a_199yr/n3av2ub/"
        />
        <p>
          Read what these golfers are actually doing: buying $150-$300 of
          hardware, and accepting a less polished piece of software, purely
          to escape a recurring charge. That&apos;s not price sensitivity.
          That&apos;s a grudge.
        </p>

        <h3>2. Bloat — 18Birdies is the soft target</h3>
        <p>
          18Birdies was the default golf app for years. Reddit now talks
          about it like a service that outgrew its own good idea:
        </p>
        <RedditQuote
          quote="18 birdies is a bloated mess these days."
          upvotes={19}
          app="on 18Birdies"
          permalink="https://www.reddit.com/r/golf/comments/1ksqdi5/me_updating_the_pin_location_on_my_18_birdies_app/mtnph3c/"
        />
        <RedditQuote
          quote="Have both and hate 18 birdies compare to the Grint"
          upvotes={23}
          app="on 18Birdies vs TheGrint"
          permalink="https://www.reddit.com/r/golf/comments/1ss2a1x/thegrint_vs_18_birdies/ohiwhsd/"
        />
        <RedditQuote
          quote="I tried 18birdies (too expensive, too much going on), Hole19 and Golfshot."
          upvotes={3}
          app="on 18Birdies"
          permalink="https://www.reddit.com/r/golf/comments/184mrv9/apple_golf_apps_lovehate_relationship/kawjzke/"
        />

        <h3>3. Data-entry friction</h3>
        <p>
          This is the most product-relevant complaint in the corpus, and
          almost nobody is solving it. Every competitor optimises for data
          richness; every golfer complains about data entry:
        </p>
        <RedditQuote
          quote="I use 18 birdies, but I hate that I can't just tell it I missed the green, it demands to know if I was long, short, left, right, or didn't have a chance plus what club I used, etc."
          upvotes={13}
          app="on 18Birdies"
          permalink="https://www.reddit.com/r/golf/comments/1i0gxwh/whats_the_most_important_features_of_a_golf_app/m6xyols/"
        />
        <RedditQuote
          quote="As an arccos user, one of my main frustrations is, that I cannot log where I hit a ball that went oob/lost/in the water."
          upvotes={136}
          app="on Arccos"
          permalink="https://www.reddit.com/r/golf/comments/1st9mco/what_golf_opinion_is_a_hill_youre_willing_to_die/ohrpn39/"
        />
        <RedditQuote
          quote="Shotscope: most complete shot tracking software BUT hardware is slow/display sucks and reconciling rounds is a chore"
          upvotes={19}
          app="on Shot Scope"
          permalink="https://www.reddit.com/r/golf/comments/1qa1yrz/garmin_golf_app_no_way_its_designed_by_golfers/nyzi1b0/"
        />

        <h3>4. Battery</h3>
        <p>
          If there&apos;s a watch or phone story, golfers consistently reward
          whichever option doesn&apos;t die on the back nine:
        </p>
        <RedditQuote
          quote="I wouldn't get a dedicated watch but I'd get a Garmin just because of battery life."
          upvotes={79}
          app="on Garmin Golf"
          permalink="https://www.reddit.com/r/golf/comments/1pccwas/dedicated_golf_gps_watch_vs_a_regular_smart_watch/nrwpsy7/"
        />
        <RedditQuote
          quote="The Grint sucked my watch battery dry."
          upvotes={14}
          app="on TheGrint"
          permalink="https://www.reddit.com/r/golf/comments/18r8pqd/what_is_the_best_golf_app_for_an_apple_watch/kezv6v8/"
        />
        <RedditQuote
          quote="I like Golfshot for feature richness (auto tracking & strokes gained) vs ease of use on the course, but it does drain the battery."
          upvotes={11}
          app="on Golfshot"
          permalink="https://www.reddit.com/r/golf/comments/184mrv9/apple_golf_apps_lovehate_relationship/kaw9s1g/"
        />
        <RedditQuote
          quote="I find that 18 Birdies destroyed my AW7 battery."
          upvotes={9}
          app="on 18Birdies"
          permalink="https://www.reddit.com/r/golf/comments/18r8pqd/what_is_the_best_golf_app_for_an_apple_watch/keznknw/"
        />

        <h3>5. The phone itself</h3>
        <p>
          This one isn&apos;t really a complaint about any single
          competitor. It&apos;s a category complaint, and it limits every
          phone-first scoring app, including ours:
        </p>
        <RedditQuote
          quote="I tried phone based trackers/apps like Arccos and it was so terrible, from technical issues to the time it took to enter results."
          upvotes={20}
          app="on Arccos"
          permalink="https://www.reddit.com/r/golf/comments/q8dwaj/yes_arccos_i_am_having_a_shit_round_par_5_13_shots/hgp5zdy/"
        />
        <RedditQuote
          quote="I used Arccos for roughly 40 rounds last year and half the time it didn't pick up clubs, I didn't like having to play with my phone in my pocket and I didn't like having to pay for a subscription."
          upvotes={7}
          app="on Arccos"
          permalink="https://www.reddit.com/r/golf/comments/1bndf1o/shot_scope_vs_arccos_any_users_here/kwhef5w/"
        />
        <RedditQuote
          quote="Haven't used arccos in over a year because I hate leaving my phone in my pocket."
          upvotes={6}
          app="on Arccos"
          permalink="https://www.reddit.com/r/golf/comments/aib02t/arccos_link_alternative_to_phone/eemlv2e/"
        />
        <p>
          Whatever a scoring app&apos;s input model is, it has to survive a
          golfer who resents pulling out a phone at all. Anything that takes
          more than a glance loses to a pencil, and a pencil is free.
        </p>

        <h2>What Reddit actually praises</h2>
        <p>
          A page that mysteriously concludes &ldquo;and therefore
          SimplyStroke&rdquo; isn&apos;t honest, so here&apos;s where the
          competition genuinely wins:
        </p>
        <RedditQuote
          quote="18 birdies is great, I think the free version has everything I need."
          upvotes={6}
          app="on 18Birdies"
          permalink="https://www.reddit.com/r/golf/comments/1ke6t28/best_app/mqgg9m8/"
        />
        <RedditQuote
          quote="18birdies without the premium subscription gives you the distance to the green."
          upvotes={109}
          app="on 18Birdies"
          permalink="https://www.reddit.com/r/golf/comments/1ncsm70/are_distance_markers_on_the_course_a_thing_of_the/ndbjbex/"
        />
        <RedditQuote
          quote="Shot Scope is great as there is no monthly fee."
          upvotes={6}
          app="on Shot Scope"
          permalink="https://www.reddit.com/r/golf/comments/1k8z88y/alternatives_to_arccos_or_is_it_the_best/mpaarje/"
        />
        <RedditQuote
          quote="Garmin watch is the best of both worlds for me."
          upvotes={149}
          app="on Garmin Golf"
          permalink="https://www.reddit.com/r/golf/comments/1uidrto/ive_abandoned_smart_golf_apps/ouf0pwl/"
        />
        <RedditQuote
          quote="The grint is such a solid app, never had an issue with the free version and always get to see what my friends are up to."
          upvotes={24}
          app="on TheGrint"
          permalink="https://www.reddit.com/r/golf/comments/1f3kuiu/the_grint_has_some_savage_notifications/lkfbraj/"
        />
        <p>
          18Birdies&apos; free tier in particular is genuinely well-liked.
          Beating it on &ldquo;free&rdquo; alone won&apos;t work. The
          argument has to be &ldquo;simpler,&rdquo; not &ldquo;cheaper.&rdquo;
        </p>

        <h2>What golfers actually do about scoring</h2>
        <p>
          Some of the biggest scorekeeping threads in the corpus aren&apos;t
          about apps at all. They&apos;re about whether people bother
          keeping an accurate score in the first place:
        </p>
        <ul>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1gjlt6i/"
              target="_blank"
              rel="noopener"
            >
              Does anyone else prefer to score this way?
            </a>{" "}
            — 574 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1nx4skj/"
              target="_blank"
              rel="noopener"
            >
              How many of you don&apos;t keep score?
            </a>{" "}
            — 314 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1gane9z/"
              target="_blank"
              rel="noopener"
            >
              Anyone else reuse scorecards?
            </a>{" "}
            — 306 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1rdw5b2/"
              target="_blank"
              rel="noopener"
            >
              How I keep score
            </a>{" "}
            — 271 comments
          </li>
        </ul>
        <p>
          And when the score is wrong, or suspected of being wrong, r/golf
          gets genuinely worked up about it. The single biggest scorecard
          thread in the entire corpus is an argument over an implausible
          scorecard:
        </p>
        <ul>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/zcvn87/"
              target="_blank"
              rel="noopener"
            >
              According to their scorecard this group shot an Ace on a par
              4, 1 albatross, 4 eagles and the rest birdies
            </a>{" "}
            — 1,013 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1at64nm/"
              target="_blank"
              rel="noopener"
            >
              The DQ rule for signing a wrong scorecard is the dumbest rule
              in sports
            </a>{" "}
            — 554 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1m9eheh/"
              target="_blank"
              rel="noopener"
            >
              Guess who just got DQ&apos;d for an incorrect scorecard today
            </a>{" "}
            — 302 comments
          </li>
        </ul>
        <p>
          Put those two clusters together and the tension is the whole
          product opportunity: golfers care enormously about the score being
          right, and routinely fail to record it accurately anyway. That
          gap, stated plainly, is what a stroke counter exists to close.
        </p>
        <p>
          There&apos;s also real commercial-intent demand hiding in threads
          that never mention a brand name:
        </p>
        <ul>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1i0gxwh/"
              target="_blank"
              rel="noopener"
            >
              What&apos;s the most important features of a golf app?
            </a>{" "}
            — 256 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1ke6t28/"
              target="_blank"
              rel="noopener"
            >
              Best App?
            </a>{" "}
            — 214 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1upuooc/"
              target="_blank"
              rel="noopener"
            >
              How many of you keep your score via an app?
            </a>{" "}
            — 147 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1geqnb0/"
              target="_blank"
              rel="noopener"
            >
              What apps do you use for keeping track of score?
            </a>{" "}
            — 114 comments
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1uklnb1/"
              target="_blank"
              rel="noopener"
            >
              Which Golf App Is Actually Worth the Subscription?
            </a>{" "}
            — 97 comments
          </li>
        </ul>

        <h2>What surprised us</h2>
        <p>
          Before this analysis, our own marketing leaned on the idea that
          SimplyStroke was, first and foremost, a golf app for ADHD golfers
          who lose count. The data doesn&apos;t back that up, and we&apos;d
          rather say so than keep the line.
        </p>
        <p>
          Across 238,854 comments, roughly <strong>197</strong> mention ADHD
          and <strong>84</strong> describe losing count of strokes. The
          overlap between the two is essentially <strong>zero</strong>. Not
          one golfer in a quarter-million comments says, plainly, &ldquo;I
          have ADHD and I can&apos;t keep my stroke count.&rdquo;
        </p>
        <p>
          The closest the corpus gets is one comment, posted in a thread
          specifically for golfers with ADHD, that touches on losing count
          without ever using the word &ldquo;ADHD&rdquo; itself:
        </p>
        <RedditQuote
          quote="Same as you. After a round I'll always realise something I wasn't doing that I'd worked on leading up to it. I feel like I can't 'groove' a new feel. I have to actively think about it forever. I lose count of score and need to rely on tech that makes me feel stupid. My playing partners know my shots better than me sometimes."
          upvotes={15}
          permalink="https://www.reddit.com/r/golf/comments/1p45e7m/golfers_with_adhd_what_is_the_most_frustrating/nq9icx6/"
        />
        <p>
          There is a real, high-engagement ADHD-golf community on r/golf.
          It just isn&apos;t talking about arithmetic. It&apos;s talking
          about losing the ball, pace of play, and losing clubs and
          rangefinders. And the overall tone toward golf itself is warm, not
          weary:
        </p>
        <RedditQuote
          quote={
            "I have adhd and find a round of golf is often the most \"zen\" or calmly focused I'll be all week. I've also found hyperfixation has helped me groove a good swing quickly and I have a better understanding of the physics of the club/ball/swing than many of my mates who've been playing for years."
          }
          upvotes={88}
          permalink="https://www.reddit.com/r/golf/comments/1m1bo7u/adhd_and_golf/n3ftus0/"
        />
        <p>
          Golf, for this crowd, reads as the therapy, not the affliction.
          Marketing that tells ADHD golfers their brain is a problem to be
          fixed is going to land badly with the people it&apos;s aimed at.
          If you want to read the threads yourself:
        </p>
        <ul>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1p45e7m/"
              target="_blank"
              rel="noopener"
            >
              Golfers with ADHD, what is the most frustrating way it
              manifests in your golf game?
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1m1bo7u/"
              target="_blank"
              rel="noopener"
            >
              ADHD and Golf
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/ydhz4q/"
              target="_blank"
              rel="noopener"
            >
              How do I stop my ADD/ADHD during golf?
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/golf/comments/1fx3vxt/"
              target="_blank"
              rel="noopener"
            >
              Thank you golf, for giving my ADHD brain&hellip;
            </a>
          </li>
        </ul>
        <p>
          We still think there&apos;s a genuinely useful, non-exploitative
          piece of content in here somewhere, about focus between shots and
          not losing your ball. It just isn&apos;t this page, and it
          isn&apos;t a positioning claim.
        </p>

        <h2>Where SimplyStroke fits</h2>
        <p>
          None of this changes what SimplyStroke actually is: a free,
          one-tap stroke counter with no subscription, built to remove the
          friction above rather than add to it. If you want the specifics,
          see{" "}
          <Link href="/golf-stroke-counter/">
            what a golf stroke counter is and how to pick one
          </Link>{" "}
          or{" "}
          <Link href="/compare/">
            how SimplyStroke compares to the apps named on this page
          </Link>
          . It doesn&apos;t do everything Arccos, Garmin or 18Birdies does,
          and it isn&apos;t trying to. It exists for the specific gap this
          page documents: golfers who want the score handled, without a
          subscription, a data-entry chore, or a battery to manage.
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
      </article>

      <WaitlistSection
        source="reddit"
        heading="Free. One tap. No subscription."
      />
    </main>
  );
}
