# VyomGarud -- Landing Page

## Overview

VyomGarud is a military-grade UAV (Unmanned Aerial Vehicle) systems website built as a modern full-stack app. It shows the company's drone capabilities, products, and services and includes a contact form that stores submissions. The design aims for a clean, professional, military-grade look and simple, direct language.

<hr/>

## Screen recording
https://github.com/user-attachments/assets/07e2991a-f2a1-4bbd-8242-a0ba95e16256

<hr/>

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

<hr/>

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

<hr/>

## API (what you can call)

- POST `/api/contact` — submit contact form data (name, email, message, company)
- GET `/api/contact-submissions` — list previously submitted messages (in-memory by default)

All requests use JSON. The backend validates incoming data with Zod and returns clear error messages if input is invalid.

<hr/>

## Data & Storage

During development the project uses an in-memory storage layer (easy to run, no DB needed). The code is ready to switch to PostgreSQL using Drizzle ORM. If you want to use a real database, set `DATABASE_URL` and run:

```bash
npm run db:push
```

<hr/>

## Environment variables

- `PORT` — port to serve the app (defaults to `5000`)
- `DATABASE_URL` — (optional) PostgreSQL connection string to enable Drizzle-backed storage

<hr/>

## Project structure

Top-level layout:

- `client/` — React app source and static files
- `server/` — Express server and Vite server integration
- `shared/` — shared schema and types used by both client and server
- `attached_assets/` — images and other static assets
- `package.json` — scripts for dev, build and db tasks

<hr/>

## Development tips

- Run the dev server with `NODE_ENV=development` so the server mounts Vite middleware and enables HMR for the client.
- If you delete `node_modules`, re-run `npm install` before starting the server.
- Windows PowerShell may block running npm scripts depending on your execution policy; use `cmd /c` commands shown above to avoid that.

<hr/>

## Dependencies (high level)

- UI: `@radix-ui/*`, Tailwind CSS, `framer-motion`, `shadcn`-style components
- Forms & validation: `react-hook-form`, `zod`, `@hookform/resolvers`
- Data fetching: `@tanstack/react-query`
- Server: `express`, `esbuild` for bundling the production server
- ORM (configured, not required in dev): `drizzle-orm`, `drizzle-kit`
