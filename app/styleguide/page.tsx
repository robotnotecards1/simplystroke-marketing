import type { Metadata } from "next";
import {
  BallOnGreenIcon,
  BallPinIcon,
  FlagIcon,
  GolfBagIcon,
  HappyBallIcon,
  ScorecardIcon,
} from "@/components/icons";

/**
 * The SimplyStroke design system, rendered from the real stylesheet.
 *
 * This page imports nothing but globals.css, so every swatch, type specimen
 * and button below IS the live component. It cannot drift from the site,
 * which is the whole point of a styleguide living in the app instead of in a
 * Figma file or a markdown doc.
 *
 * App-side values are transcribed from ../SimplyStroke/src/constants/theme.ts
 * (the Expo app). Those CANNOT auto-sync, so §2 exists to make the drift
 * between the two visible. Update the `app:` fields when theme.ts changes.
 */

export const metadata: Metadata = {
  title: "Design System | SimplyStroke",
  description: "Internal styleguide. Colors, type, components and voice.",
  robots: { index: false, follow: false }, // internal — keep out of Google
};

type Token = {
  name: string;
  css: string;
  hex: string;
  use: string;
  app?: string; // matching key in the Expo app's theme.ts
  drift?: string; // set when the app's value disagrees
};

const brand: Token[] = [
  { name: "Green Deep", css: "--green-deep", hex: "#1B4332", use: "Primary brand. Headings, dark sections, button text on lime.", app: "colors.greenDeep" },
  { name: "Green Mid", css: "--green-mid", hex: "#2D6A4F", use: "Links, secondary surfaces, gradient partner.", app: "colors.greenMid" },
  { name: "Green Light", css: "--green-light", hex: "#40916C", use: "Gradient end, accents on dark.", app: "colors.greenLight" },
  { name: "Lime", css: "--lime", hex: "#96C41E", use: "The action color. Every CTA, every icon tile. Use it only for things you want clicked.", app: "colors.brandGreen", drift: "Named brandGreen in the app, --lime on the web. Same hex, two names. Pick one." },
  { name: "Lime Text", css: "--lime-text", hex: "#C7E77A", use: "Lime, legible on dark green. Pills, eyebrows on dark.", drift: "Web only. The app has no equivalent, so on-dark accent text there falls back to brandGreen, which is too dark to read." },
];

const surface: Token[] = [
  { name: "Off White", css: "--offwhite", hex: "#FAFAF8", use: "Page background.", app: "colors.offWhite" },
  { name: "Cream", css: "--cream", hex: "#F4EFE4", use: "Callout backgrounds, warm alt sections.", app: "colors.bgLight (#F5F5F0)", drift: "Web #F4EFE4 vs app #F5F5F0. Two nearly-identical warm greys doing the same job. Consolidate." },
  { name: "Card", css: "(#fff)", hex: "#FFFFFF", use: "Cards on dark and on tinted backgrounds.", app: "colors.cardBg" },
  { name: "Stroke Surface", css: "(.ph-screen)", hex: "#F0F4F1", use: "The stroke-counting area. App and web agree.", app: "colors.bgStroke" },
];

const ink: Token[] = [
  { name: "Ink", css: "--ink", hex: "#1A1A1A", use: "Body text on light.", app: "colors.textDark" },
  { name: "Gray Dark", css: "--gray-dark", hex: "#4B5563", use: "Long-form body copy, section ledes.", drift: "Web only." },
  { name: "Gray Body", css: "--gray-body", hex: "#6B7280", use: "Captions, meta, secondary text.", app: "colors.textMuted" },
];

const score: Token[] = [
  { name: "Over Par", css: "--coral", hex: "#FF6B6B", use: "Over-par numbers. Red, but a friendly one.", app: "scoreColors.over" },
  { name: "Under Par", css: "(none)", hex: "#6BCFA0", use: "Under-par numbers.", app: "scoreColors.under", drift: "The app has it, the web doesn't. Any marketing screenshot showing a birdie has no token to reach for." },
  { name: "Error Red", css: "(none)", hex: "#C0392B", use: "Destructive actions, form errors.", app: "colors.red", drift: "App only, and it fights with --coral. Two reds is one too many." },
  { name: "Sky", css: "(none)", hex: "#4A90D9", use: "Unclear. Appears in the app theme, unused on the web.", app: "colors.blueSky", drift: "The only non-green, non-neutral hue in the system. Justify it or delete it." },
];

