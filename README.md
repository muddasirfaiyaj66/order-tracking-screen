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
    OrderTrackingScreen.tsx   # main mobile tracking screen
    OrderProgressStepper.tsx  # 4-stage timeline
    StatusBadge.tsx
    ContactSupportButton.tsx
  data/
    mockOrders.ts
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
