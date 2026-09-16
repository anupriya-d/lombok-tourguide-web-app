# Lombok Tour Guide Web App --- Codex Build Specification

## 1. Project Goal

Build a modern, responsive full-stack web application for a small local
tour-guide business in **Lombok, Indonesia**.

The website should be highly visual and inspire travellers to explore
Lombok while also providing a simple tour booking workflow.

Primary customer journey:

**Discover destination → Explore tours → View tour details → Select date
and guests → Book → Receive confirmation → Leave review**

The first release should be a responsive **web application**, not a
native mobile app.

------------------------------------------------------------------------

## 2. Technology Stack

### Frontend

-   React
-   Vite
-   JavaScript (use TypeScript only if the existing project is already
    TypeScript)
-   React Router
-   CSS Modules, Tailwind CSS, or clean reusable CSS
-   Fetch API or Axios

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   REST API

### Later integrations

-   Cloudinary for images
-   Stripe or another suitable payment provider
-   Transactional email provider
-   WhatsApp contact links

Keep frontend and backend separated.

``` text
React Frontend
      |
      | REST / JSON
      v
Node.js + Express API
      |
      v
MongoDB
```

------------------------------------------------------------------------

## 3. Design Direction

Create a premium modern adventure-tourism design.

Visual direction: - Large Lombok landscape photography - Clean white
backgrounds - Dark navy text - Emerald/teal green accent colour - Large
rounded cards - Subtle shadows - Generous spacing - Modern sans-serif
typography - Mobile-first responsive layout - Strong call-to-action
buttons - Smooth but restrained animations

The website should feel local, trustworthy, adventurous, friendly, and
professional.

Do not make it look like a generic corporate website.

------------------------------------------------------------------------

## 4. Main Navigation

Desktop navigation:

-   Logo / business name
-   Home
-   Destinations
-   Tours
-   About
-   Reviews
-   Contact
-   Search icon (optional)
-   Currency display: IDR
-   **Book Now** button

Mobile: - Logo - Hamburger menu - Persistent or easy-to-find booking CTA

------------------------------------------------------------------------

## 5. Homepage

Build the homepage from reusable React components.

Suggested component tree:

``` jsx
<Home>
  <Navbar />
  <HeroCarousel />
  <TourSearch />
  <PopularTours />
  <DestinationSection />
  <WhyChooseUs />
  <GuideSection />
  <ReviewSection />
  <AdventureCTA />
  <Footer />
</Home>
```

### 5.1 Hero Carousel

Full-width visual carousel.

Example slides: 1. Mount Rinjani 2. Gili Islands 3. Lombok waterfalls 4.
South Lombok / beaches

Example hero content:

**Discover the Real Lombok**

> From majestic mountains to stunning beaches, hidden waterfalls and
> authentic local culture.

Buttons: - Explore Tours - Watch Video (optional)

Include: - Previous/next controls - Pagination indicators - Dark overlay
for text readability - Responsive images - Smooth transitions

------------------------------------------------------------------------

## 6. Tour Search

Place a floating search panel around the bottom of the hero.

Fields: - Destination - Date - Activity - Search Tours button

Example:

``` text
Where to?       When?          Activity
All Destinations Select Date   All Activities

                  [ Search Tours ]
```

Search should eventually route to `/tours` with filters/query
parameters.

------------------------------------------------------------------------

## 7. Popular Tours

Display 3--4 cards on desktop and a responsive layout/carousel on
mobile.

Example tours: - Mount Rinjani Trekking - Gili Islands Day Trip - Tiu
Kelep & Sendang Gile - South Lombok Tour

`TourCard` should support: - Image - Badge - Tour name - Duration -
Difficulty - Rating - Review count - Starting price - Currency - View
Details button

Example:

``` text
Mount Rinjani Trekking
2–4 Days • Challenging
★ 4.9 (320 reviews)

From IDR 2,500,000

[ View Details ]
```

Clicking a card should navigate to a tour detail page.

------------------------------------------------------------------------

## 8. Destinations

Create reusable `DestinationCard` components.

Initial sample destinations: - Mount Rinjani - Gili Islands - Senaru -
Kuta Lombok - Sasak Villages - Pink Beach

