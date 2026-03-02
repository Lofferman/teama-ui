# Teama UI - AI Agent Instructions

Teama UI is a SvelteKit repository project with TailwindCSS styling, GitHub OAuth authentication, and PostgreSQL data persistence. This guide helps AI agents be productive in this codebase.

## Code Style

- **Language**: TypeScript (`.ts`, `.svelte.ts`), always use types
- **Formatting**: Prettier + ESLint enforce standards automatically. Run `npm run format` and `npm run lint` before suggesting changes
- **Svelte**: Always use **Svelte 5 syntax**:
  - Props: `let { prop } = $props()` instead of `export let prop`
  - State: `let state = $state(initial)` for reactive variables 
  - Derived: `let computed = $derived(expression)` for computed values
  - Lifecycle: Use `$effect()` for side effects instead of `onMount`
  - Classes: Use Tailwind + DaisyUI, never inline CSS
- **Components**: Component names in PascalCase, located in `src/lib/components/`
- **Stores**: Use Svelte stores in `src/lib/components/repo-management/formStore.ts` pattern for complex shared state

## Architecture

**Core Stack:**
- **SvelteKit**: App framework with file-based routing (`src/routes/`)
- **Authentication**: `better-auth` (GitHub OAuth) with cookie-based sessions
- **Database**: PostgreSQL via `drizzle-orm` with migrations in `drizzle/`
- **Styling**: TailwindCSS v4 + DaisyUI components
- **Testing**: Vitest with Playwright for browser tests

**Key Data Flow:**
1. **Users authenticate** via GitHub through `src/lib/server/auth.ts` (better-auth)
2. **Routes fetch data** via `+page.server.ts` (server load functions) using locals.user for auth
3. **Components receive data** via `data` prop from page, modify with stores or state
4. **API endpoints** at `src/routes/api/**/+server.ts` handle mutations (POST/PUT/DELETE)
5. **Database operations** use Drizzle ORM functions imported from schema

**Directory Structure:**
- `src/routes/` - SvelteKit pages/layouts following `+page.svelte`, `+layout.svelte` convention
- `src/lib/components/` - Reusable UI components 
- `src/lib/server/` - Backend code (auth, db, never imported in client components)
- `src/lib/types/` - Exported TypeScript interfaces (e.g., `Repo` from `savedRepos.ts`)
- `drizzle/` - Database migrations and snapshots

## Build and Test

**Development:**
```bash
npm run dev              # Start dev server on localhost:5173
npm run dev -- --open   # Start and open in browser
npm run check           # Type-check and validate Svelte
npm run lint            # Run ESLint and Prettier check
npm run format          # Auto-format code
```

**Database:**
```bash
npm run db:generate     # Generate migration from schema changes
npm run db:push         # Push migrations to database
npm run db:studio       # Open Drizzle Studio (SQL UI)
npm run db:migrate      # Run pending migrations
npm run auth:schema     # Generate better-auth schema
```

**Testing & Building:**
```bash
npm run test            # Run all tests (unit + component)
npm run build           # Create production build
npm run preview         # Preview production build locally
```

**Deployment:** Configured for Netlify via `@sveltejs/adapter-netlify`

## Project Conventions

### Page Data Loading
Pages use `+page.server.ts` to load data server-side:
```typescript
import type { PageServerData } from './$types';

export async function load({ locals }) {
  if (!locals.user) redirect(302, '/login');
  const data = await db.select()...
  return { data };
}

export const actions = { default: async ({ request, locals }) => { ... } };

// In +page.svelte: let { data }: { data: PageServerData } = $props();
```

### API Routes
API endpoints handle mutations using `FormData`:
```typescript
// Routes: src/routes/api/repos/+server.ts
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
  const formData = await request.formData();
  const field = formData.get('fieldName')?.toString() ?? '';
  // ... validate and db.insert...
  return json({ success: true }, { status: 201 });
};
```

### Component-to-Parent Communication
Use callback props for forms:
```typescript
// Child: <AddRepo {onSubmit} /> where onSubmit: (data: NewRepoForm) => void
// In component: if (onSubmit) onSubmit(data);

// Parent: <AddRepo onSubmit={handleChildSubmit} /> 
// Then: async function handleChildSubmit(formData) { await fetch('/api/repos', { method: 'POST', body: formData }) }
```

### Database Queries
Use Drizzle ORM with type-safe queries:
```typescript
import { repos } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Insert
await db.insert(repos).values({ userId, repoName, ... });

// Select
const all = await db.select().from(repos).where(eq(repos.isActive, true));
const one = await db.select().from(repos).where(eq(repos.repoSlug, id)).limit(1).then(r => r[0]);
```

### UI Components
- Use **DaisyUI classes** for consistent styling: `btn btn-primary`, `card bg-base-100 shadow`, `badge badge-outline`
- Always add responsive classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Use **Svelte 5 transitions**: `<div in:fade out:fade>` from `svelte/transition`
- For forms, use DaisyUI form elements: `input`, `select`, `textarea` with `form-control` wrapper

### Type Safety
- Export types in `src/lib/types/` (e.g., `Repo`, `NewRepoForm`, `RolesForm`)
- Use `type` imports from `./$types` in routes (`PageServerData`, `LayoutServerData`)
- Always type function parameters and returns, especially in API routes and stores

## Integration Points

**GitHub Authentication:**
- Configured in `src/lib/server/auth.ts` using `better-auth` + GitHub OAuth
- User data available via `locals.user` in server-side code and page load functions
- Check `if (!locals.user)` to guard protected routes

**Database Access:**
- All DB operations go through `src/lib/server/db/index.ts` singleton instance
- Import schema types from `src/lib/server/db/schema.ts`
- Only use `db` in server files (`+page.server.ts`, `+server.ts`, `/server/` directory)

**Form Submission Pattern:**
1. Client collects data in component using form store or state
2. Create `FormData` object with field values
3. POST to `/api/endpoint` 
4. Handle response and reload/update UI

**Environment Variables:**
- Private secrets in `src/env.d.ts` or loaded via `$env/dynamic/private`
- Used for `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `BETTER_AUTH_SECRET`, `ORIGIN`

## Security

- **Authentication required**: Check `locals.user` in all `+page.server.ts` and `+server.ts` routes
- **Authorization checks**: Verify `locals.user.id` matches resource owner before mutations
- **Private repos blocked**: API prevents uploading private GitHub repos (checked in POST handler)
- **FormData validation**: Parse and validate all form fields in API routes
- **CORS**: Only needed if frontend served separately (current Netlify setup doesn't require it)

---

When making changes, follow these patterns for new repo features, auth-protected pages, and database operations. Run tests and linting before submitting code.
