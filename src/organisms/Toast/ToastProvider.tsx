import { useReducer, useCallback, useMemo, useRef, useEffect, type ReactNode } from 'react';
import { ToastContainer, type ToastState } from './ToastContainer';
import { TOAST_ANIMATION_DURATION, ToastContext, type ShowToastOptions } from './ToastContext';

/**
 * Toast action types for reducer
 */
type ToastAction =
  | { type: 'ADD_TOAST'; payload: ToastState }
  | { type: 'SHOW_TOAST'; payload: string }
  | { type: 'HIDE_TOAST'; payload: string }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'HIDE_ALL_TOASTS' }
  | { type: 'REMOVE_ALL_TOASTS' };

/**
 * Toast reducer - manages toast state transitions
 */
const toastReducer = (state: ToastState[], action: ToastAction): ToastState[] => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload];

    case 'SHOW_TOAST':
      return state.map((toast) =>
        toast.id === action.payload ? { ...toast, isVisible: true } : toast
      );

    case 'HIDE_TOAST':
      return state.map((toast) =>
        toast.id === action.payload ? { ...toast, isVisible: false } : toast
      );

    case 'REMOVE_TOAST':
      return state.filter((toast) => toast.id !== action.payload);

    case 'HIDE_ALL_TOASTS':
      return state.map((toast) => ({ ...toast, isVisible: false }));

    case 'REMOVE_ALL_TOASTS':
      return [];

    default:
      return state;
  }
};

export interface ToastProviderProps {
  /**
   * Child components
   */
  children: ReactNode;
}

/**
 * ToastProvider component - Manages toast state and provides context
 *
 * Features:
 * - useReducer for robust state management
 * - Comprehensive timer cleanup with useRef<Map>
 * - Memoized methods and context value
 * - Auto-dismiss with configurable duration
 * - Portal rendering via ToastContainer
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const removeTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  /**
   * Hide a specific toast by ID
   */
  const hideToast = useCallback((id: string) => {
    // Clear auto-dismiss timer
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    // Trigger hide animation
    dispatch({ type: 'HIDE_TOAST', payload: id });

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
      removeTimersRef.current.delete(id);
    }, TOAST_ANIMATION_DURATION);
    removeTimersRef.current.set(id, removeTimer);
  }, []);

  /**
   * Show a toast notification
   */
  const showToast = useCallback(
    (options: ShowToastOptions): string => {
      const id = crypto.randomUUID();

      // Create toast with defaults
      const toast: ToastState = {
        id,
        message: options.message,
        variant: options.variant ?? 'info',
        duration: options.duration ?? 5000,
        position: options.position ?? 'top-right',
        isVisible: false, // Start hidden for animation
        showCloseButton: options.showCloseButton ?? true,
        showProgressBar: options.showProgressBar ?? true,
      };

      // Add toast to state
      dispatch({ type: 'ADD_TOAST', payload: toast });

      // Use RAF to trigger show animation after DOM paint
      requestAnimationFrame(() => {
        dispatch({ type: 'SHOW_TOAST', payload: id });
      });

      // Set auto-dismiss timer if duration > 0
      if (toast.duration > 0) {
        const timer = setTimeout(() => {
          hideToast(id);
        }, toast.duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [hideToast]
  );

  /**
   * Hide all active toasts
   */
  const hideAllToasts = useCallback(() => {
    // Clear all timers
    timersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });
    timersRef.current.clear();
    removeTimersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });
    removeTimersRef.current.clear();

    // Hide all toasts
    dispatch({ type: 'HIDE_ALL_TOASTS' });

    // Remove all toasts after animation
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ALL_TOASTS' });
    }, TOAST_ANIMATION_DURATION);
  }, []);

  /**
   * Cleanup all timers on unmount
   */
  useEffect(() => {
    const currentTimers = timersRef.current;
    const currentRemoveTimers = removeTimersRef.current;

    return () => {
      currentTimers.forEach((timer) => {
        clearTimeout(timer);
      });
      currentTimers.clear();
      currentRemoveTimers.forEach((timer) => {
        clearTimeout(timer);
      });
      currentRemoveTimers.clear();
    };
  }, []);

  /**
   * Memoize context value to prevent unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      showToast,
      hideToast,
      hideAllToasts,
    }),
    [showToast, hideToast, hideAllToasts]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';
