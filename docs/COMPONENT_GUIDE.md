# Component Development Guide

This guide provides detailed instructions for creating new components in the @uwpokerclub/components library.

## Table of Contents

- [Creating a New Component](#creating-a-new-component)
- [Component Categories](#component-categories)
- [Testing Guidelines](#testing-guidelines)
- [Styling Best Practices](#styling-best-practices)
- [Accessibility Checklist](#accessibility-checklist)

## Creating a New Component

### 1. Determine Component Category

First, determine which Atomic Design category your component belongs to:

- **Atom**: Cannot be broken down further (Button, Input, Icon)
- **Molecule**: Combination of 2-3 atoms (FormField, Card)
- **Organism**: Complex component with multiple molecules (Header, Modal)
- **Template**: Page layout (MainLayout, DashboardLayout)

### 2. Generate Component Files

Create a new directory in the appropriate category:

```bash
# For an atom
mkdir -p src/atoms/YourComponent

# For a molecule
mkdir -p src/molecules/YourComponent

# For an organism
mkdir -p src/organisms/YourComponent

# For a template
mkdir -p src/templates/YourComponent
```

### 3. Create Component Implementation

`YourComponent.tsx`:

````tsx
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './YourComponent.module.css';

export interface YourComponentProps extends ComponentPropsWithoutRef<'div'> {
  /** Component variant */
  variant?: 'default' | 'special';
  /** Component children */
  children?: ReactNode;
}

/**
 * YourComponent provides [brief description of functionality].
 *
 * @example
 * ```tsx
 * <YourComponent variant="special">
 *   Content here
 * </YourComponent>
 * ```
 */
export function YourComponent({
  variant = 'default',
  children,
  className,
  ...props
}: YourComponentProps) {
  return (
    <div className={`${styles.container} ${styles[variant]} ${className || ''}`} {...props}>
      {children}
    </div>
  );
}
````

### 4. Create Styles

`YourComponent.module.css`:

```css
.container {
  /* Use design tokens */
  font-family: var(--font-family);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background);
}

.default {
  border: 1px solid var(--color-border);
}

.special {
  border: 2px solid var(--color-primary);
  box-shadow: var(--shadow-md);
}
```

### 5. Write Tests

`YourComponent.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('renders children', () => {
    render(<YourComponent>Test Content</YourComponent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<YourComponent variant="special">Content</YourComponent>);
    expect(container.firstChild).toHaveClass('special');
  });

  it('forwards additional props', () => {
    render(<YourComponent data-testid="custom">Content</YourComponent>);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  it('is accessible', () => {
    const { container } = render(<YourComponent>Content</YourComponent>);
    // Add accessibility tests
    expect(container.firstChild).toBeVisible();
  });
});
```

### 6. Create Storybook Stories

`YourComponent.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Atoms/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'special'],
      description: 'Visual variant of the component',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default YourComponent',
  },
};

export const Special: Story = {
  args: {
    variant: 'special',
    children: 'Special variant',
  },
};

export const WithCustomStyling: Story = {
  args: {
    children: 'Custom styled',
    style: { border: '2px dashed red' },
  },
};
```

### 7. Create Index File

`index.ts`:

```tsx
export { YourComponent } from './YourComponent';
export type { YourComponentProps } from './YourComponent';
```

### 8. Export from Main Index

Update `src/index.ts`:

```tsx
// Atoms
export { YourComponent } from './atoms/YourComponent';
export type { YourComponentProps } from './atoms/YourComponent';
```

## Component Categories

### Atoms

**Purpose**: Smallest, indivisible UI elements

**Examples**:

- Button
- Input
- Label
- Icon
- Badge
- Avatar

**Guidelines**:

- Single responsibility
- Highly reusable
- Minimal dependencies
- Well-documented props

### Molecules

**Purpose**: Simple combinations of atoms

**Examples**:

- FormField (Label + Input + ErrorMessage)
- Card (Container + Title + Content + Footer)
- SearchBar (Input + Button)

**Guidelines**:

- Combine 2-4 atoms
- Single, focused purpose
- Self-contained functionality

### Organisms

**Purpose**: Complex, feature-rich components

**Examples**:

- Header (Logo + Navigation + UserMenu)
- Modal (Overlay + Card + Buttons)
- DataTable (Headers + Rows + Pagination)

**Guidelines**:

- Can contain atoms, molecules, and other organisms
- May have internal state
- Complex interactions

### Templates

**Purpose**: Page-level layouts

**Examples**:

- MainLayout
- DashboardLayout
- AuthenticationLayout

**Guidelines**:

- Define page structure
- No business logic
- Flexible slots for content

## Testing Guidelines

### Unit Tests

Test all component behaviors:

```tsx
describe('Button', () => {
  // Rendering
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // Interactions
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
  });

  // Props
  it('applies variant styles', () => {
    const { container } = render(<Button variant="secondary">Click</Button>);
    expect(container.firstChild).toHaveClass('secondary');
  });

  // Edge cases
  it('handles disabled state', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // Accessibility
  it('has proper ARIA attributes', () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });
});
```

### Coverage Requirements

- **Minimum**: 80% overall coverage
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## Styling Best Practices

### Use CSS Modules

```css
/* Component.module.css */
.container {
  /* Your styles */
}
```

### Use Design Tokens

Always use CSS variables defined in `src/styles/tokens.css`:

```css
.button {
  /* Colors */
  background-color: var(--color-primary);
  color: var(--color-text-inverse);

  /* Spacing */
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-md);

  /* Typography */
  font-family: var(--font-family);
  font-size: var(--font-size-md);

  /* Borders */
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);

  /* Shadows */
  box-shadow: var(--shadow-sm);
}
```

### Responsive Design

```css
.container {
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-lg);
  }
}
```

### Dark Mode Support

```css
.card {
  background-color: var(--color-background);
  color: var(--color-text);
}

[data-theme='dark'] .card {
  background-color: var(--color-background-dark);
  color: var(--color-text-dark);
}
```

## Accessibility Checklist

### Keyboard Navigation

- [ ] All interactive elements are keyboard accessible
- [ ] Logical tab order
- [ ] Visible focus indicators
- [ ] Escape key closes modals/menus

### ARIA Attributes

- [ ] Proper roles (`role="button"`, `role="dialog"`, etc.)
- [ ] Labels (`aria-label`, `aria-labelledby`)
- [ ] Descriptions (`aria-describedby`)
- [ ] States (`aria-expanded`, `aria-checked`, `aria-disabled`)
- [ ] Live regions (`aria-live`) for dynamic content

### Screen Readers

- [ ] All content is readable
- [ ] Images have alt text
- [ ] Icons have labels
- [ ] Form inputs have labels
- [ ] Error messages are announced

### Color & Contrast

- [ ] Minimum 4.5:1 contrast ratio for text
- [ ] Minimum 3:1 contrast ratio for UI components
- [ ] Color is not the only indicator

### Testing

```tsx
it('is keyboard accessible', async () => {
  const user = userEvent.setup();
  render(<Button>Click me</Button>);

  // Tab to button
  await user.tab();
  expect(screen.getByRole('button')).toHaveFocus();

  // Activate with keyboard
  await user.keyboard('{Enter}');
  // Assert expected behavior
});

it('has proper ARIA attributes', () => {
  render(
    <Button aria-label="Close" aria-pressed="false">
      X
    </Button>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label', 'Close');
  expect(button).toHaveAttribute('aria-pressed', 'false');
});
```

## Best Practices Summary

1. **Follow Atomic Design** - Place components in the correct category
2. **Use TypeScript** - Provide comprehensive type definitions
3. **Document thoroughly** - JSDoc comments and Storybook stories
4. **Test comprehensively** - Unit tests and accessibility tests
5. **Style with tokens** - Use CSS variables for consistency
6. **Ensure accessibility** - WCAG 2.1 Level AA compliance
7. **Keep it simple** - Single responsibility principle
8. **Make it reusable** - Generic and flexible APIs

## Questions?

Refer to existing components for examples or open an issue for guidance.
