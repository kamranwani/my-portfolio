# Kamran Wani — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4. A premium, product-style landing page built
around a full-bleed cinematic Hero — not a card-based portfolio template.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> **Note:** dependencies (`gsap`, `framer-motion`, `lenis`) are in `package.json` but could not be
> installed or build-tested in the sandbox this was built in (no network access). Run
> `npm install && npm run build` locally as your first step. Every file was reviewed by hand for
> type-correctness and for GSAP/Tailwind transform conflicts (a couple of real ones were caught and
> fixed — see the "Known constraints" section) — but that review is not a substitute for the compiler.

## Editing content

All text lives in `app/data/portfolio.json`, typed via `app/shared/types/Portfolio.ts`, read through
`lib/portfolio.ts`. Edit the JSON — no component code needs to change.

**Your LinkedIn data still isn't in here.** LinkedIn blocks automated access and search didn't surface
enough public info to safely attribute real facts to you, so bio/experience/skills are still
placeholder. Paste your real details whenever you want them swapped in.

## Latest pass: art direction & polish (not another rebuild)

This pass didn't touch the architecture — same Next.js/TypeScript/Tailwind/GSAP/Framer Motion/Lenis
stack, same JSON-driven content, same theme token system. It fixed two real bugs and added targeted
polish across every section.

**Two real bugs, not just "feel" issues:**

- **The visible portrait cutout edge** was a genuine CSS bug: the bottom/top edge-scrim gradients in
  `PortraitField.tsx` had their `linear-gradient` directions backwards (`linear-gradient(to top, ...)`
  places its first color stop at the *bottom* of the element, not the top — easy to get backwards).
  The result: the bottom edge — a real hard photographic crop where the shirt ends — was only getting
  12% fade coverage instead of the strong coverage it needed. Fixed with correct directions and far
  more generous coverage (34% bottom, 34% left, 16% top).
- **The Hero's "shifted right" composition** was also a real bug: the text column was wrapped in the
  shared `Container` component, which centers content (`mx-auto`) inside a large max-width. On wide
  viewports that leaves a dead zone on the far left. Replaced with a left-hugging padded wrapper, and
  shrank/dimmed the oversized background orb (`h-[80%] w-[65%]`, now `h-[55%] w-[42%]` and notably
  dimmer) that was sitting directly behind the text competing with it instead of receding behind it.

**Theme parity fixed for the Hero specifically:** the Hero stage's background "hotspot" glow and the
light beam's warm mid-tone were hardcoded hex/rgba values, meaning every theme got the identical
warm-brown Hero glow regardless of theme. Both now derive from the active theme's accent via
`color-mix()` (new `--stage-hotspot` / `--stage-beam-warm` tokens in `globals.css`), so the Hero's
atmosphere actually shifts character per theme instead of just its particles/spotlight doing so.

**Everything else, section by section:**

- **Header** — slightly larger (more padding, wider), logo now reacts to hover, nav links get a
  subtle lift, the active-section pill has an accent glow, theme swatches get spring feedback on
  hover/tap.
- **Hero background** — added a single quiet rotating wireframe ring (SVG, `spin-slow` 90s loop)
  behind the portrait for the "abstract geometry" depth layer the brief asked for, without turning
  the Hero into a graphics demo.
