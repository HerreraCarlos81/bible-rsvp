# Agent Guide & Change Tracker — Bíblia RSVP

**Purpose:** This file is the working guide for AI agents (and humans) on the `bible-rsvp` project. It summarizes architecture, conventions, and sensitive areas. The **Change Log** at the bottom records every modification with date and time (UTC).

**Companion docs:**
- `instruction.md` — detailed feature spec and AI workflow (user-provided, not always in git)
- `README.md` — deployment and API scalability notes

**Repository:** https://github.com/HerreraCarlos81/bible-rsvp  
**Maintainer:** Carlos Herrera (@CodedNeurons)

---

## Quick Start for Agents

1. Read this file and the **Change Log** (latest entries first).
2. For feature context, also read `instruction.md` if present.
3. **95% of logic** lives in `js/script.js` — read surrounding code before editing.
4. **No frameworks** — vanilla HTML/CSS/JS only. Do not add npm, React, Tailwind, etc., unless explicitly requested.
5. After any code change, append a new row to the **Change Log** with UTC timestamp, files touched, and a short description.
6. Prefer minimal, focused diffs; match existing naming and Portuguese UI strings.

---

## Project Snapshot

| Item | Value |
|------|--------|
| **Last audited** | 2026-06-04 19:32:57 UTC |
| **Stack** | HTML5, CSS3, vanilla JavaScript |
| **Bible API** | `https://bible-api.com/` (rate-limited; see constraints) |
| **Versions** | KJV (English), Almeida (Portuguese) |
| **Hosting target** | AWS S3 + CloudFront |
| **PWA** | `manifest.json` + `sw.js` (cache v1) |

### Line counts (as of last audit)

| File | Lines |
|------|------:|
| `js/script.js` | 813 |
| `css/styles.css` | 383 |
| `index.html` | 215 |
| `sw.js` | ~46 |
| `manifest.json` | 22 |

---

## What This App Does

**Bíblia RSVP** is a Bible speed-reading web app using **Rapid Serial Visual Presentation (RSVP)** — words or small chunks flash in the center at a configurable WPM rate. Users select book/chapter, preview text, then enter fullscreen RSVP mode with verse and chapter navigation, history, and streak tracking.

---

## File Map

```
bible-rsvp/
├── index.html          # UI: selectors, preview, settings, RSVP modal, ad placeholder
├── css/styles.css      # Dark theme, gold accents, responsive layout
├── js/script.js        # All application logic (primary edit target)
├── manifest.json       # PWA metadata (standalone, theme #0f172a)
├── sw.js               # Service worker — caches shell assets (not API responses)
├── instruction.md      # Extended project instruction (may be untracked)
├── README.md           # Deploy + API migration notes
├── LICENSE
└── agent.md            # This file
```

---

## Architecture

```mermaid
flowchart LR
    UI[index.html] --> JS[script.js]
    JS --> API[bible-api.com]
    JS --> LS[(localStorage)]
    JS --> SW[sw.js cache]
    CSS[styles.css] --> UI
```

### Data flow (chapter load)

1. User selects version, book, chapter → `loadChapter()` → `loadChapterData(slug, num)`
2. `fetch` to `BIBLE_API` + book path + chapter
3. `parseVerses(rawText)` builds `verses[]` with word indices
4. `currentWords[]` flattened for RSVP loop
5. `saveHistory()` + UI preview update

### RSVP loop

`startRSVP()` → `showNextWord()` (recursive `setTimeout`) → `updateRSVPUI()` → on end `finishReading()`

---

## `js/script.js` — Section Guide

| Lines (approx) | Topic |
|----------------|--------|
| 1–72 | `BIBLE_API`, `books[]` (66 books, slug/name/ptName/chapters) |
| 74–83 | State: `currentWords`, `currentIndex`, `wpm`, `chunkSize`, `verses`, etc. |
| 85–108 | DOM element references |
| 110–141 | PWA: `initPWA()`, install prompt |
| 143–220 | History & streak: `getHistory`, `saveHistory`, `updateStreak`, `renderHistory`, `clearHistory` |
| 222–300 | Verse parsing & RSVP UI: `parseVerses`, `getCurrentVerse`, `jumpToVerse`, `updateRSVPUI` |
| 302–394 | `init()`, book/chapter dropdowns |
| 395–488 | Loading: `loadChapterData`, `loadChapter`, `loadSample` |
| 489–584 | RSVP engine: `startRSVP`, `showNextWord`, `togglePause`, `finishReading`, `closeRSVP` |
| 585–662 | Chapter nav: `goToNextChapter`, `goToPreviousChapter` |
| 663–772 | Controls & keyboard: `setupVerseNavigation`, `setupRSVPControls`, `handleKeyboard` |
| 774–813 | Settings persistence, init calls, `window.BibliaRSVP` debug export |

### Function index (verified line numbers)

| Function | Line | Role |
|----------|-----:|------|
| `initPWA` | 113 | Register SW, install button |
| `getHistory` / `saveHistory` | 143 / 147 | Reading history (max 20) |
| `updateStreak` | 161 | Consecutive-day streak |
| `parseVerses` | 222 | API text → `verses[]` — **sensitive** |
| `jumpToVerse` | 274 | Seek to verse start index |
| `loadChapterData` | 395 | Main API fetch + state prep |
| `startRSVP` / `showNextWord` | 489 / 514 | RSVP engine |
| `goToNextChapter` / `goToPreviousChapter` | 585 / 624 | Cross-chapter (incl. book boundaries) |
| `handleKeyboard` | 735 | All RSVP shortcuts |
| `saveSettings` / `loadSavedSettings` | 774 / 785 | User prefs |

