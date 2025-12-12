import type { ComponentPropsWithoutRef } from 'react';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Checkbox } from '../../atoms/Checkbox';
import { Icon } from '../../atoms/Icon';
import { Spinner } from '../../atoms/Spinner';
import { Pagination } from '../../molecules/Pagination';
import styles from './Table.module.css';

export interface TableColumn<T> {
  /**
   * Unique key for the column
   */
  key: string;
  /**
   * Header text to display
   */
  header: string;
  /**
   * Accessor function or key to get cell value from row data
   */
  accessor: keyof T | ((row: T) => React.ReactNode);
  /**
   * Whether this column is sortable
   */
  sortable?: boolean;
  /**
   * Custom render function for cell content
   */
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T> extends ComponentPropsWithoutRef<'table'> {
  /**
   * Column definitions
   */
  columns: TableColumn<T>[];
  /**
   * Table data
   */
  data: T[];
  /**
   * Visual variant of the table
   */
  variant?: 'default' | 'striped' | 'bordered' | 'compact';
  /**
   * Header color variant
   */
  headerVariant?: 'default' | 'primary' | 'secondary';
  /**
   * Enable row selection
   */
  selectable?: boolean;
  /**
   * Callback when selected rows change
   */
  onSelectionChange?: (selectedRows: T[]) => void;
  /**
   * Pagination configuration
   */
  pagination?: {
    pageSize: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
  };
  /**
   * Enable sorting (can be controlled or uncontrolled)
   */
  sortable?: boolean;
  /**
   * Controlled sort state
   */
  sortKey?: string;
  /**
   * Controlled sort direction
   */
  sortDirection?: 'asc' | 'desc';
  /**
   * Callback when sort changes (controlled mode)
   */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Empty state content
   */
  emptyState?: React.ReactNode;
  /**
   * Function to get unique key for each row
   */
  getRowKey?: (row: T, index: number) => string | number;
}

/**
 * Table organism component with sorting, pagination, and selection
 */
export const Table = <T,>({
  columns,
  data,
  variant = 'default',
  headerVariant = 'default',
  selectable = false,
  onSelectionChange,
  pagination,
  sortable = false,
  sortKey: controlledSortKey,
  sortDirection: controlledSortDirection,
  onSort,
  loading = false,
  emptyState,
  getRowKey = (_, index) => index,
  className,
  ...props
}: TableProps<T>) => {
  // Internal state for uncontrolled mode
  const [internalSortKey, setInternalSortKey] = useState<string | undefined>();
  const [internalSortDirection, setInternalSortDirection] = useState<'asc' | 'desc'>('asc');
  const [internalPage, setInternalPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Determine if we're in controlled or uncontrolled mode
  const isControlledSort = onSort !== undefined;
  const isControlledPagination = pagination?.onPageChange !== undefined;

  const sortKey = isControlledSort ? controlledSortKey : internalSortKey;
  const sortDirection = isControlledSort ? controlledSortDirection : internalSortDirection;
  const currentPage = isControlledPagination ? (pagination.currentPage ?? 1) : internalPage;

  // Handle sort
  const handleSort = useCallback(
    (key: string) => {
      const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';

      if (isControlledSort) {
        onSort(key, newDirection);
      } else {
        setInternalSortKey(key);
        setInternalSortDirection(newDirection);
      }
    },
    [sortKey, sortDirection, isControlledSort, onSort]
  );

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const paginationCallback = pagination?.onPageChange;
      if (paginationCallback) {
        paginationCallback(page);
      } else {
        setInternalPage(page);
      }
    },
    [pagination]
  );

  // Sort data with optimized accessor caching
  const sortedData = useMemo(() => {
    if (!sortable || !sortKey) return data;

    const column = columns.find((col) => col.key === sortKey);
    if (!column) return data;

    // Cache accessor results for better performance with large datasets
    const withAccessorCache = data.map((item) => ({
      item,
      value: typeof column.accessor === 'function' ? column.accessor(item) : item[column.accessor],
    }));

    return withAccessorCache
      .sort((a, b) => {
        if (a.value === b.value) return 0;
        if (a.value == null) return 1;
        if (b.value == null) return -1;
        const comparison = a.value < b.value ? -1 : 1;
        return sortDirection === 'asc' ? comparison : -comparison;
      })
      .map(({ item }) => item);
  }, [data, sortKey, sortDirection, sortable, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const start = (currentPage - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pagination, currentPage]);

  // Handle row selection
  const handleRowSelect = (rowKey: string | number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowKey);
    } else {
      newSelected.delete(rowKey);
    }
    setSelectedRows(newSelected);

