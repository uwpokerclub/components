import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from './FormField';
import { Input } from '../../atoms/Input';
import { Select } from '../../atoms/Select';
import { Checkbox } from '../../atoms/Checkbox';

describe('FormField', () => {
  describe('Rendering', () => {
    it('renders with label and input', () => {
      render(
        <FormField label="Username" htmlFor="username">
          {(props) => <Input {...props} />}
        </FormField>
      );
      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <FormField label="Email" htmlFor="email" className="custom-class">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards additional props to container div', () => {
      render(
        <FormField label="Test" htmlFor="test" data-testid="form-field">
          {(props) => <Input {...props} />}
        </FormField>
      );
      expect(screen.getByTestId('form-field')).toBeInTheDocument();
    });

    it('forwards ref to container div', () => {
      const ref = { current: null };
      render(
        <FormField label="Test" htmlFor="test" ref={ref as React.RefObject<HTMLDivElement>}>
          {(props) => <Input {...props} />}
        </FormField>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Label', () => {
    it('links label to input via htmlFor', () => {
      render(
        <FormField label="Email" htmlFor="email-input">
          {(props) => <Input {...props} />}
        </FormField>
      );
      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('shows required indicator when required is true', () => {
      render(
        <FormField label="Password" htmlFor="password" required>
          {(props) => <Input {...props} type="password" />}
        </FormField>
      );
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('does not show required indicator when required is false', () => {
      render(
        <FormField label="Optional Field" htmlFor="optional">
          {(props) => <Input {...props} />}
        </FormField>
      );
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('applies size variant to label', () => {
      const { container } = render(
        <FormField label="Test" htmlFor="test" size="large">
          {(props) => <Input {...props} />}
        </FormField>
      );
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/large/);
    });

    it('applies disabled state to label', () => {
      const { container } = render(
        <FormField label="Test" htmlFor="test" disabled>
          {(props) => <Input {...props} />}
        </FormField>
      );
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/disabled/);
    });
  });

  describe('Hint Text', () => {
    it('displays hint text when provided', () => {
      render(
        <FormField label="Email" htmlFor="email" hint="We'll never share your email">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    });

    it('does not render hint text when not provided', () => {
      const { container } = render(
        <FormField label="Email" htmlFor="email">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const hintElements = container.querySelectorAll('[id$="-hint"]');
      expect(hintElements).toHaveLength(0);
    });

    it('links hint to input via aria-describedby', () => {
      render(
        <FormField label="Email" htmlFor="email" hint="Enter your email address">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('email-hint'));
    });

    it('assigns correct ID to hint element', () => {
      render(
        <FormField label="Email" htmlFor="email" hint="Hint text">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const hint = screen.getByText('Hint text');
      expect(hint).toHaveAttribute('id', 'email-hint');
    });
  });

  describe('Error State', () => {
    it('displays error message when provided', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Email is required">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('error message has role="alert"', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Invalid email">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Invalid email');
    });

    it('propagates error state to child input via aria-invalid', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Invalid email">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('links error to input via aria-describedby', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Invalid email">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('email-error'));
    });

    it('includes error icon in error message', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Invalid">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const errorDiv = screen.getByRole('alert');
      const icon = errorDiv.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not render error when not provided', () => {
      render(
        <FormField label="Email" htmlFor="email">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('assigns correct ID to error element', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Error text">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const errorDiv = screen.getByRole('alert');
      expect(errorDiv).toHaveAttribute('id', 'email-error');
    });
  });

  describe('ARIA Attributes', () => {
    it('combines hint and error in aria-describedby', () => {
      render(
        <FormField label="Email" htmlFor="email" hint="Enter valid email" error="Email is required">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toContain('email-hint');
      expect(describedBy).toContain('email-error');
    });

    it('sets aria-describedby with only hint when no error', () => {
      render(
        <FormField label="Email" htmlFor="email" hint="Your email address">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-hint');
    });

    it('sets aria-describedby with only error when no hint', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Required field">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
    });

    it('does not set aria-describedby when no hint or error', () => {
      render(
        <FormField label="Email" htmlFor="email">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toBeFalsy();
    });

    it('sets aria-invalid to true when error exists', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Invalid">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when no error', () => {
      render(
        <FormField label="Email" htmlFor="email">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('Render Props Pattern', () => {
    it('passes id prop to child via render function', () => {
      render(
        <FormField label="Username" htmlFor="my-input-id">
          {(props) => {
            expect(props.id).toBe('my-input-id');
            return <Input {...props} />;
          }}
        </FormField>
      );
    });

    it('passes aria-invalid when error exists', () => {
      render(
        <FormField label="Email" htmlFor="email" error="Required">
          {(props) => {
            expect(props['aria-invalid']).toBe(true);
            return <Input {...props} type="email" />;
          }}
        </FormField>
      );
    });

    it('passes aria-describedby with hint and error IDs', () => {
      render(
        <FormField label="Email" htmlFor="email" hint="Hint" error="Error">
          {(props) => {
            expect(props['aria-describedby']).toBe('email-hint email-error');
            return <Input {...props} type="email" />;
          }}
        </FormField>
      );
    });

    it('allows child to receive additional props', () => {
      render(
        <FormField label="Email" htmlFor="email">
          {(props) => (
            <Input {...props} type="email" placeholder="test@example.com" data-custom="value" />
          )}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'test@example.com');
      expect(input).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Child Component Integration', () => {
    it('works with Input atom', () => {
      render(
        <FormField label="Username" htmlFor="username">
          {(props) => <Input {...props} placeholder="Enter username" />}
        </FormField>
      );
      expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    });

    it('works with Select atom', () => {
      render(
        <FormField label="Country" htmlFor="country">
          {(props) => <Select {...props} options={[{ value: 'us', label: 'United States' }]} />}
        </FormField>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('works with Checkbox atom', () => {
      render(
        <FormField label="Agreement" htmlFor="agreement">
          {(props) => <Checkbox {...props} label="I agree to terms" />}
        </FormField>
      );
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('preserves child input props', () => {
      render(
        <FormField label="Email" htmlFor="email">
          {(props) => <Input {...props} type="email" placeholder="test@example.com" disabled />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'test@example.com');
      expect(input).toBeDisabled();
    });
  });

  describe('Full Width Support', () => {
    it('child input can be full width', () => {
      render(
        <FormField label="Email" htmlFor="email">
          {(props) => <Input {...props} type="email" fullWidth />}
        </FormField>
      );
      const input = screen.getByRole('textbox');
      const container = input.closest('[class*="container"]');
      expect(container?.className).toMatch(/fullWidth/);
    });
  });

  describe('User Interactions', () => {
    it('clicking label focuses input', async () => {
      const user = userEvent.setup();
      render(
        <FormField label="Username" htmlFor="username">
          {(props) => <Input {...props} />}
        </FormField>
      );

      await user.click(screen.getByText('Username'));
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('user can type in input', async () => {
      const user = userEvent.setup();
      render(
        <FormField label="Name" htmlFor="name">
          {(props) => <Input {...props} />}
        </FormField>
      );

      const input = screen.getByRole('textbox');
      await user.type(input, 'John Doe');
      expect(input).toHaveValue('John Doe');
    });
  });

  describe('Size Variants', () => {
    it('applies small size to label', () => {
      const { container } = render(
        <FormField label="Small" htmlFor="small" size="small">
          {(props) => <Input {...props} />}
        </FormField>
      );
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/small/);
    });

    it('applies medium size to label by default', () => {
      const { container } = render(
        <FormField label="Medium" htmlFor="medium">
          {(props) => <Input {...props} />}
        </FormField>
      );
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/medium/);
    });

    it('applies large size to label', () => {
      const { container } = render(
        <FormField label="Large" htmlFor="large" size="large">
          {(props) => <Input {...props} />}
        </FormField>
      );
      const label = container.querySelector('label');
      expect(label?.className).toMatch(/large/);
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(
        <FormField label="Email" htmlFor="email" hint="Enter valid email" error="Required" required>
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );

      // Label
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Email').tagName).toBe('LABEL');

      // Hint
      expect(screen.getByText('Enter valid email')).toBeInTheDocument();

      // Input
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      // Error with role="alert"
      expect(screen.getByRole('alert')).toBeInTheDocument();

      // Required indicator
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('error icon is hidden from screen readers', () => {
      const { container } = render(
        <FormField label="Email" htmlFor="email" error="Invalid">
          {(props) => <Input {...props} type="email" />}
        </FormField>
      );
      const icon = container.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
