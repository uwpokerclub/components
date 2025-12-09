import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  describe('Rendering', () => {
    it('renders with text content', () => {
      render(<Label>Username</Label>);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('renders with children elements', () => {
      render(
        <Label>
          Email <span data-testid="extra">*</span>
        </Label>
      );
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByTestId('extra')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Label className="custom-class">Custom Label</Label>);
      const label = screen.getByText('Custom Label');
      expect(label).toHaveClass('custom-class');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      const { container } = render(<Label>Medium</Label>);
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/medium/);
    });

    it('renders small size', () => {
      const { container } = render(<Label size="small">Small</Label>);
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/small/);
    });

    it('renders large size', () => {
      const { container } = render(<Label size="large">Large</Label>);
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/large/);
    });
  });

  describe('Required Indicator', () => {
    it('does not show required indicator by default', () => {
      render(<Label>Username</Label>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('shows required indicator when required prop is true', () => {
      render(<Label required>Username</Label>);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('required indicator is aria-hidden for accessibility', () => {
      render(<Label required>Username</Label>);
      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveAttribute('aria-hidden', 'true');
    });

    it('required indicator appears after content', () => {
      const { container } = render(<Label required>Username</Label>);
      const label = container.querySelector('label');
      expect(label?.textContent).toBe('Username*');
    });
  });

  describe('Disabled State', () => {
    it('applies disabled class when disabled prop is true', () => {
      const { container } = render(<Label disabled>Disabled Label</Label>);
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/disabled/);
    });

    it('does not apply disabled class by default', () => {
      const { container } = render(<Label>Normal Label</Label>);
      const label = container.querySelector('label');
      expect(label?.className).not.toMatch(/disabled/);
    });

    it('applies disabled styling to required indicator', () => {
      const { container } = render(
        <Label disabled required>
          Disabled Required
        </Label>
      );
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/disabled/);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Label Association', () => {
    it('supports htmlFor attribute', () => {
      render(<Label htmlFor="username-input">Username</Label>);
      const label = screen.getByText('Username');
      expect(label).toHaveAttribute('for', 'username-input');
    });

    it('works with associated input via htmlFor', () => {
      render(
        <div>
          <Label htmlFor="test-input">Test Label</Label>
          <input id="test-input" type="text" />
        </div>
      );
      const label = screen.getByText('Test Label');
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });
  });

  describe('Accessibility', () => {
    it('renders as a label element', () => {
      const { container } = render(<Label>Accessible Label</Label>);
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label?.tagName).toBe('LABEL');
    });

    it('supports aria-label', () => {
      render(<Label aria-label="Custom accessible label">Visible Text</Label>);
      const label = screen.getByLabelText('Custom accessible label');
      expect(label).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Label aria-describedby="description">Label</Label>
          <div id="description">This is a description</div>
        </div>
      );
      const label = screen.getByText('Label');
      expect(label).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Forwarded Ref', () => {
    it('forwards ref to label element', () => {
      const ref = vi.fn();
      render(<Label ref={ref}>Label with Ref</Label>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLLabelElement));
    });
  });

  describe('Native Props', () => {
    it('spreads additional props to label element', () => {
      render(
        <Label data-testid="custom-label" data-custom="value">
          Label
        </Label>
      );
      const label = screen.getByTestId('custom-label');
      expect(label).toHaveAttribute('data-custom', 'value');
    });

    it('supports id attribute', () => {
      render(<Label id="custom-id">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('id', 'custom-id');
    });

    it('supports title attribute', () => {
      render(<Label title="Tooltip text">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('title', 'Tooltip text');
    });
  });

  describe('Complex Children', () => {
    it('renders multiple child elements', () => {
      render(
        <Label>
          <span>First</span>
          <span>Second</span>
        </Label>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('handles mixed text and element children', () => {
      render(
        <Label>
          Username <strong data-testid="strong">Required</strong>
        </Label>
      );
      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByTestId('strong')).toBeInTheDocument();
    });
  });

  describe('Size and Required Combinations', () => {
    it('renders small size with required indicator', () => {
      const { container } = render(
        <Label size="small" required>
          Small Required
        </Label>
      );
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/small/);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('renders large size with disabled and required', () => {
      const { container } = render(
        <Label size="large" disabled required>
          Large Disabled Required
        </Label>
      );
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/large/);
      expect(label?.className).toMatch(/disabled/);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });
});
