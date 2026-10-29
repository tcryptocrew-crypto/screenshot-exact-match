# Mifra's 30-Day Birthday Experience — Phases 1–3

## What we're building (this round)

A cinematic, romantic, date-driven experience website for Mifra, running Nov 1–30, 2026 in Asia/Karachi time. This approved build covers:

- **Phase 1 — Foundation**: architecture, visual tokens, date-unlock utility, content schema.
- **Phase 2 — Design foundation**: atmospheric app shell, welcome/intro experience, Hamoo component with AI placeholder art, 30-day journey navigator.
- **Phase 3 — Day 1**: the full eight-scene introduction using the real copy from the reference image (Hiii Chanddd…, Acha ji…, 30 din 30 surprises…, – Hamid ❤️).

Days 2–29 and the Day 30 finale are scaffolded: configurable data entries in locked state, ready to fill in later phases.

## Route structure (TanStack Start)

```
src/routes/
  __root.tsx        — fonts, shell, shared head
  index.tsx         — welcome gate: intro (first visit) → journey calendar
  day.$day.tsx      — daily scene player for any day (1–30)
```

Hidden testing override: `?day=N` on `/` unlocks/previews any day (marked clearly in code as test-only; normal visitors never see it). Also a `?day=N` deep link straight into a scene player for QA.

## Date-unlock logic (Asia/Karachi)

- One isolated utility, `src/lib/journey-dates.ts`, no hardcoded countdowns.
- Computes "today in Karachi" from UTC millis + the Karachi offset — never from the visitor's local timezone, never via naive `new Date()` day parsing.
- Pure functions + a Vitest unit test suite covering: Oct 29 (all locked), Nov 1 (Day 1 unlocks), midnight rollover Nov 2 00:00 PKT, Nov 30, Dec 1 (all unlocked, journey complete), and pre-midnight UTC-vs-PKT edge cases (e.g. Nov 1 19:00 UTC = Nov 2 00:00 PKT must unlock Day 2, not Day 1's UTC date).
- Locked days show what they are, stay visibly locked, remain tappable to reveal a gentle "unlocks on <date>" state — no error, no spoilers.

## Content architecture (data-driven, 30 entries)

`src/content/days.ts` — one typed object per day (schema in `src/content/schema.ts`):

```ts
dayNumber, date, title, nickname?, introText?, scenes[], letter?,
hamooAssets[], interactions[], completionMessage?, state
```

- Day 1 carries the eight real scenes from the reference image.
- Days 2–29 are empty placeholder entries with `state: "upcoming"` — adding a day later means editing one object, no component rewrites.
- Nicknames are per-day fields, never global constants.
- Placeholder copy is clearly marked `// EDITABLE: awaiting content` — no invented personal history.

## Visual system

Tokens in `src/styles.css` (oklch, light+dark pairs so the palette holds in both modes):

- `--background` deep near-black burgundy `#171116` / dominant wine `#350B18`, `#4A1022` gradients
- `--primary` parchment cream `#F5EBDD` (letter/card surfaces)
- `--accent` antique gold `#C5A36A` (borders, candlelight glints, sparingly)
- `--soft-rose` `#C77C86`

Typography: elegant serif display (e.g. Cormorant Garamond) for headings/letters via `<link>` in `__root.tsx`, clean sans (Work Sans) for UI/body — loaded with link tags, never CSS `@import`. Roman-Urdu lines render in the same serif for a handwritten-letter feel without script fonts.

Atmosphere: layered CSS — candle-glow radial gradients, slow floating petal particles, subtle vignette. All decorative motion gated behind `prefers-reduced-motion` (static fallback keeps full readability).

## Hamoo component & placeholder art

- `HamooCharacter` reusable component: pose prop, size, position, animation preset (idle-bounce, peek, wave, sad), entrance delay. Renders from a centralized pose→asset map; a missing pose falls back to a documented placeholder card, never breaks the page, never invents new panda art at runtime.
- I generate a small set of AI placeholder panda poses matching the reference image's plush style (idle, peeking, waving, sad) as transparent WebP under `public/images/hamoo/`. Filenames follow the brief's convention (`hamoo-peek.webp`…). Your real supplied assets replace these file-for-file later — zero code changes.
- The uploaded reference image is design reference only; it is not embedded as an app asset.

## Day 1 — eight-scene player

`ScenePlayer` + `SceneTransition`: full-screen scenes advancing via Next button / tap / keyboard, with gentle fade-slide transitions and a persistent Skip control.

1. Hamid's welcome — "Welcome Mifra" letter card
2. Hamoo peeks from behind the card
3. Hamoo introduces himself
4. Reveal: Hamoo is Hamid's panda self
5. Tease the Day 30 surprise
6. Reveal the 30-day calendar (Day 1 unlocked)
7. Hamid's personal letter
8. Interactive choice → warm response → lands you on the journey view

Intro sequence plays once (localStorage flag), skippable, reduced-motion variant. Scene progress and day completion states persist in localStorage.

## Components

`IntroSequence`, `HamooCharacter`, `ScenePlayer`, `SceneTransition`, `DayCard`, `DayNavigator`, `LetterCard`, `ChoiceInteraction`, `BackgroundAmbience` (finale/gallery components arrive with later phases).

## Asset strategy

- `public/images/hamoo/` (poses), `public/images/backgrounds/`, `public/images/memories/` (empty, ready), `public/images/decorations/`.
- Meaningful filenames; lazy-loading + reserved dimensions for all noncritical images; per-day assets load only on that day's route.

## Privacy & rules honored

Frontend-only — no backend, auth, database, analytics, or tracking. No couple photos. Client-side date locks are an experience feature, documented as such, not security.

## Tests

- `journey-dates` boundary suite (above) — run via Vitest.
- Manual/Playwright verification: Oct-29 state (all locked), `?day=1` preview renders the full Day 1 flow on mobile + desktop, intro plays once then doesn't replay, Skip works, reduced-motion fallback readable, no console errors.

## Risks

- **Placeholder panda art won't match your real Hamoo** — mitigated by the file-for-file asset map; poses may look slightly different between placeholder and final.
- **Timezone math** — mitigated by pure utility + midnight-boundary tests; I cannot test a real device clock change, so the hidden `?day` override stays as your verification tool.
- **Scene-timing feel is subjective** — after this build, tell me what feels too fast/slow and I'll tune timings without touching structure.

## After this build

You'll review: the welcome/intro, the journey calendar in Oct-29 locked state, and Day 1 end-to-end (via `?day=1`). Then we proceed to Phase 4 (all-30-day content) and Phase 5 (Day 30 finale) in the next round.
