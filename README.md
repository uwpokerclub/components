# @uwpokerclub/components

Official React component library for UW Poker Club applications.

[![CI](https://github.com/uwpokerclub/components/workflows/CI/badge.svg)](https://github.com/uwpokerclub/components/actions)
[![npm version](https://badge.fury.io/js/@uwpokerclub%2Fcomponents.svg)](https://www.npmjs.com/package/@uwpokerclub/components)
[![Coverage](https://codecov.io/gh/uwpokerclub/components/branch/master/graph/badge.svg)](https://codecov.io/gh/uwpokerclub/components)

## Features

- 🎨 **Atomic Design** - Organized component hierarchy (Atoms, Molecules, Organisms, Templates)
- ⚛️ **Modern React** - Built with React 19+ and TypeScript
- 📦 **Tree-shakeable** - ES modules with zero runtime overhead
- ♿ **Accessible** - WCAG 2.1 Level AA compliant with comprehensive a11y support
- 🧪 **Well-tested** - Comprehensive test coverage with Vitest + React Testing Library
- 📚 **Documented** - Full Storybook documentation with live examples
- 🎭 **Themeable** - CSS variables for easy customization
- 🚀 **SSR Compatible** - Works seamlessly with Next.js and other SSR frameworks

## Installation

```bash
npm install @uwpokerclub/components
# or
yarn add @uwpokerclub/components
# or
pnpm add @uwpokerclub/components
```

## Usage

### Importing Component Styles

Import the component styles in your application's entry point (e.g., `main.tsx`, `_app.tsx`, or `layout.tsx`):

```tsx
// Import component styles
import '@uwpokerclub/components/components.css';
```

This CSS file includes all the styles needed for the components to render correctly.

### Importing Components

```tsx
import { Button, Card } from '@uwpokerclub/components';

function App() {
  return (
    <Card>
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Click me
      </Button>
    </Card>
  );
}
```

### Using Design Tokens

The library includes UWPSC brand design tokens (colors, typography, spacing, etc.) that can be imported into any project:

```tsx
// Import the tokens CSS file in your app entry point or layout
import '@uwpokerclub/components/tokens.css';
```

This provides CSS variables for:

- **Brand Colors**: Primary gold (`#f4b80f`) and secondary purple (`#4B2E83`)
- **Typography**: Montserrat font family with fallbacks
- **Spacing**: Consistent spacing scale
- **Shadows, borders, and more**

Example usage in your own components:

```css
.my-component {
  color: var(--color-primary);
  background: var(--color-secondary-light);
  font-family: var(--font-family);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}
```

Dark theme support via `data-theme` attribute:

```tsx
<div data-theme="dark">{/* Your app content - automatically uses dark theme tokens */}</div>
```

## Documentation

Visit our [Storybook documentation](https://uwpokerclub.github.io/components) for component demos and API documentation.

## Atomic Design Structure

This library follows Atomic Design methodology:

- **Atoms**: Basic building blocks (buttons, inputs, labels)
- **Molecules**: Simple combinations of atoms (form fields, cards)
- **Organisms**: Complex UI components (headers, forms, modals)
- **Templates**: Page-level layouts and structures

```tsx
// Import atoms
import { Button, Input, Label } from '@uwpokerclub/components';

// Import molecules
import { Card, FormField } from '@uwpokerclub/components';

// Import organisms
import { Header, Modal } from '@uwpokerclub/components';

// Import templates
import { MainLayout } from '@uwpokerclub/components';
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook development server
npm run storybook

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Build library
npm run build

# Lint
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── atoms/            # Basic building blocks
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Button.module.css
│   │   └── index.ts
│   └── ...
├── molecules/        # Simple combinations
├── organisms/        # Complex components
├── templates/        # Page layouts
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── styles/           # Design tokens and global styles
└── index.ts          # Main entry point
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Versioning

We use [Semantic Versioning](https://semver.org/). Releases are automated via [semantic-release](https://github.com/semantic-release/semantic-release).

## License

MIT © UW Poker Club

## Support

- [GitHub Issues](https://github.com/uwpokerclub/components/issues)
- [Documentation](https://uwpokerclub.github.io/components)
