# Contributing to @uwpokerclub/components

Thank you for contributing to our component library!

## Development Workflow

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/components.git`
3. Create a feature branch: `git checkout -b feat/my-new-component`
4. Make your changes
5. Write tests and stories for your component
6. Run tests: `npm test`
7. Lint your code: `npm run lint`
8. Format your code: `npm run format`
9. Commit using conventional commits: `git commit -m "feat: add new Button variant"`
10. Push to your fork: `git push origin feat/my-new-component`
11. Open a Pull Request

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `perf:` Performance improvements
- `ci:` CI/CD changes
- `build:` Build system changes

Examples:

```
feat: add disabled state to Button component
fix: resolve Button hover state in dark mode
docs: update Card component usage examples
test: add accessibility tests for Modal
style: format Button component with Prettier
refactor: simplify Card component structure
```

## Atomic Design Principles

This library follows Atomic Design methodology. When creating components:

### Atoms

Basic building blocks that can't be broken down further:

- Buttons
- Inputs
- Labels
- Icons

### Molecules

Simple combinations of atoms:

- Form fields (Label + Input)
- Cards (Container + Text + Button)
- Search bars (Input + Button)

### Organisms

Complex components made of molecules and atoms:

- Headers
- Forms
- Modals
- Navigation menus

### Templates

Page-level layouts:

- Main layout
- Dashboard layout
- Authentication layout

## Component Development Guidelines

### File Structure

Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx       # Implementation
├── ComponentName.test.tsx  # Unit tests
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.module.css  # Scoped styles
├── index.ts                # Exports
└── types.ts                # TypeScript interfaces (if complex)
```

### Component Template

````tsx
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A versatile button component for user interactions.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
````

### Testing Requirements

- Minimum 80% code coverage
- Test all interactive behaviors
- Test accessibility with screen readers
- Include visual regression tests via Storybook
- Use React Testing Library best practices

Example test:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Storybook Stories

Create comprehensive stories for all component states:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};
```

### Accessibility Requirements

- All interactive elements must be keyboard accessible
- Include proper ARIA labels and roles
- Test with Storybook's a11y addon
- Support dark mode and high contrast themes
- Follow WCAG 2.1 Level AA standards
- Provide meaningful focus indicators
- Support screen readers

### Styling Guidelines

Use CSS Modules with CSS Variables:

```css
/* Button.module.css */
.button {
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background-color: var(--color-primary);
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}
```

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add/update Storybook stories
4. Request review from maintainers
5. Address review feedback
6. Squash commits if requested

## Code Review Guidelines

Reviewers will check for:

- Code quality and maintainability
- Test coverage
- Accessibility compliance
- Performance considerations
- Consistent code style
- Proper TypeScript types
- Documentation completeness

## Questions?

Open an issue or reach out to the maintainers.

Thank you for contributing! 🎉