Each card: - Large image - Destination name - Short activity/category
description - Image overlay - Link to destination page

Routes:

``` text
/destinations
/destinations/:slug
```

------------------------------------------------------------------------

## 9. Why Travel With Us

Create six simple trust/value cards:

-   Local Experts
-   Small Groups
-   Safe & Reliable
-   Best Price
-   Flexible Booking
-   Meaningful Travel

Use simple icons and concise descriptions.

------------------------------------------------------------------------

## 10. Guide Section

This is important because this is a small local-guide business.

Show: - Guide photo - Guide name - Short story - Years of experience -
Local knowledge - Languages - Safety/experience credentials if
supplied - Support-local message

CTA: - Our Story

Do not invent real credentials. Use placeholder content until business
information is supplied.

------------------------------------------------------------------------

## 11. Reviews

Create `ReviewCard`.

Fields: - Customer name - Country - Rating - Review - Optional customer
image - Tour - Date

Homepage should show 3 featured reviews.

Full route:

``` text
/reviews
```

Only approved reviews should be publicly displayed.

------------------------------------------------------------------------

## 12. Final Homepage CTA

Use a large Lombok beach/island background.

Example:

**Ready for Your Lombok Adventure?**

Buttons: - Book Your Tour - Chat on WhatsApp

------------------------------------------------------------------------

## 13. Footer

Include: - Logo/business name - Short tagline - Navigation - Contact
information - Social links - WhatsApp - Privacy Policy - Terms -
Cancellation Policy - Responsible Travel - Copyright

------------------------------------------------------------------------

# 14. Pages

Implement these routes:

``` text
/
/tours
/tours/:slug
/destinations
/destinations/:slug
/booking/:tourId
/booking/success
/about
/reviews
/contact

/admin/login
/admin
/admin/tours
/admin/destinations
/admin/bookings
/admin/reviews
```

------------------------------------------------------------------------

# 15. Tours Page

Display all active tours.

Filters: - Destination - Activity - Difficulty - Duration - Price
range - Date (later)

Support URL query parameters where practical.

Example:

``` text
/tours?destination=rinjani&activity=hiking
```

Include: - Results count - Filter controls - Responsive tour grid -
Empty state - Loading state - Error state

------------------------------------------------------------------------

# 16. Tour Details Page

This is a primary conversion page.

Include:

### Header

-   Tour name
-   Destination
-   Rating
-   Review count

### Gallery

-   Main image
-   Additional images
-   Lightbox/gallery experience if practical

### Quick facts

-   Duration
-   Difficulty
-   Maximum guests
-   Price
-   Activity type

### Description

### Highlights

### What's included

### What's not included

### What to bring

### Itinerary

### Meeting point

### Availability

### Reviews

### Booking CTA

On mobile, use a sticky bottom CTA similar to:

``` text
From IDR 2,500,000       [ BOOK NOW ]
```

------------------------------------------------------------------------

# 17. Booking Workflow

Initial booking flow:

``` text
Tour
  ↓
Select Date
  ↓
Select Guests
  ↓
Customer Details
  ↓
Review Booking
  ↓
Create Booking
  ↓
Confirmation
```

Fields: - Tour - Date - Adults - Children - Customer name - Email -
Phone - Country - Optional message/request

Potential later fields: - Pickup location - Dietary requirements -
Emergency contact

Do not collect unnecessary sensitive information.

------------------------------------------------------------------------

# 18. Booking Business Logic

Backend must: 1. Validate tour exists. 2. Verify tour is active. 3.
Validate requested date. 4. Check remaining capacity. 5. Calculate price
on the server. 6. Never trust a price submitted by React. 7. Create
booking. 8. Generate booking reference. 9. Return booking confirmation.

Possible statuses:

``` text
pending
confirmed
completed
cancelled
refunded
```

Payment statuses:

``` text
unpaid
pending
paid
refunded
failed
```

For MVP, payment can remain `unpaid` and be integrated later.

------------------------------------------------------------------------

# 19. MongoDB Models

## Tour

Suggested fields:

