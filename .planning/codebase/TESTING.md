# Testing
*Last Mapped: 2026-09-30*

## Framework & Structure
- **None Configured**: There is currently no automated testing framework (such as Jest, Vitest, or Playwright) configured for this project.

## Mocking & Environments
- **Local Storage Sandbox**: Because the app uses `localStorage` entirely, testing interactions involves manually seeding the browser's storage via the UI or `db.ts` seed data. The `dbService.resetToDefaults()` function serves as a quasi-teardown method for manual UI testing.

## Coverage
- **0%**: No automated unit, integration, or end-to-end tests exist in the `src` directory. Manual verification is currently required for all changes.
