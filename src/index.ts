/**
 * @uwpokerclub/components
 * Official React component library for UW Poker Club applications
 *
 * Following Atomic Design methodology:
 * - Atoms: Basic building blocks (buttons, inputs, labels)
 * - Molecules: Simple combinations of atoms (form fields, cards)
 * - Organisms: Complex UI components (headers, forms, modals)
 * - Templates: Page-level layouts and structures
 */

// Atoms - Basic building blocks
export { Button } from './atoms/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './atoms/Button';
export { Input } from './atoms/Input';
export type { InputProps } from './atoms/Input';
export { Select } from './atoms/Select';
export type { SelectProps, SelectOption } from './atoms/Select';
export { Label } from './atoms/Label';
export type { LabelProps, LabelSize } from './atoms/Label';
export { Checkbox } from './atoms/Checkbox';
export type { CheckboxProps } from './atoms/Checkbox';
export { Icon } from './atoms/Icon';
export type { IconProps } from './atoms/Icon';
export { Spinner } from './atoms/Spinner';
export type { SpinnerProps } from './atoms/Spinner';

// Molecules - Simple combinations
export { Pagination } from './molecules/Pagination';
export type { PaginationProps } from './molecules/Pagination';
export { Combobox } from './molecules/Combobox';
export type { ComboboxProps, ComboboxOption } from './molecules/Combobox';
export { FormField } from './molecules/FormField';
export type { FormFieldProps, FormFieldChildProps } from './molecules/FormField';

// Organisms - Complex components
export { Table } from './organisms/Table';
export type { TableProps, TableColumn } from './organisms/Table';
export { Modal } from './organisms/Modal';
export type { ModalProps } from './organisms/Modal';
export { Toast, ToastProvider, useToast } from './organisms/Toast';
export type { ToastProps, ToastVariant, ToastPosition, ShowToastOptions } from './organisms/Toast';

// Templates - Page layouts
export { MainLayout } from './templates/MainLayout';
export type { MainLayoutProps } from './templates/MainLayout';

// Hooks
export { useDebounce } from './hooks/useDebounce';
export { useDebouncedCallback } from './hooks/useDebouncedCallback';

// Utilities
// export { cn } from './utils/cn';

// Types
// export type { Theme } from './types/theme';
