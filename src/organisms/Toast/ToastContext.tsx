import { createContext } from 'react';

/**
 * Toast animation duration in milliseconds
 */
export const TOAST_ANIMATION_DURATION = 300;

/**
 * Toast visual variant types
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast position on screen
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Options for showing a toast
 */
export interface ShowToastOptions {
  /**
   * Toast message content
   */
  message: string;

  /**
   * Visual variant of the toast
   * @default 'info'
   */
  variant?: ToastVariant;

  /**
   * Auto-dismiss duration in milliseconds
   * Set to 0 to disable auto-dismiss
   * @default 5000
   */
  duration?: number;

  /**
   * Position of the toast on screen
   * @default 'top-right'
   */
  position?: ToastPosition;

  /**
   * Show close button (X)
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Show progress bar for auto-dismiss countdown
   * @default true
   */
  showProgressBar?: boolean;
}

/**
 * Toast context value interface
 */
export interface ToastContextValue {
  /**
   * Show a toast notification
   * @param options Toast options
   * @returns Toast ID for manual control
   */
  showToast: (options: ShowToastOptions) => string;

  /**
   * Hide a specific toast by ID
   * @param id Toast ID
   */
  hideToast: (id: string) => void;

  /**
   * Hide all active toasts
   */
  hideAllToasts: () => void;
}

/**
 * Toast context - provides toast management methods
 */
export const ToastContext = createContext<ToastContextValue | null>(null);

ToastContext.displayName = 'ToastContext';
