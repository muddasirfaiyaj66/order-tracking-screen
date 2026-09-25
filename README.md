# Order Tracking Screen

Mobile-first React + Vite app for tracking order delivery status.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)

## Scripts

```bash
npm run dev      # start local dev server
npm run build    # typecheck + production build
npm run preview  # preview production build
npm run lint     # run oxlint
```

## Project structure

```
src/
  components/
    OrderTrackingScreen.tsx
    OrderTrackingSkeleton.tsx
    OrderTrackingErrorState.tsx
    DelayedOrderBanner.tsx
    DeliveredNotReceivedAlert.tsx
    TrackingUnavailablePlaceholder.tsx
    OrderProgressStepper.tsx
    StatusBadge.tsx
    ContactSupportButton.tsx
    TrackingScreenFrame.tsx
  hooks/
    useOrderTracking.ts
  data/
    mockOrders.ts
    fetchOrder.ts
  types/
    order.ts
  App.tsx
  main.tsx
  index.css
```

## Getting started

```bash
npm install
npm run dev
```