---

## Defaults & Configuration

```js
// js/script.js state (lines 79-81)
wpm = 350;
chunkSize = 1;
punctuationPause = true;
```

| Setting | UI / range |
|---------|------------|
| WPM slider | 100–1200, step 10 (`#wpm-slider`) |
| Chunk buttons | 1, 2, 3 words |
| Font slider | 2–6 rem, step 0.2 |
| History cap | 20 entries |
| History display | Last 5 in UI |

---

## localStorage Keys

| Key | Contents |
|-----|----------|
| `biblia-rsvp-history` | Array of reading entries |
| `biblia-rsvp-settings` | `{ version, book, chapter, wpm, chunkSize }` |

---

## Keyboard Shortcuts (RSVP modal only)

| Key | Action |
|-----|--------|
| Space | Pause / resume |
| ← / → | Previous / next verse |
| Page Up / Page Down | Previous / next chapter |
| R | Restart chapter |
| Esc | Exit RSVP (shows ads again) |

**In-modal only (not keyboard):** WPM ±50 via `#speed-up` / `#speed-down`; chunk 1–5 via `#chunk-up` / `#chunk-down` (`setupRSVPControls`, lines 691–713). Note: `instruction.md` mentions Arrow Up/Down for WPM, but `handleKeyboard` does not implement them yet.

---

## Important DOM IDs

**Main:** `#version`, `#book`, `#chapter`, `#load-btn`, `#preview-card`, `#settings-card`, `#start-btn`, `#history-card`, `#ad-container`

**RSVP modal:** `#rsvp-modal`, `#rsvp-word`, `#pause-btn`, `#close-rsvp`, `#prev-verse-btn`, `#next-verse-btn`, `#prev-chapter-btn`, `#next-chapter-btn`

---

## External API Constraints

- **Limit:** ~15 requests per 30 seconds per IP (per README / bible-api.com)
- **Not for bulk download** — production should migrate to static JSON on S3/CloudFront
- **URL pattern:** `BIBLE_API` + book slug + chapter (see `loadChapterData`)

---

## Agent Editing Rules

| Task | Where to edit |
|------|----------------|
| Colors, layout, new UI | `index.html`, `css/styles.css` |
| WPM defaults, chunk logic, RSVP timing | `js/script.js` — state + `showNextWord` |
| Verse boundaries | `parseVerses`, `jumpToVerse` — test edge cases |
| Chapter boundaries | `goToNextChapter`, `goToPreviousChapter` |
| New shortcuts | `handleKeyboard` |
| AdSense | `index.html` → `#ad-container` placeholder |
| Offline / cache bump | `sw.js` — increment `CACHE_NAME` when shell assets change |
| PWA metadata | `manifest.json` |

**Do not:**
- Break pure-vanilla constraint without approval
- Cache-bust SW without updating `CACHE_NAME`
- Remove `window.BibliaRSVP` debug export without reason
- Forget to hide `#ad-container` when RSVP opens (`closeRSVP` / `startRSVP` pattern)

---

## Deployment Checklist

1. Upload all static files to S3
2. CloudFront + OAC, HTTPS
3. Replace AdSense placeholder in `index.html`
4. Plan migration from `bible-api.com` to static JSON on same origin
5. Invalidate CloudFront after updates

---

## Backlog (from instruction.md / README)

1. Migrate Bible text to S3 static JSON
2. Auto-advance to next chapter on finish (optional setting)
3. Verse highlighting in preview
4. Chunk size up to 5 words
5. Reading statistics (total chapters, avg WPM)
6. Python script to generate/upload JSON Bible files
7. Optional AWS Lambda + DynamoDB for accounts (future)

---

## Change Log

All times are **UTC**. Newest entries first. Every agent session that changes code **must** add an entry.

| Date | Time (UTC) | Author | Files | Summary |
|------|------------|--------|-------|---------|
| 2026-06-04 | 19:42:09 | Agent (Grok) | `README.md` | Rewrote for repo visitors and supporters: what the app is, features, how to try, support section; moved dev/deploy/API details to brief pointer to `agent.md`. |
| 2026-06-04 | 19:35:00 | Agent (Grok) | `agent.md` | Clarified WPM/chunk controls: in-modal buttons only; noted `instruction.md` vs `handleKeyboard` mismatch on Arrow Up/Down. |
| 2026-06-04 | 19:32:57 | Agent (Grok) | `agent.md` | **Created** this guide after full project study: architecture map, verified `script.js` line index, localStorage keys, agent rules, and initial change log. No application code modified. |

---

### Change Log Entry Template

Copy and prepend a new row for each change:

```markdown
| YYYY-MM-DD | HH:MM:SS | Agent (name) | `file1`, `file2` | Short description of what changed and why |
```

**Example:**

```markdown
| 2026-06-05 | 14:00:00 | Agent (Grok) | `js/script.js` | Added auto-advance to next chapter in `finishReading()` behind a settings flag |
```

---

*Last updated: 2026-06-04 19:42:09 UTC*