import { useCallback, useEffect, useMemo, useRef } from 'react';

type AnyFunction = (...args: never[]) => unknown;

/**
 * Creates a debounced version of a callback function that delays invoking the callback
 * until after the specified delay has elapsed since the last time it was invoked.
 *
 * @template T - The type signature of the callback function
 * @param callback - The function to debounce
 * @param delay - The debounce delay in milliseconds (default: 500ms)
 * @returns A debounced version of the callback with a cancel method
 *
 * @example
 * ```tsx
 * const handleSearch = useDebouncedCallback((searchTerm: string) => {
 *   performSearch(searchTerm);
 * }, 300);
 *
 * return <input onChange={(e) => handleSearch(e.target.value)} />;
 * ```
 */
export function useDebouncedCallback<T extends AnyFunction>(
  callback: T,
  delay = 500
): T & { cancel: () => void } {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  const debouncedCallback = useMemo(() => {
    const fn = ((...args: Parameters<T>) => {
      cancel();

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T & { cancel: () => void };

    fn.cancel = cancel;
    return fn;
  }, [delay, cancel]);

  return debouncedCallback;
}
