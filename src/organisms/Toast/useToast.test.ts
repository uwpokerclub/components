import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToast } from './useToast';
import { ToastProvider } from './ToastProvider';

describe('useToast', () => {
  it('throws error when used outside ToastProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = () => {
      // Intentionally empty to suppress error output
    };

    expect(() => {
      renderHook(() => useToast());
    }).toThrow('useToast must be used within a ToastProvider');

    console.error = originalError;
  });

  it('returns context value when used inside ToastProvider', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    expect(result.current).toBeDefined();
    expect(typeof result.current.showToast).toBe('function');
    expect(typeof result.current.hideToast).toBe('function');
    expect(typeof result.current.hideAllToasts).toBe('function');
  });

  it('showToast returns a string ID', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const id = result.current.showToast({ message: 'Test' });
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('maintains stable reference to methods', () => {
    const { result, rerender } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const initialShowToast = result.current.showToast;
    const initialHideToast = result.current.hideToast;
    const initialHideAllToasts = result.current.hideAllToasts;

    rerender();

    expect(result.current.showToast).toBe(initialShowToast);
    expect(result.current.hideToast).toBe(initialHideToast);
    expect(result.current.hideAllToasts).toBe(initialHideAllToasts);
  });
});
