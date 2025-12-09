import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with default type="text"', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('renders with custom type', () => {
      render(<Input type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('renders password input', () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('renders number input', () => {
      const { container } = render(<Input type="number" />);
      const input = container.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
    });

    it('renders search input', () => {
      render(<Input type="search" />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('applies custom className to container', () => {
      const { container } = render(<Input className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders error state', () => {
      render(<Input error />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not have aria-invalid when error is false', () => {
      render(<Input error={false} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('renders default state without error', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Error Messages', () => {
    it('displays error message when provided', () => {
      render(<Input error errorMessage="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('links error message to input via aria-describedby', () => {
      render(<Input id="email" error errorMessage="Invalid email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      expect(screen.getByText('Invalid email')).toHaveAttribute('id', 'email-error');
    });

    it('uses name as fallback for generating error id', () => {
      render(<Input name="username" error errorMessage="Username taken" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'username-error');
    });

    it('error message has role="alert"', () => {
      render(<Input error errorMessage="Error text" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Error text');
    });

    it('does not render error message when errorMessage is not provided', () => {
      const { container } = render(<Input error />);
      expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
    });

    it('combines aria-describedby with existing value', () => {
      render(
        <div>
          <Input id="field" error errorMessage="Error" aria-describedby="helper-text" />
          <div id="helper-text">Helper text</div>
        </div>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'helper-text field-error');
    });
  });

  describe('Full Width', () => {
    it('renders full width when fullWidth prop is true', () => {
      const { container } = render(<Input fullWidth />);
      const containerElement = container.firstChild as HTMLElement;
      expect(containerElement.className).toMatch(/fullWidth/);
    });

    it('does not render full width by default', () => {
      const { container } = render(<Input />);
      expect(container.firstChild).not.toHaveClass('fullWidth');
    });
  });

  describe('Prefix and Suffix', () => {
    it('renders prefix element', () => {
      render(<Input prefix={<span data-testid="prefix">@</span>} />);
      expect(screen.getByTestId('prefix')).toBeInTheDocument();
      expect(screen.getByText('@')).toBeInTheDocument();
    });

    it('renders suffix element', () => {
      render(<Input suffix={<span data-testid="suffix">✓</span>} />);
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('renders both prefix and suffix', () => {
      render(
        <Input
          prefix={<span data-testid="prefix">$</span>}
          suffix={<span data-testid="suffix">.00</span>}
        />
      );
      expect(screen.getByTestId('prefix')).toBeInTheDocument();
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });

    it('renders icon as prefix', () => {
      const SearchIcon = () => (
        <svg data-testid="search-icon">
          <path />
        </svg>
      );
      render(<Input prefix={<SearchIcon />} />);
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders button as suffix', () => {
      render(
        <Input
          suffix={
            <button type="button" data-testid="clear-button">
              Clear
            </button>
          }
        />
      );
      expect(screen.getByTestId('clear-button')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('accepts text input', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange when input value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'test');
      expect(handleChange).toHaveBeenCalledTimes(4); // Once per character
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');
      expect(input).toHaveValue('');
    });

    it('supports focus and blur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Input data-testid="input1" />
          <Input data-testid="input2" />
        </div>
      );

      const input1 = screen.getByTestId('input1');
      const input2 = screen.getByTestId('input2');

      input1.focus();
      expect(input1).toHaveFocus();

      await user.tab();
      expect(input2).toHaveFocus();
    });
  });

  describe('Value Control', () => {
    it('supports controlled value', () => {
      const handleChange = vi.fn();
      const { rerender } = render(<Input value="initial" onChange={handleChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');

      rerender(<Input value="updated" onChange={handleChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('updated');
    });

    it('supports uncontrolled value with defaultValue', () => {
      render(<Input defaultValue="default text" />);
      expect(screen.getByRole('textbox')).toHaveValue('default text');
    });

    it('clears value when cleared', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="initial" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveValue('initial');
      await user.clear(input);
      expect(input).toHaveValue('');
    });
  });

  describe('Accessibility', () => {
    it('has proper role for text input', () => {
      render(<Input type="text" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has proper role for search input', () => {
      render(<Input type="search" />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('supports id attribute', () => {
      render(<Input id="email-input" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email-input');
    });

    it('supports aria-label', () => {
      render(<Input aria-label="Email address" />);
      expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Input aria-describedby="helper" />
          <div id="helper">Helper text</div>
        </div>
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'helper');
    });

    it('sets aria-invalid when error is true', () => {
      render(<Input error />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports required attribute', () => {
      render(<Input required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('supports aria-required', () => {
      render(<Input aria-required="true" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Forwarded Ref', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });
  });

  describe('Native Props', () => {
    it('spreads additional props to input element', () => {
      render(<Input data-testid="custom-input" data-custom="value" />);
      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('data-custom', 'value');
    });

    it('supports name attribute', () => {
      render(<Input name="username" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
    });

    it('supports autocomplete attribute', () => {
      render(<Input autoComplete="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email');
    });

    it('supports maxLength attribute', () => {
      render(<Input maxLength={10} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10');
    });

    it('supports pattern attribute', () => {
      render(<Input pattern="[0-9]*" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[0-9]*');
    });

    it('supports readOnly attribute', () => {
      render(<Input readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readOnly');
    });
  });

  describe('Input Types Specific Behavior', () => {
    it('number input accepts numeric values', async () => {
      const user = userEvent.setup();
      const { container } = render(<Input type="number" />);
      const input = container.querySelector('input[type="number"]');

      if (input) {
        await user.type(input, '123');
        expect(input).toHaveValue(123);
      }
    });

    it('email input accepts email format', async () => {
      const user = userEvent.setup();
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test@example.com');
      expect(input).toHaveValue('test@example.com');
    });

    it('password input hides text', () => {
      const { container } = render(<Input type="password" defaultValue="secret" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toHaveAttribute('type', 'password');
      expect(input).toHaveValue('secret');
    });
  });
});
