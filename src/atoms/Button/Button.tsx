import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';
import { cn } from '../../utils/classNames';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Visual style variant of the button
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   */
  size?: ButtonSize;

  /**
   * Loading state - shows spinner and disables the button
   */
  loading?: boolean;

  /**
   * Text announced to screen readers when loading (for i18n)
   * @default "Loading"
   */
  loadingText?: string;

  /**
   * Make button full width of its container
   */
  fullWidth?: boolean;

  /**
   * Icon to display before the button text
   */
  iconBefore?: React.ReactNode;

  /**
   * Icon to display after the button text
   */
  iconAfter?: React.ReactNode;

  /**
   * Accessible label for icon-only buttons (required when children is empty)
   */
  'aria-label'?: string;
}

/**
 * Button component - Primary UI interaction element
 *
 * Supports multiple variants, sizes, loading states, and icon combinations.
 * Extends native HTML button props for full control.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      loadingText = 'Loading',
      fullWidth = false,
      iconBefore,
      iconAfter,
      children,
      className,
      disabled,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = (disabled ?? false) || loading;
    const hasChildren =
      children !== null && children !== undefined && children !== '' && children !== false;
    const isIconOnly = !hasChildren && (iconBefore !== undefined || iconAfter !== undefined);

    // Validate icon-only buttons have aria-label
    if (isIconOnly && !rest['aria-label']) {
      console.warn('Button: Icon-only buttons should have an aria-label for accessibility');
    }

    const buttonClasses = cn(
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      isIconOnly && styles.iconOnly,
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={isDisabled}
        aria-busy={loading}
        {...rest}
      >
        {loading && (
          <>
            <span className={styles.spinner} aria-hidden="true">
              <svg
                className={styles.spinnerSvg}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className={styles.spinnerCircle}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
            <span className={styles.srOnly}>{loadingText}</span>
          </>
        )}
        {!loading && iconBefore && <span className={styles.iconBefore}>{iconBefore}</span>}
        {children && <span className={styles.content}>{children}</span>}
        {!loading && iconAfter && <span className={styles.iconAfter}>{iconAfter}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
