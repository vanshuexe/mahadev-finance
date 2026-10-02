# Coding Conventions
*Last Mapped: 2026-09-30*

## Core Style
- **TypeScript First**: Strict typing is generally preferred for schemas (e.g., `Application`, `Loan`, `WebsiteContent` in `db.ts`).
- **Functional Components**: React components strictly use functional paradigms with hooks.
- **Styling**: Inline Tailwind CSS classes are heavily utilized. Dark mode colors rely on custom hex codes (e.g., `bg-[#0b1628]`, `border-[#c9902a]`).

## Patterns
- **Database Service**: The `dbService` singleton pattern is heavily enforced for all state that needs to persist across reloads or be shared between pages.
- **Custom Pub-Sub**: The `subscribe` and `notifyListeners` methods in `db.ts` serve as the global state reactivity system, acting similarly to Redux or Zustand, but lightweight and hand-rolled.
- **Admin UI Layout**: The admin panel uses a Flexbox Sidebar layout for navigation, rather than horizontal tabs.

## Error Handling
- Very rudimentary error handling currently exists. Mostly optimistic UI updates without explicit `try/catch` wrapping around `localStorage` interactions. Alerts/Toasts (`showToast`) are used for success and error messaging.
