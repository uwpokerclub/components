import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import styles from './Textarea.module.css';
import { cn } from '../../utils/classNames';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  /**
   * Error state - applies error styling
   */
  error?: boolean;

  /**
   * Optional error message to display below the textarea
   */
  errorMessage?: string;

  /**
   * Make textarea full width of its container
   */
  fullWidth?: boolean;

  /**
   * Number of visible text lines
   * @default 3
   */
  rows?: number;
}

/**
 * Textarea component - Multi-line text input atom
 *
 * Provides error states and full accessibility.
 * Supports vertical resizing and configurable row height.
 * Extends native HTML textarea props for full control.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error = false,
      errorMessage,
      fullWidth = false,
      rows = 3,
      className,
      disabled,
      id,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? rest.name ?? generatedId;
    const errorId = errorMessage && textareaId ? `${textareaId}-error` : undefined;
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined;

    const containerClasses = cn(styles.container, fullWidth && styles.fullWidth, className);

    const wrapperClasses = cn(
      styles.textareaWrapper,
      error && styles.error,
      disabled && styles.disabled
    );

    return (
      <div className={containerClasses}>
        <div className={wrapperClasses}>
          <textarea
            ref={ref}
            id={textareaId}
            className={styles.textarea}
            disabled={disabled}
            rows={rows}
            aria-invalid={error}
            aria-describedby={describedBy}
            {...rest}
          />
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

Textarea.displayName = 'Textarea';
