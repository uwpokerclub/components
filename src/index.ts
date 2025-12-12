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

// Organisms - Complex components
export { Table } from './organisms/Table';
export type { TableProps, TableColumn } from './organisms/Table';

// Templates - Page layouts
// export { MainLayout } from './templates/MainLayout';
// export type { MainLayoutProps } from './templates/MainLayout';

// Hooks
// export { useTheme } from './hooks/useTheme';

// Utilities
// export { cn } from './utils/cn';

// Types
// export type { Theme } from './types/theme';
