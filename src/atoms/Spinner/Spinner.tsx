import { memo } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Size of the spinner
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Accessible label for the spinner
   */
  'aria-label'?: string;
}

/**
 * Spinner component for loading states
 * Memoized for performance
 */
export const Spinner = memo(
  ({ size = 'md', className, 'aria-label': ariaLabel = 'Loading', ...props }: SpinnerProps) => {
    return (
      <div
        className={`${styles.spinner} ${styles[size]} ${className ?? ''}`}
        role="status"
        aria-live="polite"
        aria-label={ariaLabel}
        {...props}
      >
        <svg className={styles.svg} viewBox="0 0 50 50">
          <circle className={styles.circle} cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
