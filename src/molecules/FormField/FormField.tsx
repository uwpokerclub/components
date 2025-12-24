import { forwardRef, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { Label } from '../../atoms/Label';
import { Icon } from '../../atoms/Icon';
import { cn } from '../../utils/classNames';
import styles from './FormField.module.css';

export interface FormFieldChildProps {
  /**
   * ID for the input element
   */
  id: string;

  /**
   * Indicates if the input has an error
   */
  'aria-invalid'?: boolean;

  /**
   * Space-separated list of element IDs that describe the input
   */
  'aria-describedby'?: string;
}

export interface FormFieldProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Label text for the form field
   */
  label: string;

  /**
   * ID for the input element (used for label's htmlFor)
   */
  htmlFor: string;

  /**
   * Error message to display below the input
   */
  error?: string;

  /**
   * Show required indicator (asterisk)
   */
  required?: boolean;

  /**
   * Helper text to display below the label
   */
  hint?: string;

  /**
   * Size variant to match input components
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Disabled state styling
   */
  disabled?: boolean;

  /**
   * Render function that receives FormFieldChildProps and returns an input component
   * @example
   * ```tsx
   * {(props) => <Input {...props} type="email" name="email" />}
   * ```
   */
  children: (props: FormFieldChildProps) => ReactElement;
}

/**
 * FormField component - Form field molecule
 *
 * Combines Label, input component, optional hint text, and error message
 * into a cohesive form field. Uses render props pattern to provide ARIA
 * attributes to child input components.
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   htmlFor="email"
 *   required
 *   hint="We'll never share your email"
 *   error={errors.email}
 * >
 *   {(props) => (
 *     <Input
 *       {...props}
 *       type="email"
 *       name="email"
 *       value={email}
 *       onChange={handleChange}
 *     />
 *   )}
 * </FormField>
 * ```
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      htmlFor,
      error,
      required = false,
      hint,
      size = 'medium',
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const hintId = hint ? `${htmlFor}-hint` : undefined;
    const errorId = error ? `${htmlFor}-error` : undefined;

    // Build aria-describedby list
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    // Prepare props for child component
    const childProps: FormFieldChildProps = {
      id: htmlFor,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy,
    };

    return (
      <div ref={ref} className={cn(styles.formField, className)} {...rest}>
        <Label htmlFor={htmlFor} required={required} size={size} disabled={disabled}>
          {label}
        </Label>

        {hint && (
          <div className={styles.hint} id={hintId}>
            {hint}
          </div>
        )}

        {children(childProps)}

        {error && (
          <div className={styles.errorMessage} id={errorId} role="alert">
            <Icon name="x" size="sm" aria-hidden />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
