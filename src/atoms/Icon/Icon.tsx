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
    | 'x';
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