function Swatch({ t }: { t: Token }) {
  const light = ["#FAFAF8", "#F4EFE4", "#FFFFFF", "#F0F4F1", "#C7E77A", "#96C41E", "#6BCFA0"].includes(t.hex);
  return (
    <div className="sg-swatch">
      <div className="sg-chip" style={{ background: t.hex, color: light ? "#1B4332" : "#FAFAF8" }}>
        {t.hex}
      </div>
      <div className="sg-swatch-body">
        <div className="sg-swatch-name">{t.name}</div>
        <code>{t.css}</code>
        {t.app ? <code className="sg-app">{t.app}</code> : null}
        <p>{t.use}</p>
        {t.drift ? <p className="sg-drift">⚠ {t.drift}</p> : null}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="sg">
      <header className="page-hero">
        <div className="page-hero-inner">
          <div className="pill">Internal · Not indexed</div>
          <h1>
            The SimplyStroke
            <br />
            <span className="accent">design system.</span>
          </h1>
          <p className="lede">
            Rendered from the live stylesheet, so it can&apos;t go stale. App
            values are transcribed from the Expo app&apos;s{" "}
            <code>src/constants/theme.ts</code> and flagged wherever the two
            disagree.
          </p>
        </div>
      </header>

      {/* ---------- 1. COLOR ---------- */}
      <section className="sg-section">
        <div className="sg-inner">
          <div className="eyebrow">01</div>
          <h2 className="h2-display">Color</h2>
          <p className="sg-lede">
            One action color, one brand color, and a lot of restraint. If
            something on screen is lime, it should be clickable. The moment
            lime starts decorating things, the CTA stops meaning anything.
          </p>

          <h3 className="sg-h3">Brand</h3>
          <div className="sg-grid">
            {brand.map((t) => (
              <Swatch t={t} key={t.name} />
            ))}
          </div>

          <h3 className="sg-h3">Surfaces</h3>
          <div className="sg-grid">
            {surface.map((t) => (
              <Swatch t={t} key={t.name} />
            ))}
          </div>

          <h3 className="sg-h3">Text</h3>
          <div className="sg-grid">
            {ink.map((t) => (
              <Swatch t={t} key={t.name} />
            ))}
          </div>

          <h3 className="sg-h3">Score</h3>
          <div className="sg-grid">
            {score.map((t) => (
              <Swatch t={t} key={t.name} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 2. DRIFT ---------- */}
      <section className="sg-section sg-alt">
        <div className="sg-inner">
          <div className="eyebrow">02</div>
          <h2 className="h2-display">Where the app and the site disagree.</h2>
          <p className="sg-lede">
            The single most useful table on this page. Every row is a decision
            somebody has to make before the app ships, because right now a
            golfer who taps through from the site meets a slightly different
            product.
          </p>

          <div className="sg-table">
            <div className="sg-tr sg-th">
              <span>Thing</span>
              <span>Marketing site</span>
              <span>Expo app</span>
              <span>Call it</span>
            </div>
            <div className="sg-tr">
              <span>Corner radius</span>
              <span>
                <strong>0px.</strong> Buttons, cards and icon tiles are all
                sharp-cornered.
              </span>
              <span>
                <strong>16–20px.</strong> <code>radius.button: 16</code>,{" "}
                <code>radius.card: 18</code>, <code>radius.pill: 20</code>.
              </span>
              <span className="sg-verdict">
                The biggest visual break in the system. The site looks like a
                different brand from the app. Pick one and propagate it.
              </span>
            </div>
            <div className="sg-tr">
              <span>The action color&apos;s name</span>
              <span>
                <code>--lime</code>
              </span>
              <span>
                <code>colors.brandGreen</code>
              </span>
              <span className="sg-verdict">
                Same hex (#96C41E), two names. Rename to one. &ldquo;Lime&rdquo;
                describes it; &ldquo;brandGreen&rdquo; collides with the three
                actual greens.
              </span>
            </div>
            <div className="sg-tr">
              <span>Warm neutral</span>
              <span>
                <code>--cream</code> #F4EFE4
              </span>
              <span>
                <code>bgLight</code> #F5F5F0
              </span>
              <span className="sg-verdict">
                Two shades apart, doing the same job. Merge.
              </span>
            </div>
            <div className="sg-tr">
              <span>Red</span>
              <span>
                <code>--coral</code> #FF6B6B (over-par)
              </span>
              <span>
                <code>scoreColors.over</code> #FF6B6B <em>and</em>{" "}
                <code>colors.red</code> #C0392B (errors)
              </span>
              <span className="sg-verdict">
                Fine, actually: one red means &ldquo;you&apos;re over par,&rdquo;
                the other means &ldquo;something broke.&rdquo; But the site has
                no error red at all, so form errors have nothing to use.
              </span>
            </div>
            <div className="sg-tr">
              <span>Under-par green</span>
              <span>Missing</span>
              <span>
                <code>scoreColors.under</code> #6BCFA0
              </span>
              <span className="sg-verdict">
                Add it to the web tokens. Any screenshot or scorecard mock
                showing a birdie currently has no token.
              </span>
            </div>
            <div className="sg-tr">
              <span>Sky blue</span>
              <span>Missing</span>
              <span>
                <code>colors.blueSky</code> #4A90D9
              </span>
              <span className="sg-verdict">
                The only non-green hue anywhere in SimplyStroke. Either it has a
                job nobody documented, or it&apos;s a leftover. Delete it.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 3. TYPE ---------- */}
      <section className="sg-section">
        <div className="sg-inner">
          <div className="eyebrow">03</div>
          <h2 className="h2-display">Type</h2>
          <p className="sg-lede">
            Two families, no exceptions. <strong>Bebas Neue</strong> is a
            display face: condensed, all-caps by nature, and it looks cheap at
            small sizes. It gets headlines and big numbers, nothing else.{" "}
            <strong>DM Sans</strong> does all the reading.
          </p>

          <div className="sg-typerow">
            <span className="sg-typemeta">
              H1 hero · Bebas · clamp(48px, 6.2vw, 92px) / 0.92
            </span>
            <div className="sg-spec-display sg-spec-h1">
              Keep your head in the round.
            </div>
          </div>
          <div className="sg-typerow">
            <span className="sg-typemeta">
              H2 display · Bebas · clamp(38px, 5vw, 68px) / 0.98
            </span>
            <div className="sg-spec-display sg-spec-h2">
              Four things. That&apos;s the app.
            </div>
          </div>
          <div className="sg-typerow">
            <span className="sg-typemeta">
              Eyebrow · DM Sans 700 · 22px / 0.16em tracking / uppercase
            </span>
            <div className="eyebrow" style={{ color: "var(--green-mid)" }}>
              What you get
            </div>
          </div>
          <div className="sg-typerow">
            <span className="sg-typemeta">
              Lede · DM Sans 500 · clamp(17px, 1.5vw, 20px) / 1.55
            </span>
            <p className="sg-spec-lede">
              One giant button counts every stroke. The scorecard does its own
              math. No menus, no ads, and no wondering whether that was your
              third or your fourth.
            </p>
          </div>
          <div className="sg-typerow">
            <span className="sg-typemeta">Body · DM Sans 400 · 17px / 1.6</span>
            <p className="sg-spec-body">
              Working memory is the mental sticky-note where you hold
              &ldquo;current stroke: 4&rdquo; while doing everything else. It is
              the first thing to get evicted the moment something more
              interesting shows up, and a golf course is an all-you-can-eat
              buffet of more interesting things.
            </p>
          </div>
          <div className="sg-typerow">
            <span className="sg-typemeta">
              Numerals · Bebas · the stroke count, the score, the total
            </span>
            <div className="sg-numerals">
              <span>4</span>
              <span>+2</span>
              <span>E</span>
              <span>78</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 4. COMPONENTS ---------- */}
      <section className="sg-section sg-alt">
        <div className="sg-inner">
          <div className="eyebrow">04</div>
          <h2 className="h2-display">Components</h2>

          <h3 className="sg-h3">Buttons</h3>
          <p className="sg-note">
            All four are the same button at four sizes. There is no secondary
            button style and there shouldn&apos;t be: every page has exactly one
            thing to click.
          </p>
          <div className="sg-row">
            <button className="btn btn-nav">Join the waitlist</button>
            <button className="btn btn-hero">Join the waitlist →</button>
            <button className="btn btn-fold">Let the app remember →</button>
            <button className="btn btn-watch">Notify me at launch →</button>
          </div>
          <p className="sg-note sg-drift">
            ⚠ These are square. The app&apos;s buttons are 16px-rounded. See §2.
          </p>

          <h3 className="sg-h3">Pill</h3>
          <div className="sg-row sg-ondark">
            <span className="pill">Apple Watch · Coming soon</span>
            <span className="pill">Coming 2026</span>
          </div>

          <h3 className="sg-h3">Icon tiles</h3>
          <p className="sg-note">
            56×56, lime background, deep-green fill. Six icons, all golf, all
            the same weight. Don&apos;t add a seventh from a generic icon set.
          </p>
          <div className="sg-row">
            {[
              <HappyBallIcon key="a" />,
              <ScorecardIcon key="b" />,
              <GolfBagIcon key="c" />,
              <FlagIcon key="d" />,
              <BallOnGreenIcon key="e" />,
              <BallPinIcon key="f" />,
            ].map((icon, i) => (
              <div className="icon-tile" key={i}>
                {icon}
              </div>
            ))}
          </div>

          <h3 className="sg-h3">Cards</h3>
          <div className="sg-cards">
            <div className="ss-fold-card">
              <div className="icon-tile">
                <BallOnGreenIcon />
              </div>
              <span>
                You reach the green with no idea whether it&apos;s your third or
                your fourth. Every. Single. Time.
              </span>
            </div>
            <div className="ss-feature sg-feature-demo">
              <div className="icon-tile">
                <FlagIcon />
              </div>
              <h3>Zero clutter, zero ads</h3>
              <p>
                No feeds, no upsells, nothing to sign into. Open it, count your
                round, close it.
              </p>
            </div>
          </div>

          <h3 className="sg-h3">Spacing</h3>
          <p className="sg-note">
            Two variables carry the whole layout. Everything else is a one-off
            and should be justified.
          </p>
          <div className="sg-table sg-table-2">
            <div className="sg-tr sg-th">
              <span>Token</span>
              <span>Value</span>
            </div>
            <div className="sg-tr">
              <span>
                <code>--container-pad</code>
              </span>
              <span>clamp(20px, 5vw, 64px) · horizontal gutter</span>
            </div>
            <div className="sg-tr">
              <span>
                <code>--section-pad-y</code>
              </span>
              <span>clamp(64px, 8vw, 110px) · vertical rhythm between sections</span>
            </div>
            <div className="sg-tr">
              <span>Container</span>
              <span>1200px max · 820px for prose · 720px for narrow sections</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 5. VOICE ---------- */}
      <section className="sg-section">
        <div className="sg-inner">
          <div className="eyebrow">05</div>
          <h2 className="h2-display">Voice</h2>
          <p className="sg-lede">
            SimplyStroke sounds like a friend who plays golf badly and is honest
            about it. Dry, specific, never impressed with itself. It never
            promises to improve your game, because it doesn&apos;t.
          </p>

          <div className="sg-rules">
            <div className="sg-rule sg-yes">
              <div className="sg-rule-head">Do</div>
              <ul>
                <li>Write short. One thought per sentence.</li>
                <li>Name the specific thing. &ldquo;Was that your third or your fourth&rdquo; beats &ldquo;scoring confusion.&rdquo;</li>
                <li>Say &ldquo;you.&rdquo; Put the reader on the course.</li>
                <li>Use US spelling. Color, not colour.</li>
                <li>Let a joke be dry. The garage door. The hawk. The 2019 almost-ace.</li>
                <li>Admit what the app doesn&apos;t do. It counts. It doesn&apos;t coach.</li>
              </ul>
            </div>
            <div className="sg-rule sg-no">
              <div className="sg-rule-head">Don&apos;t</div>
              <ul>
                <li>
                  <strong>Em dashes.</strong> Not one. Use a period, a colon, or
                  a comma. The site is currently at zero and should stay there.
                </li>
                <li>
                  <strong>Rule of three.</strong> &ldquo;No feeds, no upsells, no
                  distractions.&rdquo; It&apos;s a tic. Two items land harder.
                </li>
                <li>
                  <strong>Adverbs.</strong> Effortlessly, seamlessly, genuinely,
                  truly. All cuttable, all cut.
                </li>
                <li>
                  <strong>Throat-clearing.</strong> &ldquo;We&apos;ve all been
                  there.&rdquo; &ldquo;Here&apos;s the thing.&rdquo; Start at the
                  point.
                </li>
                <li>
                  <strong>Puffery.</strong> &ldquo;You&apos;ll wonder how you
                  played without it.&rdquo; Nobody believes it.
                </li>
                <li>
                  <strong>Corporate abstractions.</strong> &ldquo;Seamless
                  progression&rdquo; was a real step title on this site. It meant
                  &ldquo;keep walking.&rdquo;
                </li>
              </ul>
            </div>
          </div>

          <h3 className="sg-h3">The lines that work</h3>
          <div className="sg-quotes">
            <blockquote>Keep your head in the round. We&apos;ll keep the count.</blockquote>
            <blockquote>One tap. That&apos;s the whole scorecard.</blockquote>
            <blockquote>Your brain has better things to hold.</blockquote>
            <blockquote>
              It&apos;s not a focus problem. It&apos;s a golf design problem.
            </blockquote>
            <blockquote>Leave the phone in the bag.</blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}
