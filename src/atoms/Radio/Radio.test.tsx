import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders without label', () => {
    render(<Radio />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Radio label="Option 1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('can be checked by clicking', async () => {
    const user = userEvent.setup();
    render(<Radio label="Test" />);

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    await user.click(radio);
    expect(radio).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Radio label="Test" onChange={handleChange} />);

    await user.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Radio label="Disabled" disabled />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  it('cannot be clicked when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Radio label="Disabled" disabled onChange={handleChange} />);

    await user.click(screen.getByRole('radio'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('supports controlled mode', () => {
    const { rerender } = render(<Radio checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('radio')).not.toBeChecked();

    rerender(<Radio checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('applies compact variant', () => {
    const { container } = render(<Radio variant="compact" />);
    const label = container.querySelector('label');
    expect(label?.className).toContain('compact');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<Radio ref={ref} />);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
  });

  it('supports custom className', () => {
    const { container } = render(<Radio className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('clicking label checks the radio', async () => {
    const user = userEvent.setup();
    render(<Radio label="Click me" />);

    await user.click(screen.getByText('Click me'));
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('supports additional input props', () => {
    render(<Radio data-testid="custom-radio" aria-label="Custom" />);
    const radio = screen.getByTestId('custom-radio');
    expect(radio).toHaveAttribute('aria-label', 'Custom');
  });

  it('supports name attribute for radio groups', () => {
    render(<Radio name="options" value="option1" />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('name', 'options');
    expect(radio).toHaveAttribute('value', 'option1');
  });

  describe('radio group behavior', () => {
    it('only one radio in a group can be selected', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Radio name="group" value="a" label="Option A" />
          <Radio name="group" value="b" label="Option B" />
          <Radio name="group" value="c" label="Option C" />
        </>
      );

      const [radioA, radioB, radioC] = screen.getAllByRole('radio');

      await user.click(radioA);
      expect(radioA).toBeChecked();
      expect(radioB).not.toBeChecked();
      expect(radioC).not.toBeChecked();

      await user.click(radioB);
      expect(radioA).not.toBeChecked();
      expect(radioB).toBeChecked();
      expect(radioC).not.toBeChecked();

      await user.click(radioC);
      expect(radioA).not.toBeChecked();
      expect(radioB).not.toBeChecked();
      expect(radioC).toBeChecked();
    });
  });
});