``` js
{
  name,
  slug,
  shortDescription,
  description,
  destination,
  activities: [],
  duration,
  difficulty,
  price,
  childPrice,
  currency: "IDR",
  maxGuests,
  images: [],
  highlights: [],
  included: [],
  excluded: [],
  whatToBring: [],
  itinerary: [],
  meetingPoint,
  featured,
  active,
  createdAt,
  updatedAt
}
```

------------------------------------------------------------------------

## Destination

``` js
{
  name,
  slug,
  shortDescription,
  description,
  heroImage,
  images: [],
  active,
  createdAt,
  updatedAt
}
```

------------------------------------------------------------------------

## Booking

``` js
{
  bookingReference,
  tour,
  tourDate,

  customer: {
    name,
    email,
    phone,
    country
  },

  adults,
  children,

  totalGuests,
  totalPrice,
  currency,

  status,
  paymentStatus,

  customerMessage,

  createdAt,
  updatedAt
}
```

------------------------------------------------------------------------

## Review

``` js
{
  tour,
  customerName,
  country,
  rating,
  comment,
  approved,
  featured,
  createdAt
}
```

------------------------------------------------------------------------

## User

For admin authentication:

``` js
{
  name,
  email,
  passwordHash,
  role,
  createdAt
}
```

Never store plaintext passwords.

------------------------------------------------------------------------

# 20. REST API

Base:

``` text
/api
```

## Tours

``` http
GET    /api/tours
GET    /api/tours/:id
GET    /api/tours/slug/:slug

POST   /api/tours
PUT    /api/tours/:id
DELETE /api/tours/:id
```

POST/PUT/DELETE must be admin protected.

Support filters where practical:

``` http
GET /api/tours?destination=rinjani
GET /api/tours?activity=hiking
GET /api/tours?featured=true
```

------------------------------------------------------------------------

## Destinations

``` http
GET    /api/destinations
GET    /api/destinations/:slug

POST   /api/destinations
PUT    /api/destinations/:id
DELETE /api/destinations/:id
```

Writes are admin only.

------------------------------------------------------------------------

## Bookings

``` http
POST /api/bookings
GET  /api/bookings/:id
GET  /api/bookings
PUT  /api/bookings/:id
```

`POST /api/bookings` is public.

Listing/updating all bookings is admin only.

Example request:

``` json
{
  "tourId": "TOUR_ID",
  "date": "2026-10-20",
  "adults": 2,
  "children": 0,
  "customer": {
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+61400000000",
    "country": "Australia"
  }
}
```

------------------------------------------------------------------------

## Reviews

``` http
GET  /api/reviews
GET  /api/tours/:tourId/reviews
POST /api/reviews
```

Public GET should return approved reviews only.

Admin should be able to approve/hide reviews.

------------------------------------------------------------------------

## Authentication

``` http
POST /api/auth/login
GET  /api/auth/me
```

Use secure authentication appropriate for the deployment.

Admin routes must be protected with middleware.

------------------------------------------------------------------------

# 21. Backend Structure

Use a clear MVC-style structure:

``` text
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── bookingController.js
│   ├── destinationController.js
│   ├── reviewController.js
│   └── tourController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── notFound.js
├── models/
│   ├── Booking.js
│   ├── Destination.js
│   ├── Review.js
│   ├── Tour.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── destinationRoutes.js
│   ├── reviewRoutes.js
│   └── tourRoutes.js
├── utils/
├── server.js
└── .env.example
```

Use controllers for business logic. Do not put all application logic
directly inside route files.

------------------------------------------------------------------------

# 22. Frontend Structure

``` text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── destination/
│   │   ├── layout/
│   │   ├── review/
│   │   └── tour/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Tours.jsx
│   │   ├── TourDetails.jsx
│   │   ├── Destinations.jsx
│   │   ├── DestinationDetails.jsx
│   │   ├── Booking.jsx
│   │   ├── BookingSuccess.jsx
│   │   ├── About.jsx
│   │   ├── Reviews.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── bookingApi.js
│   │   ├── destinationApi.js
│   │   ├── reviewApi.js
│   │   └── tourApi.js
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
└── .env.example
```

Do not put the entire homepage in `App.jsx`.

------------------------------------------------------------------------

# 23. API Service Layer

Do not scatter raw API calls across components.

