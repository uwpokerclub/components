import { useContext } from 'react';
import { ToastContext, type ToastContextValue } from './ToastContext';

/**
 * useToast hook - Access toast methods from context
 *
 * Must be used within a ToastProvider
 *
 * @returns Toast context value with showToast, hideToast, and hideAllToasts methods
 * @throws Error if used outside ToastProvider
 *
 * @example
 * ```tsx
 * const { showToast } = useToast();
 *
 * showToast({
 *   message: 'Success!',
 *   variant: 'success',
 *   duration: 3000
 * });
 * ```
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
