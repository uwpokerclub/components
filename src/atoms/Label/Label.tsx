import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styles from './Label.module.css';
import { cn } from '../../utils/classNames';

export type LabelSize = 'small' | 'medium' | 'large';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  /**
   * Size variant to match associated input components
   * @default 'medium'
   */
  size?: LabelSize;

  /**
   * Display required indicator (red asterisk after text)
   */
  required?: boolean;

  /**
   * Disabled state styling
   */
  disabled?: boolean;
}

/**
 * Label component - Form label atom
 *
 * Provides accessible labels for form inputs with size variants,
 * required indicators, and disabled states.
 * Extends native HTML label props for full control.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size = 'medium', required = false, disabled = false, className, children, ...rest }, ref) => {
    const labelClasses = cn(styles.label, styles[size], disabled && styles.disabled, className);

    return (
      <label ref={ref} className={labelClasses} {...rest}>
        {children}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';
