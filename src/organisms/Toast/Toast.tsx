import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { Icon, type IconProps } from '../../atoms/Icon';
import { cn } from '../../utils/classNames';
import { TOAST_ANIMATION_DURATION, type ToastVariant, type ToastPosition } from './ToastContext';
import styles from './Toast.module.css';

// Variant-to-icon mapping (defined outside component for performance)
const VARIANT_ICONS: Record<ToastVariant, IconProps['name']> = {
  success: 'check-circle',
  error: 'x-circle',
  warning: 'alert-triangle',
  info: 'alert-circle',
} as const;

export interface ToastProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * Toast message content
   */
  message: string;

  /**
   * Visual variant of the toast
   */
  variant: ToastVariant;

  /**
   * Position of the toast on screen
   */
  position: ToastPosition;

  /**
   * Auto-dismiss duration in milliseconds
   */
  duration: number;

  /**
   * Controls visibility of the toast (for animation)
   */
  isVisible: boolean;

  /**
   * Show close button (X)
   */
  showCloseButton: boolean;

  /**
   * Show progress bar for auto-dismiss countdown
   */
  showProgressBar: boolean;

  /**
   * Callback when toast should close
   */
  onClose: () => void;
}

/**
 * Toast component - Individual toast notification
 *
 * Features:
 * - CSS-driven slide-in/out animations
 * - Auto-dismiss with progress bar
 * - Close button
 * - ARIA live region support
 *
 * Note: This component is rendered by ToastContainer which handles portal rendering and positioning.
 */
export const Toast = ({
  id,
  message,
  variant,
  duration,
  isVisible,
  showCloseButton,
  showProgressBar,
  onClose,
  className,
  ...props
}: ToastProps) => {
  const [shouldRender, setShouldRender] = useState(true);

  // Handle unmounting after exit animation
  useEffect(() => {
    if (!isVisible) {
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, TOAST_ANIMATION_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  const iconName = VARIANT_ICONS[variant];

  // ARIA attributes based on variant
  const ariaProps =
    variant === 'error'
      ? {
          role: 'alert' as const,
          'aria-live': 'assertive' as const,
          'aria-atomic': true,
        }
      : {
          role: 'status' as const,
          'aria-live': 'polite' as const,
          'aria-atomic': true,
        };

  return (
    <div
      {...props}
      {...ariaProps}
      id={id}
      className={cn(styles.toast, styles[variant], isVisible && styles.visible, className)}
      style={
        duration > 0 && showProgressBar
          ? ({
              '--toast-duration': `${String(duration)}ms`,
              animationDuration: `${String(duration)}ms`, // Fallback
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className={styles.iconContainer}>
        <Icon name={iconName} size="sm" aria-hidden="true" className={styles.icon} />
      </div>

      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>

      {showCloseButton && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close notification"
        >
          <Icon name="x" size="sm" aria-hidden="true" />
        </button>
      )}

      {duration > 0 && showProgressBar && <div className={styles.progressBar} aria-hidden="true" />}
    </div>
  );
};

Toast.displayName = 'Toast';