- **About** — headline changed to "How I think about building"; stats now count up from 0 on hover
  (`AboutStats.tsx`, via Framer Motion's imperative `animate()`) plus a subtle elevation and
  theme-accent glow.
- **Skills** — headline changed to "Where engineering meets craft"; cards get an accent line that
  draws in on hover, chips lift and highlight on hover.
- **New: Currently Exploring** (`app/features/exploring/`) — a compact, chrome-free status strip
  between Skills and Experience with a pulsing status dot and a moving signal-line sweep along the top
  edge. Data-driven via a new `exploring` field in `portfolio.json` — **currently a placeholder**
  (deliberately, per the accuracy requirement: I have no way to know what you're actually learning
  right now, so I didn't invent something and present it as fact). Edit `technology` and `description`
  in the JSON.
- **Experience** — timeline dot scales up and the role/company text tints to the accent on hover; tech
  chips get the same lift-and-highlight treatment as Skills.
- **Projects** — cards redesigned: tighter layout, a short italic problem-statement line above the
  description (new `problem` field per project — same placeholder-project caveat as always, see
  below), a hover-revealed "Explore →" indicator over the image, and tech chips that switch to the
  accent color on hover instead of staying static.
- **Contact** — availability dot now has a live pulse (`animate-ping`), social icons get the same
  hover-lift as the footer.
- **Footer** — one small addition only, per your "don't turn it into a content section" instruction:
  social icons lift slightly on hover.
- **All non-Hero sections** now carry a very faint drifting accent-colored blob
  (`SectionAtmosphere.tsx`, ~8% opacity) so they're not flat, without competing with the Hero's much
  stronger atmosphere.

**On the fabrication constraint:** the project names/descriptions and work history in `portfolio.json`
were placeholder content I wrote in an earlier pass, already flagged as such. This pass restructured
how that placeholder content is *displayed* (problem-statement framing on project cards) but did not
add any new invented specifics — no fabricated impact metrics or results were added to project cards,
and the new "Currently Exploring" field ships as an explicit placeholder rather than a guessed answer.



The previous version boxed the Hero into a centered rounded panel — it read as a card sitting on the
page. This pass removes that entirely:

- **No card.** The Hero (`app/features/hero/Hero.tsx`) is a full-viewport (`min-h-[100svh]`) section
  with no rounded container, no border, no separate background box. Its atmosphere extends to the
  actual edges of the browser window. The header floats above it as a translucent glass pill rather
  than sitting in reserved layout space (`app/layout.tsx`'s `<main>` no longer pads around it).
- **New portrait, treated as material, not a photo.** `public/portrait-hero.webp` (your new uploaded
  image) is composited via edge scrims, a theme-tinted `mix-blend-color` grade, and a large,
  extremely-soft cursor-tracked reveal — see `PortraitField.tsx`. No border, no drop shadow, no visible
  rectangle: the image is fully alpha-masked into the environment. I did **not** do pixel-precise
  person segmentation this time — with no internet access there's no hosted matting API available, and
  given the "should feel like light revealing it, not a cutout sticker" direction, a broad feathered
  mask actually served the brief better than a hard silhouette would have.
- **Cursor-revealed portrait.** The portrait sits behind a veil; moving the cursor punches a large,
  heavily-feathered hole in it (a 420px-radius CSS `mask-image` radial gradient with a 68%-wide soft
  zone — no visible circular edge). Scrolling past the Hero permanently fades the veil away via GSAP
  `ScrollTrigger` `scrub`.
- **Real layered depth**, not a flat background: `DepthBackground.tsx` renders three independent
  layers (slow background orbs, medium midground orbs, faster foreground dust particles), each
  parallaxing at a different intensity off cursor position — background moves ~1–3px, midground
  ~7–9px, particles ~14–18px, the portrait ~5–6px. All colors derive from the active theme's accent.
- **One shared cursor listener**, not five. Every layer used to run its own `pointermove` listener.
  They now all subscribe to `app/features/hero/lib/StagePointer.tsx`, which does one rAF-throttled
  listener with a cached bounding rect (no repeated layout reads) and broadcasts position to any
  number of subscribers. Automatically disabled on touch devices (`pointer: coarse`) and under
  `prefers-reduced-motion`.
- **Scroll-driven cinematic exit**, not a fade. As you scroll past the Hero, the portrait, headline,
  and background layers each move at their own rate (a GSAP timeline scrubbed to scroll position);
  only the very end of that range fades content out, so it reads as camera movement rather than a
  dissolve.
- **Headline restructured.** The tagline is now the dominant kinetic headline, broken into four lines
  with "software" set in the theme accent color (`HeroTitle.tsx`), matching the emphasis-word
  direction — name and role moved to a small monospace byline above it. Screen readers get the full
  sentence via a `sr-only` span; the decorative broken-up version is `aria-hidden`.
- **Buttons now do the duplicate-text vertical slide** on hover (old text exits upward, an identical
  copy enters from below, inside an `overflow-hidden` wrapper) — implemented once in
  `MagneticButton.tsx` via Framer Motion variants, so every CTA (`Let's talk`, `View work`, the Contact
  email button) gets it automatically.
- **Header** is a smaller floating glass pill now (not a wide bar), gets slightly more opaque/blurred
  on scroll via a `scale`/`y` transform (compositor-only, no layout thrash), and its active-section
  indicator is a Framer Motion `layoutId` pill that morphs between nav links as you scroll.

## Previous pass: Hero rebuilt from a card into a full-bleed environment

(Superseded in places by fixes in the "Latest pass" section above — kept here for the full history of
what changed and why.)

## Experience Mode — now with a real audio asset

Previous version had the toggle wired up but no actual sound. Since there's no internet access to
source a royalty-free track, **I generated one**: `public/audio/ambient.mp3` is a synthesized
cinematic ambient pad (`numpy`/`scipy`, layered detuned sine pad + filtered noise + slow amplitude
swell, seamlessly loop-crossfaded, encoded with `ffmpeg`/`libmp3lame`) — a real, playable, royalty-free
asset, not a placeholder path. Swap it for a different track anytime; the player doesn't care.

Click the waveform icon in the header:

- Fades in to ~18% volume over ~1s, fades back out on toggle-off (manual volume-ramp interval, no Web
  Audio API dependency — see `ExperienceModeProvider.tsx`)
- Never autoplays
- The Hero atmosphere reacts: aurora opacity and particle brightness increase, orb drift speeds up,
  and a one-shot soft pulse plays across the midground glow the moment it switches on
  (`DepthBackground.tsx` watches `useExperienceMode().active`)
- Fully cleaned up on unmount: interval cleared, audio paused and detached

## Known constraints from this pass

- **No live build.** Same sandbox limitation as before — no `npm install` without network access, so
  everything below was verified by manual code review, not the TypeScript compiler or a rendered
  page. Please build locally before treating this as final.
- **Two GSAP/Tailwind transform conflicts were caught and fixed** during review: (1) a pulse element
  in `DepthBackground` used Tailwind's `-translate-x-1/2 -translate-y-1/2` for centering while also
  being GSAP-animated on `scale` — GSAP's inline transform would have silently stripped the centering
  the moment the pulse fired. Fixed by centering via GSAP `xPercent`/`yPercent` instead (same pattern
  already used in `CursorSpotlight`). (2) The scroll-driven background-drift timeline in `Hero.tsx`
  originally animated plain `y` on the same layers that `DepthBackground`'s cursor-parallax also
  animates via plain `y` — two independent GSAP tweens fighting over the same channel would have
  jittered. Fixed by moving the scroll-driven version to `yPercent`, which GSAP composes alongside
  `x`/`y` instead of overwriting it.
- **A design-intent bug was also caught**: `PortraitField` originally had Tailwind opacity classes
  (`opacity-70 sm:opacity-90`) meant to keep the portrait subtly translucent at rest, but the GSAP
  entrance animation (`opacity: 0 → 1`) would have silently overridden them via inline style on the
  same element — final opacity would always have ended up `1`, not `0.7`/`0.9`. Removed the redundant
  classes; the veil already handles "not fully visible" more effectively than a flat opacity ever
  would have.
- **Person segmentation is a soft vignette mask, not a silhouette cutout** (see above) — a deliberate
  choice given the "portrait as material" direction, not a fallback I'd otherwise have picked.
- **Responsive effect reduction is real but simplified**: touch devices get zero cursor-tracking
  (disabled at the `StagePointerProvider` level via `pointer: coarse`), and particles are roughly
  halved below the `sm` breakpoint. That's two tiers, not the three distinct desktop/tablet/mobile
  effect budgets described in the brief — a reasonable compromise given scope, but worth knowing.

## Themes

Four custom identities — not just recolors. Background atmosphere, stage lighting, and glow all shift
with each, because every glow/beam/spotlight color on the Hero derives live from the active theme's
accent via `color-mix(in srgb, var(--accent) 38%, transparent)`.

- **Ivory Gold** — warm white, champagne, soft bronze (light, default)
- **Midnight Amethyst** — near-black indigo with electric amethyst accents
- **Graphite Cyan** — dark graphite/steel with cool cyan, minimal and futuristic
- **Pearl Emerald** — pearl white with muted emerald/mint (light)

Switch via the four dots in the header. Every section uses semantic tokens (`bg-surface`,
`text-foreground-muted`, `bg-primary`, etc.) — nothing is hardcoded, so switching themes recolors the
whole site with zero component changes.

## Assets

- `public/portrait-hero.webp` — your new uploaded photo, soft-masked (see above). 168KB, down from a
  2.1MB source PNG.
- `public/audio/ambient.mp3` — synthesized ambient loop, ~270KB (see Experience Mode above).
- `public/resume.pdf` — not included; link is wired up in `personal.resumeUrl`.
- `public/projects/*.webp` — not included; update `image` per project in the JSON once you have real
  screenshots.

## Folder structure

```
app/
  data/
    portfolio.json         # all site content
  shared/
    types/                 # Theme.ts, Portfolio.ts
    hooks/                 # useTheme, useScrollTo
    providers/              # ThemeProvider, SmoothScrollProvider, ExperienceModeProvider
    layout/                 # Header (floating glass nav), Footer
    ui/                     # Container, SlateTag, SectionHeading, SocialIcon, MagneticButton,
                             # Reveal, ExperienceModeToggle
  features/
    hero/
      Hero.tsx               # full-bleed section, entrance timeline, scroll-parallax exit
      lib/
        StagePointer.tsx      # shared single-listener cursor tracker
      components/
        DepthBackground.tsx   # layered parallax orbs + particles
        PortraitField.tsx     # cursor-revealed, theme-graded portrait
        HeroTitle.tsx          # emphasized-word kinetic headline
        LightBeam.tsx
        CursorSpotlight.tsx
    about/    (About.tsx, components/AboutStats.tsx)
    skills/   (Skills.tsx, components/SkillGroupCard.tsx)
    experience/ (Experience.tsx, components/ExperienceItemCard.tsx, TimelineRail.tsx)
    projects/ (Projects.tsx, components/ProjectCard.tsx)
    contact/  (Contact.tsx, components/ContactCard.tsx)
  layout.tsx                 # fonts, all providers, Header, <main>, Footer
  page.tsx                   # composes all sections
  globals.css                 # 4 theme palettes + stage tokens + grain/aurora/particle keyframes
lib/
  portfolio.ts                # typed accessor for portfolio.json
```

## Latest pass: UI fixes on the real content

You'd filled in real data since the last handoff — this pass fixed issues that only became visible
once real content was in place, plus the specific changes you asked for.

**Two real bugs found and fixed:**

- **The Hero headline was stale.** `HeroTitle.tsx` had the *old* placeholder tagline
  ("Building software that feels as good as it performs.") hardcoded into a fixed 4-line array,
  completely independent of `personal.tagline` in the JSON — so editing the tagline in the JSON did
  nothing visible. It now splits whatever `tagline` actually says into words and reveals them
  kinetically, still emphasizing "software" in the theme accent when that word is present. Edit the
  JSON and the Hero will actually reflect it now.
- **Non-live projects rendered broken links.** `Project.liveUrl`/`githubUrl` are `null` for Datanex,
  HRMS, and your portfolio itself, but the old card always rendered `<a href={project.liveUrl}>`
  regardless — which means it was literally rendering `href="null"` for three of your six projects.

**What you asked for:**

- **Hero decluttered.** Removed the long `summary` paragraph from the Hero entirely (it's a full
  resume-style paragraph — way too much text for a hero). It now only shows the byline, the kinetic
  headline, and the two CTAs. That summary text wasn't going to waste, though — since nothing else in
  the app was reading `personal.summary`, it's now doing a real job as your page's meta description in
  `layout.tsx`.
- **About stats trimmed to 4.** Now shows "4+ yrs full-time", "2+ yrs .NET/backend", **certifications**
  (computed live from `certifications.items.length`, so it stays correct if you add more), and
  **cups of coffee: ∞** — restored from the original placeholder set you liked.
- **Projects redesigned — no images, real status handling.** Cards no longer try to load
  `/projects/*.webp` (that folder is empty, which is why they were rendering as broken blank space).
  Each card now shows a status badge (**Live** / **In Progress**), and the link row only renders links
  that actually exist — projects with no public URL show "🔒 Confidential — client project",
  "In development — not yet public", or "Not publicly deployed" depending on their `confidential`/
  `status` fields, instead of dead links. Grid is now 3-column on desktop since cards are much shorter
  without images.
- **Background has real, visible movement now.** `SectionAtmosphere` (the ambient layer behind About/
  Skills/Experience/Projects/Contact) was likely too subtle at 8% opacity to read as "moving" — bumped
  to 16%, added a second counter-drifting blob in the accent color, and a few slow-floating dust
  particles, so every section now has some life instead of the Hero being the only section that feels
  alive.
- **Theme switching now uses the View Transitions API** (`ThemeProvider.tsx`) — a real cross-fade
  between themes instead of an instant color swap, so it reads as "the whole environment changed" not
  "some CSS variables updated." Falls back to an instant swap in browsers without support (Firefox,
  older Safari) and respects `prefers-reduced-motion`.

**Worth knowing — unused data spotted while I was in there:** `personal.phone`, `personal.portfolioUrl`,
and `certifications.eyebrow`/`heading` are all in the JSON but nothing renders them yet. You mentioned
wanting the certification *count* surfaced (done, in About stats) but not a full Certifications section
— if you want one built (using the `eyebrow`/`heading`/`items` you already wrote), say so and I'll add it.

**Same sandbox limitation as always:** no network access here, so I couldn't run `npm install` or a
live build against your actual `node_modules` — this was reviewed by hand. Since your zip included a
working `node_modules`/`.next` build already, running `npm run dev` locally should be a fast way to
confirm everything above renders as described.
