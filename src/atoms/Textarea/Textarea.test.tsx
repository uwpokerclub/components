import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders textarea element', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies custom className to container', () => {
      const { container } = render(<Textarea className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders with placeholder', () => {
      render(<Textarea placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });
  });

  describe('Rows', () => {
    it('renders with default rows of 3', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3');
    });

    it('renders with custom rows value', () => {
      render(<Textarea rows={5} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
    });

    it('renders with single row', () => {
      render(<Textarea rows={1} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '1');
    });

    it('renders with large rows value', () => {
      render(<Textarea rows={10} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '10');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Textarea disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders error state', () => {
      render(<Textarea error />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not have aria-invalid when error is false', () => {
      render(<Textarea error={false} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('renders default state without error', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Error Messages', () => {
    it('displays error message when provided', () => {
      render(<Textarea error errorMessage="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('links error message to textarea via aria-describedby', () => {
      render(<Textarea id="notes" error errorMessage="Invalid content" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'notes-error');
      expect(screen.getByText('Invalid content')).toHaveAttribute('id', 'notes-error');
    });

    it('uses name as fallback for generating error id', () => {
      render(<Textarea name="description" error errorMessage="Too short" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'description-error');
    });

    it('error message has role="alert"', () => {
      render(<Textarea error errorMessage="Error text" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Error text');
    });

    it('does not render error message when errorMessage is not provided', () => {
      const { container } = render(<Textarea error />);
      expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
    });

    it('combines aria-describedby with existing value', () => {
      render(
        <div>
          <Textarea id="field" error errorMessage="Error" aria-describedby="helper-text" />
          <div id="helper-text">Helper text</div>
        </div>
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'helper-text field-error');
    });
  });

  describe('Full Width', () => {
    it('renders full width when fullWidth prop is true', () => {
      const { container } = render(<Textarea fullWidth />);
      const containerElement = container.firstChild as HTMLElement;
      expect(containerElement.className).toMatch(/fullWidth/);
    });

    it('does not render full width by default', () => {
      const { container } = render(<Textarea />);
      expect(container.firstChild).not.toHaveClass('fullWidth');
    });
  });

  describe('Interactions', () => {
    it('accepts text input', async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'Hello World');
      expect(textarea).toHaveValue('Hello World');
    });

    it('accepts multiline text input', async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'Line 1{enter}Line 2');
      expect(textarea).toHaveValue('Line 1\nLine 2');
    });

    it('calls onChange when textarea value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'test');
      expect(handleChange).toHaveBeenCalledTimes(4);
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      render(<Textarea disabled />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'test');
      expect(textarea).toHaveValue('');
    });

    it('supports focus and blur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />);

      const textarea = screen.getByRole('textbox');
      await user.click(textarea);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Textarea data-testid="textarea1" />
          <Textarea data-testid="textarea2" />
        </div>
      );

      const textarea1 = screen.getByTestId('textarea1');
      const textarea2 = screen.getByTestId('textarea2');

      textarea1.focus();
      expect(textarea1).toHaveFocus();

      await user.tab();
      expect(textarea2).toHaveFocus();
    });
  });

  describe('Value Control', () => {
    it('supports controlled value', () => {
      const handleChange = vi.fn();
      const { rerender } = render(<Textarea value="initial" onChange={handleChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');

      rerender(<Textarea value="updated" onChange={handleChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('updated');
    });

    it('supports uncontrolled value with defaultValue', () => {
      render(<Textarea defaultValue="default text" />);
      expect(screen.getByRole('textbox')).toHaveValue('default text');
    });

    it('clears value when cleared', async () => {
      const user = userEvent.setup();
      render(<Textarea defaultValue="initial" />);
      const textarea = screen.getByRole('textbox');

      expect(textarea).toHaveValue('initial');
      await user.clear(textarea);
      expect(textarea).toHaveValue('');
    });
  });

  describe('Accessibility', () => {
    it('has proper role for textarea', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('supports id attribute', () => {
      render(<Textarea id="notes-input" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'notes-input');
    });

    it('supports aria-label', () => {
      render(<Textarea aria-label="Notes" />);
      expect(screen.getByRole('textbox', { name: /notes/i })).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Textarea aria-describedby="helper" />
          <div id="helper">Helper text</div>
        </div>
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'helper');
    });

    it('sets aria-invalid when error is true', () => {
      render(<Textarea error />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports required attribute', () => {
      render(<Textarea required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('supports aria-required', () => {
      render(<Textarea aria-required="true" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Forwarded Ref', () => {
    it('forwards ref to textarea element', () => {
      const ref = vi.fn();
      render(<Textarea ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
    });
  });

  describe('Native Props', () => {
    it('spreads additional props to textarea element', () => {
      render(<Textarea data-testid="custom-textarea" data-custom="value" />);
      const textarea = screen.getByTestId('custom-textarea');
      expect(textarea).toHaveAttribute('data-custom', 'value');
    });

    it('supports name attribute', () => {
      render(<Textarea name="description" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'description');
    });

    it('supports maxLength attribute', () => {
      render(<Textarea maxLength={500} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '500');
    });

    it('supports readOnly attribute', () => {
      render(<Textarea readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readOnly');
    });

    it('supports cols attribute', () => {
      render(<Textarea cols={50} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('cols', '50');
    });

    it('supports wrap attribute', () => {
      render(<Textarea wrap="hard" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('wrap', 'hard');
    });
  });
});
