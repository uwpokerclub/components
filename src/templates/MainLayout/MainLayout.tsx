import type { ComponentPropsWithoutRef } from 'react';
import styles from './MainLayout.module.css';

export interface MainLayoutProps extends ComponentPropsWithoutRef<'main'> {
  /**
   * Content to render within the layout
   */
  children: React.ReactNode;
}

/**
 * MainLayout template component providing consistent page-level layout structure
 * with responsive horizontal spacing.
 *
 * - Desktop/Tablet: Horizontal padding on left and right sides
 * - Mobile: Full screen width (edge-to-edge content)
 */
export const MainLayout = ({ children, className, ...props }: MainLayoutProps) => {
  return (
    <main className={`${styles.mainLayout} ${className ?? ''}`} {...props}>
      {children}
    </main>
  );
};
