import {
  useEffect,
  useRef,
  useState,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { Icon } from '../../atoms/Icon';
import { cn } from '../../utils/classNames';
import { getModalPortal } from '../../utils/getModalPortal';
import styles from './Modal.module.css';

export interface ModalProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'children' | 'className'
> {
  /**
   * Controls visibility of the modal
   */
  isOpen: boolean;

  /**
   * Callback when modal should close
   */
  onClose: () => void;

  /**
   * Modal header title
   */
  title?: string;

  /**
   * Show close button (X) in header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Modal size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Modal body content
   */
  children: ReactNode;

  /**
   * Optional footer content
   */
  footer?: ReactNode;

  /**
   * Close modal on Escape key press
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Close modal on backdrop click
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Additional class name for modal content
   */
  className?: string;

  /**
   * ID for aria-labelledby (auto-generated if title provided)
   */
  'aria-labelledby'?: string;

  /**
   * ID for aria-describedby
   */
  'aria-describedby'?: string;
}

/**
 * Modal component - Overlay dialog for displaying content above the page
 *
 * Features:
 * - Portal rendering to document root
 * - Focus trap with return-to-trigger behavior
 * - Body scroll lock when open
 * - ESC key to close (configurable)
 * - Click outside to close (configurable)
 * - Smooth enter/exit animations
 * - Mobile responsive (bottom sheet style)
 * - Full ARIA compliance
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  size = 'md',
  children,
  footer,
  closeOnEscape = true,
  closeOnClickOutside = true,
  className,
  ...props
}: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const mouseDownTargetRef = useRef<EventTarget | null>(null);

  // Generate unique ID for title
  const titleId = useId();

  // Get or create portal container (initialized once)
  const [portalContainer] = useState(() =>
    typeof document !== 'undefined' ? getModalPortal() : null
  );

  // Handle animation timing
  useEffect(() => {
    if (isOpen) {
      // Wrap state updates in RAF to avoid setting state directly in effect
      requestAnimationFrame(() => {
        setShouldRender(true);
        // Double RAF ensures DOM is painted before animation class
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      // Wrap state updates to avoid setting state directly in effect
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match CSS transition duration
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen && typeof document !== 'undefined') {
      // Save original values
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Prevent scroll and maintain scrollbar space
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${String(scrollbarWidth)}px`;

      return () => {
        // Restore original values
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle backdrop click with mousedown tracking
  const handleBackdropMouseDown = (event: React.MouseEvent) => {
    mouseDownTargetRef.current = event.target;
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target === event.currentTarget &&
      mouseDownTargetRef.current === event.currentTarget &&
      closeOnClickOutside
    ) {
      onClose();
    }
    mouseDownTargetRef.current = null;
  };

  // Don't render if not open and animation complete
  if (!shouldRender || !portalContainer) return null;

  const modalContent = (
    <FocusLock returnFocus>
      <div
        className={cn(styles.overlay, isAnimating && styles.overlayVisible)}
        onMouseDown={handleBackdropMouseDown}
        onClick={handleBackdropClick}
      >
        <div
          {...props}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : props['aria-labelledby']}
          aria-describedby={props['aria-describedby']}
          className={cn(styles.modal, styles[size], isAnimating && styles.modalVisible, className)}
          ref={modalContentRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {(title ?? showCloseButton) && (
            <div className={styles.header}>
              {title && (
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <Icon name="x" size="md" aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          <div className={styles.body}>{children}</div>

          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </FocusLock>
  );

  return createPortal(modalContent, portalContainer);
};

Modal.displayName = 'Modal';
