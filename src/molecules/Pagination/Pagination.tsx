import { memo, useMemo } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { Icon } from '../../atoms/Icon';
import styles from './Pagination.module.css';

export interface PaginationProps extends Omit<ComponentPropsWithoutRef<'nav'>, 'onChange'> {
  /**
   * Total number of items
   */
  totalItems: number;
  /**
   * Number of items per page
   */
  pageSize: number;
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Maximum number of page buttons to show
   */
  maxPageButtons?: number;
  /**
   * Show first/last page buttons
   */
  showFirstLast?: boolean;
  /**
   * Variant style
   */
  variant?: 'default' | 'compact';
}

/**
 * Pagination component for navigating through pages
 * Memoized for performance
 */
export const Pagination = memo(
  ({
    totalItems,
    pageSize,
    currentPage,
    onPageChange,
    maxPageButtons = 7,
    showFirstLast = true,
    variant = 'default',
    className,
    ...props
  }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const pageNumbers = useMemo(() => {
      if (totalPages <= maxPageButtons) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages: (number | 'ellipsis')[] = [];
      const sideButtons = Math.floor((maxPageButtons - 3) / 2);

      if (currentPage <= sideButtons + 2) {
        for (let i = 1; i <= maxPageButtons - 2; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - sideButtons - 1) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - (maxPageButtons - 3); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - sideButtons; i <= currentPage + sideButtons; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }

      return pages;
    }, [totalPages, maxPageButtons, currentPage]);

    if (totalPages <= 1) {
      return null;
    }
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
      <nav
        className={`${styles.pagination} ${styles[variant]} ${className ?? ''}`}
        role="navigation"
        aria-label="Pagination navigation"
        {...props}
      >
        {showFirstLast && (
          <button
            type="button"
            onClick={() => {
              onPageChange(1);
            }}
            disabled={isFirstPage}
            aria-label="First page"
            className={styles.navButton}
          >
            <Icon name="chevron-left" size="sm" />
            <Icon name="chevron-left" size="sm" />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
          disabled={isFirstPage}
          aria-label="Previous page"
          className={styles.navButton}
        >
          <Icon name="chevron-left" size="sm" />
        </button>

        <div className={styles.pages}>
          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${String(index)}`}
                  className={styles.ellipsis}
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                type="button"
                key={page}
                onClick={() => {
                  onPageChange(page);
                }}
                aria-label={`Page ${String(page)}`}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
          disabled={isLastPage}
          aria-label="Next page"
          className={styles.navButton}
        >
          <Icon name="chevron-right" size="sm" />
        </button>

        {showFirstLast && (
          <button
            type="button"
            onClick={() => {
              onPageChange(totalPages);
            }}
            disabled={isLastPage}
            aria-label="Last page"
            className={styles.navButton}
          >
            <Icon name="chevron-right" size="sm" />
            <Icon name="chevron-right" size="sm" />
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
