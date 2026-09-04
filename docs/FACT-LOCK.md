# SimplyStroke Product Fact-Lock

**Last verified:** 2026-09-03
**Purpose:** Single source of truth for website copy, metadata, schema, App Store creative, and release notes.
**Sources:** public Apple lookup for app id `6792327238`; App Store Connect read-only review; the 1.0.4 app candidate at `a6553ee8cffce832e501289276551ec25c760910`; `docs/pro-feature-scope.md`; signed-device and simulator acceptance notes.

This website branch is a **release preview** for 1.0.4. Do not deploy it to production before the corresponding app capabilities have passed final acceptance and the public App Store version is ready. Preview copy may describe the approved 1.0.4 product as it will appear at release; the public site must continue to describe the currently public app until cutover.

## Platforms and public status

| Surface | Verified status |
| --- | --- |
| iPhone | Live on the App Store; bundle `app.simplystroke` |
| Apple Watch | Live companion app; one-tap scoring and workout support |
| Web app | Live at `app.simplystroke.app`; feature coverage differs from native |
| Android | Coming soon; do not advertise as available |
| Public App Store version | **1.0.3**, released 2026-08-16; minimum iOS 16.4; free download |
| 1.0.4 | Prepared for submission; not submitted or public as of this verification |

## Free core

- Unlimited iPhone and Apple Watch stroke counting, penalties, undo, haptics, and next-hole controls.
- Solo play can start without an account and continues without course signal.
- Course lookup and par, with the option to skip course setup.
- Account backup and cross-device sync.
- Standard live group hosting, joining, scorecards, and existing basic sharing.
- Free history shows the latest 10 fully completed post-cutover rounds plus protected older cards. Older rounds are retained; starting another round never blocks scoring.
- No ads today.

Use **“Core scoring is free”** or **“Free to download, with optional Pro.”** Do not say “no subscription,” “no upsells,” “everything is free,” or “no in-app purchases.”

## SimplyStroke Pro in 1.0.4

Approved U.S. pricing is **$2.99/month** or **$19.99/year** for the same benefits, with annual selected by default in the app. Apple’s purchase sheet controls the actual local price, billing period, renewal, and storefront availability. There is no web checkout.

Verified candidate capabilities:

- complete round history;
- calendar-season, month, and all-time summaries with separate 9-hole and 18-hole comparisons;
- personal goals, records, and visual season recaps;
- course playbooks, optional pre-round briefings, course challenges, and a clearly labeled best-ever composite scorecard;
- saved crews, comparable shared history, and multi-round golf trips with cumulative gross results;
- private round notes and photos;
- on-device Apple Vision paper-scorecard recognition with mandatory human review before save;
- optional Apple Watch club selection and system-Dictation text attached to the latest recorded stroke from the user-opened More menu; recording a stroke never opens the details flow automatically.

One Pro organizer can use the Pro crew/trip organization tools while invited friends play the standard group round for free.

If Pro lapses, scoring continues and data is retained. Private notes, photos, and shot details remain available for read/delete behavior defined by the app; they are not placed in standard scorecard shares, visual recaps, group scoreboards, emails, or leaderboards.

## Accuracy and privacy boundaries

- Paper recognition is a **draft**. Say “scan, review, and save,” never “perfect scan,” “automatic import,” or “guaranteed accuracy.”
- Recognition runs on the iPhone. The source photo stays in temporary device cache and is deleted after save or cancel; approved scorecard data may sync.
- Watch notes use Apple system Dictation and save returned text. SimplyStroke does not store raw voice recordings.
- Course playbooks summarize recorded total strokes. They do not infer swing faults, putting, club advice, or tee-adjusted ability.
- The best-ever course card is a composite of lowest recorded hole scores, not a played round or handicap score.
- Course challenges and records use eligible completed rounds and comparable course/hole identity.
- Location may help find nearby golf courses. “No GPS” means no yardage/rangefinder or shot-map product, not that the app never requests location.

## Accounts, offline behavior, and wording

- Say **“No account needed to start a solo round.”** Sync, Pro verification, private cloud content, and some connected features require an account.
- Say **“Solo scoring works offline.”** Live group play, cloud sync, billing verification, and uploads need connectivity.
- “Apple Watch scoring” is free. Do not make core Watch reliability sound like a paid benefit.
- “Private by default” applies to round journals and shot details; sharing remains an explicit user action.

## Deliberately deferred

- GPS yardages and GPS shot tracking: V3 roadmap.
- Swing analysis and sensor-based club analysis: not in 1.0.4.
- GHIN or official handicap integration: back burner because authorized access is not a free public API.
- Do not advertise handicap posting, an official index, GPS distances, swing diagnosis, raw voice recording, betting/settlement, or a public social feed.

## Release cutover rule

The `/pro/` page, 1.0.4 feature copy, Pro pricing, and 1.0.4 App Store screenshots are prepared in preview only. Publish the website and upload creative only after the exact final candidate passes physical-device acceptance and Jared gives final approval. If a feature misses 1.0.4, remove its claim and screenshot before release rather than describing planned work as available.
