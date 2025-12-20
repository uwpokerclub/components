# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is `@uwpokerclub/components` - a React component library built with TypeScript, following Atomic Design principles. The library is published to GitHub Packages (restricted access) and consumed by other UW Poker Club applications.

## Architecture

### Atomic Design Structure

Components are organized by complexity level in `src/`:

- **`atoms/`** - Indivisible UI primitives (buttons, inputs, labels, icons)
- **`molecules/`** - Simple 2-4 atom combinations (form fields, cards, search bars)
- **`organisms/`** - Complex multi-molecule components (headers, modals, data tables)
- **`templates/`** - Page-level layout structures (no business logic)

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx         # Implementation
├── ComponentName.test.tsx    # Vitest + React Testing Library tests
├── ComponentName.stories.tsx # Storybook documentation
├── ComponentName.module.css  # Scoped styles using CSS variables
└── index.ts                  # Exports
```

All components must be exported from `src/index.ts` with both the component and its TypeScript types.

### Build System

This repository has **two separate build configurations**:

1. **`vite.config.ts`** - Development server + Vitest testing (default)
2. **`vite.config.lib.ts`** - Library build with dual output:
   - ES modules (`dist/index.js`)
   - CommonJS (`dist/index.cjs`)
   - TypeScript declarations (`dist/index.d.ts`)

The library build uses `preserveModules: true` for tree-shaking and outputs both ES and CJS formats to support all consumers.

Type generation is separate: `tsconfig.build.json` (excludes tests/stories) runs before the Vite library build.

### Testing Strategy

Vitest is configured with **two test projects**:

1. **`unit`** - Standard component tests (jsdom environment)
2. **`storybook`** - Browser-based tests via Playwright for Storybook stories

Run specific project: `vitest run --project=unit` or `--project=storybook`

Coverage thresholds are enforced at 80% for lines, functions, branches, and statements.

### Design System

All styling uses CSS variables defined in `src/styles/tokens.css`. This file contains:

- Color palette (primary, secondary, semantic colors)
- Spacing scale
- Typography (font families, sizes, weights)
- Border radii and shadows
- Z-index layers
- Dark theme overrides via `[data-theme="dark"]`

**Never hardcode values** - always reference CSS variables for consistency and themability.

## Development Commands

### Primary Workflow

```bash
npm run storybook          # Start Storybook on :6006 - primary dev environment
npm run test:watch         # Run tests in watch mode during development
npm run build              # Build library (types + lib bundle)
```

### Testing

```bash
npm test                   # Run all tests once
npm run test:coverage      # Run tests with coverage report
vitest run --project=unit  # Run only unit tests
```

### Code Quality

```bash
npm run lint               # Check for linting errors
npm run lint:fix           # Auto-fix linting errors
npm run format             # Format code with Prettier
npm run format:check       # Check formatting without modifying
```

### Build Variants

```bash
npm run build:lib          # Build library only (no types)
npm run build:types        # Generate TypeScript declarations only
npm run build-storybook    # Build static Storybook for deployment
```

## Commit Conventions

This repository enforces **Conventional Commits** via Husky pre-commit hooks and commitlint.

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

Format: `type: Subject starting with capital letter`

Example: `feat: Add disabled state to Button component`

**Important:** Never include "claude", "code", or "phase/plan" comments in commit messages.

## CI/CD Pipeline

### Automated Workflows

1. **CI** (`.github/workflows/ci.yml`)
   - Matrix tests across Node 20/22/24 on Ubuntu/Windows/macOS
   - Lint, test with coverage, build library and Storybook
   - Uploads coverage to Codecov

2. **Security** (`.github/workflows/security.yml`)
   - NPM audit, dependency review, CodeQL analysis, secret scanning
   - Runs on push/PR and weekly schedule

3. **Release** (`.github/workflows/release.yml`)
   - Automatic versioning and GitHub Packages publishing via semantic-release
   - Uses GITHUB_TOKEN for authentication (no NPM_TOKEN needed)
   - Triggered on push to main/master

4. **PR Checks** (`.github/workflows/pr-checks.yml`)
   - Validates PR title follows conventional commits
   - Validates all commit messages

## Component Development Workflow

See `docs/COMPONENT_GUIDE.md` for comprehensive component development guidelines.

When creating a new component:

1. Determine Atomic Design category (atom/molecule/organism/template)
2. Create component directory with all required files
3. Extend appropriate HTML element props via `ComponentPropsWithoutRef<'element'>`
4. Use CSS Modules with design tokens from `src/styles/tokens.css`
5. Write tests covering rendering, interactions, props, and accessibility
6. Create Storybook stories with `tags: ['autodocs']` for automatic documentation
7. Export from component `index.ts` and main `src/index.ts`

## Publishing

This package is published to **GitHub Packages** (not npm) with restricted access to authorized users only.

### Automated Publishing

Publishing is fully automated via semantic-release on push to main/master. Version bumps are determined by commit message types:

- `fix:` → patch version (0.1.0 → 0.1.1)
- `feat:` → minor version (0.1.0 → 0.2.0)
- `feat!:` or `BREAKING CHANGE:` → major version (0.1.0 → 1.0.0)

The release workflow:

1. Uses `GITHUB_TOKEN` for authentication (automatically provided by GitHub Actions)
2. Sets `NODE_AUTH_TOKEN` environment variable for npm publish
3. Publishes to `https://npm.pkg.github.com` registry
4. Package access is restricted to uwpokerclub organization members

Manual publishing is blocked by `prepublishOnly` script that runs lint, test, and build.

### Installing the Package

Users must configure GitHub Packages authentication in `~/.npmrc`:

```bash
@uwpokerclub:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

They need a GitHub Personal Access Token (classic) with `read:packages` scope.

## Key Configuration Files

- **`vite.config.lib.ts`** - Library build configuration (production bundles)
- **`tsconfig.build.json`** - TypeScript config for type generation (excludes tests/stories)
- **`commitlint.config.js`** - Commit message validation rules
- **`.lintstagedrc.json`** - Pre-commit hook configuration
- **`.releaserc.json`** - Semantic-release configuration
- **`.npmrc`** - GitHub Packages registry configuration for publishing

## Dependencies

React and React DOM are **peer dependencies** - not bundled with the library. All devDependencies include React 19.2.0 for development, but the library supports React 18+ via peer dependency range.

The library has **zero runtime dependencies** - `"sideEffects": false` enables aggressive tree-shaking.
