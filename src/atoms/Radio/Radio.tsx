import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  /**
   * The label text for the radio button
   */
  label?: string;
  /**
   * Visual variant of the radio button
   */
  variant?: 'default' | 'compact';
}

/**
 * Radio component for single selection from a group of options
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, variant = 'default', className, ...props }, ref) => {
    return (
      <label className={`${styles.container} ${styles[variant]} ${className ?? ''}`}>
        <input ref={ref} type="radio" className={styles.radio} {...props} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
