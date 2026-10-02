# Tech Stack
*Last Mapped: 2026-09-30*

## Languages & Runtime
- **TypeScript**: Used for all logic, components, and services.
- **Node.js**: The underlying runtime for the dev server (v24.18.1).
- **HTML/CSS**: Structured via JSX and styled with Tailwind.

## Frameworks & Libraries
- **React**: Core UI library.
- **Vite**: Build tool and development server (v8.3.1).
- **TailwindCSS**: Utility-first CSS framework for styling (v4.3.3).
- **React Router DOM**: Client-side routing (assumed from architecture).
- **Lucide React**: Icon library used across UI components (e.g., in `AdminPage.tsx`).

## Dependencies
Major dependencies include `react`, `react-dom`, `vite`, `tailwindcss/vite`, `esbuild`. There was a known peer dependency conflict resolved using `--legacy-peer-deps`.

## Configuration
- `vite.config.ts`: Vite configuration.
- `package.json`: NPM scripts and dependencies.
- `tsconfig.json`: TypeScript compiler options.
