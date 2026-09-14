# Timeon — Digital Clock

A minimal, premium, distraction-free digital clock with world timezone support, inspired by the Fliqlo screensaver aesthetic.

## Features

- Large, elegant flip-card digital clock display
- 150+ country/timezone selection via dropdown
- Light/dark mode toggle with persistent preference
- Real-time clock updates with zero external API requests
- Responsive design for desktop, tablet, and mobile

## Architecture

- **Frontend**: React (Create React App)
- **Timezone data**: The browser's native `Intl.DateTimeFormat` API with IANA timezone identifiers (e.g., `Asia/Karachi`, `Europe/London`, `America/New_York`). These identifiers come from the TZ database maintained by TZInfo.org. No external API calls are made — the clock runs entirely client-side.

### Why no external API?

The previous implementation used IPGeolocation, which imposed daily rate limits. The browser's `Intl.DateTimeFormat` API natively supports all IANA timezone identifiers, making external API calls unnecessary. This means:

- No rate limits
- No API keys to manage
- No network latency
- No server-side proxy required
- The clock works offline once loaded

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

### Production Build

```bash
npm run build
```

## Environment Variables

The following are defined in `.env` for future extensibility but are not required for the clock to function:

- `TZINFO_API_URL` — TZInfo.org base URL (not actively called)
- `TZINFO_API_KEY` — Empty; no key required for the current implementation

No API credentials are needed. The `.env` file is gitignored and will not be committed.

## Tech Stack

- React 18
- Intl.DateTimeFormat (native browser timezone API)
- IANA Time Zone Database (TZInfo.org)
- Lucide React (icons)

---

Developed by Talha Rahman
