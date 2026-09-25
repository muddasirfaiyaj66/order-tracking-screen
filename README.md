# Order Tracking Screen

Mobile-first order tracking UI for phone widths (~360–430px). Shows delivery progress, product details, support actions, and dedicated handling for delay, missing-delivery, and unavailable-tracking cases.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **oxlint** for linting

## Setup & run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build    # typecheck + production build
npm run preview  # preview the production build
npm run lint     # run oxlint
```

Demo data lives in `src/data/mockOrders.ts`. Switch the order ID in `src/App.tsx` (via `useOrderTracking(...)`) to preview different statuses and edge cases:

| Export | Order ID | Scenario |
|--------|----------|----------|
| `mockOrder` | OT-1003 | Happy path — out for delivery |
| `delayedMockOrder` | OT-2001 | Delayed shipment |
| `notReceivedMockOrder` | OT-2002 | Delivered but not received |
| `trackingUnavailableMockOrder` | OT-2003 | Tracking not available yet |
| — | `OT-FAIL` | Forced fetch error (loading → error state) |

## Edge-case design decisions

**Delayed order**  
Keep the real shipment status visible, but lead with a warning banner: clear delay reason, revised ETA vs original (struck through), and a concrete next step (`Track live location` or contact support) plus report-issue. Avoids burying the delay inside a generic timeline.

**Delivered but not received**  
Preserve the carrier’s **Delivered** status (don’t invent a new status), then ask the customer to confirm. Primary actions are “I haven’t received this” / “Report an issue,” with “Yes, I received it” as a quieter affirmative path.

**Tracking not available**  
Treat this as “order exists, feed pending”—never a blank screen. Show a reassuring placeholder, confirm the order is still active, outline upcoming stages lightly, and offer **Check again** / report issue without implying failure.

## Project structure

```
src/
  components/   # screen, timeline, sheets, edge-case banners
  hooks/        # useOrderTracking (loading / success / error / empty)
  data/         # mockOrders + simulated fetchOrder
  types/        # Order / status / issue types
  App.tsx
```
