import { useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { getToastPortal } from '../../utils/getToastPortal';
import { cn } from '../../utils/classNames';
import type { ToastPosition, ToastVariant } from './ToastContext';
import styles from './Toast.module.css';

/**
 * Internal toast state interface used by provider
 */
export interface ToastState {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
  position: ToastPosition;
  isVisible: boolean;
  showCloseButton: boolean;
  showProgressBar: boolean;
}

export interface ToastContainerProps {
  /**
   * Array of active toasts
   */
  toasts: ToastState[];

  /**
   * Callback when a toast should close
   */
  onClose: (id: string) => void;
}

// Position class mapping
const POSITION_CLASSES: Record<ToastPosition, string> = {
  'top-left': styles.topLeft,
  'top-center': styles.topCenter,
  'top-right': styles.topRight,
  'bottom-left': styles.bottomLeft,
  'bottom-center': styles.bottomCenter,
  'bottom-right': styles.bottomRight,
};

/**
 * ToastContainer component - Manages position-based grouping and rendering of toasts
 *
 * Features:
 * - Groups toasts by position
 * - Renders position-specific containers
 * - Handles z-index and stacking
 */
export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  const portalContainer = typeof document !== 'undefined' ? getToastPortal() : null;

  // Create stable close handler
  const handleClose = useCallback(
    (id: string) => {
      onClose(id);
    },
    [onClose]
  );

  // Group toasts by position for efficient rendering
  const toastsByPosition = useMemo(() => {
    return toasts.reduce<Partial<Record<ToastPosition, ToastState[]>>>((acc, toast) => {
      const position = toast.position;
      const existing = acc[position];
      if (existing) {
        existing.push(toast);
      } else {
        acc[position] = [toast];
      }
      return acc;
    }, {});
  }, [toasts]);

  if (typeof document === 'undefined' || !portalContainer) return null;

  const content = (
    <>
      {(Object.entries(toastsByPosition) as [ToastPosition, ToastState[] | undefined][])
        .filter((entry): entry is [ToastPosition, ToastState[]] => entry[1] !== undefined)
        .map(([position, positionToasts]) => (
          <div key={position} className={cn(styles.toastContainer, POSITION_CLASSES[position])}>
            {positionToasts.map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={() => {
                  handleClose(toast.id);
                }}
              />
            ))}
          </div>
        ))}
    </>
  );

  return createPortal(content, portalContainer);
};

ToastContainer.displayName = 'ToastContainer';
