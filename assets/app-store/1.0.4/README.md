# SimplyStroke 1.0.4 App Store screenshots

Status: **pre-release draft; do not upload yet.**

These nine 1290 × 2796 JPEGs use an accepted Apple 6.9-inch iPhone screenshot size. They contain no alpha channel. Images 04–07 were recaptured from PR #80 candidate `ec1c1514d70b553bae9296151eb6a1b586a97c0b` through development-only, write-free fixture routes at a 402 × 874 CSS viewport and 3× device scale. The `marketing=1` fixture parameter only hides internal QA notices from these public-facing compositions; it is disabled outside development and does not change release behavior. Image 01 was captured from its `d417bc2` ancestor and image 09 from its `d55bd17` ancestor; neither surface changed through the current candidate. Images 03 and 08 use real 1.0.4 review components captured from candidate `a6553ee8cffce832e501289276551ec25c760910`; image 02 uses the user-invoked Watch UI at native candidate `6998ca8635bd852025a8ac81e32ff6d5ca4c812a`. The journal, season, crews, trips, and OCR data are fictional, write-free review fixtures.

The `watch/` directory contains three 416 × 496 RGB JPEGs captured directly from the Series 11 simulator at the same native candidate. This is an accepted Apple Watch screenshot size. The files show scoring, the user-opened More menu, and the full-size club list. They are a separate Watch listing set and are not part of the numbered iPhone sequence. Slide 02 reuses the same current scoring capture, so the iPhone and Watch listings cannot drift to different control layouts.

The photo visible in image 07 is the project-owned `onboarding-hero-v2.jpg` asset generated from scratch for SimplyStroke with OpenAI ImageGen. No reference image was supplied. Its prompt, durable repository source path, and source checksum are recorded in PR #80 at `docs/asset-provenance.md`; the shipped project JPEG has SHA-256 `6723d4c27d39cd2a7563ca42bcb2509891b927a32cc0473b5c922212144f0236`. The prior untraceable golf photo is not used in this package.

Each image is numbered against the nine-image set (`01 / 9` through `09 / 9`). `contact-sheet.jpg` was regenerated from these exact final draft files.

The reproducible HTML composition and bundled fonts are in `source/`; its exact iPhone source captures are in `raw/`, and the Watch slide references `watch/01-scoring.jpg` directly. Serve this directory over local HTTP and open `source/index.html?slide=<key>` in Chromium at a 1290 × 2796 viewport and device scale factor 1, then export a full-page JPEG. The slide keys are `score`, `watch`, `pro`, `season`, `crews`, `trips`, `journal`, `ocr`, and `shot`. Regenerate `contact-sheet.jpg` from the nine exact outputs in a 3 × 3 grid with 10-pixel gutters; it is review-only. The redistributed Bebas Neue and DM Sans font licenses are beside the font files.

## Sequence

1. 01-score.jpg — free one-tap scoring
2. 02-watch.jpg — free Apple Watch scoring with optional Pro shot detail described
3. 03-pro.jpg — Free versus Pro overview
4. 04-season.jpg — season stats and visual recap
5. 05-crews.jpg — saved crews
6. 06-trips.jpg — multi-round golf trips
7. 07-journal.jpg — private round notes and photos
8. 08-ocr.jpg — on-device paper-card draft and mandatory review
9. 09-shot-details.jpg — manually attach a club and private note to a specific stroke

contact-sheet.jpg is for review only and must not be uploaded.

## Apple Watch sequence

1. watch/01-scoring.jpg — large scoring, More, Undo, and Next controls
2. watch/02-more.jpg — user-opened Penalty and Shot details actions
3. watch/03-choose-club.jpg — full-size club list

## Release gates

Before upload:

- capture against the exact final App Store build and replace any image whose UI differs;
- keep every uploaded Watch image at the same accepted display size;
- finish physical Watch acceptance of the final manual Shot details club/dictation flow; exact-build iPhone simulator acceptance passed at d55bd17;
- finish the OCR accuracy decision and 50-card study, or remove the OCR image and defer the feature;
- verify a confirmed Pro account never sees an upgrade CTA on a gated-feature path;
- verify all text and entitlements match the products attached to App Store Connect;
- approve the complete image order and copy;
- upload only after Jared approves the final submission record.

Apple reference: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/
