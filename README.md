# Lombok Explorer

Phase 1 of the Lombok tour-guide app, built from `lombok-tour-app-codex-spec.md` and `UI_web_app.png`. React, Vite, JavaScript, React Router and reusable CSS. No backend, database, payment account or environment variables are needed.

## Run locally

Requires Node.js 22.12+ (validated with Node.js 24).

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://localhost:5173. On shells without PowerShell execution-policy restrictions, `npm` works in place of `npm.cmd`.

```powershell
npm.cmd run build
npm.cmd run preview
```

Production preview: http://localhost:4173. Restricted Windows environments may prevent the development dependency optimizer from reading parent directories; use the production build and preview in that environment. The build uses Vite's runner config loader to avoid config-bundling directory access.

## Included

- Responsive homepage with carousel (arrows, pagination, pause, swipe and reduced-motion support), floating search, tour cards, destination cards, six travel values, guide-story placeholder, clearly marked sample reviews, adventure CTA and footer.
- Tour listing with destination, activity, difficulty, duration and price filters persisted in URL parameters. Preferred dates carry into the listing; availability is deferred.
- Tour details with facts, sample inclusions, highlights, itinerary, packing list, meeting-point placeholder and mobile enquiry CTA.
- Destination listing and details, related tours and empty states.
- About, reviews, contact, policy placeholders, photo credits and not-found pages.
- Local asynchronous catalog service and loading/error/retry pattern for later API integration.
- Local image assets, accessible controls, semantic navigation and visible keyboard focus.

## Project structure

```text
frontend/
  public/images/        Local landscape placeholders
  src/components/      Reusable common, layout, home, tour, destination and review UI
  src/data/demo.js     Four sample tours, six destinations and sample reviews
  src/hooks/useData.js Async loading, error, retry and stale-request protection
  src/pages/           Public route screens
  src/services/        Local catalog adapters for later API integration
  src/App.jsx          Route configuration and page titles
  src/styles.css       Shared design system and responsive styles
  tests/               Desktop/mobile browser checks and screenshot utility
```

## Browser checks

Tests run against the production preview. Build first:

```powershell
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd test
```

Alternatively use an existing Chrome installation without downloading a browser:

```powershell
$env:PLAYWRIGHT_CHANNEL='chrome'
npm.cmd test
```

To test a preview that is already running (also avoids process-cleanup restrictions in a managed Windows sandbox), set `$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:4174'` to its URL before running the tests.

Coverage: homepage rendering, local images, carousel, URL filters and reset, empty results, tour and destination routing, unknown slugs, enquiry navigation, mobile menu, and desktop/mobile horizontal overflow. Booking form validation belongs to Phase 3; this preview has no booking form.

## Assumptions and next steps

- `Lombok Explorer` is the placeholder business name from the reference.
- Prices, itineraries, capacities and ratings are demo content. Reviews are explicitly illustrative; public review adapters filter for approval.
- Most photographs are illustrative placeholders, not photographs of the named destination. Image credits and licenses are documented in [IMAGE_CREDITS.md](IMAGE_CREDITS.md).
- The guide's actual name, photo, biography, credentials, business contact details and approved policies must be supplied. No phone numbers, credentials or policies have been invented.
- Booking CTAs currently lead to tour discovery or an honest contact placeholder. No booking, payment or customer submission is made.
- Google Fonts enhances typography when reachable; system fonts provide a fallback.
- Review this phase before starting Phase 2: Express/MongoDB models, controllers, seed script and API connection. Booking, authentication, admin tools and integrations remain later phases as specified.
- Configure the eventual static host to rewrite public application routes to `index.html`. Add the real site origin, Open Graph data and sitemap when deployment details are known.

The original specification and UI reference are preserved unchanged.
