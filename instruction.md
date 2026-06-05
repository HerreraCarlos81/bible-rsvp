# Bíblia RSVP - Project Instruction Guide

**Version:** June 2026 (i18n, multi-translations, S3 deploy)  
**Tech Stack:** Pure Vanilla HTML5 + CSS3 + JavaScript (No frameworks)  
**Hosting:** AWS S3 static website — `bible-reading.online` via `./deploy.sh`  
**Data Source:** `bible-api.com` (public-domain translations)  
**UI:** English default + Portuguese toggle; light green theme

---

## 1. Project Overview

**Bíblia RSVP** is a speed-reading web application specialized for the Bible. It uses **Rapid Serial Visual Presentation (RSVP)** — flashing words or small chunks of text in the center of the screen at a controlled Words-Per-Minute (WPM) rate.

The goal is to help users read entire Bible **chapters** quickly and with high focus, while still allowing fine-grained control over verses and chapter navigation.

It is designed as a **spiritual tool** that can also generate revenue through Google AdSense (ad container is hidden during active reading).

---

## 2. Main Features

| Feature                        | Status     | Description |
|--------------------------------|------------|-----------|
| Book + Chapter Selection       | ✅         | Full 66 books, dynamic chapter dropdown |
| Bible Versions (Public Domain) | ✅         | KJV, WEB, ASV, BBE, Darby (EN) + Almeida (PT) |
| UI Language (EN / PT)          | ✅         | Flag toggle; book names match selected Bible language |
| Scroll-to-preview on load      | ✅         | After Load Chapter, scrolls to preview + Start button |
| RSVP Reading Mode              | ✅         | Word-by-word or chunk (1-3 words) |
| Verse Navigation               | ✅         | Jump to any verse; starts reading from first word of that verse |
| Chapter Navigation             | ✅         | Previous / Next Chapter buttons + PageUp/PageDown keys (works while reading) |
| Reading History + Streak       | ✅         | Auto-saves last 20 readings + calculates consecutive day streak |
| PWA (Installable App)          | ✅         | Add to home screen, works offline for shell |
| Google AdSense Ready           | ✅         | Ad container visible only when **not** reading |
| Keyboard Shortcuts             | ✅         | Space (pause), Arrows (verse), PageUp/Down (chapter), R (restart), Esc (exit) |
| Settings Persistence           | ✅         | WPM, last book/chapter, chunk size saved in localStorage |
| Responsive Design              | ✅         | Works on desktop and mobile |

---

## 3. Default Configurations

Located in `js/script.js`:

```js
const DEFAULT_WPM = 300;          // Default reading speed (see js/script.js)
let chunkSize = 1;                // Default: 1 word at a time
let punctuationPause = true;      // Extra pause after . , ; ! ?
let font size (reader) = 3.5rem;  // Controlled by slider
```

**History behavior:**
- Keeps maximum **20** entries
- Streak counts consecutive days only

**Ad behavior:**
- Hidden automatically when `rsvp-modal` is open
- Reappears when user exits reading mode

---

## 4. File Structure & Where to Find Things

```
bible-rsvp/
├── index.html              ← Main UI, selectors, preview + Start button, RSVP modal
├── css/styles.css          ← Light green theme
├── js/
│   ├── script.js           ← Core application logic
│   └── i18n.js           ← EN/PT UI strings
├── manifest.json           ← PWA
├── sw.js                   ← Service worker (bump CACHE_NAME on shell changes)
├── deploy.sh               ← S3 deploy script
├── serve.py                ← Local dev server
├── agent.md                ← Agent guide + change log
└── instruction.md          ← This file
```

### Most Important File: `js/script.js`

This is where **95% of the logic** lives. Key sections (approximate line numbers as of June 2026):

| Section                              | Approximate Location       | What it contains |
|--------------------------------------|----------------------------|------------------|
| **State Variables**                  | Top of file (~lines 40-50) | `currentWords`, `currentIndex`, `verses[]`, `wpm`, `chunkSize`, etc. |
| **Books Data**                       | Lines ~43-110              | Full 66-book array with `slug`, `name`, `ptName`, `chapters` |
| **PWA Initialization**               | `initPWA()` function       | Service worker registration + install prompt |
| **History + Streak**                 | `getHistory()`, `saveHistory()`, `updateStreak()`, `renderHistory()` | All localStorage logic |
| **Verse Parsing**                    | `buildVersesFromStructured()`, `parseVerses()` | Uses API `verses[]` array; fallback regex |
| **Core Loading**                     | `loadChapterData()`        | Fetches bible-api.com; PT book names for Almeida |
| **i18n**                             | `js/i18n.js`               | UI language; `scrollToPreview()` after load |
| **RSVP Engine**                      | `startRSVP()` → `showNextWord()` loop | The heart of speed reading |
| **Verse Navigation**                 | `jumpToVerse()`            | Jumps to specific verse and starts from its first word |
| **Chapter Navigation**               | `goToNextChapter()` / `goToPreviousChapter()` | Loads next/previous chapter (even while reading) |
| **UI Setup**                         | `setupRSVPControls()` + `setupVerseNavigation()` | All button event listeners |
| **Keyboard Handling**                | `handleKeyboard()`         | All shortcuts |

