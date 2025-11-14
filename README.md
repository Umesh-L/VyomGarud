# VyomGarud UAV Systems

## Overview

VyomGarud is a military-grade UAV (Unmanned Aerial Vehicle) systems website built as a modern full-stack app. It shows the company's drone capabilities, products, and services and includes a contact form that stores submissions. The design aims for a clean, professional, military-grade look and simple, direct language.

## Quick Start (run locally)

Prerequisites:
- Node.js (v18+ recommended)

Install dependencies and run the app in development (Windows/cmd):

```bash
cd "c:\Umesh Folder\Internship and job projects\VyomGarud\VyomGarud"
npm install
cmd /c "set NODE_ENV=development&& node server/index.js"
```

Open your browser at `http://localhost:5000`.

To run a production build locally:

```bash
npm run build
NODE_ENV=production node dist/index.js
```

## System Architecture (plain language)

This project is split into three main parts:
- `client/` — the React frontend (UI, pages, components)
- `server/` — the Express backend (API endpoints, logging)
- `shared/` — shared types and validation schemas used by both sides

The frontend is built with React + Vite for fast dev reloads. Tailwind CSS and Radix UI provide the look-and-feel and accessible components. The backend uses Express and exposes a small REST API for the contact form.

### Frontend highlights
- React 18 (TypeScript support available in the codebase style)
- Vite for the dev server and fast HMR
- Tailwind CSS for styling
- Radix UI + shadcn-style components for consistent UI
- Wouter for lightweight routing

### Backend highlights
- Express.js using ES modules
- Custom middleware for logging requests and capturing JSON responses
- The server serves the client in development via Vite middleware and serves static files in production builds

## API (what you can call)

- POST `/api/contact` — submit contact form data (name, email, message, company)
- GET `/api/contact-submissions` — list previously submitted messages (in-memory by default)

All requests use JSON. The backend validates incoming data with Zod and returns clear error messages if input is invalid.

## Data & Storage

During development the project uses an in-memory storage layer (easy to run, no DB needed). The code is ready to switch to PostgreSQL using Drizzle ORM. If you want to use a real database, set `DATABASE_URL` and run:

```bash
npm run db:push
```

## Environment variables

- `PORT` — port to serve the app (defaults to `5000`)
- `DATABASE_URL` — (optional) PostgreSQL connection string to enable Drizzle-backed storage

## Project structure

Top-level layout:

- `client/` — React app source and static files
- `server/` — Express server and Vite server integration
- `shared/` — shared schema and types used by both client and server
- `attached_assets/` — images and other static assets
- `package.json` — scripts for dev, build and db tasks

## Development tips

- Run the dev server with `NODE_ENV=development` so the server mounts Vite middleware and enables HMR for the client.
- If you delete `node_modules`, re-run `npm install` before starting the server.
- Windows PowerShell may block running npm scripts depending on your execution policy; use `cmd /c` commands shown above to avoid that.

## Dependencies (high level)

- UI: `@radix-ui/*`, Tailwind CSS, `framer-motion`, `shadcn`-style components
- Forms & validation: `react-hook-form`, `zod`, `@hookform/resolvers`
- Data fetching: `@tanstack/react-query`
- Server: `express`, `esbuild` for bundling the production server
- ORM (configured, not required in dev): `drizzle-orm`, `drizzle-kit`

## Notes on running in Replit

The repo contains Replit-specific Vite plugins. Those are optional and won't affect local development on your machine.

## Contributing & next steps

- To add a database connection: set `DATABASE_URL`, update `shared/schema` as needed, and run `npm run db:push`.
- To change the default port: export or set `PORT` before starting the server.

If you want, I can add a short run script (`start-dev.bat`) or a one-line PowerShell helper to make development easier on Windows.

---

If you'd like the README trimmed, expanded with more commands, or to include screenshots and badges, tell me which parts to expand and I'll update it.
# VyomGarud UAV Systems

## Overview

VyomGarud is a military-grade UAV (Unmanned Aerial Vehicle) systems company website built as a modern full-stack application. The project showcases the company's drone capabilities, products, and services through a professionally designed landing page with a contact form submission system. The application emphasizes military precision, technical excellence, and professional authority through its design language, drawing inspiration from clean professionalism and bold, military-grade aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (single-page application pattern)

