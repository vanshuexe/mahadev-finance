# System Architecture
*Last Mapped: 2026-09-30*

## Core Pattern
- **Client-Side SPA**: The application follows a Single Page Application architecture built with React. All rendering and routing occurs in the browser.

## Layers & Components
1. **UI Layer (`src/pages`, `src/components`)**: React functional components using Hooks. Responsive layouts powered by Tailwind CSS.
2. **State Management & Service Layer (`src/services/db.ts`)**: 
   - A centralized singleton service (`dbService`) handles data persistence and state.
   - Implements a custom Observer pattern (`notifyListeners`, `subscribe`) to allow React components to re-render when data changes globally.
3. **Data Layer**:
   - Browser's `localStorage` is used as the underlying data store for all persistent state, simulating a NoSQL document database.

## Data Flow
- **Read**: Components call `dbService.getFoo()` on mount to load data, and subscribe to changes using `useEffect`.
- **Write**: User interactions in the UI trigger `dbService.saveFoo()` methods. These methods write to `localStorage` and then invoke `notifyListeners()`.
- **Update**: `notifyListeners()` triggers the callback in subscribed components, causing a state update and subsequent re-render.

## Entry Points
- `index.html`: Main HTML template.
- `src/main.tsx` (or `index.tsx`): React application bootstrap.
- `src/pages/HomePage.tsx`: Main user-facing landing page.
- `src/pages/AdminPage.tsx`: Secure dashboard for data entry and CMS management.
