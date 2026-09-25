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
  components/          # UI building blocks
    OrderTrackingScreen.tsx
    OrderHeader.tsx
    StatusTracker.tsx
    DeliveryInfo.tsx
    OrderItems.tsx
  data/
    mockOrder.ts       # sample order payload
  types/
    order.ts           # shared Order types
  App.tsx              # app entry composition
  main.tsx
  index.css            # Tailwind + base styles
```

## Getting started

```bash
npm install
npm run dev
```
