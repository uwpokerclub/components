import { memo } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Icon.module.css';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * The icon name to display
   */
  name:
    | 'chevron-up'
    | 'chevron-down'
    | 'chevron-left'
    | 'chevron-right'
    | 'sort'
    | 'sort-asc'
    | 'sort-desc'
    | 'search'
    | 'x'
    | 'check-circle'
    | 'x-circle'
    | 'alert-triangle'
    | 'alert-circle';
  /**
   * Size of the icon
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Accessible label for the icon
   */
  'aria-label'?: string;
}

// Pre-processed path elements for better performance
const iconPaths: Record<IconProps['name'], ReactNode> = {
  'chevron-up': <path d="M7 14l5-5 5 5" />,
  'chevron-down': <path d="M7 10l5 5 5-5" />,
  'chevron-left': <path d="M14 7l-5 5 5 5" />,
  'chevron-right': <path d="M10 7l5 5-5 5" />,
  sort: [<path key="1" d="M7 10l5-5 5 5" />, <path key="2" d="M7 14l5 5 5-5" />],
  'sort-asc': <path d="M7 14l5-5 5 5" />,
  'sort-desc': <path d="M7 10l5 5 5-5" />,
  search: [<circle key="1" cx="11" cy="11" r="8" />, <path key="2" d="m21 21-4.35-4.35" />],
  x: [
    <line key="1" x1="18" y1="6" x2="6" y2="18" />,
    <line key="2" x1="6" y1="6" x2="18" y2="18" />,
  ],
  'check-circle': [<circle key="1" cx="12" cy="12" r="10" />, <path key="2" d="m9 12 2 2 4-4" />],
  'x-circle': [
    <circle key="1" cx="12" cy="12" r="10" />,
    <line key="2" x1="15" y1="9" x2="9" y2="15" />,
    <line key="3" x1="9" y1="9" x2="15" y2="15" />,
  ],
  'alert-triangle': [
    <path
      key="1"
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
    />,
    <line key="2" x1="12" y1="9" x2="12" y2="13" />,
    <line key="3" x1="12" y1="17" x2="12.01" y2="17" />,
  ],
  'alert-circle': [
    <circle key="1" cx="12" cy="12" r="10" />,
    <line key="2" x1="12" y1="8" x2="12" y2="12" />,
    <line key="3" x1="12" y1="16" x2="12.01" y2="16" />,
  ],
};

/**
 * Icon component for displaying SVG icons
 * Memoized for performance
 */
export const Icon = memo(
  ({ name, size = 'md', className, 'aria-label': ariaLabel, ...props }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${styles.icon} ${styles[size]} ${className ?? ''}`}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        role={ariaLabel ? 'img' : undefined}
        {...props}
      >
        {iconPaths[name]}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
