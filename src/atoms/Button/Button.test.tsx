import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with text content', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with default type="button"', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('renders with custom type', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders primary variant by default', () => {
      const { container } = render(<Button>Primary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/primary/);
    });

    it('renders secondary variant', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/secondary/);
    });

    it('renders tertiary variant', () => {
      const { container } = render(<Button variant="tertiary">Tertiary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/tertiary/);
    });

    it('renders destructive variant', () => {
      const { container } = render(<Button variant="destructive">Delete</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/destructive/);
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/medium/);
    });

    it('renders small size', () => {
      const { container } = render(<Button size="small">Small</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/small/);
    });

    it('renders large size', () => {
      const { container } = render(<Button size="large">Large</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/large/);
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders loading state', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('shows spinner in loading state', () => {
      const { container } = render(<Button loading>Loading</Button>);
      const spinner = container.querySelector('svg');
      expect(spinner).toBeInTheDocument();
    });

    it('hides icons when loading', () => {
      const { rerender } = render(
        <Button iconBefore={<span data-testid="icon">→</span>}>Click me</Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();

      rerender(
        <Button loading iconBefore={<span data-testid="icon">→</span>}>
          Click me
        </Button>
      );
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it('renders full width when fullWidth prop is true', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toMatch(/fullWidth/);
    });

    it('does not render full width by default', () => {
      const { container } = render(<Button>Normal Width</Button>);
      const button = container.querySelector('button');
      expect(button?.className).not.toMatch(/fullWidth/);
    });
  });

  describe('Icons', () => {
    it('renders icon before text', () => {
      render(<Button iconBefore={<span data-testid="before-icon">←</span>}>With Icon</Button>);
      expect(screen.getByTestId('before-icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders icon after text', () => {
      render(<Button iconAfter={<span data-testid="after-icon">→</span>}>With Icon</Button>);
      expect(screen.getByTestId('after-icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders icon-only button', () => {
      const { container } = render(
        <Button iconBefore={<span data-testid="icon">+</span>} aria-label="Add item" />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/iconOnly/);
    });

    it('warns when icon-only button lacks aria-label', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
        // Intentionally empty - suppressing console output during test
      });
      render(<Button iconBefore={<span data-testid="icon">+</span>} />);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Button: Icon-only buttons should have an aria-label for accessibility'
      );
      consoleSpy.mockRestore();
    });

    it('does not warn when icon-only button has aria-label', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
        // Intentionally empty - suppressing console output during test
      });
      render(<Button iconBefore={<span data-testid="icon">+</span>} aria-label="Add item" />);
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button onClick={handleClick} loading>
          Click me
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard navigation', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Loading Text', () => {
    it('displays default loading text for screen readers', () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('displays custom loading text for screen readers', () => {
      render(
        <Button loading loadingText="Submitting...">
          Submit
        </Button>
      );
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
    });

    it('shows loading text in icon-only button', () => {
      render(
        <Button
          loading
          loadingText="Processing"
          iconBefore={<span data-testid="icon">+</span>}
          aria-label="Add item"
        />
      );
      expect(screen.getByText('Processing')).toBeInTheDocument();
    });
  });

  describe('Empty Children Edge Cases', () => {
    it('treats empty string children as icon-only', () => {
      const { container } = render(
        <Button iconBefore={<span data-testid="icon">+</span>} aria-label="Add">
          {''}
        </Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/iconOnly/);
    });

    it('treats null children as icon-only', () => {
      const { container } = render(
        <Button iconBefore={<span data-testid="icon">+</span>} aria-label="Add">
          {null}
        </Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/iconOnly/);
    });

    it('treats undefined children as icon-only', () => {
      const { container } = render(
        <Button iconBefore={<span data-testid="icon">+</span>} aria-label="Add">
          {undefined}
        </Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/iconOnly/);
    });

    it('treats false children as icon-only', () => {
      const { container } = render(
        <Button iconBefore={<span data-testid="icon">+</span>} aria-label="Add">
          {false}
        </Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      const button = container.querySelector('button');
      expect(button?.className).toMatch(/iconOnly/);
    });
  });

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Custom label">Icon</Button>);
      expect(screen.getByRole('button', { name: /custom label/i })).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Button aria-describedby="description">Click me</Button>
          <div id="description">This is a description</div>
        </div>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'description');
    });

    it('sets aria-busy when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('does not set aria-busy when not loading', () => {
      render(<Button>Not Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'false');
    });
  });

  describe('Forwarded Ref', () => {
    it('forwards ref to button element', () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Click me</Button>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });
  });

  describe('Native Props', () => {
    it('spreads additional props to button element', () => {
      render(
        <Button data-testid="custom-button" data-custom="value">
          Click me
        </Button>
      );
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('data-custom', 'value');
    });

    it('supports form attribute', () => {
      render(
        <Button type="submit" form="my-form">
          Submit
        </Button>
      );
      expect(screen.getByRole('button')).toHaveAttribute('form', 'my-form');
    });
  });
});