---

## 5. Key JavaScript Functions Reference

### Core Reading Functions

| Function                    | Purpose                                                                 | Called From |
|----------------------------|--------------------------------------------------------------------------|-------------|
| `loadChapterData(bookSlug, chapterNum)` | Main function to load any chapter (used by both UI and chapter nav)     | `loadChapter()`, chapter navigation |
| `buildVersesFromStructured()` | Builds `verses[]` and `currentWords[]` from API `data.verses` | `loadChapterData()` |
| `getApiBookName()` / `buildChapterApiUrl()` | Portuguese names + URL encoding for Almeida | `loadChapterData()` |
| `scrollToPreview()`        | Smooth-scroll to preview card after chapter load                        | `loadChapterData()` |
| `startRSVP()`              | Enters full-screen reading mode and starts the timer loop               | Start button below preview |
| `showNextWord()`           | The RSVP engine loop — displays next chunk and schedules next one       | Recursive via `setTimeout` |
| `jumpToVerse(verseNum)`    | Moves `currentIndex` to start of verse. Works while paused or playing   | Verse buttons + arrow keys |
| `goToNextChapter()`        | Loads next chapter (auto-continues reading if active)                   | Button + PageDown |
| `goToPreviousChapter()`    | Loads previous chapter (handles book boundaries)                        | Button + PageUp |
| `updateRSVPUI()`           | Updates progress % and current verse number in the reader               | Inside RSVP loop |

### History & Persistence

- `saveHistory(entry)` — Called automatically after loading any chapter
- `updateStreak()` — Calculates consecutive reading days
- `loadSavedSettings()` / `saveSettings()` — Persists WPM + last selection

### PWA & UI

- `initPWA()` — Registers service worker and handles install prompt
- `closeRSVP()` — Exits reading mode and shows ad container again

---

## 6. How to Improve the App with AI (Recommended Workflow)

When asking an AI (Grok, Claude, Cursor, etc.) to modify the app, give it this file + the specific file you want changed.

### Quick Reference for Common Changes

| What you want to change                     | Go to this file + function                          | Tip |
|---------------------------------------------|-----------------------------------------------------|-----|
| Change colors, layout, or add new UI        | `index.html` + `css/styles.css`                     | Keep Tailwind-free (pure CSS) |
| Modify WPM range, default chunk, etc.       | `js/script.js` → State variables at top             | Very easy |
| Improve verse detection / parsing           | `parseVerses()` and `jumpToVerse()`                 | Most sensitive function |
| Add "Finish chapter → auto next chapter"    | `finishReading()` function                          | Good UX improvement |
| Add more keyboard shortcuts                 | `handleKeyboard()`                                  | Easy |
| Make chapter navigation smarter (book end)  | `goToNextChapter()` / `goToPreviousChapter()`       | Already handles book transitions |
| Add user accounts / cloud sync              | New backend (AWS Lambda + DynamoDB)                 | Future step |
| Switch from API to static S3 JSON files     | Replace `loadChapterData()` + host JSONs in S3      | Highly recommended for production |
| Add real Google AdSense code                | `index.html` → inside `#ad-container`               | Replace the placeholder comment |
| Improve mobile experience                   | `css/styles.css` + responsive rules                 | Already decent |
| Add progress ring or estimated time         | Inside RSVP modal in `index.html` + `updateRSVPUI()`| Nice polish |

---

## 7. Recommended Future Improvements (Prioritized)

1. **Migrate Bible data to S3 + CloudFront** (remove external API dependency)
2. Add "Auto-advance to next chapter" option when one finishes
3. Add verse highlighting in the preview area
4. Allow custom chunk size up to 5 words
5. Add reading statistics (total chapters read, average WPM)
6. Create a Python script to generate static JSON Bible files
7. Add AWS Lambda backend for logged-in users + saved plans

---

## 8. Deployment (AWS S3)

**Bucket:** `bible-reading.online`

```bash
./deploy.sh --dry-run   # preview
./deploy.sh -y          # deploy
```

1. Run `deploy.sh` to sync app assets to S3  
2. (Optional) CloudFront + `BIBLE_RSVP_CLOUDFRONT_ID` for invalidation  
3. Replace AdSense placeholder in `index.html`  
4. Hard-refresh after deploy; bump `CACHE_NAME` in `sw.js` when needed

---

## 9. Keyboard Shortcuts (Current)

| Key              | Action                          |
|------------------|---------------------------------|
| `Space`          | Pause / Resume                  |
| `←` / `→`        | Previous / Next Verse           |
| `Page Up`        | Previous Chapter                |
| `Page Down`      | Next Chapter                    |
| `R`              | Restart current chapter         |
| `Esc`            | Exit reading mode               |
| WPM +/- buttons  | Adjust WPM (in RSVP modal)      |

---

**This file is your single source of truth** when working with AI assistants.

When requesting changes, start your prompt with:
> "Using the instruction.md file I provided, please modify [specific function or feature]..."

This will help any AI understand the architecture quickly and make precise, safe edits.

---

*Built with ❤️ for deeper engagement with the Word.*  
*Project maintained by Carlos Herrera (@CodedNeurons)*

---

**End of instruction.md**