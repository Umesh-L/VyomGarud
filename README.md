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