# Online JSON Viewer

A React app inspired by [jsonviewer.stack.hu](https://jsonviewer.stack.hu/) — paste, validate, beautify, and explore JSON in your browser.

## Features

- **JSON input** — paste or type JSON in the editor
- **Tree view** — expandable objects and arrays with type badges
- **Load JSON file** — import `.json` files from disk
- **Format / remove whitespace** — beautify or minify valid JSON
- **Copy** — copy the current JSON to clipboard
- **Validation** — clear parse error messages
- **Stats** — size, key count, array count, and nesting depth
- **Client-side only** — no server storage; data stays in the browser
- **Google Analytics ready** — GA4 page tracking via environment variable
- **Google AdSense ready** — non-intrusive ad placements built in

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

Analytics loads only when a valid measurement ID is set. IP anonymization is enabled. JSON input is never sent to Google Analytics.

## Google AdSense setup

Ad slots are placed to avoid interrupting the JSON workflow:

| Placement | Where | When visible |
|---|---|---|
| Header | Below the page title | All screen sizes |
| Sidebar | Right rail, sticky | Desktop only (≥1180px) |
| Footer | Below the editor | All screen sizes |

**Not used:** pop-ups, interstitials, or ads between the input and viewer.

### 1. Create ad units in AdSense

In [Google AdSense](https://adsense.google.com), create:

- One **display** unit for the header (horizontal / responsive)
- One **display** unit for the sidebar (vertical / skyscraper)
- One **display** unit for the footer (horizontal / responsive)

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_SLOT_HEADER=0000000002
VITE_ADSENSE_SLOT_SIDEBAR=0000000000
VITE_ADSENSE_SLOT_FOOTER=0000000001
```

Restart the dev server after changing `.env`.

### 3. Update `public/ads.txt`

Replace the placeholder publisher ID in `public/ads.txt` with your real AdSense publisher ID before deploying.

### 4. Privacy policy

Add a privacy policy page on your live domain that mentions:

- Google Analytics usage data collection
- Google AdSense and third-party cookies
- Links to [Google's privacy policy](https://policies.google.com/privacy) and [ad policy](https://policies.google.com/technologies/ads)

The in-app footer includes a short disclosure; a full privacy policy URL is required for AdSense approval.

## Build

```bash
npm run build
npm run preview
```

## Tech stack

- React 19
- TypeScript
- Vite
