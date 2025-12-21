import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import styles from './Select.module.css';
import { cn } from '../../utils/classNames';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  /**
   * Array of select options
   */
  options: SelectOption[];

  /**
   * Placeholder text shown as disabled first option
   */
  placeholder?: string;

  /**
   * Error state - applies error styling
   */
  error?: boolean;

  /**
   * Optional error message to display below the select
   */
  errorMessage?: string;

  /**
   * Success/valid state - applies success styling
   */
  success?: boolean;

  /**
   * Size variant of the select
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Make select full width of its container
   */
  fullWidth?: boolean;
}

/**
 * Select component - Dropdown selection atom
 *
 * Native select element with custom styling for consistent design.
 * Supports error, success, and disabled states with multiple size variants.
 * Extends native HTML select props for full control.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      error = false,
      errorMessage,
      success = false,
      size = 'medium',
      fullWidth = false,
      className,
      disabled,
      id,
      'aria-describedby': ariaDescribedBy,
      defaultValue,
      value,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? rest.name ?? generatedId;
    const errorId = errorMessage && selectId ? `${selectId}-error` : undefined;
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined;

    const containerClasses = cn(styles.container, fullWidth && styles.fullWidth, className);

    const selectWrapperClasses = cn(
      styles.selectWrapper,
      styles[size],
      error && styles.error,
      success && !error && styles.success,
      disabled && styles.disabled
    );

    // When placeholder is provided and no value/defaultValue is set, default to empty string
    const computedDefaultValue =
      placeholder && value === undefined && defaultValue === undefined ? '' : defaultValue;

    return (
      <div className={containerClasses}>
        <div className={selectWrapperClasses}>
          <select
            ref={ref}
            id={selectId}
            className={styles.select}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={describedBy}
            defaultValue={computedDefaultValue}
            value={value}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.arrow} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
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

Select.displayName = 'Select';
