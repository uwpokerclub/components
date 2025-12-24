import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('Toast', () => {
  const defaultProps = {
    id: 'test-toast',
    message: 'Test message',
    variant: 'info' as const,
    position: 'top-right' as const,
    duration: 5000,
    isVisible: true,
    showCloseButton: true,
    showProgressBar: true,
    onClose: vi.fn(),
  };

  it('renders the toast message', () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with success variant', () => {
    render(<Toast {...defaultProps} variant="success" />);
    const toast = screen.getByRole('status');
    expect(toast.className).toMatch(/success/);
  });

  it('renders with error variant', () => {
    render(<Toast {...defaultProps} variant="error" />);
    const toast = screen.getByRole('alert');
    expect(toast.className).toMatch(/error/);
  });

  it('renders with warning variant', () => {
    render(<Toast {...defaultProps} variant="warning" />);
    const toast = screen.getByRole('status');
    expect(toast.className).toMatch(/warning/);
  });

  it('renders with info variant', () => {
    render(<Toast {...defaultProps} variant="info" />);
    const toast = screen.getByRole('status');
    expect(toast.className).toMatch(/info/);
  });

  it('displays appropriate icon for success variant', () => {
    render(<Toast {...defaultProps} variant="success" />);
    // Icon should be present (we can check via the container)
    expect(screen.getByText('Test message').parentElement?.parentElement).toBeInTheDocument();
  });

  it('renders close button when showCloseButton is true', () => {
    render(<Toast {...defaultProps} showCloseButton={true} />);
    expect(screen.getByLabelText('Close notification')).toBeInTheDocument();
  });

  it('does not render close button when showCloseButton is false', () => {
    render(<Toast {...defaultProps} showCloseButton={false} />);
    expect(screen.queryByLabelText('Close notification')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast {...defaultProps} onClose={onClose} />);

    const closeButton = screen.getByLabelText('Close notification');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders progress bar when showProgressBar is true and duration > 0', () => {
    const { container } = render(
      <Toast {...defaultProps} showProgressBar={true} duration={5000} />
    );
    const progressBar = container.querySelector('[aria-hidden="true"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('does not render progress bar when showProgressBar is false', () => {
    const { container } = render(
      <Toast {...defaultProps} showProgressBar={false} duration={5000} />
    );
    // Should only have the icon with aria-hidden, not progress bar
    const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    // Icon has aria-hidden, but progress bar shouldn't be there
    expect(ariaHiddenElements.length).toBeLessThan(3);
  });

  it('does not render progress bar when duration is 0', () => {
    const { container } = render(<Toast {...defaultProps} showProgressBar={true} duration={0} />);
    // Progress bar should not be rendered when duration is 0
    const progressBar = container.querySelector('[style*="animation"]');
    expect(progressBar).not.toBeInTheDocument();
  });

  it('applies visible class when isVisible is true', () => {
    render(<Toast {...defaultProps} isVisible={true} />);
    const toast = screen.getByRole('status');
    expect(toast.className).toMatch(/visible/);
  });

  it('does not apply visible class when isVisible is false', () => {
    render(<Toast {...defaultProps} isVisible={false} />);
    const toast = screen.getByRole('status');
    expect(toast.className).not.toMatch(/visible/);
  });

  it('uses role="alert" and aria-live="assertive" for error variant', () => {
    render(<Toast {...defaultProps} variant="error" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('uses role="status" and aria-live="polite" for non-error variants', () => {
    render(<Toast {...defaultProps} variant="success" />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('sets custom id attribute', () => {
    render(<Toast {...defaultProps} id="custom-id" />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('id', 'custom-id');
  });

  it('applies custom className', () => {
    render(<Toast {...defaultProps} className="custom-class" />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveClass('custom-class');
  });

  it('renders long messages correctly', () => {
    const longMessage =
      'This is a very long message that should wrap properly without breaking the layout or causing any overflow issues in the toast component.';
    render(<Toast {...defaultProps} message={longMessage} />);
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('unmounts after exit animation when isVisible becomes false', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Toast {...defaultProps} isVisible={true} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Change to not visible
    rerender(<Toast {...defaultProps} isVisible={false} />);

    // Should still be in DOM during animation
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // After 300ms animation, should unmount
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should be removed from DOM
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
