import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebouncedCallback } from './useDebouncedCallback';

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Basic Functionality', () => {
    it('returns a function', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));
      expect(typeof result.current).toBe('function');
    });

    it('does not call callback immediately', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current();
      expect(callback).not.toHaveBeenCalled();
    });

    it('calls callback after delay', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current();
      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('uses default delay of 500ms when not specified', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback));

      result.current();
      vi.advanceTimersByTime(499);
      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Arguments', () => {
    it('passes arguments to callback', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current('arg1', 'arg2', 'arg3');
      vi.advanceTimersByTime(500);

      expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
    });

    it('preserves argument types', () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useDebouncedCallback((a: number, b: string, c: boolean) => {
          callback(a, b, c);
        }, 500)
      );

      result.current(42, 'test', true);
      vi.advanceTimersByTime(500);

      expect(callback).toHaveBeenCalledWith(42, 'test', true);
    });

    it('handles object arguments', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      const obj = { id: 1, name: 'test' };
      result.current(obj);
      vi.advanceTimersByTime(500);

      expect(callback).toHaveBeenCalledWith(obj);
    });

    it('handles array arguments', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      const arr = [1, 2, 3];
      result.current(arr);
      vi.advanceTimersByTime(500);

      expect(callback).toHaveBeenCalledWith(arr);
    });
  });

  describe('Multiple Calls', () => {
    it('cancels previous call on rapid invocations', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current('first');
      vi.advanceTimersByTime(250);

      result.current('second');
      vi.advanceTimersByTime(250);

      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(250);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('second');
    });

    it('only executes last call after rapid invocations', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 200));

      result.current('call1');
      vi.advanceTimersByTime(100);

      result.current('call2');
      vi.advanceTimersByTime(100);

      result.current('call3');
      vi.advanceTimersByTime(100);

      result.current('call4');
      vi.advanceTimersByTime(200);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('call4');
    });

    it('allows multiple executions if enough time passes', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current('first');
      vi.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(1);

      result.current('second');
      vi.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(2);

      expect(callback).toHaveBeenNthCalledWith(1, 'first');
      expect(callback).toHaveBeenNthCalledWith(2, 'second');
    });
  });

  describe('Cancel Method', () => {
    it('provides cancel method', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      expect(typeof result.current.cancel).toBe('function');
    });

    it('cancels pending callback execution', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current('test');
      vi.advanceTimersByTime(250);

      result.current.cancel();
      vi.advanceTimersByTime(500);

      expect(callback).not.toHaveBeenCalled();
    });

    it('can be called multiple times safely', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current('test');
      result.current.cancel();
      result.current.cancel();
      result.current.cancel();

      vi.advanceTimersByTime(500);
      expect(callback).not.toHaveBeenCalled();
    });

    it('does nothing when called with no pending execution', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(callback, 500));

      expect(() => {
        result.current.cancel();
      }).not.toThrow();
    });
  });

  describe('Callback Updates', () => {
    it('uses latest callback function', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ callback }) => useDebouncedCallback(callback, 500),
        {
          initialProps: { callback: callback1 },
        }
      );

      result.current('test');
      rerender({ callback: callback2 });

      vi.advanceTimersByTime(500);

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledWith('test');
    });

    it('preserves debounce state when callback changes', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ callback }) => useDebouncedCallback(callback, 500),
        {
          initialProps: { callback: callback1 },
        }
      );

      result.current('test');
      vi.advanceTimersByTime(250);

      rerender({ callback: callback2 });
      vi.advanceTimersByTime(250);

      expect(callback2).toHaveBeenCalledWith('test');
    });
  });

  describe('Delay Updates', () => {
    it('respects delay changes', () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(
        ({ delay }) => useDebouncedCallback(callback, delay),
        {
          initialProps: { delay: 500 },
        }
      );

      result.current('test1');
      rerender({ delay: 200 });

      vi.advanceTimersByTime(200);
      expect(callback).not.toHaveBeenCalled();

      result.current('test2');
      vi.advanceTimersByTime(200);
      expect(callback).toHaveBeenCalledWith('test2');
    });
  });

  describe('Cleanup', () => {
    it('clears timeout on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const callback = vi.fn();
      const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current('test');
      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('does not call callback after unmount', () => {
      const callback = vi.fn();
      const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current('test');
      unmount();

      vi.advanceTimersByTime(500);
      expect(callback).not.toHaveBeenCalled();
    });

    it('cancels pending execution on unmount', () => {
      const callback = vi.fn();
      const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 500));

      result.current('test');
      vi.advanceTimersByTime(250);
      unmount();

      vi.advanceTimersByTime(500);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Real-world Use Cases', () => {
    it('simulates form validation on input change', () => {
      const validateForm = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(validateForm, 300));

      const typedCharacters = ['t', 'te', 'tes', 'test', 'test@', 'test@e', 'test@example.com'];

      typedCharacters.forEach((value) => {
        result.current(value);
        vi.advanceTimersByTime(50);
      });

      expect(validateForm).not.toHaveBeenCalled();

      vi.advanceTimersByTime(250);
      expect(validateForm).toHaveBeenCalledTimes(1);
      expect(validateForm).toHaveBeenCalledWith('test@example.com');
    });

    it('simulates API call debouncing', () => {
      const apiCall = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(apiCall, 500));

      const searchQueries = ['r', 're', 'rea', 'reac', 'react'];

      searchQueries.forEach((query) => {
        result.current(query);
        vi.advanceTimersByTime(100);
      });

      expect(apiCall).not.toHaveBeenCalled();

      vi.advanceTimersByTime(400);
      expect(apiCall).toHaveBeenCalledTimes(1);
      expect(apiCall).toHaveBeenCalledWith('react');
    });

    it('simulates scroll event handler', () => {
      const handleScroll = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(handleScroll, 150));

      for (let i = 0; i < 20; i++) {
        result.current({ scrollY: i * 10 });
        vi.advanceTimersByTime(10);
      }

      expect(handleScroll).not.toHaveBeenCalled();

      vi.advanceTimersByTime(140);
      expect(handleScroll).toHaveBeenCalledTimes(1);
      expect(handleScroll).toHaveBeenCalledWith({ scrollY: 190 });
    });

    it('allows manual cancellation of API call', () => {
      const apiCall = vi.fn();
      const { result } = renderHook(() => useDebouncedCallback(apiCall, 500));

      result.current('search query');
      vi.advanceTimersByTime(250);

      result.current.cancel();

      vi.advanceTimersByTime(500);
      expect(apiCall).not.toHaveBeenCalled();
    });
  });
});