Example:

``` js
// services/tourApi.js

export async function getTours() {
  const response = await fetch(`${API_URL}/tours`);

  if (!response.ok) {
    throw new Error("Failed to load tours");
  }

  return response.json();
}
```

Components/pages should call service functions.

------------------------------------------------------------------------

# 24. Admin Dashboard

Admin should be able to manage the business without editing code.

Dashboard:

``` text
Dashboard
├── Tours
├── Destinations
├── Bookings
├── Reviews
└── Settings
```

### Tours

-   Create
-   Edit
-   Activate/deactivate
-   Set price
-   Set max guests
-   Manage images
-   Mark featured

### Destinations

-   Create
-   Edit
-   Manage images
-   Activate/deactivate

### Bookings

-   View upcoming bookings
-   View customer details
-   Change booking status
-   Cancel booking
-   Mark completed
-   View payment status

### Reviews

-   View
-   Approve
-   Hide
-   Mark featured

------------------------------------------------------------------------

# 25. Images

Do not store image binaries in MongoDB.

Store URLs:

``` js
images: [
  "https://example.com/rinjani-1.jpg",
  "https://example.com/rinjani-2.jpg"
]
```

During early development, use local placeholder images.

Later integrate Cloudinary or equivalent.

All important images must have useful `alt` text.

Use lazy loading where appropriate.

------------------------------------------------------------------------

# 26. Responsive Requirements

Must work well on: - Mobile phones - Tablets - Laptops - Desktop
monitors

Prioritize mobile.

Requirements: - Responsive navigation - Responsive hero - Touch-friendly
carousel - Cards stack correctly - No horizontal overflow - Readable
font sizes - Large tap targets - Booking CTA easy to access

------------------------------------------------------------------------

# 27. Accessibility

Implement sensible accessibility: - Semantic HTML - Keyboard-accessible
navigation - Visible focus states - Proper labels - Image alt text -
Buttons should be actual buttons - Sufficient contrast - Carousel
controls accessible by keyboard - Avoid text embedded into images

------------------------------------------------------------------------

# 28. Security

Backend: - Environment variables for secrets - Never commit `.env` -
Validate and sanitize input - Server-side booking price calculation -
Authentication for admin endpoints - Hash passwords - Proper CORS
configuration - Centralized error handling - Avoid exposing stack traces
in production - Add rate limiting to sensitive endpoints where
appropriate

------------------------------------------------------------------------

# 29. UX States

Every data-driven screen should account for: - Loading - Error - Empty
state - Success

Do not leave blank pages while API calls are running.

Forms should show useful validation messages.

------------------------------------------------------------------------

# 30. Seed Data

Create a development seed script.

Use clearly labelled demo content for: - Mount Rinjani Trekking - Gili
Islands Day Trip - Tiu Kelep & Sendang Gile - South Lombok Tour

Destinations: - Mount Rinjani - Gili Islands - Senaru - Kuta Lombok -
Sasak Villages - Pink Beach

Do not present fabricated reviews or credentials as genuine customer
information. Demo reviews must clearly be seed/demo data.

------------------------------------------------------------------------

# 31. Environment Variables

Frontend example:

``` env
VITE_API_URL=http://localhost:5000/api
```

Backend example:

``` env
PORT=5000
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=http://localhost:5173
```

Provide `.env.example` files, never real secrets.

------------------------------------------------------------------------

# 32. Development Phases

## Phase 1 --- Frontend UI

First build: - Navbar - Hero carousel - Search - Popular tours -
Destinations - Why choose us - Guide - Reviews - CTA - Footer - Tours
page - Tour details page

Use mock/seed data initially.

Goal: reproduce the premium Lombok design before implementing complex
backend features.

------------------------------------------------------------------------

## Phase 2 --- Backend Foundation

Create: - Express server - MongoDB connection - Mongoose models -
Controllers - Routes - Error handling - Seed script

Implement:

``` http
GET /api/tours
GET /api/tours/slug/:slug
GET /api/destinations
GET /api/destinations/:slug
GET /api/reviews
```

Connect React to real API data.

------------------------------------------------------------------------

## Phase 3 --- Booking

