# Online JSON Viewer

A React app for pasting, validating, beautifying, and exploring JSON in the browser. The site is structured to meet [Google AdSense](https://support.google.com/adsense/answer/48182) and [Google Publisher Policies](https://support.google.com/adsense/answer/10502938): crawlable content, legal pages, labeled ads, and no ads in the navigation.

Live site: [https://www.jsonviwer.in](https://www.jsonviwer.in)

## Features

- **JSON input** — paste or type JSON in the editor
- **Tree view** — expandable objects and arrays with type badges
- **Load JSON file** — import `.json` files from disk
- **Format / remove whitespace** — beautify or minify valid JSON
- **Copy** — copy the current JSON to clipboard
- **Validation** — clear parse error messages
- **Stats** — size, key count, array count, and nesting depth
- **Guides** — original pages on JSON syntax, formatting, validation, and JSON vs XML
- **Client-side only** — no server storage; data stays in the browser
- **Google Analytics ready** — GA4 page tracking after cookie consent
- **Google AdSense ready** — labeled display ads on content pages only

## Getting started

```bash
cd json-viewer
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Google Analytics setup

1. Create a **GA4** property in [Google Analytics](https://analytics.google.com).
2. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`).
3. Add it to `.env`:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. Restart the dev server.

Analytics loads only after the visitor accepts cookies. IP anonymization is enabled. JSON input is never sent to Google Analytics.

## Google AdSense setup

Ads are kept out of the header navigation and are labeled **Advertisement**. Legal pages (Privacy, Terms, Contact, About) do not show ads.

| Placement | Where | When visible |
|---|---|---|
| In-content (`header` slot) | After the first section of a guide, or in the homepage article | Content pages |
| Sidebar | Right rail, sticky | Desktop only (≥1180px), homepage |
| Footer | Below article content | Content pages |

**Not used:** pop-ups, interstitials, ads in the nav bar, or language that asks people to click ads.

### 1. Create ad units in AdSense

In [Google AdSense](https://adsense.google.com), create:

- One **display** unit for in-content / header (horizontal / responsive)
- One **display** unit for the sidebar (vertical / skyscraper)
- One **display** unit for the footer (horizontal / responsive)

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADSENSE_CLIENT_ID=ca-pub-4917107447013453
VITE_ADSENSE_SLOT_HEADER=0000000002
VITE_ADSENSE_SLOT_SIDEBAR=0000000000
VITE_ADSENSE_SLOT_FOOTER=0000000001
```

Restart the dev server after changing `.env`. If slot IDs are missing, ad units are hidden so the site does not look unfinished.

### 3. Confirm `public/ads.txt`

`public/ads.txt` must list your AdSense publisher ID as an authorized seller.

### 4. Required pages for AdSense review

These URLs must stay live and linked from the header or footer:

- `/privacy` — cookies, AdSense, Analytics, Google partner disclosures
- `/terms` — acceptable use and advertising rules
- `/about` — who runs the site
- `/contact` — a public contact address
- `/guides` — original educational content

Update `src/config/site.ts` if the public contact email changes.

## Build

```bash
npm run build
npm run preview
```

The build copies `index.html` to `404.html` so GitHub Pages can open `/privacy` and other routes.

## Tech stack

- React 19
- TypeScript
- Vite
