# 887 Cafe Project Guidelines

This project is a modern coffee shop application consisting of a Next.js frontend and a backend.

## Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

### Backend
- (Pending implementation)

## Architecture

The project is organized as a monorepo:
- `/frontend`: Next.js application.
- `/backend`: Backend services.

## Development Conventions

### General
- **TypeScript:** All code must be strictly typed. Avoid `any` and prefer explicit interfaces/types.
- **Styling:** Use Tailwind CSS 4 utility classes. Follow a consistent spacing and color palette.
- **Components:** Prefer functional components with hooks. Maintain a clear separation between presentational and container components.

### Frontend Specifics
- **Next.js 16:** Be aware that Next.js 16 may contain breaking changes compared to older versions. Always refer to the latest documentation or `frontend/AGENTS.md` for specific warnings.
- **State Management:** Use React Context (e.g., `CartContext.tsx`) for global state where appropriate.
- **Performance:** Optimize images using `next/image` and utilize Server Components by default.

## Workflows

### Linting & Validation
To ensure code quality in the frontend:
```bash
cd frontend
npm run lint
```

### Project Memory
- Root `GEMINI.md`: High-level project architecture and shared conventions.
- `frontend/CLAUDE.md` & `frontend/AGENTS.md`: Specific guidance for the frontend environment.