Implement: - Booking UI - Date selection - Guest count - Customer
details - Capacity checking - Server-side price calculation - Booking
reference - Booking confirmation page

------------------------------------------------------------------------

## Phase 4 --- Admin

Implement: - Admin authentication - Dashboard - Tour CRUD - Destination
CRUD - Booking management - Review moderation

------------------------------------------------------------------------

## Phase 5 --- Integrations

After core application works: - Image upload/storage - Email
confirmation - Payment gateway - WhatsApp integration - Analytics - SEO
enhancements

Do not allow third-party integrations to delay the MVP.

------------------------------------------------------------------------

# 33. Testing

At minimum test:

### Frontend

-   Components render
-   Tour list
-   Tour details
-   Filters
-   Booking form validation
-   Mobile layout

### Backend

-   Tour CRUD
-   Destination CRUD
-   Booking creation
-   Invalid tour
-   Invalid guest counts
-   Capacity limits
-   Server-side price calculation
-   Protected admin routes

Test booking concurrency/capacity logic before production so two
simultaneous bookings cannot overbook a tour.

------------------------------------------------------------------------

# 34. SEO

For public pages: - Descriptive page titles - Meta descriptions -
Semantic headings - Clean slugs - Open Graph metadata - Sitemap - Robots
configuration - Structured data where appropriate

Examples:

``` text
/tours/mount-rinjani-trekking
/destinations/gili-islands
/destinations/kuta-lombok
```

------------------------------------------------------------------------

# 35. Performance

Because the site is image-heavy: - Compress images - Serve appropriately
sized images - Lazy-load below-the-fold images - Avoid huge hero files -
Avoid unnecessary dependencies - Code split routes where useful -
Optimize API queries

------------------------------------------------------------------------

# 36. Important Implementation Rules for Codex

1.  Build incrementally.
2.  Do not attempt every feature in one giant change.
3.  Keep components reusable.
4.  Keep route handlers thin.
5.  Put business logic in controllers/services.
6.  Do not duplicate code unnecessarily.
7.  Do not hard-code API URLs throughout the frontend.
8.  Do not hard-code secrets.
9.  Do not trust client-submitted prices.
10. Validate API input.
11. Add error handling.
12. Preserve responsive behaviour.
13. Prefer straightforward maintainable code over unnecessary
    abstraction.
14. Add comments only where they clarify non-obvious logic.
15. Keep the application runnable after each phase.
16. Do not invent real business details, guide credentials, customer
    reviews, phone numbers, payment accounts, or policies.
17. Use placeholders/TODOs where real business information is missing.

------------------------------------------------------------------------

# 37. First Codex Task

Start with **Phase 1 only**.

Create the React/Vite frontend and build a polished responsive homepage
based on the specification.

Required first components:

``` text
Navbar
HeroCarousel
TourSearch
PopularTours
TourCard
DestinationSection
DestinationCard
WhyChooseUs
GuideSection
ReviewSection
ReviewCard
AdventureCTA
Footer
```

Also create: - `/tours` - `/tours/:slug` - `/destinations` -
`/destinations/:slug`

Use local mock data for now.

Do **not** implement payment integration yet.

Do **not** spend time building advanced authentication yet.

After Phase 1: 1. Ensure the project builds without errors. 2. Ensure
mobile and desktop layouts work. 3. Provide a summary of files
created/changed. 4. Provide commands required to run the project. 5.
List any TODOs or assumptions. 6. Stop and wait for review before
beginning Phase 2.

------------------------------------------------------------------------

# 38. Definition of Done for Phase 1

Phase 1 is complete when:

-   The React app starts successfully.
-   Homepage closely follows the requested modern Lombok tourism design.
-   Navigation works.
-   Hero carousel works.
-   Tour cards are reusable.
-   Destination cards are reusable.
-   Tour listing works using mock data.
-   Tour detail routing works.
-   Destination listing/detail routing works.
-   Layout is responsive.
-   Mobile navigation works.
-   Loading/error patterns are prepared for later API integration.
-   No payment/backend dependency is required to view the UI.
-   No obvious console errors are present.

The result should look like a real premium Lombok tour-guide business
website, not a tutorial/demo dashboard.
