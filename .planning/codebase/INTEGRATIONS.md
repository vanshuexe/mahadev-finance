# External Integrations
*Last Mapped: 2026-09-30*

## Databases
- **Local Storage API**: The application currently simulates a backend database using the browser's `localStorage` API. A `dbService` singleton in `src/services/db.ts` handles all CRUD operations. There is no true external database integration (e.g., PostgreSQL, MongoDB) at this time.

## Authentication Providers
- **Custom PIN Auth**: Admin authentication is handled via a hardcoded or configured Admin PIN (stored in `localStorage` settings). No OAuth or external auth provider (like Firebase Auth, Auth0) is currently integrated.

## External APIs & Webhooks
- **None Active**: The codebase does not currently integrate with external webhooks or third-party APIs for processing data.

## Communication Links
- **WhatsApp Web API**: The UI dynamically generates `wa.me` links for initiating WhatsApp conversations with leads (seen in `AdminPage.tsx`).
