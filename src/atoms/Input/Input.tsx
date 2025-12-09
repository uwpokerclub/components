import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import styles from './Input.module.css';
import { cn } from '../../utils/classNames';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'prefix' | 'type'> {
  /**
   * Type of input
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  /**
   * Error state - applies error styling
   */
  error?: boolean;

  /**
   * Optional error message to display below the input
   */
  errorMessage?: string;

  /**
   * Element to display before the input (e.g., icon, text)
   */
  prefix?: React.ReactNode;

  /**
   * Element to display after the input (e.g., icon, button)
   */
  suffix?: React.ReactNode;

  /**
   * Make input full width of its container
   */
  fullWidth?: boolean;
}

/**
 * Input component - Text input field atom
 *
 * Supports text, email, password, number, and search input types.
 * Provides error states, prefix/suffix slots, and full accessibility.
 * Extends native HTML input props for full control.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = false,
      errorMessage,
      prefix,
      suffix,
      fullWidth = false,
      className,
      disabled,
      type = 'text',
      id,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? rest.name ?? generatedId;
    const errorId = errorMessage && inputId ? `${inputId}-error` : undefined;
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined;

    const containerClasses = cn(styles.container, fullWidth && styles.fullWidth, className);

    const wrapperClasses = cn(
      styles.inputWrapper,
      error && styles.error,
      disabled && styles.disabled
    );

    return (
      <div className={containerClasses}>
        <div className={wrapperClasses}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={describedBy}
            {...rest}
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        {errorMessage && (
          <span className={styles.errorMessage} id={errorId} role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
