# Directory Structure
*Last Mapped: 2026-09-30*

## Layout

```
mahadev-finance-&-dc-property-vala-&-library/
├── .agent/              # GSD configuration and skills
├── .planning/           # Project roadmap, specs, and map
├── node_modules/        # Dependencies
├── public/              # Static assets (images, fonts)
├── src/
│   ├── pages/           # High-level route components
│   │   ├── AdminPage.tsx
│   │   ├── HomePage.tsx
│   │   └── AboutPage.tsx
│   ├── services/        # Business logic and state management
│   │   └── db.ts        # Core local database singleton & CMS schema
│   ├── components/      # Reusable UI elements (assumed)
│   └── ...
├── index.html           # SPA entry point
├── package.json         # Scripts and dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite bundler configuration
```

## Key Locations
- **Content Management**: `src/services/db.ts` contains the `WebsiteContent` schema and seed data used for dynamically rendering all pages via the Admin panel.
- **Admin Dashboard**: `src/pages/AdminPage.tsx` handles backend CMS controls, inquiries, properties, and loans management.

## Naming Conventions
- **Components**: PascalCase (e.g., `AdminPage.tsx`).
- **Services/Utils**: camelCase (e.g., `db.ts`).
- **CSS**: Uses standard Tailwind utility classes. No custom CSS conventions apparent outside `index.css`.
