# Tech Debt & Concerns
*Last Mapped: 2026-09-30*

## Security & Persistence
- **No Real Database**: The application uses `localStorage` for all persistent data (Inquiries, Loans, Properties, CMS Content, Admin PIN). If a user clears their browser cache or uses a different browser/device, all data is lost or inaccessible.
- **Insecure Admin Auth**: The "admin panel" is protected by a PIN stored in `localStorage`. This is insecure and can easily be bypassed by manipulating local storage or reading the source code.

## Environment & Build Issues
- **Path Parsing Bugs**: The project root folder name contains ampersand symbols (`mahadev-finance-&-dc-property-vala-&-library`). This breaks native Windows terminal command parsing when attempting to run `npm run dev` or `npm install`, as `&` is treated as a command separator. This required bypassing standard CLI execution to start the Vite server.

## Code Quality & Technical Debt
- **Large Monolithic Files**: Files like `AdminPage.tsx` and `db.ts` are becoming extremely large (1500+ lines). They need to be broken down into smaller, modular components and services to maintain readability.
- **No Test Coverage**: The project has zero automated tests, making refactoring these massive files risky.

## Fragile Areas
- **Manual Reactive DOM Updates**: The custom observer pattern (`notifyListeners`) in `db.ts` relies on components correctly registering and unregistering callbacks in `useEffect`. If not handled perfectly, this will lead to memory leaks or stale state across the UI.
