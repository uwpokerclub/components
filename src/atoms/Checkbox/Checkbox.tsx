import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  /**
   * The label text for the checkbox
   */
  label?: string;
  /**
   * Whether the checkbox is in an indeterminate state (for "select all" scenarios)
   */
  indeterminate?: boolean;
  /**
   * Visual variant of the checkbox
   */
  variant?: 'default' | 'compact';
}

/**
 * Checkbox component for boolean input with support for indeterminate state
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate = false, variant = 'default', className, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);

    // Sync indeterminate property when it changes
    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label className={`${styles.container} ${styles[variant]} ${className ?? ''}`}>
        <input
          ref={(node) => {
            // Set the inner ref
            innerRef.current = node;

            // Forward the ref to the parent
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="checkbox"
          className={styles.checkbox}
          {...props}
        />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
