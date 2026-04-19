# Rhino Frontend Assessment

Built with Next.js 16, React 19, TypeScript, and Turborepo

It contains two separate apps:

- `project-a`
- `project-b`

Both apps support:

- `/en`
- `/ca`
- `/[market]/login`
- `/[market]/products`
- `/[market]/product/[slug]`

## Setup

Install dependencies:

```bash
pnpm install
```

## Run The Apps

Run both apps at once:

```bash
pnpm dev
```

App URLs:

- `project-b`: [http://localhost:3000/en](http://localhost:3000/en)
- `project-a`: [http://localhost:3001/en](http://localhost:3001/en)

Run one app only:

```bash
pnpm --filter project-b dev
pnpm --filter project-a dev
```

## Demo Credentials

Stored in [packages/auth/src/credentials.json](./packages/auth/src/credentials.json):

```txt
admin / password123
user / user123
```

## Scripts

Useful root commands:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
pnpm test
pnpm docker:build
pnpm docker:up
```

## Architecture

Shared packages:

- `@repo/ui`
  - shared UI like `ProductCard`, `CampaignBanner`, `Button`, etc
- `@repo/data`
  - product fetching, normalization, mocked campaign banner data
- `@repo/auth`
  - credential validation and session helpers
- `@repo/constants`
  - typed brand and market config
- `@repo/types`
  - shared core types

App owned code:

- navbars
- route composition
- auth/session adapters tied to Next cookies
- page layout decisions

That split was intentional. A shared `ProductCard` makes sense. A shared navbar started getting kinda messy, so I decided that each app should own its own navbar instead.

## Shared Component Approach

The main shared component is `ProductCard`

It is reused by both apps, but each app can change:

- layout
- title position
- CTA label
- whether tags are shown
- whether a secondary image is shown

I also added a shared `CampaignBanner` and `Button` once I noticed repetition.

## Brand Differences

The apps intentionally share most of the route structure and business flow.

The differences are mainly in:

- navbar styling/composition
- shared component presentation
- copy/config values
- feature toggles

This felt like the cleanest way to show multi brand support without inventing fake product logic diffs.

## Rendering / SEO

This is a server first app router setup.

That means:

- pages render on the server
- login/logout use Server Actions
- product data uses fetch level revalidation every 5 minutes
- session aware layout rendering stays dynamic because the navbar reads cookies on the server

So this is not pure static generation. It's more of a mix of:

- server rendered dynamic routes
- cached and revalidated product data

The product list shuffles part of the data every 5 minutes and logs the refresh so there is visible evidence of content updates.

## Mocked API

Besides the public DummyJSON product source, the repo also includes a mocked internal campaign banner API:

- `/api/campaign-banner`

That is meant to represent an unreleased content endpoint separate from the public API.

## Testing

This repo includes both unit and integration coverage.

Unit coverage focuses on shared logic:

- `@repo/ui`
- `@repo/data`
- `@repo/auth`

Integration coverage is demonstrated in `project-a` with:

- login flow
- session creation
- gated product detail behavior

Run tests:

```bash
pnpm test
pnpm --filter project-a test
pnpm --filter @repo/ui test
pnpm --filter @repo/data test
pnpm --filter @repo/auth test
```

## Docker

The repo includes:

- one reusable root `Dockerfile`
- one `docker-compose.yml`

Both apps can be built from the same Docker path and run independently:

- `project-b` on port `3000`
- `project-a` on port `3001`

Build:

```bash
pnpm docker:build
```

Run:

```bash
pnpm docker:up
```