    if (onSelectionChange) {
      // Filter from all data, not just current page
      const selectedData = data.filter((row, index) => newSelected.has(getRowKey(row, index)));
      onSelectionChange(selectedData);
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Select all rows on current page only
      const allKeys = new Set(
        paginatedData.map((row) => {
          // Need to get the correct index from the original data array
          const dataIndex = data.findIndex((r) => r === row);
          return getRowKey(row, dataIndex);
        })
      );
      setSelectedRows(allKeys);

      if (onSelectionChange) {
        onSelectionChange(paginatedData);
      }
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const allSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => {
      const dataIndex = data.findIndex((r) => r === row);
      return selectedRows.has(getRowKey(row, dataIndex));
    });
  const someSelected =
    paginatedData.some((row) => {
      const dataIndex = data.findIndex((r) => r === row);
      return selectedRows.has(getRowKey(row, dataIndex));
    }) && !allSelected;

  // Reset page when data changes
  useEffect(() => {
    if (!isControlledPagination) {
      setInternalPage(1);
    }
  }, [data.length, isControlledPagination]);

  const isEmpty = data.length === 0;
  const showEmptyState = isEmpty && !loading;

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={`${styles.table} ${styles[variant]} ${className ?? ''}`} {...props}>
          <thead className={`${styles.thead} ${styles[`thead-${headerVariant}`]}`}>
            <tr>
              {selectable && (
                <th className={styles.checkboxCell}>
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={(e) => {
                      handleSelectAll(e.target.checked);
                    }}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => {
                const isSortable = sortable && column.sortable !== false;
                return (
                  <th
                    key={column.key}
                    className={styles.th}
                    aria-sort={
                      isSortable && sortKey === column.key
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : isSortable
                          ? 'none'
                          : undefined
                    }
                  >
                    {isSortable ? (
                      <button
                        className={styles.sortButton}
                        onClick={() => {
                          handleSort(column.key);
                        }}
                        aria-label={`Sort by ${column.header}`}
                      >
                        {column.header}
                        <span className={styles.sortIcon}>
                          {sortKey === column.key ? (
                            <Icon
                              name={sortDirection === 'asc' ? 'sort-asc' : 'sort-desc'}
                              size="sm"
                              aria-hidden
                            />
                          ) : (
                            <Icon name="sort" size="sm" aria-hidden />
                          )}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {loading && (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className={styles.loadingCell}>
                  <div className={styles.loadingContent}>
                    <Spinner size="lg" aria-label="Loading table data" />
                  </div>
                </td>
              </tr>
            )}
            {showEmptyState && (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className={styles.emptyCell}>
                  <div className={styles.emptyContent}>{emptyState ?? 'No data available'}</div>
                </td>
              </tr>
            )}
            {!loading &&
              !showEmptyState &&
              paginatedData.map((row, rowIndex) => {
                // Get the actual index from the original data array
                const dataIndex = data.findIndex((r) => r === row);
                const rowKey = getRowKey(row, dataIndex);
                const isSelected = selectedRows.has(rowKey);

                return (
                  <tr key={rowKey} className={isSelected ? styles.selected : undefined}>
                    {selectable && (
                      <td className={styles.checkboxCell}>
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => {
                            handleRowSelect(rowKey, e.target.checked);
                          }}
                          aria-label={`Select row ${String(rowIndex + 1)}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value =
                        typeof column.accessor === 'function'
                          ? column.accessor(row)
                          : row[column.accessor];

                      return (
                        <td key={column.key} className={styles.td}>
                          {column.render
                            ? column.render(value, row)
                            : value != null && typeof value !== 'object'
                              ? String(value)
                              : ''}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {pagination && !loading && !isEmpty && (
        <div className={styles.paginationWrapper}>
          <Pagination
            totalItems={sortedData.length}
            pageSize={pagination.pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant={variant === 'compact' ? 'compact' : 'default'}
          />
        </div>
      )}
    </div>
  );
};
