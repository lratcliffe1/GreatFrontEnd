# Contributing

This repository is organized for solving one challenge at a time while keeping the app runnable.

## Recommended workflow

1. Pick the next challenge from `src/content/questions.ts`.
2. Implement solution files under `src/solutions/<id>`.
3. Update the matching manifest entry in `src/content/questions.ts`:
   - replace `TODO` fields (`sourceUrl`, `summary`, `approach`, `complexity`)
   - set `status` to `in-progress` or `done` as work advances
4. Verify locally before commit:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

5. If you want to run browser smoke coverage locally, install Playwright browsers once:

```bash
npx playwright install
npm run test:e2e
```

Store-level Redux tests are colocated under `src/lib/store/*.test.ts`.

## Notes on state management

- Redux is currently used for cross-component question filters and Todo demo tasks.
- Prefer local component state by default; lift to Redux only when state is shared across routes or distant components.
- Current Redux behavior persists during in-app navigation but does not survive full refresh yet.
