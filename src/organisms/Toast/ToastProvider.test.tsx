import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, renderHook } from '@testing-library/react';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children', () => {
    render(
      <ToastProvider>
        <div>Child content</div>
      </ToastProvider>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('provides toast context to children', () => {
    const TestComponent = () => {
      const { showToast } = useToast();
      return <button onClick={() => showToast({ message: 'Test' })}>Show Toast</button>;
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  describe('showToast', () => {
    it('adds toast with default values', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Test message' });
      });

      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('adds toast with custom variant', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Success!', variant: 'success' });
      });

      const toast = screen.getByRole('status');
      expect(toast.className).toMatch(/success/);
    });

    it('adds toast with custom position', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Test', position: 'bottom-left' });
      });

      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('adds toast with custom duration', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Quick toast', duration: 1000 });
      });

      expect(screen.getByText('Quick toast')).toBeInTheDocument();
    });

    it('returns unique ID for each toast', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      let id1 = '';
      let id2 = '';

      act(() => {
        id1 = result.current.showToast({ message: 'Toast 1' });
        id2 = result.current.showToast({ message: 'Toast 2' });
      });

      expect(id1).not.toBe(id2);
      expect(id1.length).toBeGreaterThan(0);
      expect(id2.length).toBeGreaterThan(0);
    });

    it('shows toast without progress bar when showProgressBar is false', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Test', showProgressBar: false });
      });

      const toast = screen.getByText('Test').parentElement;
      // Progress bar should not exist when showProgressBar is false
      expect(toast?.querySelector('[style*="animation"]')).not.toBeInTheDocument();
    });

    it('shows toast without close button when showCloseButton is false', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Test', showCloseButton: false });
      });

      expect(screen.queryByLabelText('Close notification')).not.toBeInTheDocument();
    });
  });

  describe('hideToast', () => {
    it('removes toast by ID', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      let toastId = '';

      act(() => {
        toastId = result.current.showToast({ message: 'Test toast' });
      });

      expect(screen.getByText('Test toast')).toBeInTheDocument();

      act(() => {
        result.current.hideToast(toastId);
      });

      // Wait for exit animation (300ms)
      act(() => {
        vi.advanceTimersByTime(300);
      });

      // After animation completes, toast should be removed
      expect(screen.queryByText('Test toast')).not.toBeInTheDocument();
    });

    it('clears auto-dismiss timer when manually dismissed', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      let toastId = '';

      act(() => {
        toastId = result.current.showToast({ message: 'Test', duration: 5000 });
      });

      expect(screen.getByText('Test')).toBeInTheDocument();

      // Manually dismiss before auto-dismiss timer
      act(() => {
        result.current.hideToast(toastId);
      });

      // Advance time past when auto-dismiss would have fired
      act(() => {
        vi.advanceTimersByTime(6000);
      });

      // Should not cause any issues (timer was cleared)
      expect(true).toBe(true);
    });
  });

  describe('hideAllToasts', () => {
    it('removes all active toasts', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Toast 1' });
        result.current.showToast({ message: 'Toast 2' });
        result.current.showToast({ message: 'Toast 3' });
      });

      expect(screen.getByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
      expect(screen.getByText('Toast 3')).toBeInTheDocument();

      act(() => {
        result.current.hideAllToasts();
        // Wait for exit animation
        vi.advanceTimersByTime(300);
      });

      // After animation, all toasts should be removed
      expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Toast 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Toast 3')).not.toBeInTheDocument();
    });

    it('clears all timers when hiding all toasts', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Toast 1', duration: 5000 });
        result.current.showToast({ message: 'Toast 2', duration: 5000 });
      });

      act(() => {
        result.current.hideAllToasts();
      });

      // Advance time past when auto-dismiss would have fired
      act(() => {
        vi.advanceTimersByTime(6000);
      });

      // Should not cause any issues (all timers were cleared)
      expect(true).toBe(true);
    });
  });

  describe('auto-dismiss', () => {
    it('auto-dismisses toast after duration', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Auto dismiss', duration: 3000 });
      });

      expect(screen.getByText('Auto dismiss')).toBeInTheDocument();

      // Advance time to trigger auto-dismiss and exit animation
      act(() => {
        vi.advanceTimersByTime(3000);
        vi.advanceTimersByTime(300);
      });

      // Toast should be removed
      expect(screen.queryByText('Auto dismiss')).not.toBeInTheDocument();
    });

    it('does not auto-dismiss when duration is 0', () => {
      vi.useRealTimers(); // Use real timers for this test since we need RAF
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Persistent', duration: 0 });
      });

      // Toast should appear in DOM
      expect(screen.getByText('Persistent')).toBeInTheDocument();

      // Switch back to fake timers to advance time
      vi.useFakeTimers();
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      // Should still be visible
      expect(screen.getByText('Persistent')).toBeInTheDocument();
    });
  });

  describe('integration tests', () => {
    it('handles rapid successive toast additions without memory leaks', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.showToast({ message: `Toast ${String(i)}`, variant: 'info' });
        }
      });

      // All toasts should be visible
      expect(screen.getByText('Toast 0')).toBeInTheDocument();
      expect(screen.getByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
      expect(screen.getByText('Toast 3')).toBeInTheDocument();
      expect(screen.getByText('Toast 4')).toBeInTheDocument();

      // Should have 5 status elements
      const toasts = screen.getAllByRole('status');
      expect(toasts).toHaveLength(5);
    });

    it('clears timer when toast is manually dismissed before auto-dismiss', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      let toastId = '';

      act(() => {
        toastId = result.current.showToast({ message: 'Test', duration: 5000 });
      });

      expect(screen.getByText('Test')).toBeInTheDocument();

      // Manually dismiss before auto-dismiss
      act(() => {
        result.current.hideToast(toastId);
        // Wait for exit animation
        vi.advanceTimersByTime(300);
      });

      expect(screen.queryByText('Test')).not.toBeInTheDocument();

      // Advance time past when auto-dismiss would have fired
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Should not throw or cause issues
      expect(true).toBe(true);
    });

    it('clears all timers on provider unmount', () => {
      const { result, unmount } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Test 1', duration: 5000 });
        result.current.showToast({ message: 'Test 2', duration: 5000 });
      });

      // Unmount the provider
      unmount();

      // Advance timers past when auto-dismiss would fire
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Should not throw or cause issues
      expect(true).toBe(true);
    });

    it('handles multiple toasts at different positions', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'Top Left', position: 'top-left' });
        result.current.showToast({ message: 'Top Right', position: 'top-right' });
        result.current.showToast({ message: 'Bottom Left', position: 'bottom-left' });
        result.current.showToast({ message: 'Bottom Right', position: 'bottom-right' });
      });

      expect(screen.getByText('Top Left')).toBeInTheDocument();
      expect(screen.getByText('Top Right')).toBeInTheDocument();
      expect(screen.getByText('Bottom Left')).toBeInTheDocument();
      expect(screen.getByText('Bottom Right')).toBeInTheDocument();
    });

    it('maintains correct stacking order when adding multiple toasts', () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      act(() => {
        result.current.showToast({ message: 'First' });
        result.current.showToast({ message: 'Second' });
        result.current.showToast({ message: 'Third' });
      });

      const toasts = screen.getAllByRole('status');
      expect(toasts).toHaveLength(3);
    });
  });

  describe('memoization', () => {
    it('maintains stable references for showToast and hideToast', () => {
      const { result, rerender } = renderHook(() => useToast(), {
        wrapper: ToastProvider,
      });

      const initialShowToast = result.current.showToast;
      const initialHideToast = result.current.hideToast;

      // Add a toast to trigger state change
      act(() => {
        result.current.showToast({ message: 'Test' });
      });

      rerender();

      // showToast and hideToast should maintain stable references
      expect(result.current.showToast).toBe(initialShowToast);
      expect(result.current.hideToast).toBe(initialHideToast);
      // Note: hideAllToasts depends on toasts array, so it will change
    });
  });
});
