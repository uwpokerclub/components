import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
} from 'react';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';
import { Spinner } from '../../atoms/Spinner';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';
import { cn } from '../../utils/classNames';
import styles from './Combobox.module.css';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'onChange' | 'value' | 'type'
> {
  /**
   * Array of available options
   */
  options: ComboboxOption[];
  /**
   * Search callback - called when user types in the input
   * If provided, enables async mode (no client-side filtering)
   */
  onSearch?: (query: string) => void;
  /**
   * Selection callback - called when user selects an option
   */
  onChange: (value: string | null) => void;
  /**
   * Currently selected value
   */
  value?: string | null;
  /**
   * Input placeholder text
   */
  placeholder?: string;
  /**
   * Show loading state
   */
  isLoading?: boolean;
  /**
   * Search debounce delay in milliseconds
   */
  debounceMs?: number;
  /**
   * Message to display when no results are found
   */
  emptyMessage?: string;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Make combobox full width of its container
   */
  fullWidth?: boolean;
}

/**
 * Combobox component - Searchable dropdown with async data support
 *
 * Features:
 * - Debounced search with client-side or async filtering
 * - Keyboard navigation (arrow keys, Enter, ESC)
 * - Loading state indicator
 * - Clear button when value selected
 * - Click outside to close
 * - WAI-ARIA combobox pattern
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      onSearch,
      onChange,
      value = null,
      placeholder = 'Search...',
      isLoading = false,
      debounceMs = 300,
      emptyMessage = 'No results found',
      error = false,
      errorMessage,
      fullWidth = false,
      className,
      disabled,
      id,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const comboboxId = id ?? generatedId;
    const listboxId = `${comboboxId}-listbox`;
    const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // Get the label for the selected value
    const selectedOption = useMemo(
      () => options.find((opt) => opt.value === value),
      [options, value]
    );

    // Determine what to display in the input
    const displayValue = isOpen ? searchQuery : (selectedOption?.label ?? '');

    // Determine if we're in async mode
    const isAsyncMode = typeof onSearch === 'function';

    // Filter options client-side if not in async mode
    const filteredOptions = useMemo(() => {
      if (isAsyncMode) {
        // In async mode, show all options (filtering happens server-side)
        return options;
      }

      // Client-side filtering
      // If search query is empty OR matches the selected option exactly, show all options
      if (!searchQuery.trim() || searchQuery === selectedOption?.label) {
        return options;
      }

      const query = searchQuery.toLowerCase();
      return options.filter((option) => option.label.toLowerCase().includes(query));
    }, [options, searchQuery, isAsyncMode, selectedOption]);

    // Debounced search handler
    const debouncedSearch = useDebouncedCallback((query: string) => {
      if (onSearch) {
        onSearch(query);
      }
    }, debounceMs);

    // Handle input change
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        setIsOpen(true);
        setHighlightedIndex(-1);

        // Call debounced search in async mode
        if (isAsyncMode) {
          debouncedSearch(newValue);
        }
      },
      [isAsyncMode, debouncedSearch]
    );

    // Handle option selection
    const handleSelectOption = useCallback(
      (option: ComboboxOption | null) => {
        onChange(option?.value ?? null);
        setSearchQuery('');
        setIsOpen(false);
        setHighlightedIndex(-1);
      },
      [onChange]
    );

    // Handle clear button
    const handleClear = useCallback(() => {
      handleSelectOption(null);
    }, [handleSelectOption]);

    // Handle input focus
    const handleFocus = useCallback(() => {
      // Keep the selected value visible when opening
      if (selectedOption) {
        setSearchQuery(selectedOption.label);
      }
      setIsOpen(true);
    }, [selectedOption]);

    // Handle input blur - we'll use click outside instead
    const handleBlur = useCallback(() => {
      // Don't close immediately to allow option clicks
      // Will be handled by click outside
    }, []);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
          setIsOpen(true);
          e.preventDefault();
          return;
        }

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
            break;
          case 'ArrowUp':
            e.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
            break;
          case 'Enter':
            e.preventDefault();
            if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
              handleSelectOption(filteredOptions[highlightedIndex]);
            }
            break;
          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            setHighlightedIndex(-1);
            break;
        }
      },
      [isOpen, filteredOptions, highlightedIndex, handleSelectOption]
    );

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setHighlightedIndex(-1);
          setSearchQuery('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [isOpen]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && isOpen) {
        const listbox = document.getElementById(listboxId);
        const highlightedOption = listbox?.children[highlightedIndex] as HTMLElement | undefined;
        if (highlightedOption && 'scrollIntoView' in highlightedOption) {
          highlightedOption.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [highlightedIndex, listboxId, isOpen]);

    const showClearButton = value && !disabled;
    const showDropdown = isOpen && !disabled;

    return (
      <div
        ref={containerRef}
        className={cn(styles.container, fullWidth && styles.fullWidth, className)}
      >
        <Input
          ref={ref}
          id={comboboxId}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          error={error}
          errorMessage={errorMessage}
          fullWidth={fullWidth}
          disabled={disabled}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            highlightedIndex >= 0 ? `${comboboxId}-option-${String(highlightedIndex)}` : undefined
          }
          autoComplete="off"
          prefix={<Icon name="search" size="sm" aria-hidden />}
          suffix={
            <>
              {isLoading && <Spinner size="sm" aria-label="Loading options" />}
              {showClearButton && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={styles.clearButton}
                  aria-label="Clear selection"
                  tabIndex={-1}
                >
                  <Icon name="x" size="sm" aria-hidden />
                </button>
              )}
            </>
          }
          {...rest}
        />

        {showDropdown && (
          <ul id={listboxId} role="listbox" className={styles.listbox} aria-label="Options">
            {filteredOptions.length === 0 ? (
              <li className={styles.emptyMessage} role="option" aria-selected={false}>
                {isLoading ? 'Loading...' : emptyMessage}
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value;
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={option.value}
                    id={`${comboboxId}-option-${String(index)}`}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      styles.option,
                      isSelected && styles.selected,
                      isHighlighted && styles.highlighted
                    )}
                    onMouseDown={(e) => {
                      // Prevent input blur
                      e.preventDefault();
                    }}
                    onClick={() => {
                      handleSelectOption(option);
                    }}
                  >
                    {option.label}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
