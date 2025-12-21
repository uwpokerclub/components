import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('Select', () => {
  describe('Rendering', () => {
    it('renders select element', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders all options', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument();
    });

    it('renders placeholder as disabled first option', () => {
      render(<Select options={mockOptions} placeholder="Select a fruit" />);
      const placeholder = screen.getByRole('option', { name: 'Select a fruit' });
      expect(placeholder).toBeInTheDocument();
      expect(placeholder.disabled).toBe(true);
      expect(placeholder.value).toBe('');
    });

    it('applies custom className to container', () => {
      const { container } = render(<Select options={mockOptions} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders dropdown arrow icon', () => {
      const { container } = render(<Select options={mockOptions} />);
      const arrow = container.querySelector('svg');
      expect(arrow).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Select options={mockOptions} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('renders error state', () => {
      render(<Select options={mockOptions} error />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not have aria-invalid when error is false', () => {
      render(<Select options={mockOptions} error={false} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('renders default state without error', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('renders success state', () => {
      const { container } = render(<Select options={mockOptions} success />);
      const selectWrapper = container.querySelector('[class*="success"]');
      expect(selectWrapper).toBeInTheDocument();
    });

    it('error state takes precedence over success state', () => {
      const { container } = render(<Select options={mockOptions} error success />);
      const selectWrapper = container.querySelector('[class*="selectWrapper"]');
      expect(selectWrapper?.className).toMatch(/error/);
      expect(selectWrapper?.className).not.toMatch(/success/);
    });
  });

  describe('Size Variants', () => {
    it('renders medium size by default', () => {
      const { container } = render(<Select options={mockOptions} />);
      const selectWrapper = container.querySelector('[class*="medium"]');
      expect(selectWrapper).toBeInTheDocument();
    });

    it('renders small size variant', () => {
      const { container } = render(<Select options={mockOptions} size="small" />);
      const selectWrapper = container.querySelector('[class*="small"]');
      expect(selectWrapper).toBeInTheDocument();
    });

    it('renders large size variant', () => {
      const { container } = render(<Select options={mockOptions} size="large" />);
      const selectWrapper = container.querySelector('[class*="large"]');
      expect(selectWrapper).toBeInTheDocument();
    });
  });

  describe('Error Messages', () => {
    it('displays error message when provided', () => {
      render(<Select options={mockOptions} error errorMessage="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('links error message to select via aria-describedby', () => {
      render(<Select options={mockOptions} id="fruit" error errorMessage="Invalid selection" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'fruit-error');
      expect(screen.getByText('Invalid selection')).toHaveAttribute('id', 'fruit-error');
    });

    it('uses name as fallback for generating error id', () => {
      render(<Select options={mockOptions} name="fruit" error errorMessage="Required field" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'fruit-error');
    });

    it('error message has role="alert"', () => {
      render(<Select options={mockOptions} error errorMessage="Error text" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Error text');
    });

    it('does not render error message when errorMessage is not provided', () => {
      const { container } = render(<Select options={mockOptions} error />);
      expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
    });

    it('combines aria-describedby with existing value', () => {
      render(
        <div>
          <Select
            options={mockOptions}
            id="field"
            error
            errorMessage="Error"
            aria-describedby="helper-text"
          />
          <div id="helper-text">Helper text</div>
        </div>
      );
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'helper-text field-error');
    });
  });

  describe('Full Width', () => {
    it('renders full width when fullWidth prop is true', () => {
      const { container } = render(<Select options={mockOptions} fullWidth />);
      const containerElement = container.firstChild as HTMLElement;
      expect(containerElement.className).toMatch(/fullWidth/);
    });

    it('does not render full width by default', () => {
      const { container } = render(<Select options={mockOptions} />);
      expect(container.firstChild).not.toHaveClass('fullWidth');
    });
  });

  describe('Interactions', () => {
    it('allows selecting an option', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, 'banana');
      expect(select).toHaveValue('banana');
    });

    it('calls onChange when selection changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Select options={mockOptions} onChange={handleChange} />);

      await user.selectOptions(screen.getByRole('combobox'), 'cherry');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not allow interaction when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Select options={mockOptions} disabled onChange={handleChange} />);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, 'banana');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('supports focus and blur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Select options={mockOptions} onFocus={handleFocus} onBlur={handleBlur} />);

      const select = screen.getByRole('combobox');
      await user.click(select);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={mockOptions} data-testid="select1" />
          <Select options={mockOptions} data-testid="select2" />
        </div>
      );

      const select1 = screen.getByTestId('select1');
      const select2 = screen.getByTestId('select2');

      select1.focus();
      expect(select1).toHaveFocus();

      await user.tab();
      expect(select2).toHaveFocus();
    });
  });

  describe('Value Control', () => {
    it('supports controlled value', () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <Select options={mockOptions} value="apple" onChange={handleChange} />
      );
      expect(screen.getByRole('combobox')).toHaveValue('apple');

      rerender(<Select options={mockOptions} value="banana" onChange={handleChange} />);
      expect(screen.getByRole('combobox')).toHaveValue('banana');
    });

    it('supports uncontrolled value with defaultValue', () => {
      render(<Select options={mockOptions} defaultValue="cherry" />);
      expect(screen.getByRole('combobox')).toHaveValue('cherry');
    });

    it('defaults to empty string when placeholder is provided', () => {
      render(<Select options={mockOptions} placeholder="Choose..." />);
      const select = screen.getByRole('combobox');
      expect(select.value).toBe('');
    });
  });

  describe('Options Rendering', () => {
    it('renders empty options array', () => {
      render(<Select options={[]} />);
      const select = screen.getByRole('combobox');
      expect(select.children).toHaveLength(0);
    });

    it('renders options with same value and label', () => {
      const options = [{ value: 'test', label: 'test' }];
      render(<Select options={options} />);
      const option = screen.getByRole('option', { name: 'test' });
      expect(option.value).toBe('test');
    });

    it('renders options in provided order', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      const options = Array.from(select.children) as HTMLOptionElement[];

      // Skip placeholder if it exists
      const fruitOptions = options.filter((opt) => !opt.disabled);
      expect(fruitOptions[0].value).toBe('apple');
      expect(fruitOptions[1].value).toBe('banana');
      expect(fruitOptions[2].value).toBe('cherry');
    });
  });

  describe('Accessibility', () => {
    it('has proper role for select', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('supports id attribute', () => {
      render(<Select options={mockOptions} id="fruit-select" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'fruit-select');
    });

    it('supports aria-label', () => {
      render(<Select options={mockOptions} aria-label="Select a fruit" />);
      expect(screen.getByRole('combobox', { name: /select a fruit/i })).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Select options={mockOptions} aria-describedby="helper" />
          <div id="helper">Helper text</div>
        </div>
      );
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'helper');
    });

    it('sets aria-invalid when error is true', () => {
      render(<Select options={mockOptions} error />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports required attribute', () => {
      render(<Select options={mockOptions} required />);
      expect(screen.getByRole('combobox')).toBeRequired();
    });

    it('supports aria-required', () => {
      render(<Select options={mockOptions} aria-required="true" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
    });

    it('arrow has aria-hidden', () => {
      const { container } = render(<Select options={mockOptions} />);
      const arrow = container.querySelector('[aria-hidden="true"]');
      expect(arrow).toBeInTheDocument();
    });
  });

  describe('Forwarded Ref', () => {
    it('forwards ref to select element', () => {
      const ref = vi.fn();
      render(<Select options={mockOptions} ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLSelectElement));
    });
  });

  describe('Native Props', () => {
    it('spreads additional props to select element', () => {
      render(<Select options={mockOptions} data-testid="custom-select" data-custom="value" />);
      const select = screen.getByTestId('custom-select');
      expect(select).toHaveAttribute('data-custom', 'value');
    });

    it('supports name attribute', () => {
      render(<Select options={mockOptions} name="fruit" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('name', 'fruit');
    });

    it('supports autoComplete attribute', () => {
      render(<Select options={mockOptions} autoComplete="country" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('autocomplete', 'country');
    });

    it('supports form attribute', () => {
      render(<Select options={mockOptions} form="my-form" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('form', 'my-form');
    });
  });
});
