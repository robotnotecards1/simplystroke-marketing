# SimplyStroke Product Fact-Lock

**Last verified:** 2026-08-31 (Pro catalog and RevenueCat release scope verified)
**Purpose:** Single source of truth for product claims used in marketing copy, schema, and metadata. Update this file when the product changes; do not let page copy drift from it.
**Sources this pass:** the mobile-app repo (`~/Documents/Claude/Projects/SimplyStroke`) — `app.json`, `package.json`, `src/lib/entitlements.ts`, `src/lib/purchases.ts`, `src/app/group/*`, `src/app/tournament/*`; the live marketing site copy; the master growth audit (2026-08-09). App Store Connect remains the ultimate authority for listing/price/IAP.

**Status legend:** ✅ Verified in code/product · ⚠️ Needs Jared's confirmation · 🔒 Messaging rule

---

## 1. Platforms & availability

| Platform | Status | Evidence |
|---|---|---|
| **iPhone** | ✅ Live | App Store id `6792327238`; bundle `app.simplystroke` (`app.json`) |
| **Apple Watch** | ✅ Live | Watch app target `app.simplystroke.watch` / `SimplyStrokeWatch` (`app.json` appExtensions) |
| **Web app** | ✅ Live | `app.simplystroke.app`; Expo web `output: "static"` (`app.json`) |
| **Android** | ✅ Coming soon (confirmed — Jared 2026-08-09) | `app.json` has a **full Android config**, but it's **not yet on Google Play**. Keep the "Android coming soon" copy. |
| **App Store listing** | ✅ Live | id `6792327238`: **min iOS 16.4**, **Free download**, current version **1.0.3** (released 2026-08-16). Pro subscriptions are configured for the upcoming 1.0.4 submission. Source: iTunes lookup API + App Store Connect. |

🔒 Do not advertise Android as available until it's actually on the Play Store. Current site copy ("Android coming soon") is safe.

## 2. Price & monetization

> **Jared's directive (2026-08-30): ship optional SimplyStroke Pro with the coordinated 1.0.4 UX/Watch release.** Core scorekeeping remains free. Pro adds expanded history, season analytics and other account-based features; do not describe the whole product as subscription-free.

- **Current public build:** core scoring is free and no subscription is being charged yet.
- **Approved 1.0.4 release:** optional **SimplyStroke Pro** auto-renewing subscriptions at **$2.99 monthly** and **$19.99 annual**. App Store products and RevenueCat offering/entitlement setup exist, but the app, products and feature flag remain unsubmitted/off until sandbox tests and App Store review.
- **Free plan:** unlimited active scoring on iPhone and Watch, sync, standard group play, and access to the latest 10 completed rounds; older cards are retained and protected.

🔒 **Messaging rules (from the audit — important):**
- Say **"Core scorekeeping is free"** — NOT a permanent "no subscription" or "no in-app purchases" promise. Those become false the moment tips/Pro ship.
- The live site currently says "free / no subscription" and `lib/site.ts` comments "no in-app purchases." **Soften these** to the durable "core is free" framing (Batch 2 copy work).
- Prices are approved in App Store Connect but should be presented from the storefront in-app so regional pricing stays accurate. The marketing site does not provide checkout.

## 3. Accounts & sign-in

- The app has **full auth**: Apple Sign-In (`expo-apple-authentication`) + Google Sign-In (`@react-native-google-signin`) + Supabase (`AuthForm.tsx`, `auth/reset-password.tsx`, `AccountSection.tsx`, profile tab).
- Local/solo play uses on-device storage (`react-native-mmkv`).
- ✅ **Confirmed (Jared 2026-08-09): a solo round finishes with no sign-in.** Group rounds, tournaments, and cross-device sync require an account. Use **"No account needed to start"** (not a blanket "no account").

## 4. Offline behavior

- Solo scoring is local-first (`react-native-mmkv`) → works offline. ✅
- Group rounds and tournaments use **Supabase realtime** (`useGroupRealtime.ts`, group load tests) → **require connectivity**.
- ⚠️ The site says "works fully offline." Accurate for **solo** scoring; **not** for live group/tournament features. Recommended phrasing: **"Your solo round works offline"** rather than a blanket "fully offline."

## 5. Features & availability

| Feature | Status | Evidence |
|---|---|---|
| One-tap solo scoring | ✅ Live | core product |
| Apple Watch scoring | ✅ Live | watch target exists; *watch sync* may become Pro-gated (`useWatchSync.ts` → `useIsPro`) |
| **Group scoring** (host/join/live foursome, group chat, live leaderboard) | ✅ **Live** — a real differentiator | `src/app/group/host|join|lobby|live.tsx`, `GroupChat.tsx`, `GroupScorecardTable.tsx` |
| **Tournament** (create/join/board/spectator/manage) | ⏸️ Built in the app, but **HELD** — market as "coming soon" (Jared, 2026-08-10) | `src/app/tournament/*`, `TournamentLeaderboard.tsx`. Code exists, but Jared is holding the public launch — **keep the "coming soon" copy; do NOT flip to live.** |

🔒 **Group scoring** is live — market it confidently (audit Pillar 3). **Tournament** exists in the app but is **on hold** (Jared, 2026-08-10) — keep it "coming soon"; do not market it as available.

## 6. The "no GPS" positioning (handle carefully)

- The app **does request location** — `expo-location` with the prompt *"SimplyStroke uses your location to find golf courses near you,"* plus Android `ACCESS_FINE/COARSE_LOCATION`.
- So "no GPS" is a **positioning claim** (no yardages, no rangefinder, no shot-tracking maps), **not** "never uses location."
- 🔒 Frame as **"no GPS clutter / no yardages to fiddle with"**, not "SimplyStroke never uses your location." Otherwise the App Store's location prompt contradicts the copy.

## 7. Live-site claims to reconcile (feed into Batch 2 copy)

These current claims are fragile against the facts above — soften during the copy pass:
1. "No subscription" / "no in-app purchases" → **"Core scorekeeping is free."**
2. "No account needed" → **"No account needed to start."**
3. "Works fully offline" → **"Your solo round works offline."**
4. "No GPS" (if phrased absolutely) → **"No GPS clutter / no yardages."**
5. FAQ answers repeat "Android is coming soon to Google Play" — ✅ confirmed correct; keep.
6. **Tournament stays "coming soon"** — Jared is holding the launch (2026-08-10). Current "coming soon" copy is correct; no change needed.

## 8. Confirmations — RESOLVED (Jared, 2026-08-09)

1. **Android** — ✅ still "coming soon" (not on Google Play). Keep current copy.
2. **Tournament** — Jared decided (2026-08-10) to **hold** the launch; keep marketing it "coming soon" even though the app code exists. No copy change.
3. **Solo, no account** — ✅ yes, a solo round finishes with no sign-in.
4. **Free/Pro line** — ✅ core scoring stays free; Pro is an optional subscription in the coordinated 1.0.4 release (§2).
5. **App Store listing** — live installs still predate Pro; the 1.0.4 app and subscription products have not been submitted.
6. **Price** — ✅ $2.99 monthly / $19.99 annual configured in App Store Connect; display live storefront prices in-app.

**All product-fact blockers for Batch 2 copy are now cleared.**

---

*Maintainer note: when any ⚠️ resolves or the product ships Pro/tips/Android, update the relevant section and the "Last verified" date, then grep the site for the affected claim.*