**UI Component System**
- shadcn/ui component library (New York style variant) for consistent, accessible UI components
- Radix UI primitives as the foundation for interactive components (dialogs, dropdowns, forms, etc.)
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for animations and transitions
- Component aliases configured for clean imports (@/components, @/lib, @/hooks)

**Design System**
- Dark mode by default with light mode fallback
- Custom color palette centered around military precision aesthetic (orange primary: hsl(25 100% 50%))
- Typography: Inter font family for clean, technical readability
- Spacing system based on consistent Tailwind units (4, 8, 12, 16, 20, 24)
- Military-inspired design principles: geometric layouts, structured grids, spacious layouts, sharp modern components

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod validation for form handling
- Custom toast notifications for user feedback

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- ESM (ES Modules) format throughout the codebase
- Custom logging middleware for API request/response tracking
- RESTful API design pattern

**API Endpoints**
- POST /api/contact - Submit contact form with validation
- GET /api/contact-submissions - Retrieve all contact submissions

**Data Layer**
- In-memory storage implementation (MemStorage class) for development/prototype phase
- Storage abstraction through IStorage interface for future database integration
- Drizzle ORM configured for PostgreSQL (schema defined, ready for database connection)
- Schema validation using Drizzle-Zod integration

**Database Schema** (PostgreSQL-ready)
- `contact_submissions` table with fields:
  - id (UUID primary key, auto-generated)
  - name (text, required, 1-100 characters)
  - email (text, required, valid email format)
  - company (text, optional, max 100 characters)
  - message (text, required, 10-1000 characters)
  - submittedAt (timestamp, auto-generated)

**Request/Response Flow**
- JSON body parsing with raw body capture for webhook support
- Zod schema validation on all incoming requests
- Standardized error responses with appropriate HTTP status codes
- CORS-ready architecture (credentials included in fetch requests)

### Development Environment

**Build & Development Tools**
- tsx for TypeScript execution in development
- esbuild for production server bundling
- Vite plugins for enhanced development experience:
  - Runtime error overlay (@replit/vite-plugin-runtime-error-modal)
  - Cartographer for code navigation (Replit-specific)
  - Dev banner (Replit-specific)

**Type Safety**
- Strict TypeScript configuration across client and server
- Shared types between frontend and backend via @shared namespace
- Path aliases for clean imports (@ for client/src, @shared for shared code, @assets for assets)

**Code Organization**
- Monorepo structure with clear separation:
  - `/client` - React frontend application
  - `/server` - Express backend application
  - `/shared` - Shared schemas and types
  - `/attached_assets` - Static assets (images)

## External Dependencies

**UI & Styling**
- @radix-ui/* (v1.x) - Accessible UI primitives for complex components
- Tailwind CSS (v3.x) - Utility-first CSS framework
- class-variance-authority - Type-safe component variant management
- tailwind-merge (via clsx) - Conditional className merging
- framer-motion - Animation library for smooth transitions
- embla-carousel-react - Carousel/slider functionality

**Form Handling & Validation**
- react-hook-form (v7.x) - Performant form state management
- zod (v3.x) - TypeScript-first schema validation
- @hookform/resolvers - React Hook Form + Zod integration

**Data Fetching**
- @tanstack/react-query (v5.x) - Server state management with caching, refetching, and synchronization

**Database & ORM** (Configured, not yet connected)
- drizzle-orm (v0.39.x) - TypeScript ORM for SQL databases
- drizzle-zod - Zod schema generation from Drizzle schemas
- @neondatabase/serverless - Serverless PostgreSQL driver (Neon database)
- drizzle-kit - Database migrations and schema management

**Session Management** (Dependency present, not implemented)
- connect-pg-simple - PostgreSQL session store for Express sessions

**Development Tools**
- Replit-specific plugins for enhanced development experience in Replit environment
- PostCSS with Autoprefixer for CSS processing

**Routing**
- wouter (v3.x) - Minimalist client-side routing library (~1.3KB)

**Utilities**
- date-fns (v3.x) - Modern JavaScript date utility library
- nanoid - Compact, secure URL-friendly unique ID generator
- cmdk - Command menu component

**Note on Database**: The application is currently using in-memory storage but is fully configured to connect to a PostgreSQL database via Drizzle ORM. The schema is defined and migrations can be generated using `npm run db:push`. A DATABASE_URL environment variable is required to activate the database connection.