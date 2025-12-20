import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Basic Functionality', () => {
    it('returns initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 500));
      expect(result.current).toBe('initial');
    });

    it('debounces value updates', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 500 },
      });

      expect(result.current).toBe('initial');

      rerender({ value: 'updated', delay: 500 });
      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe('updated');
    });

    it('updates after specified delay', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: 'first' },
      });

      rerender({ value: 'second' });
      expect(result.current).toBe('first');

      act(() => {
        vi.advanceTimersByTime(299);
      });
      expect(result.current).toBe('first');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current).toBe('second');
    });

    it('uses default delay of 500ms when not specified', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
        initialProps: { value: 'initial' },
      });

      rerender({ value: 'updated' });
      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(499);
      });
      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current).toBe('updated');
    });
  });

  describe('Multiple Updates', () => {
    it('cancels previous timeout on rapid changes', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
        initialProps: { value: 'first' },
      });

      rerender({ value: 'second' });
      act(() => {
        vi.advanceTimersByTime(250);
      });

      rerender({ value: 'third' });
      act(() => {
        vi.advanceTimersByTime(250);
      });

      expect(result.current).toBe('first');

      act(() => {
        vi.advanceTimersByTime(250);
      });
      expect(result.current).toBe('third');
    });

    it('only updates to final value after rapid changes', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
        initialProps: { value: 'v1' },
      });

      rerender({ value: 'v2' });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ value: 'v3' });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ value: 'v4' });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current).toBe('v1');

      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(result.current).toBe('v4');
    });
  });

  describe('Type Support', () => {
    it('works with string values', () => {
      const { result } = renderHook(() => useDebounce('test', 500));
      expect(result.current).toBe('test');
    });

    it('works with number values', () => {
      const { result } = renderHook(() => useDebounce(42, 500));
      expect(result.current).toBe(42);
    });

    it('works with boolean values', () => {
      const { result } = renderHook(() => useDebounce(true, 500));
      expect(result.current).toBe(true);
    });

    it('works with object values', () => {
      const obj = { id: 1, name: 'test' };
      const { result } = renderHook(() => useDebounce(obj, 500));
      expect(result.current).toBe(obj);
    });

    it('works with array values', () => {
      const arr = [1, 2, 3];
      const { result } = renderHook(() => useDebounce(arr, 500));
      expect(result.current).toBe(arr);
    });

    it('works with null values', () => {
      const { result } = renderHook(() => useDebounce(null, 500));
      expect(result.current).toBe(null);
    });
  });

  describe('Delay Changes', () => {
    it('respects delay changes', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'initial', delay: 500 },
      });

      rerender({ value: 'updated', delay: 200 });
      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(result.current).toBe('updated');
    });

    it('handles delay change during pending update', () => {
      const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: 'first', delay: 500 },
      });

      rerender({ value: 'second', delay: 500 });
      act(() => {
        vi.advanceTimersByTime(250);
      });

      rerender({ value: 'second', delay: 100 });
      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current).toBe('second');
    });
  });

  describe('Cleanup', () => {
    it('clears timeout on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const { rerender, unmount } = renderHook(({ value }) => useDebounce(value, 500), {
        initialProps: { value: 'initial' },
      });

      rerender({ value: 'updated' });

      const callCountBefore = clearTimeoutSpy.mock.calls.length;
      unmount();
      const callCountAfter = clearTimeoutSpy.mock.calls.length;

      expect(callCountAfter).toBeGreaterThan(callCountBefore);
    });

    it('does not update after unmount', () => {
      const { result, rerender, unmount } = renderHook(({ value }) => useDebounce(value, 500), {
        initialProps: { value: 'initial' },
      });

      const valueBefore = result.current;

      rerender({ value: 'updated' });
      unmount();

      vi.advanceTimersByTime(500);
      expect(valueBefore).toBe('initial');
    });
  });

  describe('Real-world Use Cases', () => {
    it('simulates search input debouncing', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
        initialProps: { value: '' },
      });

      const searchTerms = ['r', 're', 'rea', 'reac', 'react'];

      searchTerms.forEach((term) => {
        rerender({ value: term });
        act(() => {
          vi.advanceTimersByTime(100);
        });
      });

      expect(result.current).toBe('');

      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(result.current).toBe('react');
    });

    it('simulates window resize debouncing', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 250), {
        initialProps: { value: { width: 1024, height: 768 } },
      });

      const sizes = [
        { width: 1020, height: 770 },
        { width: 1015, height: 775 },
        { width: 1010, height: 780 },
        { width: 1000, height: 800 },
      ];

      sizes.forEach((size) => {
        rerender({ value: size });
        act(() => {
          vi.advanceTimersByTime(50);
        });
      });

      expect(result.current).toEqual({ width: 1024, height: 768 });

      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(result.current).toEqual({ width: 1000, height: 800 });
    });
  });
});
