import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, type ComboboxOption } from './Combobox';

const mockOptions: ComboboxOption[] = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Cherry' },
  { value: '4', label: 'Date' },
  { value: '5', label: 'Elderberry' },
  { value: '6', label: 'Strawberry' },
];

describe('Combobox', () => {
  describe('Rendering', () => {
    it('renders combobox input', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} placeholder="Select fruit" />);
      expect(screen.getByPlaceholderText('Select fruit')).toBeInTheDocument();
    });

    it('renders with default placeholder', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('renders search icon', () => {
      const { container } = render(<Combobox options={mockOptions} onChange={vi.fn()} />);
      const searchIcon = container.querySelector('svg');
      expect(searchIcon).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Combobox options={mockOptions} onChange={vi.fn()} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders with full width', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} fullWidth />);
      const input = screen.getByRole('combobox');
      // The input should be wrapped in a container with fullWidth class
      const inputWrapper = input.closest('[class*="container"]');
      expect(inputWrapper?.className).toMatch(/fullWidth/);
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('renders error state', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} error />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('displays error message', () => {
      render(
        <Combobox
          options={mockOptions}
          onChange={vi.fn()}
          error
          errorMessage="Please select an option"
        />
      );
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });

    it('shows loading spinner when isLoading is true', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} isLoading />);
      expect(screen.getByLabelText('Loading options')).toBeInTheDocument();
    });

    it('does not show loading spinner when isLoading is false', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} isLoading={false} />);
      expect(screen.queryByLabelText('Loading options')).not.toBeInTheDocument();
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown on focus', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      await user.click(input);

      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('shows all options when dropdown opens', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      await user.click(screen.getByRole('combobox'));

      const listbox = screen.getByRole('listbox');
      const options = within(listbox).getAllByRole('option');
      expect(options).toHaveLength(6);
    });

    it('closes dropdown on escape key', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup({ delay: null });
      render(
        <div>
          <Combobox options={mockOptions} onChange={vi.fn()} />
          <button type="button">Outside</button>
        </div>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByText('Outside'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('does not open dropdown when disabled', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} disabled />);

      await user.click(screen.getByRole('combobox'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Client-side Filtering', () => {
    it('filters options based on input', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.type(input, 'ber');

      const listbox = screen.getByRole('listbox');
      const options = within(listbox).getAllByRole('option');
      expect(options).toHaveLength(2);
      expect(options[0]).toHaveTextContent('Elderberry');
      expect(options[1]).toHaveTextContent('Strawberry');
    });

    it('shows empty message when no options match', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.type(input, 'xyz');

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('shows custom empty message', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} emptyMessage="No fruits found" />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.type(input, 'xyz');

      expect(screen.getByText('No fruits found')).toBeInTheDocument();
    });

    it('filtering is case-insensitive', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.type(input, 'APPLE');

      const listbox = screen.getByRole('listbox');
      const options = within(listbox).getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('Apple');
    });
  });

  describe('Async Mode', () => {
    it('calls onSearch with debounced input', async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup({ delay: null });
      render(
        <Combobox
          options={mockOptions}
          onChange={vi.fn()}
          onSearch={handleSearch}
          debounceMs={300}
        />
      );

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.type(input, 'app');

      expect(handleSearch).not.toHaveBeenCalled();

      // Wait for debounce
      await waitFor(
        () => {
          expect(handleSearch).toHaveBeenCalledWith('app');
        },
        { timeout: 1000 }
      );
      expect(handleSearch).toHaveBeenCalledTimes(1);
    });

    it('does not filter options client-side in async mode', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} onSearch={vi.fn()} />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.type(input, 'xyz');

      const listbox = screen.getByRole('listbox');
      const options = within(listbox).getAllByRole('option');
      expect(options).toHaveLength(6);
    });

    it('respects custom debounce delay', async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup({ delay: null });
      render(
        <Combobox
          options={mockOptions}
          onChange={vi.fn()}
          onSearch={handleSearch}
          debounceMs={500}
        />
      );

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.type(input, 'test');

      // Should not be called immediately
      expect(handleSearch).not.toHaveBeenCalled();

      // Wait for debounce (500ms)
      await waitFor(
        () => {
          expect(handleSearch).toHaveBeenCalledWith('test');
        },
        { timeout: 1000 }
      );
    });
  });

  describe('Selection', () => {
    it('calls onChange when option is clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Banana'));

      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('displays selected option label', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} value="3" />);

      const input = screen.getByRole('combobox');
      expect(input).toHaveValue('Cherry');
    });

    it('closes dropdown after selection', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Apple'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('marks selected option with aria-selected', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} value="2" />);

      await user.click(screen.getByRole('combobox'));

      const bananaOption = screen.getByText('Banana');
      expect(bananaOption).toHaveAttribute('aria-selected', 'true');
    });

    it('keeps selected value visible on focus', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} value="1" />);

      const input = screen.getByRole('combobox');
      expect(input).toHaveValue('Apple');

      await user.click(input);
      // Should still show the selected value when opened
      expect(input).toHaveValue('Apple');
    });
  });

  describe('Clear Button', () => {
    it('shows clear button when value is selected', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} value="1" />);
      expect(screen.getByLabelText('Clear selection')).toBeInTheDocument();
    });

    it('does not show clear button when no value', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);
      expect(screen.queryByLabelText('Clear selection')).not.toBeInTheDocument();
    });

    it('does not show clear button when disabled', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} value="1" disabled />);
      expect(screen.queryByLabelText('Clear selection')).not.toBeInTheDocument();
    });

    it('does not show clear button when loading', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} value="1" isLoading />);
      expect(screen.queryByLabelText('Clear selection')).not.toBeInTheDocument();
    });

    it('clears selection when clear button is clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={handleChange} value="1" />);

      await user.click(screen.getByLabelText('Clear selection'));
      expect(handleChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown on arrow down', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      input.focus();
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens dropdown on arrow up', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      input.focus();
      await user.keyboard('{ArrowUp}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('highlights options with arrow keys', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.keyboard('{ArrowDown}');

      expect(input).toHaveAttribute('aria-activedescendant');
    });

    it('selects highlighted option on Enter', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={handleChange} />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith('1');
    });

    it('navigates up and down through options', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      await user.click(input);

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      expect(input.getAttribute('aria-activedescendant')).toContain('option-1');

      await user.keyboard('{ArrowUp}');
      expect(input.getAttribute('aria-activedescendant')).toContain('option-0');
    });
  });

  describe('Accessibility', () => {
    it('has combobox role', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('has aria-expanded attribute', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-expanded', 'false');

      await user.click(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls pointing to listbox', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} id="fruit-combo" />);

      const input = screen.getByRole('combobox');
      await user.click(input);

      expect(input).toHaveAttribute('aria-controls', 'fruit-combo-listbox');
      expect(screen.getByRole('listbox')).toHaveAttribute('id', 'fruit-combo-listbox');
    });

    it('has aria-autocomplete attribute', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('has autocomplete="off" to prevent browser autocomplete', () => {
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('autocomplete', 'off');
    });

    it('listbox has proper ARIA label', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toHaveAttribute('aria-label', 'Options');
    });

    it('options have proper ARIA attributes', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Combobox options={mockOptions} onChange={vi.fn()} />);

      await user.click(screen.getByRole('combobox'));

      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Forwarded Ref', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn();
      render(<Combobox ref={ref} options={mockOptions} onChange={vi.fn()} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });
  });
});
