# Timeon — Digital Clock

A minimal, premium, distraction-free digital clock with world timezone support, inspired by the Fliqlo screensaver aesthetic.

## Features

- Large, elegant flip-card digital clock display
- 150+ country/timezone selection via dropdown
- Light/dark mode toggle with persistent preference
- Real-time clock updates with minimal API usage
- Responsive design for desktop, tablet, and mobile
- Secure server-side API proxy via Supabase Edge Functions

## Architecture

- **Frontend**: React (Create React App)
- **Backend**: Supabase Edge Function proxies IPGeolocation API calls, keeping the API key server-side
- **Clock ticking**: The API is called only when the user changes the country. The clock then ticks locally using the timezone offset, avoiding repeated API requests.

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

The following are pre-configured in the hosted environment:

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous key (used for edge function auth)
- `IPGEOLOCATION_API_KEY` — IPGeolocation API key (server-side only, configured as an Edge Function secret)

The IPGeolocation API key is NEVER exposed in client-side code. It is stored as a Supabase Edge Function secret and accessed only server-side.

## Tech Stack

- React 18
- Supabase (Edge Functions)
- IPGeolocation Timezone API
- Lucide React (icons)

---

Developed by Talha Rahman
